<script lang="ts">
	import { Button, Card, Code, FC, FR, FS, H2, H3, HR, Page, Radio } from 'visit-ui';
	import { mdiAccount, mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const variants = ['filled', 'outlined', 'ghost'] as const;
	const colors = ['primary', 'secondary', 'danger'] as const;
	const sizes = ['small', 'medium', 'large'] as const;
	const viewOptions = ['preview', 'code'];

	let colorView = $state<string | number | null>('preview');
	let variantView = $state<string | number | null>('preview');
	let stateView = $state<string | number | null>('preview');
	let iconView = $state<string | number | null>('preview');
	let tooltipView = $state<string | number | null>('preview');
	let sizeView = $state<string | number | null>('preview');
</script>

<Page title="Button">
	<FC class="gap-8">
		<p>button provide the following parameters:</p>

		<Card>
			<FS>
				<H2>color</H2>
				<Radio options={viewOptions} bind:value={colorView} class="mr-4" />
			</FS>
			{#if colorView === 'preview'}
				<FR>
					<Button color="primary">primary</Button>
					<Button color="secondary">secondary</Button>
					<Button color="danger">danger</Button>
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Button } from 'visit-ui';
</` + `script>
<Button>primary</Button>
<Button color="secondary">secondary</Button>
<Button color="danger">danger</Button>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>variant</H2>
				<Radio options={viewOptions} bind:value={variantView} class="mr-4" />
			</FS>
			{#if variantView === 'preview'}
				<div class="grid grid-cols-4 gap-2 w-110">
					{#each variants as variant (variant)}
						{variant}
						{#each colors as color (color)}
							<Button class="w-24" {variant} {color}>{color}</Button>
						{/each}
					{/each}
				</div>
			{:else}
				<CodeBlock
code={`{#each ['filled', 'outlined', 'ghost'] as variant}
  {#each ['primary', 'secondary', 'danger'] as color}
    <Button {variant} {color}>{color}</Button>
  {/each}
{/each}`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>disabled and loading state</H2>
				<Radio options={viewOptions} bind:value={stateView} class="mr-4" />
			</FS>
			{#if stateView === 'preview'}
				<FR>
					<Button>normal</Button>
					<Button disabled>disabled</Button>
					<Button loading>loading</Button>
				</FR>
			{:else}
				<CodeBlock
code={`<Button>normal</Button>
<Button disabled>disabled</Button>
<Button loading>loading</Button>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>icon</H2>
				<Radio options={viewOptions} bind:value={iconView} class="mr-4" />
			</FS>
			{#if iconView === 'preview'}
				<FR>
					<Button icon={mdiAccount}>with icon</Button>
					<Button icon2={mdiClose}>with icon2</Button>
					<Button icon={mdiChevronLeft} icon2={mdiChevronRight}>with both</Button>
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Button } from 'visit-ui';
  import { mdiAccount, mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';
</` + `script>

<Button icon={mdiAccount}>with icon</Button>
<Button icon2={mdiClose}>with icon2</Button>
<Button icon={mdiChevronLeft} icon2={mdiChevronRight}>with both</Button>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>title (tooltip)</H2>
				<Radio options={viewOptions} bind:value={tooltipView} class="mr-4" />
			</FS>
			{#if tooltipView === 'preview'}
				<Button class="w-32" title="Tooltip text">with tooltip</Button>
			{:else}
				<CodeBlock code={`<Button class="w-32" title="Tooltip text">with tooltip</Button>`} />
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>size</H2>
				<Radio options={viewOptions} bind:value={sizeView} class="mr-4" />
			</FS>
			{#if sizeView === 'preview'}
				<FR>
					{#each sizes as size (size)}
						<Button {size}>{size}</Button>
					{/each}
				</FR>
			{:else}
				<CodeBlock
code={`<Button size="small">small</Button>
<Button size="medium">medium</Button>
<Button size="large">large</Button>`}
				/>
			{/if}
		</Card>

		<HR />
		<H3>Button theme variables:</H3>
		<ul>
			<li>all: <Code>focus-ring-sz</Code>, <Code>radius_lg</Code></li>
			<li>
				primary: <Code>color-pri-text</Code>, <Code>color-pri</Code>, <Code>color-pri-hover</Code>,
				<Code>color-pri-focus</Code>
			</li>
			<li>
				secondary: <Code>color-sec-text</Code>, <Code>color-sec</Code>,
				<Code>color-sec-hover</Code>, <Code>color-sec-focus</Code>
			</li>
			<li>
				danger: <Code>color-danger-text</Code>, <Code>color-danger</Code>,
				<Code>color-danger-hover</Code>, <Code>color-danger-focus</Code>
			</li>
		</ul>
	</FC>
</Page>
