<script lang="ts">
	import { mdiAlertCircle, mdiAlertOutline, mdiCheckCircle, mdiClose, mdiInformation } from '@mdi/js';
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import LocOrText from './LocOrText.svelte';
	import type { ToastColor } from '../stores/toast.svelte.js';

	type Props = {
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		title?: string;
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		description?: string;
		color?: ToastColor;
		icon?: string | false;
		onClose?: () => void;
		children?: Snippet;
		class?: string;
	};

	let {
		title,
		description,
		color = 'info',
		icon,
		onClose,
		children,
		class: className = ''
	}: Props = $props();

	const defaultIcons: Record<ToastColor, string> = {
		success: mdiCheckCircle,
		warning: mdiAlertOutline,
		error: mdiAlertCircle,
		info: mdiInformation
	};

	const resolvedIcon = $derived(icon === false ? null : (icon ?? defaultIcons[color]));

	const containerStyles = tv({
		base: [
			'flex',
			'w-100',
			'items-start',
			'gap-3',
			'text-text',
			'text-lg',
			'font-semibold',
			'rounded-lg',
			'border-[length:var(--input-focus-sz)]',
			'p-[length:var(--pad)]',
			'shadow-lg'
		].join(' '),
		variants: {
			color: {
				info: ['bg-info', 'border-info'].join(' '),
				success: ['bg-success', 'border-success'].join(' '),
				warning: ['bg-warning', 'border-warning'].join(' '),
				error: ['bg-error', 'border-error'].join(' ')
			} satisfies Record<ToastColor, string>
		}
	});
</script>

<div class={containerStyles({ color, class: className })} role="status">
	{#if resolvedIcon}
		<Icon icon={resolvedIcon} size="1.5rem" class="shrink-0" />
	{/if}
	<div class="flex grow flex-col gap-0.5">
		{#if title}
			<div class="text-xl font-bold leading-tight"><LocOrText value={title} /></div>
		{/if}
		{#if description}
			<div class="opacity-70"><LocOrText value={description} /></div>
		{/if}
		{@render children?.()}
	</div>
	{#if onClose}
		<Button
			variant="ghost"
			color="secondary"
			size="small"
			class="-mt-1 -mr-1 !p-1"
			title="Close"
			onclick={onClose}
		>
			<Icon icon={mdiClose} size="1.1rem" />
		</Button>
	{/if}
</div>
