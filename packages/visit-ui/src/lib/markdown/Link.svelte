<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Link } from "../components/index.js"

  interface Props {
    href?: string
    title?: string
    children?: Snippet
  }
  const { href = '', title, children }: Props = $props()
</script>

 <Link {href} class="anchor">{title}{@render children?.()}</Link>
