<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Label from './Label.svelte';
	import LabelError from './LabelError.svelte';

	type Props = {
		value?: string | number;
		error?: string;
		type?: string;
		placeholder?: string;
		label?: string;
		disabled?: boolean;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		pattern?: string;
		class?: string;
		right?: Snippet;
	} & Omit<
		HTMLInputAttributes,
		'value' | 'type' | 'placeholder' | 'disabled' | 'autocomplete' | 'pattern' | 'class'
	>;

	let {
		value = $bindable(''),
		error = '',
		type = 'text',
		placeholder = '',
		label = '',
		disabled = false,
		autocomplete,
		pattern,
		class: className = '',
		right,
		...restProps
	}: Props = $props();

	const id = $props.id();

	function onwheel(e: WheelEvent & { currentTarget: HTMLInputElement }) {
		if (type !== 'number' || document.activeElement !== e.currentTarget) return;
		e.preventDefault();
		if (e.deltaY < 0) e.currentTarget.stepUp();
		else e.currentTarget.stepDown();
		e.currentTarget.dispatchEvent(new Event('input', { bubbles: true }));
	}

	const base = [
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
		'disabled:cursor-not-allowed'
	].join(' ');
</script>

<div class={className}>
	{#if label}<Label for={id} {label} />{/if}
	<div class="relative">
		<input
			{id}
			{type}
			{placeholder}
			{disabled}
			{autocomplete}
			{pattern}
			bind:value
			class={[
				base,
				right && 'pr-10',
				type === 'number' &&
					'[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
			]
				.filter(Boolean)
				.join(' ')}
			{...restProps}
			{onwheel}
		/>
		{#if right}
			<div class="absolute inset-y-0 right-0 flex items-center pr-2">
				{@render right()}
			</div>
		{/if}
	</div>
	{#if error}
		<LabelError>{error}</LabelError>
	{/if}
</div>
