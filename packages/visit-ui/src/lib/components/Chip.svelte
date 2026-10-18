<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import LocOrText from './LocOrText.svelte';
	import Tooltip from './Tooltip.svelte';

	type Props = {
		// text e title: testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		text: string | number;
		title?: string;
		color?: string;       // CSS color value — overrides the background class
		class?: string;
		onclick?: () => void;
	};

	let { text, title, color, class: className = '', onclick }: Props = $props();

	// Background comes from the bg-chip class, so callers can swap it via class (e.g. "bg-chip1");
	// inline style only when an explicit color is passed.
	const base = 'bg-chip text-lab font-bold min-w-[50px] px-2 py-1 rounded cursor-pointer text-sm hover:brightness-125';
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
			style={color ? `background-color: ${color}` : undefined}
			class={twMerge(base, className)}
			{onclick}
		>
			<LocOrText value={String(text)} />
		</button>
	{/snippet}
</Tooltip>
