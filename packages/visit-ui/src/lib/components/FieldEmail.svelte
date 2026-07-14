<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Input from './Input.svelte';

	type Props = {
		value?: string;
		valid?: boolean;
		error?: string;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		requiredMessage?: string;
		invalidMessage?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
	};

	let {
		value = $bindable(''),
		valid = $bindable(false),
		error = $bindable(''),
		label = 'Email',
		placeholder = 'example@email.com',
		disabled = false,
		required = true,
		requiredMessage = 'Email required',
		invalidMessage = 'Invalid email format',
		autocomplete = 'one-time-code'
	}: Props = $props();

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function oninput() {
		if (value === '') {
			valid = !required;
			error = required ? requiredMessage : '';
		} else if (!emailRegex.test(value)) {
			valid = false;
			error = invalidMessage;
		} else {
			valid = true;
			error = '';
		}
	}
</script>

<Input
	type="email"
	bind:value
	{label}
	{placeholder}
	{disabled}
	{oninput}
	{error}
	{autocomplete}
/>
