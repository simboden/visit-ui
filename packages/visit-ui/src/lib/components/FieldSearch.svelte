<script lang="ts">
	import { mdiMagnify } from '@mdi/js';
	import { Icon, Input } from './index.js';

	type Props = {
		value?: string;
		placeholder?: string;
		class?: string;
		onsearch?: (v: string) => void;
	};

	let { value = $bindable(''), placeholder = 'Search…', class: className = '', onsearch }: Props =
		$props();

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') onsearch?.(value.trim());
	}
</script>

<!--
	Wrapper with relative positioning and [&_input]:pl-8 shifts the native <input>
	padding to make room for the icon positioned absolutely on the left.
-->
<div class="relative [&_input]:pl-8 {className}">
	<div class="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
		<Icon icon={mdiMagnify} size="1rem" class="text-lab" />
	</div>
	<Input type="search" bind:value {placeholder} {onkeydown} />
</div>