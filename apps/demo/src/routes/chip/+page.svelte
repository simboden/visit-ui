<script lang="ts">
	import { Card, Chip, Code, FC, FR, FS, H2, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];
	let view = $state<string | number | null>('preview');
</script>

<Page title="Chip">
	<FC class="gap-8">
		<Card>
			<FS>
				<H2>Chip</H2>
				<Radio options={viewOptions} bind:value={view} class="mr-4" />
			</FS>
			<p>
				<Code>Chip</Code> is a small clickable tag styled with the <Code>color-chip</Code> theme
				variable. A <Code>color</Code> prop overrides the background color. When a <Code>title</Code>
				is provided, a <Code>Tooltip</Code> is shown on hover.
			</p>
			{#if view === 'preview'}
				<FR class="flex-wrap gap-2">
					<Chip text="Default" />
					<Chip text="Clickable" onclick={() => alert('clicked!')} />
					<Chip text="Custom color" color="#7c3aed" />
					<Chip text="With tooltip" title="This is a tooltip" />
					<Chip text="42" />
				</FR>
			{:else}
				<CodeBlock
code={`<Chip text="Default" />
<Chip text="Clickable" onclick={() => alert('clicked!')} />
<Chip text="Custom color" color="#7c3aed" />
<Chip text="With tooltip" title="This is a tooltip" />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>