<script lang="ts">
	import { Card, Code, FC, FieldTextArea, FR, FS, H2, Link, Page, Radio, TextArea } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	// TextArea
	let textareaView = $state<string | number | null>('preview');
	let textareaValue = $state('');
	let textareaError = $state('');
	let textareaAutosizeValue = $state('');

	// FieldTextArea
	let fieldTextAreaView = $state<string | number | null>('preview');
	let fieldTextAreaValue = $state('');
	let fieldTextAreaValid = $state(false);
	let fieldTextAreaError = $state('');

	const statusClass = 'text-sm';
</script>

<Page title="TextArea">
	<FC class="gap-8">

		<!----- TEXTAREA ----------------->

		<Card>
			<FS>
				<H2>TextArea</H2>
				<Radio options={viewOptions} bind:value={textareaView} class="mr-4" />
			</FS>
			<p>parameters:</p>
			<ul>
				<li><Code>value</Code>: bindable, the textarea's value.</li>
				<li>
					<Code>label</Code>: optional label shown above the textarea. Accepts a literal string, or a
					<Code>"#text_id"</Code> to resolve a translation (see <Link href="/language">Language</Link>).
				</li>
				<li><Code>rows</Code>, <Code>placeholder</Code>, <Code>error</Code>, <Code>disabled</Code>.</li>
				<li><Code>autosize</Code>: when true, the textarea grows and shrinks to fit its content.</li>
			</ul>
			{#if textareaView === 'preview'}
				<FR class="flex-wrap items-start gap-4">
					<TextArea label="Default" placeholder="Type something..." bind:value={textareaValue} class="w-80" />
					<TextArea label="With error" bind:value={textareaError} error="value required" class="w-80" />
					<TextArea label="Disabled" value="Not editable" disabled class="w-80" />
					<TextArea label="Autosize" placeholder="Type something..." autosize bind:value={textareaAutosizeValue} class="w-80" />
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { TextArea } from 'visit-ui';

  let textareaValue = $state('');
  let textareaError = $state('');
  let textareaAutosizeValue = $state('');
</` + `script>

<TextArea label="Default" placeholder="Type something..." bind:value={textareaValue} />
<TextArea label="With error" bind:value={textareaError} error="value required" />
<TextArea label="Disabled" value="Not editable" disabled />
<TextArea label="Autosize" placeholder="Type something..." autosize bind:value={textareaAutosizeValue} />`}
				/>
			{/if}
		</Card>

		<!----- FIELD TEXTAREA ----------------->

		<Card>
			<FS>
				<H2>FieldTextArea</H2>
				<Radio options={viewOptions} bind:value={fieldTextAreaView} class="mr-4" />
			</FS>
			<p>
				A <Code>TextArea</Code> with <Code>required</Code>, <Code>minLength</Code> and
				<Code>maxLength</Code> validation and a bindable <Code>valid</Code>/<Code>error</Code>.
			</p>
			{#if fieldTextAreaView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldTextArea
						label="Description"
						required
						minLength={10}
						maxLength={200}
						bind:value={fieldTextAreaValue}
						bind:valid={fieldTextAreaValid}
						bind:error={fieldTextAreaError}
					/>
					<p class={statusClass}>valid: {fieldTextAreaValid} error: "{fieldTextAreaError}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldTextArea } from 'visit-ui';

  let value = $state('');
  let valid = $state(false);
  let error = $state('');
</` + `script>

<FieldTextArea label="Description" required minLength={10} maxLength={200} bind:value bind:valid bind:error />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
