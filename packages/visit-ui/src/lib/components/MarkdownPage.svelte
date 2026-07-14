<script lang="ts">
    import FC from './FC.svelte';
    import Card from './Card.svelte';
    import H3 from './H3.svelte';
    import TextArea from './TextArea.svelte';
    import Markdown from '../markdown/Markdown.svelte';

    const initial = `
# This is a H1
## This is a H2
### This is a H3

This is a paragraph with **bold** and <em>mixed HTML</em>

unordered list
* List item with \`inline code\`
* And a [link](https://svelte.dev)
  * With nested items
  * Supporting full markdown

ordered list
1. First item
2. Second item
    2. Sub-item A (indent with four spaces)
    2. Sub-item B
3. Third item
`

let text = $state(initial)

let rawHtml = $state( "" );

let container = $state<HTMLElement | null>(null);

    const tab = '  ';
    let result = '';
    let indent = '';

function basicFormat(html: string) {
  const tab = '  ';
  let result = '';
  let indent = '  ';

  html.split(/>\s*</).forEach((element: string) => {
    if (element.match(/^\/\w/)) indent = indent.substring(tab.length);
    result += indent + '<' + element + '>\r\n';
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += tab;
    }
  });
  return result.substring(1, result.length - 3);
}

$effect(() => {
    if (container) {
        //console.log(text) // per forzare l'aggiornamento
        let tmp = container.innerHTML.replaceAll("<!---->","").trim();
        //console.log('rawHtml',rawHtml)
        rawHtml = basicFormat(tmp)
    }
});

</script>

<H3>Markdown</H3>
<FC>
    <Card>
        <TextArea bind:value={text} rows={10} />
    </Card>
    <Card>
        <div bind:this={container} class="text-text">
            <Markdown source={text} />
        </div>
    </Card>
    <Card>
        <code class="whitespace-pre-wrap text-text">
            {rawHtml}
        </code>
    </Card>
</FC>
