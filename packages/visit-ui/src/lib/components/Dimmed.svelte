<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & Omit<HTMLAttributes<HTMLParagraphElement>, 'class'>;

	let { children, class: className = '', ...restProps }: Props = $props();
</script>

<p class="text-text/50 {className}" {...restProps}>
	{@render children()}
</p>
