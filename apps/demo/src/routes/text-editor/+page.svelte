<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { Card, Code, DocEditor, FC, FS, H2, Page, Radio, TextEditorPage } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];
	let view = $state<string | number | null>('preview');

	let editor = $state<Editor | null>(null);
</script>

<Page title="Text Editor">
	<FC class="gap-8">
		<Card>
			<FS>
				<H2>DocEditor</H2>
				<Radio options={viewOptions} bind:value={view} class="mr-4" />
			</FS>
			<p>
				<Code>DocEditor</Code> è un editor WYSIWYG basato su
				<Code>@tiptap/core</Code> + <Code>starter-kit</Code> (più le estensioni
				<Code>highlight</Code>, <Code>subscript</Code>, <Code>superscript</Code> e
				<Code>color</Code>/<Code>text-style</Code>), con una toolbar che usa i componenti
				<Code>Icon</Code> e <Code>SelectNative</Code> di visit-ui — quindi rispetta sempre il
				tema corrente.
			</p>
			<p>parametri:</p>
			<ul class="list-disc pl-6 space-y-1">
				<li><Code>content</Code>: HTML iniziale dell'editor (non bindable — leggi il contenuto via <Code>editor.getHTML()</Code>, vedi sotto).</li>
				<li><Code>editor</Code>: bindable, l'istanza <Code>Editor</Code> di Tiptap. Usala per leggere il contenuto (<Code>editor.getHTML()</Code>) o per integrazioni più avanzate.</li>
				<li><Code>onUpdate</Code>: callback <Code>(html: string) =&gt; void</Code>, chiamata ad ogni modifica con l'HTML corrente — alternativa più comoda a leggere <Code>editor.getHTML()</Code> a mano.</li>
				<li><Code>autofocus</Code>: <Code>boolean | 'start' | 'end' | number</Code>, posizione del focus iniziale (passata direttamente a Tiptap).</li>
				<li><Code>grow</Code>: quando <Code>true</Code>, l'editor si espande per riempire il contenitore flex (<Code>flex-1</Code>) invece di avere un'altezza intrinseca.</li>
				<li><Code>class</Code>: classi aggiuntive sul contenitore esterno.</li>
			</ul>
			{#if view === 'preview'}
				<DocEditor
					content="<p>Scrivi qualcosa...</p>"
					bind:editor
					class="mt-2"
				/>
				<p class="text-sm text-lab mt-2">
					HTML corrente: <Code>{editor?.getHTML() ?? ''}</Code>
				</p>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import type { Editor } from '@tiptap/core';
  import { DocEditor } from 'visit-ui';

  let editor = $state<Editor | null>(null);
</` + `script>

<DocEditor content="<p>Scrivi qualcosa...</p>" bind:editor />

<!-- leggi editor.getHTML() quando serve, oppure: -->
<DocEditor content="<p>...</p>" onUpdate={(html) => console.log(html)} />`}
				/>
			{/if}
		</Card>

		<Card>
			<p>Sotto, il componente <Code>TextEditorPage</Code> che riusa <Code>DocEditor</Code> in una pagina completa (output HTML + anteprima renderizzata).</p>
			<TextEditorPage />
		</Card>
	</FC>
</Page>
