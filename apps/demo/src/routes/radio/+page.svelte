<script lang="ts">
	import { Card, FC, FS, H2, H3, Link, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const fruits = ['apple', 'pear', 'banana'];
	const viewOptions = ['preview', 'code'];

	let fruit = $state<string | number | null>('apple');

	let variantView = $state<string | number | null>('preview');
	let disabledView = $state<string | number | null>('preview');
	let orientationView = $state<string | number | null>('preview');
</script>

<Page title="Radio">
	<FC class="gap-8">
		<p>
			A radio group built on bits-ui's <code>RadioGroup</code>. Pass an <code>options</code> array
			of strings/numbers or <code>{'{ value, label }'}</code> objects, and bind <code>value</code>
			to the selected option. The <code>variant</code> prop controls the look: <code
				>"underlined"</code
			> (default) renders tabs with a bottom border on the selected option, <code>"legacy"</code>
			renders a traditional circular radio button with a separate label. The <code>orientation</code
			> prop ("horizontal" by default, or "vertical") only applies to the <code>"legacy"</code>
			variant — underlined options are always laid out horizontally. Both the top-level
			<code>label</code> and each option's <code>label</code> accept a literal string, or a
			<code>"#text_id"</code> to resolve a translation (see <Link href="/language">Language</Link>).
		</p>

		<Card>
			<FS>
				<H2>variant</H2>
				<Radio options={viewOptions} bind:value={variantView} class="mr-4" />
			</FS>
			{#if variantView === 'preview'}
				<div class="grid grid-cols-2 gap-4 w-100">
					<p>underlined (the default)</p>
					<Radio options={fruits} bind:value={fruit} />
					<p>legacy</p>
					<Radio variant="legacy" options={fruits} bind:value={fruit} />
				</div>
			{:else}
				<CodeBlock
code=
{`<script lang="ts">
  import { Radio } from 'visit-ui';
  const fruits = ['apple', 'pear', 'banana'];
  let fruit = $state('apple');
</` + `script>

<Radio options={fruits} bind:value={fruit} />  
<Radio variant="legacy" options={fruits} bind:value={fruit} />
`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>disabled</H2>
				<Radio options={viewOptions} bind:value={disabledView} class="mr-4" />
			</FS>
			{#if disabledView === 'preview'}
				<div class="grid grid-cols-2 gap-4 w-100">
					<p>underlined</p>
					<Radio disabled options={fruits} bind:value={fruit} />
					<p>legacy</p>
					<Radio variant="legacy" disabled options={fruits} bind:value={fruit} />
				</div>
			{:else}
				<CodeBlock
code={`<Radio disabled options={fruits} bind:value={fruit} />
<Radio variant="legacy" disabled options={fruits} bind:value={fruit} />`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>orientation</H2>
				<Radio options={viewOptions} bind:value={orientationView} class="mr-4" />
			</FS>
			{#if orientationView === 'preview'}
				<Radio variant="legacy" orientation="vertical" options={fruits} bind:value={fruit} />
			{:else}
				<CodeBlock
code={`<Radio variant="legacy" orientation="vertical" options={fruits} bind:value={fruit} />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
