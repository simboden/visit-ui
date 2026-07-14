<script lang="ts">
	import { Button, Card, Code, FC, FR, FS, H2, Page, Radio, toast } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let toastView = $state<string | number | null>('preview');
</script>

<Page title="Toast">
	<FC class="gap-8">

		<Card class="m-8">
			<FS>
				<H2>Toast</H2>
				<Radio options={viewOptions} bind:value={toastView} class="mr-4" />
			</FS>
			<p>
				<Code>ToastPanel</Code> renders the active toasts in the top-right corner of the screen.
				It is mounted once, in the root layout. To show a toast, call one of the methods on the
				<Code>toast</Code> store from anywhere in the app.
			</p>
			<ul>
				<li><Code>toast.show(item, options)</Code>: full control over <Code>title</Code>, <Code>description</Code>, <Code>color</Code> and <Code>icon</Code>.</li>
				<li><Code>toast.success(description)</Code>, <Code>toast.warning(description)</Code>, <Code>toast.error(description)</Code>, <Code>toast.info(description)</Code>: shortcuts for the four toast colors.</li>
				<li><Code>options.timeout</Code>: milliseconds before the toast auto-dismisses (default <Code>4000</Code>, <Code>0</Code> to disable).</li>
				<li>Hovering a toast pauses its auto-dismiss timer.</li>
				<li><Code>toast.dismiss(id)</Code> / <Code>toast.clear()</Code>: remove toasts manually.</li>
			</ul>
			{#if toastView === 'preview'}
				<FR class="mt-4 flex-wrap gap-2">
					<Button class="w-24" onclick={() => toast.info('Here is something to know.')}       > Info </Button>
					<Button class="w-24" onclick={() => toast.success('Saved successfully.')}           > Success </Button>
					<Button class="w-24" onclick={() => toast.warning('Heads up, something happened.')} > Warning </Button>
					<Button class="w-24" onclick={() => toast.error('Something went wrong.')}           > Error </Button>
					<Button class="w-24" 
						onclick={() =>
							toast.show({
								title: 'Update available',
								description: 'ToastPanel renders the active toasts in the top-right corner of the screen. It is mounted once, in the root layout. To show a toast, call one of the methods on the toast store from anywhere in the app.',
								color: '#info'
							})}
					> Custom </Button>
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Button, toast } from 'visit-ui';
</` + `script>
<Button onclick={() => toast.info('Here is something to know.')}        > Info      </Button>
<Button onclick={() => toast.success('Saved successfully.')}            > Success   </Button>
<Button onclick={() => toast.warning('Heads up, something happened.')}  > Warning   </Button>
<Button onclick={() => toast.error('Something went wrong.')}            > Error     </Button>
<Button
  onclick={() =>
    toast.show({
      title: 'Update available',
      description: 'A new version is ready to install.',
      color: 'success'
    })}
>
  Custom title
</Button>`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
