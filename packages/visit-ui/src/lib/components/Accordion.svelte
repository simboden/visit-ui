<script lang="ts">
	import { Accordion } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		value?: string[];
		showBorder?: boolean;
		children: Snippet;
		class?: string;
	};

	let { value = $bindable([]), showBorder = false, children, class: className = '' }: Props =
		$props();

	const base = $derived(
		[
			'bg-card',
			showBorder && 'border-[length:var(--card-border-sz)] border-acc-border',
			'rounded-lg',
			'overflow-hidden'
		]
			.filter(Boolean)
			.join(' ')
	);

	// AccordionItem instances are children of this component in the template, but in Svelte's
	// component tree they're owned by the page that wrote them, not by Accordion - so
	// setContext here wouldn't reach them. A CSS custom property on the root element works
	// instead, since it cascades through the actual DOM tree that AccordionItem renders into.
	const style = $derived(
		`--accordion-border-color: ${showBorder ? 'var(--color-acc-border)' : 'transparent'};`
	);
</script>

<Accordion.Root type="multiple" bind:value class="{base} {className}" {style}>
	{@render children()}
</Accordion.Root>
