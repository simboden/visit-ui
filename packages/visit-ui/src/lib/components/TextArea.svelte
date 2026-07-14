<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import Label from './Label.svelte';
	import LabelError from './LabelError.svelte';

	type Props = {
		value?: string;
		label?: string;
		rows?: number;
		autosize?: boolean;
		placeholder?: string;
		disabled?: boolean;
		error?: string;
		class?: string;
	} & Omit<HTMLTextareaAttributes, 'value' | 'rows' | 'placeholder' | 'disabled' | 'class'>;

	let {
		value = $bindable(''),
		label = '',
		rows = 4,
		autosize = false,
		placeholder = '',
		disabled = false,
		error = '',
		class: className = '',
		...restProps
	}: Props = $props();

	const id = $props.id();

	let textareaEl: HTMLTextAreaElement | undefined = $state();

	function resize() {
		if (!textareaEl) return;
		textareaEl.style.height = 'auto';
		textareaEl.style.height = `${textareaEl.scrollHeight}px`;
	}

	$effect(() => {
		if (!autosize) return;
		value;
		resize();
	});

	const base = [
		'block',
		'w-full',
		'rounded-lg',
		'p-2',
		'bg-input',
		'text-base',
		'text-input-text',
		'placeholder-(--color-text)/50',
		'hover:bg-input-hover',
		'border-input-border',
		'border-[length:var(--input-border-sz)]',
		'focus:outline-solid',
		'focus:outline-[length:var(--input-focus-sz)]',
		'focus:outline-input-focus',
		'focus:outline-offset-0',
		'ring-0',
		'focus:border-input-focus!',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
		'resize-none'
	].join(' ');
</script>

<div class={className}>
	{#if label}<Label for={id} {label} />{/if}
	<textarea
		{id}
		{rows}
		{placeholder}
		{disabled}
		bind:value
		bind:this={textareaEl}
		class={[base, autosize && 'overflow-hidden'].filter(Boolean).join(' ')}
		{...restProps}
	></textarea>
	{#if error}
		<LabelError>{error}</LabelError>
	{/if}
</div>
