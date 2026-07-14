<script lang="ts">
  type Props = { raw: string }

  const { raw } : Props = $props()
</script>


<span class="text-text text-sm font-mono whitespace-pre" >{raw.replace(/`/g, '') }</span>
