<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button, Dialog, FR } from './index.js';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		open?: boolean;
		title?: string;
		text?: string;
		buttonLabel?: string;
		onclose?: () => void;
		children?: Snippet;
	};

	let {
		open = $bindable(false),
		title = '',
		text = '',
		buttonLabel = 'Close',
		onclose,
		children
	}: Props = $props();

	function close() {
		open = false;
		onclose?.();
	}
</script>

<Dialog bind:open {title} class="min-w-[20rem]" onOpenAutoFocus={(e) => e.preventDefault()}>
	{#if text}
		<p class="my-4"><LocOrText value={text} /></p>
	{/if}
	{@render children?.()}
	<FR class="justify-center mt-4">
		<Button onclick={close}><LocOrText value={buttonLabel} /></Button>
	</FR>
</Dialog>