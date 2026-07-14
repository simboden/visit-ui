<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & Omit<HTMLAttributes<HTMLHeadingElement>, 'class'>;

	let { children, class: className = '', ...restProps }: Props = $props();
</script>

<h4 class="text-head text-lg font-medium {className}" {...restProps}>
	{@render children()}
</h4>
