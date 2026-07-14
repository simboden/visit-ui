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
		label = 'Last Name',
		placeholder = '',
		disabled = false,
		requiredMessage = 'Field required',
		tooShortMessage = 'Use at least 2 characters',
		tooLongMessage = 'Use no more than 64 characters',
		patternMessage = 'Use only letters, numbers or spaces'
	}: Props = $props();
</script>

<FieldText
	{label}
	{placeholder}
	{disabled}
	required
	minLength={2}
	maxLength={64}
	pattern={/^[A-Za-zÀ-ÿ0-9\s'\-]+$/}
	autocomplete="family-name"
	{requiredMessage}
	{tooShortMessage}
	{tooLongMessage}
	{patternMessage}
	bind:value
	bind:valid
	bind:error
/>
