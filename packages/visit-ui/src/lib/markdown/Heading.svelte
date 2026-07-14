<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Text, H1, H2, H3, H4 } from "../components/index.js"

  interface Props {
    depth: number
    raw: string
    text: string
    children?: Snippet
  }
  const
  {
    depth,
    raw,
    text,
    children
  }: Props = $props()

</script>


{#if depth === 1}       <H1>{@render children?.()}</H1>

{:else if depth === 2}  <H2>{@render children?.()}</H2>

{:else if depth === 3}  <H3>{@render children?.()}</H3>

{:else if depth === 4}  <H4>{@render children?.()}</H4>

{:else if depth === 5}  <Text >{@render children?.()}</Text>

{:else if depth === 6}  <Text >{@render children?.()}</Text>

{:else}                 {raw}

{/if}
