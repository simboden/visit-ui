<script lang="ts">
	import { mdiAlertCircleOutline, mdiCheckCircleOutline, mdiInformationOutline } from '@mdi/js';
	import type { Snippet } from 'svelte';
	import { FR, Icon, LocOrText, Spring } from './index.js';

	type Props = {
		type: 'ok' | 'error' | 'warn' | 'info';
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		text?: string;
		iconSize?: string;
		children?: Snippet;
		class?: string;
	};

	let { type, text = '', iconSize = '2rem', children, class: className = '' }: Props = $props();

	const iconMap = {
		ok:    { icon: mdiCheckCircleOutline,  color: 'text-success', bg: 'bg-success/10 border-success/30' },
		error: { icon: mdiAlertCircleOutline,  color: 'text-error',   bg: 'bg-error/10   border-error/30'   },
		warn:  { icon: mdiAlertCircleOutline,  color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
		info:  { icon: mdiInformationOutline,  color: 'text-info',    bg: 'bg-info/10    border-info/30'    }
	};

	const { icon, color, bg } = $derived(iconMap[type]);
</script>

<FR
	class="rounded-lg border p-4 gap-3 {bg} {className}"
>
	<Spring />
	<Icon {icon} size={iconSize} class="shrink-0 {color}" />
	{#if text}
		<p class="whitespace-pre-line"><LocOrText value={text} /></p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
	<Spring />
</FR>
