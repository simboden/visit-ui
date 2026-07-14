<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { mdiChevronDown } from '@mdi/js';
	import { Icon, Label, LabelError } from './index.js';

	export type SelectItem = string | number | { value: string | number; name: string };

	type Props = {
		items?: SelectItem[];
		value?: string | number | null;
		placeholder?: string;
		label?: string;
		error?: string;
		disabled?: boolean;
		class?: string;
		onchange?: (e: Event) => void;
	} & Omit<HTMLSelectAttributes, 'value' | 'disabled' | 'class' | 'onchange'>;

	let {
		items = [],
		value = $bindable(null),
		placeholder = 'Select...',
		label = '',
		error = '',
		disabled = false,
		class: className = '',
		onchange,
		...restProps
	}: Props = $props();

	const id = $props.id();

	const selectItems = $derived(
		items.map((item) =>
			typeof item === 'object' && item !== null
				? { value: item.value, name: item.name }
				: { value: item, name: String(item) }
		)
	);

	const stringValue = $derived(value == null ? '' : String(value));

	function handleChange(e: Event) {
		const newValue = (e.currentTarget as HTMLSelectElement).value;
		if (newValue === '') {
			value = null;
		} else {
			const item = selectItems.find((i) => String(i.value) === newValue);
			value = item ? item.value : newValue;
		}
		onchange?.(e);
	}

	const base = [
		'w-full',
		'h-[2.625rem]',
		'rounded-lg',
		'p-2',
		'pr-10',
		'appearance-none',
		'bg-input',
		'text-base',
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
		<select
			{id}
			{disabled}
			onchange={handleChange}
			class={[base, stringValue === '' ? 'text-(--color-text)/50' : 'text-input-text'].join(' ')}
			{...restProps}
		>
			<option value="" disabled selected={stringValue === ''}>{placeholder}</option>
			{#each selectItems as item (item.value)}
				<option
					value={String(item.value)}
					class="text-input-text"
					selected={String(item.value) === stringValue}
				>
					{item.name}
				</option>
			{/each}
		</select>
		<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
			<div class="pr-2">
				<Icon icon={mdiChevronDown} />
			</div>
		</div>
	</div>
	{#if error}
		<LabelError>{error}</LabelError>
	{/if}
</div>
