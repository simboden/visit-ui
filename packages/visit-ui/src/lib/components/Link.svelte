<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { resolveHref } from '../utils/routeHref.js';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		href?: string;
		onclick?: () => void;
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText); alternativa a children
		label?: string;
		children?: Snippet;
		class?: string;
	} & Omit<HTMLAnchorAttributes, 'href' | 'onclick' | 'class'>;

	let { href, onclick, label, children, class: className = '', ...restProps }: Props = $props();
	const resolvedHref = $derived(resolveHref(href));

	const base = 'text-link font-medium no-underline hover:underline transition-all duration-200';
</script>

{#snippet content()}
	{#if label}<LocOrText value={label} />{:else}{@render children?.()}{/if}
{/snippet}

{#if href}
	<a href={resolvedHref} class="{base} {className}" {...restProps}>
		{@render content()}
	</a>
{:else}
	<button type="button" {onclick} class="{base} {className}">
		{@render content()}
	</button>
{/if}
