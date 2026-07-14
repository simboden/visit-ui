<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    header: boolean
    align?: "left" | "center" | "right" | "justify" | "char" | null | undefined;
    children?: Snippet
  }

  const { header, align, children }: Props = $props()
</script>

{#if header}
  <th {align} class="p-2 text-base"           >{@render children?.()}</th>
{:else}
  <td {align} class="p-2 text-base text-left" >{@render children?.()}</td>
{/if}
