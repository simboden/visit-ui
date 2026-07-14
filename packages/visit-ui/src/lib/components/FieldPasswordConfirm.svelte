<script lang="ts">
	// FieldPasswordConfirm: a password confirmation field.
	// Validates that its value matches otherPsw and that otherPswValid is true.
	// Re-validates reactively whenever otherPsw or otherPswValid change.
	import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
	import { Icon, Input } from './index.js';

	type Props = {
		value?: string;
		valid?: boolean;
		label?: string;
		disabled?: boolean;
		otherPsw?: string;
		otherPswValid?: boolean;
		mismatchMessage?: string;
	};

	let {
		value = $bindable(''),
		valid = $bindable(false),
		label = 'Repeat Password',
		disabled = false,
		otherPsw = '',
		otherPswValid = false,
		mismatchMessage = 'Does not match'
	}: Props = $props();

	let error = $state('');
	let show = $state(false);

	function validate() {
		if (value === '') { valid = false; error = ''; return; }
		if (!otherPswValid) { valid = false; error = ''; return; }
		if (value !== otherPsw) { valid = false; error = mismatchMessage; return; }
		valid = true;
		error = '';
	}

	// Re-validate when the other field's value or validity changes
	$effect(() => {
		void otherPsw;
		void otherPswValid;
		validate();
	});

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
	{disabled}
	oninput={validate}
	autocomplete="new-password"
>
	{#snippet right()}
		<button type="button" onclick={() => (show = !show)} class={buttonClass}>
			<Icon icon={show ? mdiEyeOutline : mdiEyeOffOutline} size="1.25rem" />
		</button>
	{/snippet}
</Input>