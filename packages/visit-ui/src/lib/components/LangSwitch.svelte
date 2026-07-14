<script lang="ts">
	import { lang } from '../stores/lang.svelte.js';
	import { Menu, MenuItem } from './index.js';

	const current = $derived(lang.languages.find((l) => l.code === lang.current));
</script>

<Menu>
	{#snippet trigger({ props })}
		<button
			{...props}
			class="text-text font-bold text-2xl ml-3 scale-100 hover:scale-120 transition-all duration-200 !cursor-pointer"
			title={current?.label}
		>
			{current?.icon ?? current?.label ?? ''}
		</button>
	{/snippet}
	{#each lang.languages as language (language.code)}
		<MenuItem onSelect={() => lang.setCurrent(language.code)}>{language.label}</MenuItem>
	{/each}
</Menu>
