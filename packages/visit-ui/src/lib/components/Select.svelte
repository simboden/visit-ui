<script lang="ts">
	import { Select } from 'bits-ui';
	import { mdiCheck, mdiChevronDown } from '@mdi/js';
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
		onchange?: () => void;
	};

	let {
		items = [],
		value = $bindable(null),
		placeholder = 'Select...',
		label = '',
		error = '',
		disabled = false,
		class: className = '',
		onchange
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

	function handleValueChange(newValue: string) {
		if (newValue === '') {
			value = null;
		} else {
			const item = selectItems.find((i) => String(i.value) === newValue);
			value = item ? item.value : newValue;
		}
		onchange?.();
	}

	const triggerBase = [
		'group',
		'w-full',
		'h-[2.625rem]',
		'inline-flex',
		'items-center',
		'justify-between',
		'gap-2',
		'rounded-lg',
		'p-2',
		'bg-input',
		'text-base',
		'text-input-text',
		'text-left',
		'cursor-pointer',
		'hover:bg-input-hover',
		'border-input-border',
		'border-[length:var(--input-border-sz)]',
		'focus-visible:outline-solid',
		'focus-visible:outline-[length:var(--input-focus-sz)]',
		'focus-visible:outline-input-focus',
		'focus-visible:outline-offset-0',
		'focus-visible:border-input-focus!',
		'data-[state=open]:outline-solid',
		'data-[state=open]:outline-[length:var(--input-focus-sz)]',
		'data-[state=open]:outline-input-focus',
		'data-[state=open]:outline-offset-0',
		'data-[state=open]:border-input-focus!',
		'ring-0',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed'
	].join(' ');

	const contentBase = [
		'bg-input',
		'border-input-border',
		'border-[length:var(--input-border-sz)]',
		'rounded-lg',
		'shadow-lg',
		'z-50',
		'p-1',
		'max-h-60',
		'overflow-y-auto'
	].join(' ');

	const itemBase = [
		'flex',
		'items-center',
		'justify-between',
		'gap-2',
		'rounded',
		'px-2',
		'py-1.5',
		'text-base',
		'text-input-text',
		'cursor-pointer',
		'data-highlighted:bg-input-hover'
	].join(' ');
</script>

<div class={className}>
	{#if label}<Label for={id} {label} />{/if}
	<Select.Root
		type="single"
		value={stringValue}
		onValueChange={handleValueChange}
		{disabled}
		items={selectItems.map((item) => ({ value: String(item.value), label: item.name }))}
	>
		<Select.Trigger {id} class={triggerBase}>
			<Select.Value class="truncate" {placeholder}>
				{#snippet children({ selection, placeholder })}
					{#if selection.type === 'single' && selection.selected}
						{selection.selected.label}
					{:else}
						<span class="text-(--color-text)/50">{placeholder}</span>
					{/if}
				{/snippet}
			</Select.Value>
			<Icon
				icon={mdiChevronDown}
				class="shrink-0 transition-transform group-data-[state=open]:rotate-180"
			/>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content
				class={contentBase}
				sideOffset={4}
				style="min-width: var(--bits-select-anchor-width)"
			>
				<Select.Viewport>
					{#each selectItems as item (item.value)}
						<Select.Item value={String(item.value)} label={item.name} class={itemBase}>
							{#snippet children({ selected })}
								<span class="truncate">{item.name}</span>
								{#if selected}
									<Icon icon={mdiCheck} class="shrink-0 text-text" />
								{/if}
							{/snippet}
						</Select.Item>
					{/each}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
	{#if error}
		<LabelError>{error}</LabelError>
	{/if}
</div>
