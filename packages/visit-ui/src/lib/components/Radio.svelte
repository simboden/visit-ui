<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import Label from './Label.svelte';
	import LocOrText from './LocOrText.svelte';

	export type RadioOption = string | number | { value: string | number; label: string };

	type Props = {
		options?: RadioOption[];
		value?: string | number | null;
		label?: string;
		orientation?: 'horizontal' | 'vertical';
		variant?: 'legacy' | 'underlined';
		disabled?: boolean;
		class?: string;
		onValueChange?: (value: string) => void;
	};

	let {
		options = [],
		value = $bindable(null),
		label = '',
		orientation = 'horizontal',
		variant = 'underlined',
		disabled = false,
		class: className = '',
		onValueChange
	}: Props = $props();

	const id = $props.id();

	const radioOptions = $derived(
		options.map((option) =>
			typeof option === 'object' && option !== null
				? { value: option.value, label: option.label }
				: { value: option, label: String(option) }
		)
	);

	const stringValue = $derived(value == null ? '' : String(value));

	// Vertical layout only makes sense for the legacy variant (a stacked list of
	// labeled circles); underlined options are always laid out horizontally.
	const effectiveOrientation = $derived(variant === 'legacy' ? orientation : 'horizontal');

	function handleValueChange(newValue: string) {
		const option = radioOptions.find((o) => String(o.value) === newValue);
		value = option ? option.value : newValue;
		onValueChange?.(newValue);
	}

	const legacyItemBase = [
		'appearance-none',
		'size-5',
		'shrink-0',
		'rounded-full',
		'flex',
		'items-center',
		'justify-center',
		'border-2',
		'border-input-border',
		'bg-input',
		'cursor-pointer',
		'data-[state=checked]:border-pri',
		'focus-visible:outline-solid',
		'focus-visible:outline-[length:var(--input-focus-sz)]',
		'focus-visible:outline-input-focus',
		'focus-visible:outline-offset-0',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed'
	].join(' ');

	const underlinedItemBase = [
		'appearance-none',
		'm-0',
		'p-0',
		'text-lg',
		'text-text',
		'bg-transparent',
		'border-0',
		'border-b-[3px]',
		'border-transparent',
		'cursor-pointer',
		'hover:bg-input',
		'data-[state=checked]:border-b-pri',
		'focus-visible:border-b-transparent!',
		'focus-visible:rounded-lg',
		'focus-visible:outline-solid',
		//'focus-visible:outline-[length:var(--input-focus-sz)]',
        'focus-visible:outline-[3px]', // per uniformarlo alla sottolineatura
		'focus-visible:outline-input-focus',
		'focus-visible:outline-offset-4',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed'
	].join(' ');
</script>

<div class={className}>
	{#if label}<Label for={id} {label} />{/if}
	<RadioGroup.Root
		{id}
		value={stringValue}
		onValueChange={handleValueChange}
		{disabled}
		orientation={effectiveOrientation}
		class={['flex', effectiveOrientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4'].join(
			' '
		)}
	>
		{#each radioOptions as option (option.value)}
			{@const itemId = `${id}-${option.value}`}
			{#if variant === 'underlined'}
				<RadioGroup.Item value={String(option.value)} id={itemId} class={underlinedItemBase}>
					<LocOrText value={option.label} />
				</RadioGroup.Item>
			{:else}
				<div class="inline-flex items-center gap-2">
					<RadioGroup.Item value={String(option.value)} id={itemId} class={legacyItemBase}>
						{#snippet children({ checked })}
							{#if checked}
								<div class="size-2.5 rounded-full bg-pri"></div>
							{/if}
						{/snippet}
					</RadioGroup.Item>
					<label
						for={itemId}
						class={[
							'text-input-text text-base',
							disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
						].join(' ')}><LocOrText value={option.label} /></label
					>
				</div>
			{/if}
		{/each}
	</RadioGroup.Root>
</div>
