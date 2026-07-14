<script lang="ts">
	import { ColorEditor, Input } from './index.js';

	type Props = {
		value?: string;
		label?: string;
		placeholder?: string;
		oninput?: (color: string) => void;
	};

	let { value = $bindable(''), label = '', placeholder = '#000000ff', oninput }: Props = $props();

	let showColorEditor = $state(false);

	function handleColorChange(color: string) {
		value = color;
		oninput?.(value);
	}
</script>

<Input type="text" {label} {placeholder} bind:value>
	{#snippet right()}
		<button
			type="button"
			aria-label="open color editor"
			class="size-6 cursor-pointer rounded border border-input-border"
			style="background-color: {value || '#000000'}"
			onclick={() => (showColorEditor = true)}
		></button>
	{/snippet}
</Input>

<ColorEditor bind:open={showColorEditor} bind:color={value} onChange={handleColorChange} />
