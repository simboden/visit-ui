<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { theme } from '../stores/theme.svelte.js';

	const styles = tv({
		base: 'flex shrink-0 cursor-pointer items-center justify-center rounded p-1 text-lg hover:scale-110 transition-transform'
	});
</script>

<button
	type="button"
	onclick={() => theme.next()}
	aria-label="Switch theme"
	title={theme.current.title}
	class={styles()}
>
	{theme.current.icon}
</button>
