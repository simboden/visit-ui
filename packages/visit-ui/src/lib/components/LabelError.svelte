<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
	};

	let {
		children,
		class: className = ''
	}: Props = $props();

	const base = ['text-input-error', 'text-sm', 'font-medium', 'block', 'mt-1'].join(' ');
</script>

<div class={[base, className].join(' ')}>
	{@render children()}
</div>
