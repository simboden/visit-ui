<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';
	import { appShell } from '../stores/app.svelte.js';
	import FS from './FS.svelte';

	type Props = {
		brand?: Snippet;
		center?: Snippet;
		end?: Snippet;
	};

	let {
		brand,
		center,
		end
	}: Props = $props();

	const styles = tv({
		base: 'sticky top-0 z-50 flex min-h-[61px] items-center gap-4 border-b border-(--color-card-border) bg-navbar p-2 text-text backdrop-blur-md'
	});

	let navEl: HTMLElement | undefined = $state();

	$effect(() => {
		if (!navEl) return;
		const observer = new ResizeObserver(([entry]) => {
			appShell.navbarHeight = `${entry.target.getBoundingClientRect().height}px`;
		});
		observer.observe(navEl);
		return () => observer.disconnect();
	});
</script>

<nav bind:this={navEl} class={styles()}>
	<button
		type="button"
		onclick={() => appShell.toggleLeft()}
		aria-label="Toggle sidebar"
		class="flex shrink-0 cursor-pointer items-center justify-center rounded p-1 hover:scale-110 transition-transform"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
		</svg>
	</button>

	<FS>
		{#if brand}
			<div class="flex shrink-0 items-center gap-3">
				{@render brand()}
			</div>
		{/if}

		{#if center}
			<div class="hidden grow items-center justify-center gap-3 lg:flex">
				{@render center()}
			</div>
		{:else}
			<!-- <div class="grow"></div> -->
		{/if}

		{#if end}
			<div class="flex shrink-0 items-center gap-3">
				{@render end()}
			</div>
		{/if}
	</FS>	

</nav>
