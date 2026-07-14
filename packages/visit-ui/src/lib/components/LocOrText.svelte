<script lang="ts">
	import LocText from './LocText.svelte';

	// value che inizia con "#" e' un text_id da risolvere via LocText, altrimenti e' testo letterale.
	// Centralizza la convenzione usata da Label, Radio, Confirm, MessageBox.
	type Props = { value?: string };

	let { value = '' }: Props = $props();
</script>

{#if value.startsWith('#')}
	<LocText text_id={value.slice(1)} />
{:else}
	{value}
{/if}
