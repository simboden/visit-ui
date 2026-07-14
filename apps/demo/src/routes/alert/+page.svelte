<script lang="ts">
	import { Alert, Card, Code, FC, FS, H2, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];
	let view = $state<string | number | null>('preview');
</script>

<Page title="Alert">
	<FC class="gap-8">
		<Card>
			<FS>
				<H2>Alert</H2>
				<Radio options={viewOptions} bind:value={view} class="mr-4" />
			</FS>
			<p>
				<Code>Alert</Code> displays a feedback banner with an icon and text. The <Code>type</Code>
				prop controls the icon and its color:
			</p>
			<ul>
				<li><Code>ok</Code> — green check circle</li>
				<li><Code>error</Code> — red alert circle</li>
				<li><Code>warn</Code> — yellow alert circle</li>
			</ul>
			<p>
				The <Code>text</Code> prop supports newlines (<Code>\n</Code>) via
				<Code>whitespace-pre-line</Code>. A <Code>children</Code> snippet can add extra content after
				the text.
			</p>
			{#if view === 'preview'}
				<FC class="gap-3">
					<Alert type="ok" text="Operation completed successfully." />
					<Alert type="error" text="Something went wrong. Please try again." />
					<Alert type="warn" text="This action cannot be undone." />
				</FC>
			{:else}
				<CodeBlock
code={`<Alert type="ok"    text="Operation completed successfully." />
<Alert type="error" text="Something went wrong. Please try again." />
<Alert type="warn"  text="This action cannot be undone." />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>