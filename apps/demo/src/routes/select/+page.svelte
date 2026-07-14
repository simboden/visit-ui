<script lang="ts">
	import { Card, Code, FC, FieldSelect, FR, FS, H2, Page, Radio, Select, SelectNative } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	const fruitNames = ['Apple', 'Pear', 'Banana'];
	const fruitObjects = [
		{ value: 1, name: 'Apple' },
		{ value: 2, name: 'Pear' },
		{ value: 3, name: 'Banana' }
	];

	// Select
	let selectView = $state<string | number | null>('preview');
	let selectValue1 = $state<string | null>(null);
	let selectValue2 = $state<string | number | null>(null);
	let selectError = $state<string | null>(null);

	// SelectNative
	let selectNativeView = $state<string | number | null>('preview');
	let selectValueNative = $state<string | number | null>(null);

	// FieldSelect
	let fieldSelectView = $state<string | number | null>('preview');
	let fieldSelectValue = $state<string | number | null>(null);
	let fieldSelectValid = $state(false);
	let fieldSelectError = $state('');

	const statusClass = 'text-sm';
</script>

<Page title="Select">
	<FC class="gap-8">

		<!----- SELECT ----------------->

		<Card>
			<FS>
				<H2>Select</H2>
				<Radio options={viewOptions} bind:value={selectView} class="mr-4" />
			</FS>
			<p>parameters:</p>
			<ul>
				<li><Code>items</Code>: array of strings, numbers, or <Code>&#123; value, name &#125;</Code> objects.</li>
				<li><Code>value</Code>: bindable, the selected value.</li>
				<li><Code>label</Code>, <Code>placeholder</Code>, <Code>error</Code>, <Code>disabled</Code>.</li>
			</ul>
			{#if selectView === 'preview'}
				<FR class="flex-wrap items-start gap-4">
					<Select label="String items" items={fruitNames} bind:value={selectValue1} class="w-64" />
					<Select label="Object items" items={fruitObjects} bind:value={selectValue2} class="w-64" />
					<Select
						label="With error"
						items={fruitNames}
						bind:value={selectError}
						error="Selection required"
						class="w-64"
					/>
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Select } from 'visit-ui';

  const fruitNames = ['Apple', 'Pear', 'Banana'];
  const fruitObjects = [
    { value: 1, name: 'Apple' },
    { value: 2, name: 'Pear' },
    { value: 3, name: 'Banana' }
  ];

  let selectValue1 = $state<string | null>(null);
  let selectValue2 = $state<string | number | null>(null);
  let selectError = $state<string | null>(null);
</` + `script>

<Select label="String items" items={fruitNames} bind:value={selectValue1} />
<Select label="Object items" items={fruitObjects} bind:value={selectValue2} />
<Select label="With error" items={fruitNames} bind:value={selectError} error="Selection required" />`}
				/>
			{/if}
		</Card>

		<!----- SELECT NATIVE ----------------->

		<Card>
			<FS>
				<H2>SelectNative</H2>
				<Radio options={viewOptions} bind:value={selectNativeView} class="mr-4" />
			</FS>
			<p>
				A <Code>&lt;select&gt;</Code> built on the native HTML element, styled to match
				<Code>Select</Code>. Same parameters.
			</p>
			{#if selectNativeView === 'preview'}
				<FR class="flex-wrap items-start gap-4">
					<SelectNative label="Native" items={fruitObjects} bind:value={selectValueNative} class="w-64" />
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { SelectNative } from 'visit-ui';

  const fruitObjects = [
    { value: 1, name: 'Apple' },
    { value: 2, name: 'Pear' },
    { value: 3, name: 'Banana' }
  ];

  let selectValueNative = $state<string | number | null>(null);
</` + `script>

<SelectNative label="Native" items={fruitObjects} bind:value={selectValueNative} />`}
				/>
			{/if}
		</Card>

		<!----- FIELD SELECT ----------------->

		<Card>
			<FS>
				<H2>FieldSelect</H2>
				<Radio options={viewOptions} bind:value={fieldSelectView} class="mr-4" />
			</FS>
			<p>
				A <Code>Select</Code> with <Code>required</Code> validation and a bindable
				<Code>valid</Code>/<Code>error</Code>.
			</p>
			{#if fieldSelectView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldSelect
						label="Fruit"
						items={['Apple', 'Pear', 'Banana']}
						bind:value={fieldSelectValue}
						bind:valid={fieldSelectValid}
						bind:error={fieldSelectError}
					/>
					<p class={statusClass}>valid: {fieldSelectValid} error: "{fieldSelectError}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldSelect } from 'visit-ui';

  let value = $state<string | number | null>(null);
  let valid = $state(false);
  let error = $state('');
</` + `script>

<FieldSelect label="Fruit" items={['Apple', 'Pear', 'Banana']} bind:value bind:valid bind:error />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
