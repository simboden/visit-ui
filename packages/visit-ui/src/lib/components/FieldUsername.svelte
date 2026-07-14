<script lang="ts">
	import Input from './Input.svelte';

	type Props = {
		value?: string;
		valid?: boolean;
		error?: string;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		minLength?: number;
		maxLength?: number;
		pattern?: RegExp;
		tooShortMessage?: string;
		tooLongMessage?: string;
		patternMessage?: string;
	};

	let {
		value = $bindable(''),
		valid = $bindable(false),
		error = $bindable(''),
		label = 'Username',
		placeholder = 'e.g. mario_rossi',
		disabled = false,
		minLength = 3,
		maxLength = 32,
		pattern = /^[a-zA-Z0-9_]+$/,
		tooShortMessage,
		tooLongMessage,
		patternMessage = 'Use only letters, numbers or underscore'
	}: Props = $props();

	function oninput() {
		if (value === '') {
			valid = false;
			error = '';
			return;
		}
		if (value.length < minLength) {
			valid = false;
			error = tooShortMessage ?? `Use at least ${minLength} characters`;
			return;
		}
		if (value.length > maxLength) {
			valid = false;
			error = tooLongMessage ?? `Use no more than ${maxLength} characters`;
			return;
		}
		if (!pattern.test(value)) {
			valid = false;
			error = patternMessage;
			return;
		}
		valid = true;
		error = '';
	}
</script>

<Input
	type="text"
	bind:value
	{label}
	{error}
	{placeholder}
	{disabled}
	{oninput}
	autocomplete="one-time-code"
/>