<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    text: string
    raw: string
    children?: Snippet
  }

  const { text, raw, children }: Props = $props()
</script>

<p class="text-text leading-relaxed">{@render children?.()}</p>