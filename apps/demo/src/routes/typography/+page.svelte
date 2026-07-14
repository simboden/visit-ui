<script lang="ts">
	import { Card, Code, Dimmed, FC, FR, FS, H1, H2, H3, H4, Label, LabelError, Link, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let headingsView = $state<string | number | null>('preview');
	let textView = $state<string | number | null>('preview');
	let dimmedView = $state<string | number | null>('preview');
	let linkView = $state<string | number | null>('preview');
	let codeView = $state<string | number | null>('preview');
	let codeBlockView = $state<string | number | null>('preview');
	let labelView = $state<string | number | null>('preview');
	let labelErrorView = $state<string | number | null>('preview');
</script>

<Page title="Typography">
	<FC class="gap-8">
		<Card>
			<FS>
				<H2>Headings</H2>
				<Radio options={viewOptions} bind:value={headingsView} class="mr-4" />
			</FS>
			<p>Headings (<Code>H1</Code>-<Code>H4</Code>) use the <Code>color-head</Code> theme variable.</p>
			{#if headingsView === 'preview'}
				<FC class="gap-2">
					<H1>H1 - Main title</H1>
					<H2>H2 - Section title</H2>
					<H3>H3 - Subsection title</H3>
					<H4>H4 - Minor title</H4>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { H1, H2, H3, H4 } from 'visit-ui';
</` + `script>

<H1>H1 - Main title</H1>
<H2>H2 - Section title</H2>
<H3>H3 - Subsection title</H3>
<H4>H4 - Minor title</H4>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>Text</H2>
				<Radio options={viewOptions} bind:value={textView} class="mr-4" />
			</FS>
			<p>
				Body text uses raw <Code>&lt;p&gt;</Code> elements — no wrapper component needed.
				Color (<Code>color-text</Code>) and line-height are applied globally to <Code>body</Code>
				in <Code>theme.css</Code> and inherited automatically.
			</p>
			{#if textView === 'preview'}
				<p>This is a normal text paragraph.</p>
			{:else}
				<CodeBlock
code={`<p>This is a normal text paragraph.</p>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>Dimmed</H2>
				<Radio options={viewOptions} bind:value={dimmedView} class="mr-4" />
			</FS>
			<p>
				<Code>Dimmed</Code> renders a paragraph at 50% opacity, used for secondary or less important
				text. It uses the <Code>color-text</Code> variable at half opacity.
			</p>
			{#if dimmedView === 'preview'}
				<Dimmed>This is a dimmed text paragraph.</Dimmed>
			{:else}
				<CodeBlock
code={`<Dimmed>This is a dimmed text paragraph.</Dimmed>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>Link</H2>
				<Radio options={viewOptions} bind:value={linkView} class="mr-4" />
			</FS>
			<p><Code>Link</Code> uses the <Code>color-pri</Code> theme variable.</p>
			{#if linkView === 'preview'}
				<FR class="gap-4">
					<Link href="/">Internal link</Link>
					<Link href="https://svelte.dev" target="_blank" rel="noopener noreferrer"
						>External link</Link
					>
				</FR>
			{:else}
				<CodeBlock
code={`<Link href="/">Internal link</Link>
<Link href="https://svelte.dev" target="_blank" rel="noopener noreferrer">External link</Link>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>Code</H2>
				<Radio options={viewOptions} bind:value={codeView} class="mr-4" />
			</FS>
			<p>
				<Code>Code</Code> renders an inline code snippet using the <Code>color-code</Code> and
				<Code>color-code-bg</Code> theme variables.
			</p>
			{#if codeView === 'preview'}
				<p>Use <Code>pnpm dev</Code> to start the dev server.</p>
			{:else}
				<CodeBlock code={`<p>Use <Code>pnpm dev</Code> to start the dev server.</p>`} />
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>CodeBlock</H2>
				<Radio options={viewOptions} bind:value={codeBlockView} class="mr-4" />
			</FS>
			<p>
				<Code>CodeBlock</Code> renders a syntax-highlighted code block, switching between the
				<Code>github</Code> and <Code>github-dark</Code> styles based on the current theme.
			</p>
			{#if codeBlockView === 'preview'}
				<CodeBlock
code={`function greet(name: string) {
	return \`Hello, \${name}!\`;
}`}
				/>
			{:else}
				<CodeBlock
code={`<CodeBlock
	code={\`function greet(name: string) {
	return \\\`Hello, \\\${name}!\\\`;
}\`}
/>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>Label</H2>
				<Radio options={viewOptions} bind:value={labelView} class="mr-4" />
			</FS>
			<p>
				<Code>Label</Code> is the field label used by input components. It uses the
				<Code>color-lab</Code> theme variable.
			</p>
			{#if labelView === 'preview'}
				<Label>Field label</Label>
			{:else}
				<CodeBlock
code={`<Label>Field label</Label>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>LabelError</H2>
				<Radio options={viewOptions} bind:value={labelErrorView} class="mr-4" />
			</FS>
			<p>
				<Code>LabelError</Code> is the error message shown below input components when validation
				fails. It uses the <Code>color-input-error</Code> theme variable.
			</p>
			{#if labelErrorView === 'preview'}
				<LabelError>This field is required.</LabelError>
			{:else}
				<CodeBlock
code={`<LabelError>This field is required.</LabelError>`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
