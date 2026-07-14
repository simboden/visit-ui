<script lang="ts">
  import type { Snippet } from 'svelte'
  type Props = { children?: Snippet }

  const { children }: Props = $props()
</script>

<div class="text-text leading-relaxed">
	<table class="table-auto">
        {@render children?.()}
    </table>
</div>
