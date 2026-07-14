<script lang="ts">
	import TextArea from './TextArea.svelte';

	type Props = {
		value?: string;
		valid?: boolean;
		error?: string;
		label?: string;
		placeholder?: string;
		rows?: number;
		disabled?: boolean;
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		requiredMessage?: string;
		tooShortMessage?: string;
		tooLongMessage?: string;
	};

	let {
		value = $bindable(''),
		valid = $bindable(false),
		error = $bindable(''),
		label = '',
		placeholder = '',
		rows = 4,
		disabled = false,
		required = false,
		minLength = 0,
		maxLength = Infinity,
		requiredMessage = 'Field required',
		tooShortMessage,
		tooLongMessage
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
		} else {
			valid = true;
			error = '';
		}
	}
</script>

<TextArea bind:value {label} {placeholder} {rows} {disabled} {error} {oninput} />
