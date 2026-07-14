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
		minLength?: number;
		maxLength?: number;
		pattern?: RegExp;
		requiredMessage?: string;
		tooShortMessage?: string;
		tooLongMessage?: string;
		patternMessage?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
	};

	let {
		value = $bindable(''),
		valid = $bindable(false),
		error = $bindable(''),
		label = '',
		placeholder = '',
		disabled = false,
		required = false,
		minLength = 0,
		maxLength = Infinity,
		pattern,
		requiredMessage = 'Field required',
		tooShortMessage,
		tooLongMessage,
		patternMessage = 'Invalid format',
		autocomplete = 'one-time-code'
	}: Props = $props();

	function oninput() {
		if (value === '') {
			valid = !required;
			error = required ? requiredMessage : '';
		} else if (value.length < minLength) {
			valid = false;
			error = tooShortMessage ?? `Use at least ${minLength} characters`;
		} else if (value.length > maxLength) {
			valid = false;
			error = tooLongMessage ?? `Use no more than ${maxLength} characters`;
		} else if (pattern && !pattern.test(value)) {
			valid = false;
			error = patternMessage;
		} else {
			valid = true;
			error = '';
		}
	}
</script>

<Input type="text" bind:value {label} {placeholder} {disabled} {oninput} {error} {autocomplete} />
