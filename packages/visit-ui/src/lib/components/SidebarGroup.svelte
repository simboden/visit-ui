<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		border?: boolean;
		class?: string;
	};

	let { children, border = false, class: className = '' }: Props = $props();
</script>

<ul class="{border ? 'mt-3 border-t border-card-border pt-3' : ''} {className}">
	{@render children()}
</ul>
