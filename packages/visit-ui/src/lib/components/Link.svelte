<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		href?: string;
		onclick?: () => void;
		children: Snippet;
		class?: string;
	} & Omit<HTMLAnchorAttributes, 'href' | 'onclick' | 'class'>;

	let { href, onclick, children, class: className = '', ...restProps }: Props = $props();

	const base = 'text-pri font-medium no-underline hover:underline transition-all duration-200';
</script>

{#if href}
	<a {href} class="{base} {className}" {...restProps}>
		{@render children()}
	</a>
{:else}
	<button type="button" {onclick} class="{base} {className}">
		{@render children()}
	</button>
{/if}
