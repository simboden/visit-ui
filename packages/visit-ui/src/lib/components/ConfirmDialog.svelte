<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button, Dialog, FR } from './index.js';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		open?: boolean;
		title?: string;
		text?: string;
		okLabel?: string;
		cancelLabel?: string;
		onconfirm: (result: boolean) => void;
		children?: Snippet;
	};

	let {
		open = $bindable(false),
		title = '',
		text = '',
		okLabel = 'ok',
		cancelLabel = 'cancel',
		onconfirm,
		children
	}: Props = $props();

	function handle(result: boolean) {
		open = false;
		onconfirm(result);
	}
</script>

<Dialog bind:open {title} class="min-w-[20rem]" onOpenAutoFocus={(e) => e.preventDefault()}>
	{#if text}
		<p class="my-6"><LocOrText value={text} /></p>
	{/if}
	{@render children?.()}
	<FR class="justify-center gap-2">
		<Button class="w-24" onclick={() => handle(true)}><LocOrText value={okLabel} /></Button>
		<Button class="w-24" color="secondary" onclick={() => handle(false)}><LocOrText value={cancelLabel} /></Button>
	</FR>
</Dialog>
