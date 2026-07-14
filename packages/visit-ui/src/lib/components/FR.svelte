<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';

	type Props = { children: Snippet; class?: string };

	let { children, class: className = '' }: Props = $props();

	const styles = tv({
		base: 'flex flex-row w-full items-center gap-3'
	});
</script>

<div class={styles({ class: className })}>
	{@render children()}
</div>
