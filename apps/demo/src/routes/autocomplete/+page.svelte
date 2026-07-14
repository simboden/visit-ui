<script lang="ts">
	import { AutoComplete, Card, Code, FC, FS, H2, MultiAutoComplete, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];
	let acView = $state<string | number | null>('preview');
	let macView = $state<string | number | null>('preview');

	const fruits = [
		{ id: '1', display: 'Apple' },
		{ id: '2', display: 'Banana' },
		{ id: '3', display: 'Cherry' },
		{ id: '4', display: 'Date' },
		{ id: '5', display: 'Elderberry' },
		{ id: '6', display: 'Fig' },
		{ id: '7', display: 'Grape' }
	];

	let acValue = $state('');
	let macValues = $state<string[]>([]);
</script>

<Page title="AutoComplete">
	<FC class="gap-8">

		<Card>
			<FS>
				<H2>AutoComplete</H2>
				<Radio options={viewOptions} bind:value={acView} class="mr-4" />
			</FS>
			<p>
				Single-value searchable select. <Code>items</Code> is an array of
				<Code>&#123; id, display &#125;</Code> objects; <Code>value</Code> binds to the selected
				<Code>id</Code>. The dropdown filters client-side (case-insensitive, max 50 results). The
				<Code>lock</Code> prop makes the field read-only while keeping the value visible.
			</p>
			{#if acView === 'preview'}
				<FC class="gap-4 max-w-sm">
					<AutoComplete label="Fruit" items={fruits} bind:value={acValue} placeholder="Search…" />
					<p class="text-sm">selected id: "{acValue}"</p>
					<AutoComplete label="Locked" items={fruits} value="3" lock />
					<AutoComplete label="Disabled" items={fruits} disabled />
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { AutoComplete } from 'visit-ui';

  const fruits = [
    { id: '1', display: 'Apple' },
    { id: '2', display: 'Banana' },
  ];

  let value = $state('');
</` + `script>

<AutoComplete label="Fruit" {items} bind:value placeholder="Search…" />
<AutoComplete label="Locked"   {items} value="1" lock />
<AutoComplete label="Disabled" {items} disabled />`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>MultiAutoComplete</H2>
				<Radio options={viewOptions} bind:value={macView} class="mr-4" />
			</FS>
			<p>
				Multi-value variant of <Code>AutoComplete</Code>. <Code>values</Code> binds to an array of
				selected ids. Selected items are shown as <Code>Chip</Code>-styled tags; each can be removed
				individually or all at once with the × button.
			</p>
			{#if macView === 'preview'}
				<FC class="gap-4 max-w-sm">
					<MultiAutoComplete label="Fruits" items={fruits} bind:values={macValues} placeholder="Search…" />
					<p class="text-sm">selected: [{macValues.join(', ')}]</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { MultiAutoComplete } from 'visit-ui';

  const fruits = [
    { id: '1', display: 'Apple' },
    { id: '2', display: 'Banana' },
  ];

  let values = $state<string[]>([]);
</` + `script>

<MultiAutoComplete label="Fruits" {items} bind:values placeholder="Search…" />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>