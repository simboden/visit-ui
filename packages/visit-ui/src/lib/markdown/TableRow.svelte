<script lang="ts">
  import type { Snippet } from 'svelte'
  type Props = { children?: Snippet }

  const { children }: Props = $props()
</script>

<tr class="border-y-1 border-(--color-input-border)" >{@render children?.()}</tr>
