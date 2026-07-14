<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { mdiChevronDown } from '@mdi/js';
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import LocOrText from './LocOrText.svelte';

	type Props = {
		value?: string;
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		title: string;
		disabled?: boolean;
		class?: string;
		children: Snippet;
	};

	let { value: valueProp, title, disabled = false, class: className = '', children }: Props =
		$props();

	const id = $props.id();
	const value = $derived(valueProp ?? id);

	const triggerBase = [
		'group',
		'flex',
		'w-full',
		'items-center',
		'justify-between',
		'gap-2',
		'p-[length:var(--pad)]',
		'py-3',
		'bg-acc',
		'text-text',
		'font-medium',
		'text-left',
		'cursor-pointer',
		'hover:bg-acc-hover',
		'accordion-trigger',
		'focus:ring-[length:var(--input-focus-sz)]',
		'focus:ring-input-focus',
		'focus:ring-inset',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed'
	].join(' ');

	const contentBase = 'overflow-hidden border-t accordion-content-border text-text accordion-content';
	const contentInnerBase = 'p-[length:var(--pad)]';
</script>

<Accordion.Item
	{value}
	{disabled}
	class="accordion-item border-b last:border-b-0 accordion-item-border {className}"
>
	<Accordion.Header>
		<Accordion.Trigger class={triggerBase}>
			<LocOrText value={title} />
			<Icon
				icon={mdiChevronDown}
				size="1.25rem"
				class="shrink-0 transition-transform group-data-[state=open]:rotate-180"
			/>
		</Accordion.Trigger>
	</Accordion.Header>
	<Accordion.Content class={contentBase}>
		<div class={contentInnerBase}>
			{@render children()}
		</div>
	</Accordion.Content>
</Accordion.Item>

<style>
	:global(.accordion-item-border) {
		border-color: var(--accordion-border-color, transparent);
	}
	:global(.accordion-content-border) {
		border-color: var(--accordion-border-color, transparent);
	}

	:global(.accordion-item:first-child .accordion-trigger) {
		border-top-left-radius: var(--radius-lg);
		border-top-right-radius: var(--radius-lg);
	}
	:global(.accordion-item:last-child .accordion-trigger[data-state='closed']) {
		border-bottom-left-radius: var(--radius-lg);
		border-bottom-right-radius: var(--radius-lg);
	}

	:global(.accordion-content[data-state='open']) {
		animation: accordion-down 0.1s ease-out;
	}
	:global(.accordion-content[data-state='closed']) {
		animation: accordion-up 0.1s ease-out;
	}

	@keyframes accordion-down {
		from {
			height: 0;
		}
		to {
			height: var(--bits-accordion-content-height);
		}
	}

	@keyframes accordion-up {
		from {
			height: var(--bits-accordion-content-height);
		}
		to {
			height: 0;
		}
	}
</style>
