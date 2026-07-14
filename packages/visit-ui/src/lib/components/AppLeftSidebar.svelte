<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';
	import { appShell, LEFT_SIDEBAR_WIDTH } from '../stores/app.svelte.js';

	type Props = { children?: Snippet; class?: string };

	let { children, class: className = '' }: Props = $props();

	const styles = tv({
		base: 'fixed bottom-0 left-0 z-40 overflow-y-auto border-r border-(--color-card-border) bg-card p-2 text-text transition-transform duration-200 ease-in-out',
		variants: {
			open: {
				true: 'translate-x-0',
				false: '-translate-x-full'
			}
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && appShell.leftOpen && !appShell.isLargeScreen) {
			appShell.toggleLeft();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if appShell.leftOpen && !appShell.isLargeScreen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-30 bg-body/60 backdrop-blur-sm"
		style="top: {appShell.navbarHeight};"
		onclick={() => appShell.toggleLeft()}
		role="presentation"
	></div>
{/if}

<aside
	class={styles({ open: appShell.leftOpen, class: className })}
	style="top: {appShell.navbarHeight}; width: {LEFT_SIDEBAR_WIDTH};"
	aria-label="Left sidebar"
>
	{@render children?.()}
</aside>
