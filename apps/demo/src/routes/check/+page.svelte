<script lang="ts">
	import { Card, Check, Code, FC, FS, H2, Link, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let check1 = $state(true);
	let check2 = $state(false);

	let view = $state<string | number | null>('preview');
</script>

<Page title="Check">
	<FC class="gap-8">
        <Card>
            <FS>
                <p> Check is a styled Bits-ui Checkbox providing the following attributes:</p>
                <Radio options={viewOptions} bind:value={view} class="mr-4" />
            </FS>
            
            <ul>
            <li><Code>label</Code><p>(string, optional) the text shown. Accepts a literal string, or a <Code>"#text_id"</Code> to resolve a translation (see <Link href="/language">Language</Link>).</p></li>
            <li><Code>value</Code><p>(boolean, bindable) the element status</p></li>
            <li><Code>disabled</Code><p>(boolean, optional) </p></li>
            </ul>

            {#if view === 'preview'}
                <FC class="gap-2 mt-3">
                    <Check label="checked"   bind:value={check1} ></Check>
                    <Check label="unchecked" bind:value={check2} ></Check>
                    <Check label="disabled checked"   disabled value={true} ></Check>
                    <Check label="disabled unchecked" disabled value={false} ></Check>
                </FC>
            {:else}
                <CodeBlock
code={`<script lang="ts">
  import { Check } from 'visit-ui';
  let check1 = $state(true);
  let check2 = $state(false);
</` + `script>

<Check label="checked"   bind:value={check1} />
<Check label="unchecked" bind:value={check2} />
<Check label="disabled checked"   disabled value={true} />
<Check label="disabled unchecked" disabled value={false} />`}
                />
            {/if}
        </Card>
	</FC>
</Page>
