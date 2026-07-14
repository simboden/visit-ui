<script lang="ts">
	import FieldText from './FieldText.svelte';

	type Props = {
		value?: string;
		valid?: boolean;
		error?: string;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		requiredMessage?: string;
		tooShortMessage?: string;
		tooLongMessage?: string;
		patternMessage?: string;
	};

	let {
		value = $bindable(''),
		valid = $bindable(false),
		error = $bindable(''),
		label = 'Full Name',
		placeholder = 'e.g. Mario Rossi',
		disabled = false,
		requiredMessage = 'Field required',
		tooShortMessage = 'Use at least 3 characters',
		tooLongMessage = 'Use no more than 64 characters',
		patternMessage = 'Use only letters or spaces'
	}: Props = $props();
</script>

<FieldText
	{label}
	{placeholder}
	{disabled}
	required
	minLength={3}
	maxLength={64}
	pattern={/^[A-Za-zÀ-ÿ\s]+$/}
	{requiredMessage}
	{tooShortMessage}
	{tooLongMessage}
	{patternMessage}
	bind:value
	bind:valid
	bind:error
/>
