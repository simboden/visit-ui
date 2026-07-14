<script lang="ts">
	import type { Snippet } from 'svelte';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		for?: string;
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText). Quando presente,
		// ha la precedenza su children.
		label?: string;
		children?: Snippet;
		class?: string;
	};

	let {
		for: htmlFor,
		label,
		children,
		class: className = ''
	}: Props = $props();

	const base = ['text-lab', 'text-sm', 'font-medium', 'block', 'mb-1'].join(' ');
</script>

<label for={htmlFor} class={[base, className].join(' ')}>
	{#if label}<LocOrText value={label} />{:else}{@render children?.()}{/if}
</label>
