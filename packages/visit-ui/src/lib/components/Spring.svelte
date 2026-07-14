<!-- Spring: flex spacer that fills all available space in a flex row or column.
     Usage: place between two elements to push them apart.
     <FR><Button>Left</Button><Spring /><Button>Right</Button></FR> -->
<script lang="ts">
	type Props = { class?: string };

	let { class: className = '' }: Props = $props();
</script>

<div class="min-w-0 grow shrink basis-0 {className}"></div>
