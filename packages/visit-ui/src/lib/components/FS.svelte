<script lang="ts">
	// FS (Flex Space-between): a full-width flex row that pushes children to opposite ends.
	// Like FR but with justify-between instead of justify-start.
	//
	// gap: CSS length string, e.g. "1rem" or "8px". Uses inline style to avoid
	//      Tailwind JIT purging of dynamically constructed class names like gap-{n}.
	//
	// Usage: <FS><span>Left</span><span>Right</span></FS>
	//        <FS gap="0.5rem"><Button>A</Button><Button>B</Button></FS>
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		gap?: string;
		class?: string;
	};

	let {
		children,
		gap = '1rem',
		class: className = ''
	}: Props = $props();
</script>

<div class="flex flex-row w-full items-center justify-between {className}" style="gap: {gap}">
	{@render children()}
</div>