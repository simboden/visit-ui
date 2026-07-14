<script lang="ts">
  import type { Snippet } from 'svelte'
  interface Props {
    ordered: boolean
    start: number
    children?: Snippet
  }

  const { ordered, start, children }: Props = $props()
</script>

<div class="text-text">
{#if ordered }
  <ol {start} class="list-decimal pl-6">{@render children?.()}</ol>
{:else}
  <ul class="list-disc list-disc !marker:text-text pl-6">{@render children?.()}</ul>
{/if}
</div>