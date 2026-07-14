<script lang="ts">
	import { appShell, Icon } from 'visit-ui';

	let { text = '', icon }: { text?: string; icon?: string } = $props();
</script>

<button
	type="button"
	onclick={() => appShell.toggleRight()}
	class="cursor-pointer rounded px-2 py-1 hover:scale-110 transition-transform flex items-center gap-2"
>
	{#if icon}
		<Icon {icon} />
	{/if}
	{text}
</button>
