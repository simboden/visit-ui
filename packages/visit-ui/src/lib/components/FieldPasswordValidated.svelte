<script lang="ts">
	// FieldPasswordValidated: a password input with strong-password validation.
	// Validates: minLength, maxLength, and a complexity pattern (uppercase, lowercase,
	// digit, special char). All constraints are overrideable via props.
	// Mirrors the FieldEmail → FieldText pattern: same show/hide toggle as FieldPassword.
	import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
	import { Icon, Input } from './index.js';

	type Props = {
		value?: string;
		valid?: boolean;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		minLength?: number;
		maxLength?: number;
		pattern?: RegExp;
		patternMessage?: string;
	};

	const DEFAULT_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&\-_+=()!?"]).{8,}$/;
	const DEFAULT_PATTERN_MSG =
		'Must contain uppercase, lowercase, a digit and a symbol (@#$%^&-_+=()!?")';

	let {
		value = $bindable(''),
		valid = $bindable(false),
		label = 'Password',
		placeholder = '',
		disabled = false,
		minLength = 8,
		maxLength = 32,
		pattern = DEFAULT_PATTERN,
		patternMessage = DEFAULT_PATTERN_MSG
	}: Props = $props();

	let error = $state('');
	let show = $state(false);

	function oninput() {
		if (value === '') {
			valid = false;
			error = '';
			return;
		}
		if (value.length < minLength) {
			valid = false;
			error = `Too short — use at least ${minLength} characters`;
			return;
		}
		if (value.length > maxLength) {
			valid = false;
			error = `Too long — use no more than ${maxLength} characters`;
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

	const buttonClass = [
		'focus:ring-input-focus',
		'focus:outline-none',
		'focus:ring-2',
		'hover:bg-input-hover',
		'pointer-events-auto',
		'rounded',
		'p-1'
	].join(' ');
</script>

<Input
	bind:value
	type={show ? 'text' : 'password'}
	{label}
	{error}
	{placeholder}
	{disabled}
	{oninput}
	autocomplete="new-password"
>
	{#snippet right()}
		<button type="button" onclick={() => (show = !show)} class={buttonClass}>
			<Icon icon={show ? mdiEyeOutline : mdiEyeOffOutline} size="1.25rem" />
		</button>
	{/snippet}
</Input>