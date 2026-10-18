<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import LocOrText from './LocOrText.svelte';

	type Props = Tooltip.RootProps & {
		text?: string | null;
		child: Snippet<[{ props: Record<string, unknown> }]>;
	};

	let { open = $bindable(false), child, text, ...restProps }: Props = $props();
</script>

{#if text}
	<Tooltip.Root bind:open {...restProps}>
		<Tooltip.Trigger {child} />
		<Tooltip.Portal>
			<Tooltip.Content
				sideOffset={8}
				class="bg-text text-body shadow-lg z-50 rounded-lg px-3.5 py-2"
			>
				<LocOrText value={text} />
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
{:else}
	{@render child({ props: {} })}
{/if}
