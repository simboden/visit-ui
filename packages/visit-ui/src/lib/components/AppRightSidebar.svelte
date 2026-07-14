<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';
	import { appShell, RIGHT_SIDEBAR_WIDTH } from '../stores/app.svelte.js';

	type Props = { children?: Snippet; class?: string };

	let { children, class: className = '' }: Props = $props();

	const styles = tv({
		base: 'fixed bottom-0 right-0 z-40 overflow-y-auto border-l border-(--color-card-border) bg-card p-2 text-text transition-transform duration-200 ease-in-out',
		variants: {
			open: {
				true: 'translate-x-0',
				false: 'translate-x-full'
			}
		}
	});
</script>

<aside
	class={styles({ open: appShell.rightOpen, class: className })}
	style="top: {appShell.navbarHeight}; width: {RIGHT_SIDEBAR_WIDTH};"
	aria-label="Right sidebar"
>
	{@render children?.()}
</aside>
