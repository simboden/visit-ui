<script lang="ts">
  import type { Snippet } from 'svelte'
  type Props = { children?: Snippet }

  const { children }: Props = $props()
</script>

<thead class="font-bold">{@render children?.()}</thead>
