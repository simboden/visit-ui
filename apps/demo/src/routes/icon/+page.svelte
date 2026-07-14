<script lang="ts">
	import { Card, Code, FC, FR, FS, H2, Icon, Page, Radio, Spinner } from 'visit-ui';
	import { mdiAccount, mdiCog, mdiHeart, mdiHome, mdiLoading } from '@mdi/js';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let iconView = $state<string | number | null>('preview');
	let spinnerView = $state<string | number | null>('preview');
</script>

<Page title="Icon">
	<FC class="gap-8">
		<Card>
			<FS>
				<H2>Icon</H2>
				<Radio options={viewOptions} bind:value={iconView} class="mr-4" />
			</FS>
			<p>Renders an MDI icon path inside an SVG.</p>
			<p>parameters:</p>
			<ul>
				<li><Code>icon</Code>: an MDI icon path, e.g. from <Code>@mdi/js</Code>.</li>
				<li><Code>size</Code>: width and height of the icon (default <Code>1.5em</Code>).</li>
				<li><Code>color</Code>: fill color (default <Code>currentColor</Code>).</li>
				<li><Code>spin</Code>: when true, the icon spins continuously.</li>
				<li><Code>class</Code>: extra CSS classes applied to the SVG.</li>
			</ul>
			{#if iconView === 'preview'}
				<FR>
					<Icon icon={mdiHome} size="2rem" />
					<Icon icon={mdiAccount} size="2rem" />
					<Icon icon={mdiCog} size="2rem" />
					<Icon icon={mdiHeart} size="2rem" color="var(--color-danger)" />
					<Icon icon={mdiLoading} size="2rem" spin />
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Icon } from 'visit-ui';
  import { mdiAccount, mdiCog, mdiHeart, mdiHome, mdiLoading } from '@mdi/js';
</` + `script>

<Icon icon={mdiHome} size="2rem" />
<Icon icon={mdiAccount} size="2rem" />
<Icon icon={mdiCog} size="2rem" />
<Icon icon={mdiHeart} size="2rem" color="var(--color-danger)" />
<Icon icon={mdiLoading} size="2rem" spin />`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>Spinner</H2>
				<Radio options={viewOptions} bind:value={spinnerView} class="mr-4" />
			</FS>
			<p>A spinning loading indicator.</p>
			<p>parameters:</p>
			<ul>
				<li><Code>size</Code>: width and height of the spinner (default <Code>1.5em</Code>).</li>
				<li><Code>class</Code>: extra CSS classes applied to the SVG.</li>
			</ul>
			{#if spinnerView === 'preview'}
				<FR>
					<Spinner size="1.5rem" />
					<Spinner size="2rem" />
					<Spinner size="2.5rem" />
					<Spinner size="3rem" />
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Spinner } from 'visit-ui';
</` + `script>
    <Spinner size="1.5rem" />
    <Spinner size="2rem" />
    <Spinner size="2.5rem" />
    <Spinner size="3rem" />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
