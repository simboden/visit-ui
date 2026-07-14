<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { mdiCheck } from '@mdi/js';
	import Icon from './Icon.svelte';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		value?: boolean;
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		label?: string;
		disabled?: boolean;
		onCheckedChange?: (checked: boolean) => void;
		class?: string;
	};

	let {
		value = $bindable(false),
		label = '',
		disabled = false,
		onCheckedChange,
		class: className = ''
	}: Props = $props();

	const id = $props.id();

	const boxBase = [
		'size-5',
		'shrink-0',
		'rounded',
		'flex',
		'items-center',
		'justify-center',
		'border-2',
		'border-input-border',
		'bg-input',
		'cursor-pointer',
		'data-[state=checked]:bg-pri',
		'data-[state=checked]:border-pri',
		'focus-visible:outline-solid',
		'focus-visible:outline-[length:var(--input-focus-sz)]',
		'focus-visible:outline-input-focus',
		'focus-visible:outline-offset-0',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed'
	].join(' ');
</script>

<div class="inline-flex items-center gap-2 {className}">
	<Checkbox.Root bind:checked={value} {disabled} {onCheckedChange} {id} class={boxBase}>
		{#snippet children({ checked })}
			{#if checked}
				<Icon icon={mdiCheck} class="text-pri-text" size="0.875rem" />
			{/if}
		{/snippet}
	</Checkbox.Root>
	{#if label}
		<label for={id} class="text-input-text text-base cursor-pointer"><LocOrText value={label} /></label>
	{/if}
</div>
