<script lang="ts">
	import { Card, Code, FC, FS, H2, Markdown, MarkdownPage, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];
	let view = $state<string | number | null>('preview');

	const sample = `## A small example

A paragraph with **bold**, *italic* and \`inline code\`.

* one
* two
* [a link](https://svelte.dev)`;
</script>

<Page title="Markdown">
	<FC class="gap-8">
		<Card>
			<FS>
				<H2>Markdown</H2>
				<Radio options={viewOptions} bind:value={view} class="mr-4" />
			</FS>
			<p>
				<Code>Markdown</Code> renders a markdown string (the <Code>source</Code> prop) through
				<Code>@humanspeak/svelte-markdown</Code>, using a set of renderers that map markdown
				elements to themed visit-ui components instead of bare HTML: headings become
				<Code>H1</Code>–<Code>H4</Code>, links become <Code>Link</Code>, horizontal rules become
				<Code>HR</Code>, inline code and code blocks use the <Code>text-text</Code> theme color,
				and so on. The result always matches the current theme, including dark mode.
			</p>
			<p>
				<Code>LocText</Code> uses <Code>Markdown</Code> internally: when a translation entry's
				<Code>type</Code> is <Code>'m'</Code>, its text is rendered through this component instead
				of being shown as plain text or raw HTML.
			</p>
			{#if view === 'preview'}
				<div class="text-text">
					<Markdown source={sample} />
				</div>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Markdown } from 'visit-ui';

  const source = \`${sample.replaceAll('`', '\\`')}\`;
</` + `script>

<Markdown {source} />`}
				/>
			{/if}
		</Card>

		<Card>
			<p>Edit the markdown on the left and see the rendered output and generated HTML live.</p>
			<MarkdownPage />
		</Card>
	</FC>
</Page>
