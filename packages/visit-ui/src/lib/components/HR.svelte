<script lang="ts">
	type Props = { class?: string };

	let { class: className = '' }: Props = $props();
</script>

<hr class="border-t border-(--color-hr) {className}" />
