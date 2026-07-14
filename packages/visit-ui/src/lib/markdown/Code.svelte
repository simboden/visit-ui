<script lang="ts">
  import { Text } from "../components/index.js"

  interface Props {
    lang: string
    text: string
  }
  const { lang, text }: Props = $props()
</script>

<Text class="text-text text-sm font-mono whitespace-pre" >{text}</Text>

