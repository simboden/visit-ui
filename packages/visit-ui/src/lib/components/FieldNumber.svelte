<script lang="ts">
	import Input from './Input.svelte';

	type Props = {
		value?: number;
		valid?: boolean;
		error?: string;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		min?: number;
		max?: number;
		step?: number;
		rangeMessage?: string;
	};

	let {
		value = $bindable(0),
		valid = $bindable(false),
		error = $bindable(''),
		label = '',
		placeholder = '',
		disabled = false,
		min,
		max,
		step = 1,
		rangeMessage
	}: Props = $props();

	function validate() {
		if (Number.isNaN(value)) {
			valid = false;
			error = 'Enter a number';
			return;
		}
		if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
			valid = false;
			error = rangeMessage ?? `Enter a value between ${min ?? '-∞'} and ${max ?? '∞'}`;
			return;
		}
		valid = true;
		error = '';
	}

	function oninput() {
		value = Number(value);
		validate();
	}

	function handleWheel(e: WheelEvent) {
		if (disabled) return;
		e.preventDefault();
		const delta = e.deltaY < 0 ? step : -step;
		let next = value + delta;
		if (min !== undefined) next = Math.max(min, next);
		if (max !== undefined) next = Math.min(max, next);
		value = next;
		validate();
	}
</script>

<div onwheel={handleWheel}>
	<Input
		type="number"
		bind:value
		{label}
		{placeholder}
		{disabled}
		{min}
		{max}
		{step}
		{error}
		{oninput}
	/>
</div>
