<script lang="ts">
	import { Accordion, AccordionItem, Card, Code, FC, FS, H2, Link, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let accordionView = $state<string | number | null>('preview');
	let accordionOpenItems = $state(["item-1"]);

	let accordionView2 = $state<string | number | null>('preview');
	let accordionOpenItems2 = $state([]);
</script>

<Page title="Accordion">
	<FC class="gap-8">
		<Card>
			<FS>
				<!-- <H2>Accordion</H2> -->
               <p>Accordion is the container for a set of AccordionItems.</p>

				<Radio options={viewOptions} bind:value={accordionView} class="mr-4" />
			</FS>
			<p>An AccordionItem is a toggle button that shows or hide its children</p>
			<p>parameters:</p>
			<ul>
				<li><Code>value</Code>: bindable array of the open item values.</li>
				<li><Code>showBorder</Code>: shows the elements borders, default false</li>
				<li><Code>class</Code>: extra CSS classes applied to the container.</li>
				<li>
					<Code>AccordionItem</Code>'s <Code>title</Code> accepts a literal string, or a
					<Code>"#text_id"</Code> to resolve a translation (see <Link href="/language">Language</Link>).
				</li>
			</ul>
			{#if accordionView === 'preview'}
                <Accordion bind:value={accordionOpenItems} showBorder={true} class="max-w-xl">
                    <AccordionItem value="item-1" title="Section 1">
                            <p>Content of the first section.</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Section 2">
                            <p>Content of the second section.</p>
                    </AccordionItem>
                    <AccordionItem value="item-3" title="Section 3">
                            <p>Content of the third section.</p>
                    </AccordionItem>
                </Accordion>
			{:else}
				<CodeBlock
code=
{`<script lang="ts">
  import { Accordion, AccordionItem } from 'visit-ui';
  let openItems = $state(['item-1']);
</` + `script>
<Accordion bind:value={openItems} showBorder={true} class="max-w-xl">
  <AccordionItem value="item-1" title="Section 1">
    <p>Content of the first section.</p>
  </AccordionItem>
  <AccordionItem value="item-2" title="Section 2">
    <p>Content of the second section.</p>
  </AccordionItem>
  <AccordionItem value="item-3" title="Section 3">
    <p>Content of the third section.</p>
  </AccordionItem>
</Accordion>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
               <p>Without borders</p>

				<Radio options={viewOptions} bind:value={accordionView2} class="mr-4" />
			</FS>
			{#if accordionView2 === 'preview'}
                <Accordion bind:value={accordionOpenItems2} class="max-w-xl">
                    <AccordionItem value="item-1" title="Section 1">
                            <p>Content of the first section.</p>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Section 2">
                            <p>Content of the second section.</p>
                    </AccordionItem>
                    <AccordionItem value="item-3" title="Section 3">
                            <p>Content of the third section.</p>
                    </AccordionItem>
                </Accordion>
			{:else}
				<CodeBlock
code=
{`<script lang="ts">
  import { Accordion, AccordionItem } from 'visit-ui';
</` + `script>

<Accordion>
  <AccordionItem title="Section 1">
    <p>Content of the first section.</p>
  </AccordionItem>
  <AccordionItem title="Section 2">
    <p>Content of the second section.</p>
  </AccordionItem>
  <AccordionItem title="Section 3">
    <p>Content of the third section.</p>
  </AccordionItem>
</Accordion>`}
				/>
			{/if}
		</Card>
    </FC>
</Page>
