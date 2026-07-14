<script lang="ts">
	import { Button, Card, Code, FC, FS, H2, Menu, MenuItem, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let menuView = $state<string | number | null>('preview');
	let lastAction = $state('none');
</script>

<Page title="Menu">
	<FC class="gap-8">

		<Card class="m-8">
			<FS>
				<H2>Menu</H2>
				<Radio options={viewOptions} bind:value={menuView} class="mr-4" />
			</FS>
			<p>
				<Code>Menu</Code> wraps a dropdown menu attached to a trigger element (typically a
				<Code>Button</Code>). Its <Code>trigger</Code> snippet receives <Code>props</Code> that must
				be spread onto the trigger element. <Code>MenuItem</Code> renders an individual menu
				entry.
			</p>
			<ul>
				<li><Code>open</Code>: bindable, controls whether the menu is visible.</li>
				<li><Code>trigger</Code>: snippet receiving <Code>{`{ props }`}</Code> to spread on the trigger element.</li>
				<li><Code>class</Code>: extra CSS classes applied to the menu content.</li>
				<li>
					<Code>MenuItem</Code> props: <Code>onSelect</Code>, <Code>disabled</Code>,
					<Code>closeOnSelect</Code> (default true), <Code>class</Code>.
				</li>
			</ul>
			{#if menuView === 'preview'}
				<FC class="mt-4">
					<Menu>
						{#snippet trigger({ props })}
							<Button class="w-32" {...props}> Open menu </Button>
						{/snippet}
						<MenuItem onSelect={() => (lastAction = 'Edit')}                > Edit      </MenuItem>
						<MenuItem onSelect={() => (lastAction = 'Duplicate')}           > Duplicate </MenuItem>
						<MenuItem onSelect={() => (lastAction = 'Archive')}  disabled   > Archive   </MenuItem>
						<MenuItem onSelect={() => (lastAction = 'Delete')}              > Delete    </MenuItem>
					</Menu>
					<p>Last action: {lastAction}</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Button, Menu, MenuItem } from 'visit-ui';
  let lastAction = $state('none');
</` + `script>
<Menu>
  {#snippet trigger({ props })}
    <Button {...props}>Open menu</Button>
  {/snippet}
  <MenuItem onSelect={() => (lastAction = 'Edit')}              > Edit      </MenuItem>
  <MenuItem onSelect={() => (lastAction = 'Duplicate')}         > Duplicate </MenuItem>
  <MenuItem onSelect={() => (lastAction = 'Archive')}  disabled > Archive   </MenuItem>
  <MenuItem onSelect={() => (lastAction = 'Delete')}            > Delete    </MenuItem>
</Menu>
<p>Last action: {lastAction}</p>`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
