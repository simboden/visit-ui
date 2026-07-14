<script lang="ts">
    import { onMount, onDestroy, untrack } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import Highlight from '@tiptap/extension-highlight';
    import Subscript from '@tiptap/extension-subscript';
    import Superscript from '@tiptap/extension-superscript';
    import { TextStyle } from '@tiptap/extension-text-style';
    import Color from '@tiptap/extension-color';
    import { Icon, SelectNative } from './index.js';
    import {
        mdiUndo, mdiRedo, mdiFormatBold, mdiFormatItalic, mdiFormatUnderline,
        mdiFormatStrikethrough, mdiFormatColorHighlight, mdiFormatSubscript, mdiFormatSuperscript,
        mdiCodeTags, mdiLink, mdiLinkOff, mdiFormatListBulleted, mdiFormatListNumbered,
        mdiFormatColorText,
    } from '@mdi/js';

    type Props = {
        content?   : string;
        editor?    : Editor | null;
        onUpdate?  : (html: string) => void;
        autofocus? : boolean | 'start' | 'end' | number;
        class?     : string;
        grow?      : boolean;
    };

    let {
        content    = '',
        editor     = $bindable<Editor | null>(null),
        onUpdate,
        autofocus  = false,
        class: cls = '',
        grow       = false,
    }: Props = $props();

    let element: HTMLDivElement;
    let updateTick = $state(0);
    let lastContent = $state(content);

    onMount(() => {
        editor = new Editor({
            element,
            extensions: [StarterKit, Highlight, Subscript, Superscript, TextStyle, Color],
            content,
            autofocus,
            onTransaction: () => { updateTick++; },
            onUpdate: ({ editor }) => onUpdate?.(editor.getHTML()),
        });
    });

    onDestroy(() => {
        editor?.destroy();
    });

    // sincronizza i cambi esterni di `content` (es. cambio documento) senza disturbare la digitazione in corso
    $effect(() => {
        if (editor && content !== untrack(() => lastContent) && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
        lastContent = content;
    });

    const tb = $derived.by(() => {
        void updateTick;
        if (!editor) return {
            bold: false, italic: false, underline: false, strike: false, highlight: false,
            subscript: false, superscript: false, code: false, link: false,
            bulletList: false, orderedList: false, canUndo: false, canRedo: false, heading: '0',
        };
        let heading = '0';
        for (let lvl = 1; lvl <= 6; lvl++) {
            if (editor.isActive('heading', { level: lvl })) { heading = String(lvl); break; }
        }
        return {
            bold:        editor.isActive('bold'),
            italic:      editor.isActive('italic'),
            underline:   editor.isActive('underline'),
            strike:      editor.isActive('strike'),
            highlight:   editor.isActive('highlight'),
            subscript:   editor.isActive('subscript'),
            superscript: editor.isActive('superscript'),
            code:        editor.isActive('code'),
            link:        editor.isActive('link'),
            bulletList:  editor.isActive('bulletList'),
            orderedList: editor.isActive('orderedList'),
            canUndo:     editor.can().undo(),
            canRedo:     editor.can().redo(),
            heading,
        };
    });

    const headingItems = [
        { value: '0', name: 'Paragrafo' },
        { value: '1', name: 'Titolo 1' },
        { value: '2', name: 'Titolo 2' },
        { value: '3', name: 'Titolo 3' },
        { value: '4', name: 'Titolo 4' },
        { value: '5', name: 'Titolo 5' },
        { value: '6', name: 'Titolo 6' },
    ];

    function setHeading(level: string | number | null) {
        if (!editor) return;
        const lvl = Number(level);
        if (!lvl) editor.chain().focus().setParagraph().run();
        else editor.chain().focus().toggleHeading({ level: lvl as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    }

    function toggleLink() {
        if (!editor) return;
        if (editor.isActive('link')) { editor.chain().focus().unsetLink().run(); return; }
        const url = window.prompt('Inserisci URL');
        if (url) editor.chain().focus().toggleLink({ href: url }).run();
    }

    function setTextColor(e: Event) {
        const color = (e.target as HTMLInputElement).value;
        editor?.chain().focus().setColor(color).run();
    }

    function btnClass(active: boolean): string {
        return [
            'p-1.5', 'rounded', 'cursor-pointer', 'disabled:opacity-40', 'disabled:cursor-not-allowed',
            'hover:bg-input-hover',
            active ? 'bg-pri text-pri-text' : 'text-text',
        ].join(' ');
    }

    const containerClass = $derived(grow ? '!bg-card !text-text flex-1' : '!bg-card !text-text');
</script>

<div class="flex flex-col border border-(--color-card-border) rounded-lg overflow-hidden {cls} {grow ? 'flex-1' : ''}">

    <div class="flex flex-wrap items-center gap-1 p-1.5 bg-acc border-b border-(--color-card-border)">

        <button type="button" class={btnClass(false)} disabled={!tb.canUndo} onclick={() => editor?.chain().focus().undo().run()} aria-label="Disfai">
            <Icon icon={mdiUndo} size="1.25rem" />
        </button>
        <button type="button" class={btnClass(false)} disabled={!tb.canRedo} onclick={() => editor?.chain().focus().redo().run()} aria-label="Ripeti">
            <Icon icon={mdiRedo} size="1.25rem" />
        </button>

        <div class="w-px h-5 bg-(--color-card-border) mx-1"></div>

        <SelectNative
            class="w-32"
            items={headingItems}
            value={tb.heading}
            onchange={(e) => setHeading((e.target as HTMLSelectElement).value)}
        />

        <label class="relative {btnClass(false)}" aria-label="Colore testo">
            <Icon icon={mdiFormatColorText} size="1.25rem" />
            <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" oninput={setTextColor} />
        </label>

        <div class="w-px h-5 bg-(--color-card-border) mx-1"></div>

        <button type="button" class={btnClass(tb.bold)}      onclick={() => editor?.chain().focus().toggleBold().run()}        aria-label="Grassetto">    <Icon icon={mdiFormatBold} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.italic)}    onclick={() => editor?.chain().focus().toggleItalic().run()}      aria-label="Corsivo">      <Icon icon={mdiFormatItalic} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.underline)} onclick={() => editor?.chain().focus().toggleUnderline().run()}   aria-label="Sottolineato"> <Icon icon={mdiFormatUnderline} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.strike)}    onclick={() => editor?.chain().focus().toggleStrike().run()}      aria-label="Barrato">      <Icon icon={mdiFormatStrikethrough} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.highlight)} onclick={() => editor?.chain().focus().toggleHighlight().run()}   aria-label="Evidenzia">    <Icon icon={mdiFormatColorHighlight} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.subscript)} onclick={() => editor?.chain().focus().toggleSubscript().run()}   aria-label="Pedice">       <Icon icon={mdiFormatSubscript} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.superscript)} onclick={() => editor?.chain().focus().toggleSuperscript().run()} aria-label="Apice">      <Icon icon={mdiFormatSuperscript} size="1.25rem" /></button>

        <div class="w-px h-5 bg-(--color-card-border) mx-1"></div>

        <button type="button" class={btnClass(tb.bulletList)}  onclick={() => editor?.chain().focus().toggleBulletList().run()}  aria-label="Elenco puntato">  <Icon icon={mdiFormatListBulleted} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.orderedList)} onclick={() => editor?.chain().focus().toggleOrderedList().run()} aria-label="Elenco numerato"> <Icon icon={mdiFormatListNumbered} size="1.25rem" /></button>

        <div class="w-px h-5 bg-(--color-card-border) mx-1"></div>

        <button type="button" class={btnClass(tb.code)} onclick={() => editor?.chain().focus().toggleCode().run()} aria-label="Codice"> <Icon icon={mdiCodeTags} size="1.25rem" /></button>
        <button type="button" class={btnClass(tb.link)} onclick={toggleLink} aria-label="Link"> <Icon icon={mdiLink} size="1.25rem" /></button>
        {#if tb.link}
            <button type="button" class={btnClass(false)} onclick={() => editor?.chain().focus().unsetLink().run()} aria-label="Rimuovi link"> <Icon icon={mdiLinkOff} size="1.25rem" /></button>
        {/if}

    </div>

    <div bind:this={element} class="p-3 overflow-y-auto {containerClass} {grow ? 'flex-1' : ''}"></div>

</div>

<style>
    :global(.ProseMirror)            { outline: none; }
    :global(.ProseMirror h1)         { font-size: 2.25rem;  font-weight: 800; letter-spacing: -0.025em; color: var(--color-head); margin: 0.75rem 0; }
    :global(.ProseMirror h2)         { font-size: 1.875rem; font-weight: 800; letter-spacing: -0.025em; color: var(--color-head); margin: 0.75rem 0; }
    :global(.ProseMirror h3)         { font-size: 1.5rem;   font-weight: 700; letter-spacing: -0.025em; color: var(--color-head); margin: 0.5rem 0;  }
    :global(.ProseMirror h4)         { font-size: 1.25rem;  font-weight: 500;                           color: var(--color-head); margin: 0.5rem 0;  }
    :global(.ProseMirror ul)         { list-style: disc;    padding-left: 1.5rem; margin: 0.5rem 0; }
    :global(.ProseMirror ol)         { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
    :global(.ProseMirror blockquote) { border-left: 4px solid var(--color-card-border); padding-left: 1rem; opacity: 0.7; margin: 0.5rem 0; }
    :global(.ProseMirror p)          { font-size: 1rem; margin: 0.25rem 0; }
    :global(.ProseMirror hr)         { border-color: var(--color-hr); border-width: var(--card-border-sz); margin: 0.75rem 0; }
    :global(.ProseMirror code)       { background-color: var(--color-card-border); border-radius: 0.25rem; padding: 0.1rem 0.3rem; }
    :global(.ProseMirror a)          { color: var(--color-pri); text-decoration: underline; }
</style>
