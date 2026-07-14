<script lang="ts">
	// MultiAutoComplete: multi-value searchable select.
	// values binds to an array of selected item ids.
	// Selected items are shown as Chip-styled tags above the input.
	// lock: shows a lock icon and makes the field read-only.
	import { mdiClose, mdiLock } from '@mdi/js';
	import { Icon, Label, Spring } from './index.js';

	type Item = { id: string; display: string };

	type Props = {
		values?: string[];
		items?: Item[];
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		lock?: boolean;
		class?: string;
	};

	let {
		values = $bindable([]),
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

	const selectedItems = $derived(
		values.map((v) => items.find((i) => i.id === v)).filter(Boolean) as Item[]
	);

	// Exclude already-selected items; apply search filter; cap at 50.
	const filtered = $derived.by(() => {
		const selected = new Set(values);
		let list = items.filter((i) => !selected.has(i.id));
		if (search) {
			const q = search.toLowerCase();
			list = list.filter((i) => i.display.toLowerCase().includes(q));
		}
		return list.slice(0, 50);
	});

	function on_input(e: Event) {
		search = (e.target as HTMLInputElement).value;
		open = true;
	}

	function on_focus() { open = true; }

	function on_blur() {
		setTimeout(() => { open = false; search = ''; }, 200);
	}

	function add(item: Item) {
		values = [...values, item.id];
		search = '';
		open = false;
	}

	function remove(itemId: string) {
		values = values.filter((v) => v !== itemId);
	}

	function clear_all() {
		values = [];
	}

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

	{#if selectedItems.length > 0}
		<div class="flex flex-wrap gap-1 mb-1">
			{#each selectedItems as item}
				<span
					class="inline-flex items-center gap-1 text-lab text-sm font-bold px-2 py-0.5 rounded"
					style="background-color: var(--color-chip)"
				>
					{item.display}
					{#if !disabled && !lock}
						<button
							type="button"
							class="cursor-pointer hover:opacity-70"
							onclick={() => remove(item.id)}
						>
							<Icon icon={mdiClose} size="0.75rem" />
						</button>
					{/if}
				</span>
			{/each}
		</div>
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
			class="{inputClass} {values.length > 0 && !disabled && !lock ? 'pr-8' : ''}"
		/>
		{#if values.length > 0 && !disabled && !lock}
			<button
				type="button"
				class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-text/50 hover:text-text"
				onmousedown={clear_all}
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
					onmousedown={() => add(item)}
				>
					{item.display}
				</button>
			{/each}
		</div>
	{/if}
</div>