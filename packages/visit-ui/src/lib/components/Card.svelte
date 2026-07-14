<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import FC from './FC.svelte';

	type Props = {
		children: Snippet;
		class?: string;
		fc_class?: string;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'class'>;

	let { children, class: className = '', fc_class = '', ...restProps }: Props = $props();

	const base = [
		'bg-card',
		'border-[length:var(--card-border-sz)]',
		'border-card-border',
		'rounded-lg',
		'p-[length:var(--pad)]'
	].join(' ');
</script>

<div class="{base} {className}" {...restProps}>
	<FC class={fc_class}>
		{@render children()}
	</FC>
</div>
