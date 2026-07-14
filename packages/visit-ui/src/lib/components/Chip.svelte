<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	type Props = {
		text: string | number;
		title?: string;
		color?: string;       // CSS color value — overrides color-chip theme var
		class?: string;
		onclick?: () => void;
	};

	let { text, title, color, class: className = '', onclick }: Props = $props();

	// Inline style: use caller-supplied color if provided, otherwise fall back to the
	// color-chip theme variable. Inline style wins over Tailwind classes for specificity.
	const bgStyle = $derived(color ? `background-color: ${color}` : 'background-color: var(--color-chip)');
</script>

<!--
	Tooltip wraps the button when title is set; renders the button directly otherwise.
	The child snippet receives { props } from bits-ui's Tooltip.Trigger — these must
	be spread onto the actual trigger element so ARIA attributes wire up correctly.
-->
<Tooltip text={title ?? null}>
	{#snippet child({ props })}
		<button
			{...props}
			style={bgStyle}
			class="text-lab font-bold min-w-[50px] px-2 py-1 rounded cursor-pointer text-sm hover:brightness-125 {className}"
			{onclick}
		>
			{text}
		</button>
	{/snippet}
</Tooltip>