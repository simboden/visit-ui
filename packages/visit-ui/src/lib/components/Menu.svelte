<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		open?: boolean;
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		children: Snippet;
		class?: string;
	};

	let { open = $bindable(false), trigger, children, class: className = '' }: Props = $props();

	const contentBase = [
		'bg-input',
		'border-input-border',
		'border-[length:var(--input-border-sz)]',
		'rounded-lg',
		'shadow-lg',
		'z-50',
		'p-1',
		'min-w-[8rem]'
	].join(' ');
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger child={trigger} />
	<DropdownMenu.Portal>
		<DropdownMenu.Content sideOffset={4} class={[contentBase, className].join(' ')}>
			{@render children()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
