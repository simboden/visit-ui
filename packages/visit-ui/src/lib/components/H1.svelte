<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText); alternativa a children
		label?: string;
		children?: Snippet;
		class?: string;
	} & Omit<HTMLAttributes<HTMLHeadingElement>, 'class'>;

	let { label, children, class: className = '', ...restProps }: Props = $props();
</script>

<h1 class={twMerge('text-head text-3xl font-extrabold tracking-tight', className)} {...restProps}>
	{#if label}<LocOrText value={label} />{:else}{@render children?.()}{/if}
</h1>
