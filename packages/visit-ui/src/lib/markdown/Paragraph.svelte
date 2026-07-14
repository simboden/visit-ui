<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = { children?: Snippet }

  const { children } : Props = $props()
</script>

<!-- mt-4 serve a manifestare le righa vuote -->
<p class="text-text leading-relaxed mt-4">{@render children?.()}</p>
