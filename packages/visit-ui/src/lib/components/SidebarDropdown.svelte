<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { mdiChevronDown } from '@mdi/js';
	import type { Snippet } from 'svelte';
	import { Icon } from './index.js';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		label?: string;
		icon?: string;
		open?: boolean;
		children: Snippet;
		class?: string;
	};

	let {
		label = '',
		icon,
		open = $bindable(false),
		children,
		class: className = ''
	}: Props = $props();

	const triggerBase = [
		'group flex w-full items-center gap-3',
		'px-3 py-2 rounded',
		'text-text',
		'transition-colors',
		'cursor-pointer',
		'hover:bg-input-hover'
	].join(' ');
</script>

<li class="!pl-0 before:hidden {className}">
	<Collapsible.Root bind:open>
		<Collapsible.Trigger class={triggerBase}>
			{#if icon}
				<Icon {icon} class="shrink-0" />
			{/if}
			<span class="flex-1 whitespace-nowrap text-left"><LocOrText value={label} /></span>
			<Icon
				icon={mdiChevronDown}
				size="1.25rem"
				class="shrink-0 transition-transform group-data-[state=open]:rotate-180"
			/>
		</Collapsible.Trigger>
		<Collapsible.Content>
			<!--
				--sidebar-dropdown-indent viene letta da SidebarItem per allineare la propria label
				a quella di questo trigger (icona + gap) quando l'item non ha icona sinistra. Non si
				puo' usare setContext/getContext: gli item passati come children sono di proprieta'
				della pagina che li ha scritti, non di questo componente, quindi setContext qui non li
				raggiungerebbe (vedi commento analogo in Accordion.svelte). Una custom property CSS
				invece attraversa il DOM realmente renderizzato, indipendentemente da chi possiede i
				componenti. Il valore (1.75rem) e' icon-width (1.25rem, vedi Icon size default) + gap-3
				(0.75rem) dell'header, meno il px-2 (0.5rem) gia' presente sullo span dell'item.
			-->
			<ul class="pl-6 mt-3" style="--sidebar-dropdown-indent: 1.75rem;">
				{@render children()}
			</ul>
		</Collapsible.Content>
	</Collapsible.Root>
</li>
