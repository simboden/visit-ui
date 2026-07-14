<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { toast } from '../stores/toast.svelte.js';
	import Toast from './Toast.svelte';
	import TooltipProvider from './TooltipProvider.svelte';
</script>

<TooltipProvider>
	<div
		class="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
	>
		{#each toast.items as item (item.id)}
			<div
				class="pointer-events-auto"
				role="group"
				in:fly={{ y: -300, duration: 400 }}
				out:fade={{ duration: 150 }}
				onmouseenter={() => toast.pause(item.id)}
				onmouseleave={() => toast.resume(item.id)}
			>
				<Toast {...item} onClose={() => toast.dismiss(item.id)} />
			</div>
		{/each}
	</div>
</TooltipProvider>
