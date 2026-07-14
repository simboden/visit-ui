<script lang="ts">

// https://github.com/humanspeak/svelte-markdown


import SvelteMarkdown from '@humanspeak/svelte-markdown'

import heading 		from "./Heading.svelte";
import hr 			from "./Hr.svelte";
import link			from "./Link.svelte";
import listitem		from "./ListItem.svelte";
import list 		from "./List.svelte";
import paragraph 	from "./Paragraph.svelte";
import strong		from "./Strong.svelte";
import tablebody	from "./TableBody.svelte";
import tablecell	from "./TableCell.svelte";
import tablehead	from "./TableHead.svelte";
import tablerow		from "./TableRow.svelte";
import table		from "./Table.svelte";
import text			from "./Text.svelte";
import code			from "./Code.svelte";
import codespan  	from "./Codespan.svelte";
import br  	        from "./Br.svelte";


type Props = { source : string; };

let { source = "" } : Props = $props();

</script>

<SvelteMarkdown {source} renderers={{ heading , paragraph, hr, link, list }} />

<!--
 heading , paragraph, hr, link, list, br
 listitem, strong, tablebody, tablecell, tablehead, tablerow, table, text, code, codespan }} />
  -->


