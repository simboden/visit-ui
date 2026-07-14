<script lang="ts">
	import { Card, Code, FC, H2, Page, SavePdf } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const chapters = [
		{
			body: `## Capitolo 1

Un paragrafo con testo **in grassetto** e *in corsivo*.

* primo punto
* secondo punto`
		},
		{
			body: `## Capitolo 2

> Una citazione di esempio.

[un link](https://svelte.dev)`
		}
	];
</script>

<Page title="Save PDF">
	<FC class="gap-8">
		<Card>
			<H2>SavePdf</H2>
			<p>
				<Code>SavePdf</Code> è un bottone che genera lato client un PDF da un elenco di
				<Code>chapters</Code> in markdown, usando <Code>html2pdf.js</Code> (che a sua volta usa
				<Code>html2canvas</Code> + <Code>jsPDF</Code>). Ogni capitolo viene renderizzato tramite
				<Code>Markdown</Code> in un contenitore nascosto con classe <Code>PRINT</Code> — definita in
				<Code>theme.css</Code> — che forza colori nero su bianco indipendentemente dal tema corrente
				(anche in dark mode), così il PDF risulta sempre leggibile. Durante la generazione un overlay
				copre la pagina con il messaggio "Generazione PDF in corso...".
			</p>
			<p>parametri:</p>
			<ul class="list-disc pl-6 space-y-1">
				<li><Code>chapters</Code>: <Code>{'{ body?: string }[]'}</Code>, il testo markdown di ciascun capitolo (renderizzato con <Code>Markdown</Code>).</li>
				<li><Code>title</Code>: titolo mostrato in cima al PDF.</li>
				<li><Code>filename</Code>: nome del file scaricato.</li>
			</ul>
			<SavePdf {chapters} title="Documento di esempio" filename="esempio.pdf" />
		</Card>

		<Card>
			<p>codice:</p>
			<CodeBlock
code={`<script lang="ts">
  import { SavePdf } from 'visit-ui';

  const chapters = [
    { body: '## Capitolo 1\\n\\nTesto in **grassetto**.' },
    { body: '## Capitolo 2\\n\\n> Una citazione.' }
  ];
</` + `script>

<SavePdf {chapters} title="Documento di esempio" filename="esempio.pdf" />`}
			/>
		</Card>
	</FC>
</Page>
