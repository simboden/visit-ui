<script lang="ts">
	import type { Snippet } from 'svelte';
	import { appShell, LARGE_SCREEN_BREAKPOINT, LEFT_SIDEBAR_WIDTH, RIGHT_SIDEBAR_WIDTH } from '../stores/app.svelte.js';
	import TooltipProvider from './TooltipProvider.svelte';

	type Props = {
		navbar?: Snippet;
		leftSidebar?: Snippet;
		rightSidebar?: Snippet;
		children?: Snippet;
	};

	let {
		navbar,
		leftSidebar,
		rightSidebar,
		children
	}: Props = $props();

	let innerWidth = $state(0);
	let prevLargeScreen: boolean | null = null;

	$effect(() => {
		const large = innerWidth >= LARGE_SCREEN_BREAKPOINT;
		appShell.isLargeScreen = large;
		if (prevLargeScreen === null || large !== prevLargeScreen) {
			appShell.leftOpen = large;
		}
		prevLargeScreen = large;
	});

	let marginLeft = $derived(appShell.leftOpen && appShell.isLargeScreen ? LEFT_SIDEBAR_WIDTH : '0');
	let marginRight = $derived(appShell.rightOpen ? RIGHT_SIDEBAR_WIDTH : '0');
</script>

<svelte:window bind:innerWidth />

<TooltipProvider>
	<div class="relative h-dvh overflow-hidden bg-body text-text">
		{#if navbar}
			<div class="absolute inset-x-0 top-0 z-50">
				{@render navbar()}
			</div>
		{/if}

		<div class="relative flex h-full overflow-hidden">
			{#if leftSidebar}
				{@render leftSidebar()}
			{/if}
			{#if rightSidebar}
				{@render rightSidebar()}
			{/if}

			<main
				class="grow overflow-y-auto transition-[margin] duration-200 ease-in-out"
				style="margin-left: {marginLeft}; margin-right: {marginRight}; padding-top: {appShell.navbarHeight};"
			>
				{@render children?.()}
			</main>
		</div>
	</div>
</TooltipProvider>
