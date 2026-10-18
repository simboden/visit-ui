<script lang="ts">
	import { mdiLock } from '@mdi/js';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import Icon from './Icon.svelte';
	import LocOrText from './LocOrText.svelte';
	import Spring from './Spring.svelte';

	type Props = {
		for?: string;
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText). Quando presente,
		// ha la precedenza su children.
		label?: string;
		// mostra un lucchetto a destra (campo non modificabile nel contesto corrente)
		lock?: boolean;
		children?: Snippet;
		class?: string;
	};

	let {
		for: htmlFor,
		label,
		lock = false,
		children,
		class: className = ''
	}: Props = $props();

	const base = ['text-lab', 'text-sm', 'font-medium', 'block', 'mb-1'].join(' ');
</script>

<label for={htmlFor} class={twMerge(base, lock && 'flex items-center', className)}>
	{#if label}<LocOrText value={label} />{:else}{@render children?.()}{/if}
	{#if lock}<Spring /><Icon icon={mdiLock} size="1rem" class="text-text/50" />{/if}
</label>
