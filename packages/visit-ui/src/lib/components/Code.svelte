<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & Omit<HTMLAttributes<HTMLElement>, 'class'>;

	let { children, class: className = '', ...restProps }: Props = $props();
</script>

<code class="text-code bg-code-bg rounded-lg p-1 font-mono text-sm {className}" {...restProps}>
	{@render children()}
</code>
