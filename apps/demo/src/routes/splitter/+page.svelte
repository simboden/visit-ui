<script lang="ts">
	import { Button, Check, Code, FC, H1, Splitter } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	let direction = $state<'h' | 'v'>('v');
	let showRotate = $state(false);

	const code = $derived(`<script lang="ts">
  import { Splitter } from 'visit-ui';
<` + `/script>

<Splitter
  direction="${direction}"
  first_min_size={200}
  second_min_size={300}
>
  {#snippet first()}
    <!-- ${direction === 'v' ? 'left' : 'top'} panel content -->
  {/snippet}
  {#snippet second()}
    <!-- ${direction === 'v' ? 'right' : 'bottom'} panel content -->
  {/snippet}
</Splitter>`);
</script>

<Splitter bind:direction {showRotate} first_min_size={280} second_min_size={320}>
	{#snippet first()}
		<FC class="p-6 gap-4 overflow-y-auto h-full">
			<H1>Splitter</H1>
			<p>
				<Code>Splitter</Code> divides the page area into two resizable panels separated by a draggable
				handle. It occupies the full viewport height minus the navbar height, retrieved from <Code>appShell.navbarHeight</Code>.
                Only one <Code>Splitter</Code> per page is supported.
                Panel sizes are persisted to <Code>localStorage</Code> and restored on next load.
			</p>
			<ul>
				<li><Code>direction="v"</Code> — vertical split (first left, second right). Default.</li>
				<li><Code>direction="h"</Code> — horizontal split (first top, second bottom).</li>
				<li><Code>first_min_size</Code> / <Code>second_min_size</Code> — minimum panel sizes in px.</li>
				<li><Code>showRotate</Code> — shows a rotate button on the handle to toggle direction. Default <Code>false</Code>.</li>
			</ul>
			<Button onclick={() => (direction = direction === 'v' ? 'h' : 'v')}>Toggle direction</Button>
			<Check bind:value={showRotate} label="Show rotate button" />
		</FC>
	{/snippet}
	{#snippet second()}
		<div class="p-4 overflow-auto h-full">
			<CodeBlock {code} />
		</div>
	{/snippet}
</Splitter>
