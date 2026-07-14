<script lang="ts">
	import { mdiAlertCircleOutline, mdiCheckCircleOutline } from '@mdi/js';
	import type { Snippet } from 'svelte';
	import { FR, Icon, Spring } from './index.js';

	type Props = {
		type: 'ok' | 'error' | 'warn';
		text?: string;
		children?: Snippet;
		class?: string;
	};

	let { type, text = '', children, class: className = '' }: Props = $props();

	const iconMap = {
		ok:    { icon: mdiCheckCircleOutline,  color: 'text-green-500'  },
		error: { icon: mdiAlertCircleOutline,  color: 'text-red-500'    },
		warn:  { icon: mdiAlertCircleOutline,  color: 'text-yellow-500' }
	};

	const { icon, color } = $derived(iconMap[type]);
</script>

<FR
	class="bg-card rounded-lg border border-card-border p-4 gap-3 {className}"
>
	<Spring />
	<Icon {icon} size="2rem" class={color} />
	{#if text}
		<p class="whitespace-pre-line">{text}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
	<Spring />
</FR>