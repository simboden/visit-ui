<script lang="ts">
	import Select, { type SelectItem } from './Select.svelte';

	type Props = {
		items?: SelectItem[];
		value?: string | number | null;
		valid?: boolean;
		error?: string;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		requiredMessage?: string;
	};

	let {
		items = [],
		value = $bindable(null),
		valid = $bindable(false),
		error = $bindable(''),
		label = '',
		placeholder = 'Select...',
		disabled = false,
		required = true,
		requiredMessage = 'Selection required'
	}: Props = $props();

	function onchange() {
		if (value === null || value === '') {
			valid = !required;
			error = required ? requiredMessage : '';
		} else {
			valid = true;
			error = '';
		}
	}
</script>

<Select {items} bind:value {label} {placeholder} {disabled} {error} {onchange} />
