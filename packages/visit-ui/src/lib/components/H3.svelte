<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & Omit<HTMLAttributes<HTMLHeadingElement>, 'class'>;

	let { children, class: className = '', ...restProps }: Props = $props();
</script>

<h3 class="text-head text-xl font-bold tracking-tight {className}" {...restProps}>
	{@render children()}
</h3>
