<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';
	import { page } from '$app/state';
	import H1 from './H1.svelte';
	import Link from './Link.svelte';

	type Props = {
		children?: Snippet;
		title?: string;
		breadcrumb?: boolean;
		fullWidth?: boolean;
		class?: string;
	};

	let {
		children,
		title,
		breadcrumb = false,
		fullWidth = false,
		class: className = ''
	}: Props = $props();

	const styles = tv({
		base: 'min-h-full p-8',
		variants: {
			fullWidth: {
				true: 'w-full',
				false: 'mx-auto w-full max-w-7xl'
			}
		}
	});

	function capitalize(segment: string) {
		return segment.charAt(0).toUpperCase() + segment.slice(1);
	}

	const segments = $derived(page.url.pathname.split('/').filter(Boolean));
</script>

<div class="{styles({ fullWidth, class: className })}">
	{#if breadcrumb}
		<div class="flex gap-2 mb-2">
			<Link href="/">Home</Link>
			{#each segments as segment, i (i)}
				<span>/</span>
				{#if i === segments.length - 1}
					<span>{capitalize(segment)}</span>
				{:else}
					<Link href="/{segments.slice(0, i + 1).join('/')}">{capitalize(segment)}</Link>
				{/if}
			{/each}
		</div>
	{/if}
	{#if title}
		<H1 class="mb-8">{title}</H1>
	{/if}
	{@render children?.()}
</div>
