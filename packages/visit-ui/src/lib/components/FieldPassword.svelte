<script lang="ts">
	import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { Icon, Input } from './index.js';

	type Props = {
		value?: string;
		valid?: boolean;
		error?: string;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		minLength?: number;
		requiredMessage?: string;
		tooShortMessage?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
	};

	let {
		value = $bindable(''),
		valid = $bindable(false),
		error = $bindable(''),
		label = 'Password',
		placeholder = '',
		disabled = false,
		required = true,
		minLength = 0,
		requiredMessage = 'Password required',
		tooShortMessage,
		autocomplete = 'new-password'
	}: Props = $props();

	let show = $state(false);

	function oninput() {
		if (value === '') {
			valid = !required;
			error = required ? requiredMessage : '';
		} else if (value.length < minLength) {
			valid = false;
			error = tooShortMessage ?? `Use at least ${minLength} characters`;
		} else {
			valid = true;
			error = '';
		}
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
	{autocomplete}
>
	{#snippet right()}
		<button type="button" onclick={() => (show = !show)} class={buttonClass}>
			<Icon icon={show ? mdiEyeOutline : mdiEyeOffOutline} size="1.25rem" />
		</button>
	{/snippet}
</Input>
