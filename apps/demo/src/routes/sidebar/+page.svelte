<script lang="ts">
	import { mdiClose, mdiCog, mdiHome, mdiShapeOutline } from '@mdi/js';
	import { Card, Code, FC, FS, H2, Link, Page, Radio, SidebarDropdown, SidebarGroup, SidebarItem } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let groupView = $state<string | number | null>('preview');
	let dropdownView = $state<string | number | null>('preview');
	let lastClick = $state('none');
</script>

<Page title="Sidebar">
	<FC class="gap-8">
		<Card>
			<FS>
				<H2>SidebarGroup / SidebarItem</H2>
				<Radio options={viewOptions} bind:value={groupView} class="mr-4" />
			</FS>
			<p>
				<Code>SidebarGroup</Code> is a <Code>{'<ul>'}</Code> container for a set of
				<Code>SidebarItem</Code>s. Each <Code>SidebarItem</Code> renders an <Code>{'<a>'}</Code> when
				given an <Code>href</Code>, or a <Code>{'<button>'}</Code> otherwise, and highlights itself
				automatically when <Code>href</Code> matches the current route. A <Code>rightIcon</Code> can
				be added for a secondary action (e.g. a "remove" <Code>x</Code>) anchored to the right edge,
				independent of the item's own <Code>onclick</Code>.
			</p>
			<ul>
				<li><Code>SidebarGroup</Code> props: <Code>border</Code> (adds a top border, default false), <Code>class</Code>.</li>
				<li>
					<Code>SidebarItem</Code> props: <Code>label</Code>, <Code>href</Code>, <Code>icon</Code>,
					<Code>rightIcon</Code>, <Code>rightIconLabel</Code>, <Code>onclick</Code>,
					<Code>onRightIconClick</Code>, <Code>class</Code>. <Code>label</Code> accepts a literal
					string, or a <Code>"#text_id"</Code> to resolve a translation (see
					<Link href="/language">Language</Link>).
				</li>
			</ul>
			{#if groupView === 'preview'}
				<div class="border-1 border-dashed border-pri rounded-xl p-0 m-0 w-[300px]" >
					<SidebarGroup class="max-w-xs">
						<SidebarItem label="Home" href="/" icon={mdiHome} />
						<SidebarItem label="Sidebar (this page)" href="/sidebar" icon={mdiShapeOutline} />
						<SidebarItem label="Click me" icon={mdiCog} onclick={() => (lastClick = 'Click me')} />
					</SidebarGroup>
				</div>
				<p>Last click: {lastClick}</p>
			{:else}
				<CodeBlock
code={`<SidebarGroup>
  <SidebarItem label="Home" href="/" icon={mdiHome} />
  <SidebarItem label="Sidebar (this page)" href="/sidebar" icon={mdiShapeOutline} />
  <SidebarItem label="Click me" icon={mdiCog} onclick={() => (lastClick = 'Click me')} />
</SidebarGroup>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>SidebarDropdown</H2>
				<Radio options={viewOptions} bind:value={dropdownView} class="mr-4" />
			</FS>
			<p>
				<Code>SidebarDropdown</Code> is a collapsible group that nests <Code>SidebarItem</Code>s
				inside a toggleable trigger.
			</p>
			<ul>
				<li>
					<Code>SidebarDropdown</Code> props: <Code>label</Code>, <Code>icon</Code>,
					<Code>open</Code> (bindable, default false), <Code>class</Code>. <Code>label</Code>
					accepts a literal string, or a <Code>"#text_id"</Code> to resolve a translation (see
					<Link href="/language">Language</Link>).
				</li>
			</ul>
			{#if dropdownView === 'preview'}
				<div class="border-1 border-dashed border-pri rounded-xl p-0 m-0 w-[300px]" >
					<SidebarGroup class="max-w-xs">
						<SidebarDropdown label="Todo's" icon={mdiCog} open={true}>
							<SidebarItem
								label="Task1"
								rightIcon={mdiClose}
								rightIconLabel="Remove Task1"
								onclick={() => (lastClick = 'Task1')}
								onRightIconClick={() => (lastClick = 'Remove Task1')}
							/>
							<SidebarItem
								label="Task2"
								rightIcon={mdiClose}
								rightIconLabel="Remove Task2"
								onclick={() => (lastClick = 'Task2')}
								onRightIconClick={() => (lastClick = 'Remove Task2')}
							/>
							<SidebarItem
								label="Task3"
								rightIcon={mdiClose}
								rightIconLabel="Remove Task3"
								onclick={() => (lastClick = 'Task3')}
								onRightIconClick={() => (lastClick = 'Remove Task3')}
							/>
						</SidebarDropdown>
					</SidebarGroup>
				</div>
				<p>Last click: {lastClick}</p>
			{:else}
				<CodeBlock
code={`<SidebarGroup>
  <SidebarDropdown label="Todo's" icon={mdiCog}>
    <SidebarItem
      label="Task1"
      rightIcon={mdiClose}
      rightIconLabel="Remove Task1"
      onclick={() => (lastClick = 'Task1')}
      onRightIconClick={() => (lastClick = 'Remove Task1')}
    />
    <SidebarItem
      label="Task2"
      rightIcon={mdiClose}
      rightIconLabel="Remove Task2"
      onclick={() => (lastClick = 'Task2')}
      onRightIconClick={() => (lastClick = 'Remove Task2')}
    />
    <SidebarItem
      label="Task3"
      rightIcon={mdiClose}
      rightIconLabel="Remove Task3"
      onclick={() => (lastClick = 'Task3')}
      onRightIconClick={() => (lastClick = 'Remove Task3')}
    />
  </SidebarDropdown>
</SidebarGroup>`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
