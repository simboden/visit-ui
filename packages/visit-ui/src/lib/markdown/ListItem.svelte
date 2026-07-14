<script lang="ts">
  import type { Snippet } from 'svelte'
//import { Text } from "$lib/elements" // metto text intorno a tutta la lista
  type Props = { children?: Snippet }

  const { children } : Props = $props()

</script>

<li class="p-1">{@render children?.()}</li>
