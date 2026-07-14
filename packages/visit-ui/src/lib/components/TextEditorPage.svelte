<script lang="ts">
    import type { Editor } from '@tiptap/core';
    import Button from './Button.svelte';
    import FC from './FC.svelte';
    import FR from './FR.svelte';
    import Spring from './Spring.svelte';
    import H1 from './H1.svelte';
    import H3 from './H3.svelte';
    import DocEditor from './DocEditor.svelte';

    let editor = $state<Editor | null>(null);

    const initial_html = `<h2>Titolo di esempio</h2>
<p>Questo è un paragrafo con testo <strong>grassetto</strong>, <em>corsivo</em> e <u>sottolineato</u>.</p>
<ul>
  <li>Voce uno</li>
  <li>Voce due</li>
  <li>Voce tre</li>
</ul>
<blockquote>Una citazione di esempio</blockquote>`;

    let html_output  = $state('');
    let copied       = $state(false);

    function on_update() {
        if (!editor) return;
        html_output = editor.getHTML();
    }

    function copy_html() {
        navigator.clipboard.writeText(html_output);
        copied = true;
        setTimeout(() => copied = false, 1500);
    }

    $effect(() => {
        if (!editor) return;
        editor.on('update', on_update);
        on_update();
        return () => editor?.off('update', on_update);
    });
</script>

<FC class="w-full px-4 max-w-5xl mx-auto">

    <H1 class="mt-8"> WYSIWYG Editor — Tiptap</H1>

    <!-- Editor -->
    <DocEditor content={initial_html} bind:editor class="mt-6" />

    <!-- Output -->
    <FR class="items-center mt-4">
        <H3>Output</H3>
        <Spring />
        <Button color="secondary" onclick={copy_html}>{copied ? 'copiato!' : 'copia HTML'}</Button>
    </FR>
    <pre class="bg-body2 border border-(--color-card-border) rounded-lg p-4 text-xs text-text overflow-auto max-h-64 whitespace-pre-wrap">{html_output}</pre>

    <!-- Anteprima HTML renderizzato -->
    <H3>Anteprima</H3>
    <div class="ProseMirror bg-card border border-(--color-card-border) rounded-lg p-4 text-text">
        {@html html_output || '<span class="opacity-40">— scrivi qualcosa nell\'editor —</span>'}
    </div>

</FC>
