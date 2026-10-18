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
				<li><Code>ok</Code> — check circle, <Code>color-success</Code></li>
				<li><Code>error</Code> — alert circle, <Code>color-error</Code></li>
				<li><Code>warn</Code> — alert circle, <Code>color-warning</Code></li>
				<li><Code>info</Code> — information circle, <Code>color-info</Code></li>
			</ul>
			<p>
				The <Code>text</Code> prop supports newlines (<Code>\n</Code>) via
				<Code>whitespace-pre-line</Code>. A <Code>children</Code> snippet can add extra content after
				the text. <Code>text</Code> also accepts <Code>"#text_id"</Code> for a localized text.
				<Code>iconSize</Code> sets the icon size (default <Code>2rem</Code>).
			</p>
			{#if view === 'preview'}
				<FC class="gap-3">
					<Alert type="ok" text="Operation completed successfully." />
					<Alert type="error" text="Something went wrong. Please try again." />
					<Alert type="warn" text="This action cannot be undone." />
					<Alert type="info" text="New version available." iconSize="1.25rem" />
					<Alert type="info" text="#demo.greeting" />
				</FC>
			{:else}
				<CodeBlock
code={`<Alert type="ok"    text="Operation completed successfully." />
<Alert type="error" text="Something went wrong. Please try again." />
<Alert type="warn"  text="This action cannot be undone." />
<Alert type="info"  text="New version available." iconSize="1.25rem" />
<Alert type="info"  text="#demo.greeting" />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>