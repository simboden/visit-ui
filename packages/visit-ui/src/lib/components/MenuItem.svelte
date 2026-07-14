<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		onSelect?: (event: Event) => void;
		disabled?: boolean;
		closeOnSelect?: boolean;
		class?: string;
		children: Snippet;
	};

	let {
		onSelect,
		disabled = false,
		closeOnSelect = true,
		class: className = '',
		children
	}: Props = $props();

	const base = [
		'flex',
		'items-center',
		'gap-2',
		'rounded',
		'px-2',
		'py-1.5',
		'text-base',
		'text-input-text',
		'cursor-pointer',
		'select-none',
		'focus:outline-none',
		'data-highlighted:bg-input-hover',
		'data-disabled:opacity-50',
		'data-disabled:cursor-not-allowed'
	].join(' ');
</script>

<DropdownMenu.Item {disabled} {onSelect} {closeOnSelect} class={[base, className].join(' ')}>
	{@render children()}
</DropdownMenu.Item>
