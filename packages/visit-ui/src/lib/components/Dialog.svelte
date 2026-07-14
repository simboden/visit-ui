<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { mdiClose } from '@mdi/js';
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		open?: boolean;
		title?: string;
		description?: string;
		showClose?: boolean;
		draggable?: boolean;
		showOverlay?: boolean;
		onOpenAutoFocus?: (event: Event) => void;
		children: Snippet;
		class?: string;
	};

	let {
		open = $bindable(false),
		title = '',
		description = '',
		showClose = true,
		draggable = false,
		showOverlay = true,
		onOpenAutoFocus,
		children,
		class: className = ''
	}: Props = $props();

	const contentBase = [
		'fixed z-50',
		'min-w-[20rem] max-w-[90vw] max-h-[90vh] overflow-y-auto',
		'bg-dialog text-text rounded-lg',
		'border-[length:var(--card-border-sz)] border-card-border',
		'p-[length:var(--pad)]'
	].join(' ');

	const shadowClass = $derived(showOverlay ? 'shadow-2xl' : 'shadow-[0_0_40px_rgba(0,0,0,0.6)]');

	const centeredClass = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';

	let contentRef: HTMLElement | null = $state(null);
	let posX = $state(0);
	let posY = $state(0);
	let dragged = $state(false);
	let dragOX = 0;
	let dragOY = 0;

	function onDragStart(e: MouseEvent) {
		if (!contentRef) return;
		const rect = contentRef.getBoundingClientRect();
		if (!dragged) {
			posX = rect.left;
			posY = rect.top;
			dragged = true;
		}
		dragOX = e.clientX - posX;
		dragOY = e.clientY - posY;
		window.addEventListener('mousemove', onDragMove);
		window.addEventListener('mouseup', onDragEnd);
		e.preventDefault();
	}

	function onDragMove(e: MouseEvent) {
		if (!contentRef) return;
		const rect = contentRef.getBoundingClientRect();
		posX = Math.max(0, Math.min(e.clientX - dragOX, window.innerWidth - rect.width));
		posY = Math.max(0, Math.min(e.clientY - dragOY, window.innerHeight - rect.height));
	}

	function onDragEnd() {
		window.removeEventListener('mousemove', onDragMove);
		window.removeEventListener('mouseup', onDragEnd);
	}

	$effect(() => {
		if (!open) dragged = false;
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		{#if showOverlay}
			<Dialog.Overlay class="fixed inset-0 z-50 bg-overlay" />
		{/if}
		<Dialog.Content
			bind:ref={contentRef}
			class="{contentBase} {shadowClass} {draggable && dragged ? '' : centeredClass} {className}"
			style={draggable && dragged ? `left:${posX}px; top:${posY}px;` : ''}
			{onOpenAutoFocus}
		>
			{#if title}
				<Dialog.Title
					class="text-xl font-bold tracking-tight text-head {draggable
						? 'cursor-grab active:cursor-grabbing select-none'
						: ''}"
					onmousedown={draggable ? onDragStart : undefined}
				>
					<LocOrText value={title} />
				</Dialog.Title>
			{/if}
			{#if description}
				<Dialog.Description class="text-text/70"><LocOrText value={description} /></Dialog.Description>
			{/if}
			<div class="mt-3">
                {@render children()}
            </div>
			{#if showClose}
				<Dialog.Close
					aria-label="Close dialog"
					class="absolute top-2 right-2 flex cursor-pointer items-center justify-center rounded p-1 hover:scale-110 transition-transform"
				>
					<Icon icon={mdiClose} class="h-5 w-5" />
				</Dialog.Close>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
