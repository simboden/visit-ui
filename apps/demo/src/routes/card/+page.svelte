<script lang="ts">
	import { Button, Card, Code, FC, FR, FS, H2, H3, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let basicView = $state<string | number | null>('preview');
	let childrenView = $state<string | number | null>('preview');
	let nestedView = $state<string | number | null>('preview');
</script>

<Page title="Card">
	<FC class="gap-8">
		<p>
			<Code>Card</Code> groups related elements together. It provides a preset border, background
			and padding, and arranges its children internally using an <Code>FC</Code>, so children are
			stacked vertically with a default gap.
		</p>
		<p>
			Its appearance is controlled by the theme variables <Code>color-card</Code> (background),
			<Code>color-card-border</Code> and <Code>card-border-sz</Code> (border), <Code>radius-lg</Code>
			(corner radius) and <Code>pad</Code> (padding).
		</p>

		<Card class="mt-8">
			<FS>
				<H2>Basic example</H2>
				<Radio options={viewOptions} bind:value={basicView} class="mr-4" />
			</FS>
			<p>A card containing only text.</p>
			{#if basicView === 'preview'}
				<Card class="max-w-sm">
					<p>basic card</p>
				</Card>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Card } from 'visit-ui';
</` + `script>

<Card>
  <p>basic card</p>
</Card>`}
				/>
			{/if}
		</Card>

		<Card class="mt-8">
			<FS>
				<H2>Example with children</H2>
				<Radio options={viewOptions} bind:value={childrenView} class="mr-4" />
			</FS>
			{#if childrenView === 'preview'}
				<Card class="max-w-sm">
					<p class="text-lg font-semibold">Card Title</p>
					<p>card text</p>
					<FR class="justify-center">
						<Button>button1</Button>
						<Button variant="ghost">button2</Button>
					</FR>
				</Card>
			{:else}
				<CodeBlock
code={`<Card>
  <H3>Card Title</H3>
  <p>card text</p>
  <FR class="justify-center">
    <Button>button1</Button>
    <Button variant="ghost">button2</Button>
  </FR>
</Card>`}
				/>
			{/if}
		</Card>

		<Card class="mt-8">
			<FS>
				<H2>Nested cards</H2>
				<Radio options={viewOptions} bind:value={nestedView} class="mr-4" />
			</FS>
			<p>Cards can be nested, using transparent background can be useful here.</p>
			{#if nestedView === 'preview'}
				<Card class="max-w-sm">
					<H3>Card</H3>
					<Card>
						<H3>Nested card</H3>
						<p>This is the nested card content.</p>
					</Card>
				</Card>
			{:else}
				<CodeBlock
code={`<Card>
  <H3>Card</H3>
  <Card>
    <H3>Nested card</H3>
    <p>This is the nested card content.</p>
  </Card>
</Card>`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
