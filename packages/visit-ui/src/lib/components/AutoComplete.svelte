<script lang="ts">
	// AutoComplete: single-value searchable select.
	// items: array of { id, display } objects. value binds to the selected id.
	// lock: shows a lock icon and makes the field read-only (use when the value
	//       cannot be changed in the current context, but should remain visible).
	import { mdiClose, mdiLock } from '@mdi/js';
	import { Icon, Label, Spring } from './index.js';

	type Item = { id: string; display: string };

	type Props = {
		value?: string;
		items?: Item[];
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		lock?: boolean;
		class?: string;
	};

	let {
		value = $bindable(''),
		items = [],
		label = '',
		placeholder = '',
		disabled = false,
		lock = false,
		class: className = ''
	}: Props = $props();

	const id = $props.id();

	let search = $state('');
	let open = $state(false);

	// Sync the search text whenever value or items change.
	// If items are loaded and the current value has no match, clear both.
	$effect(() => {
		const item = items.find((i) => i.id === value);
		if (item) {
			search = item.display;
		} else if (items.length > 0) {
			search = '';
			value = '';
		}
	});

	// Case-insensitive client-side filter, capped at 50 results for performance.
	const filtered = $derived.by(() => {
		if (!search) return items.slice(0, 50);
		const q = search.toLowerCase();
		return items.filter((i) => i.display.toLowerCase().includes(q)).slice(0, 50);
	});

	function on_input(e: Event) {
		search = (e.target as HTMLInputElement).value;
		open = true;
	}

	function on_focus() {
		open = true;
	}

	function on_blur() {
		// Delay so a mousedown on a dropdown item fires before the list closes.
		setTimeout(() => {
			open = false;
			// If the typed text doesn't match any display name, restore the last valid value.
			const item = items.find((i) => i.display === search);
			if (!item) {
				const current = items.find((i) => i.id === value);
				search = current?.display ?? '';
			}
		}, 200);
	}

	function select(item: Item) {
		value = item.id;
		search = item.display;
		open = false;
	}

	function clear() {
		value = '';
		search = '';
		open = false;
	}

	// Mirrors the CSS class chain used by Input.svelte for visual consistency.
	const inputClass = [
		'w-full',
		'rounded-lg',
		'p-2',
		'bg-input',
		'text-base',
		'text-input-text',
		'placeholder-(--color-text)/50',
		'hover:bg-input-hover',
		'border-input-border',
		'border-[length:var(--input-border-sz)]',
		'focus:outline-solid',
		'focus:outline-[length:var(--input-focus-sz)]',
		'focus:outline-input-focus',
		'focus:outline-offset-0',
		'ring-0',
		'focus:border-input-focus!',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed'
	].join(' ');
</script>

<div class="relative {className}">
	{#if label}
		<Label for={id} class="flex items-center">
			{label}
			{#if lock}<Spring /><Icon icon={mdiLock} size="1rem" class="text-text/50" />{/if}
		</Label>
	{/if}

	<div class="relative">
		<input
			{id}
			type="text"
			disabled={disabled || lock}
			{placeholder}
			value={search}
			oninput={on_input}
			onfocus={on_focus}
			onblur={on_blur}
			autocomplete="one-time-code"
			class="{inputClass} {value && !disabled && !lock ? 'pr-8' : ''}"
		/>
		{#if value && !disabled && !lock}
			<button
				type="button"
				class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-text/50 hover:text-text"
				onmousedown={clear}
			>
				<Icon icon={mdiClose} size="1rem" />
			</button>
		{/if}
	</div>

	{#if open && !disabled && !lock && filtered.length > 0}
		<div
			class="absolute z-50 w-full max-h-48 overflow-y-auto bg-input border border-card-border rounded-lg shadow-lg mt-0.5"
		>
			{#each filtered as item}
				<button
					type="button"
					class="w-full text-left px-2 py-1 text-sm text-input-text hover:bg-input-hover cursor-pointer"
					onmousedown={() => select(item)}
				>
					{item.display}
				</button>
			{/each}
		</div>
	{/if}
</div>