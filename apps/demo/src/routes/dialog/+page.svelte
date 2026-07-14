<script lang="ts">
	import { Button, Card, Code, ColorEditor, ConfirmDialog, Dialog, FC, FR, FS, H2, Link, MessageBox, Page, Radio } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	let dialogOpen = $state(false);
	let confirmOpen = $state(false);
	let confirmResult = $state<boolean | null>(null);

	let messageBoxOpen = $state(false);

	let editorOpen = $state(false);
	let editorColor = $state('#22c55eff');

	let dialogView = $state<string | number | null>('preview');
	let confirmView = $state<string | number | null>('preview');
	let messageBoxView = $state<string | number | null>('preview');
	let colorEditorView = $state<string | number | null>('preview');
</script>

<Page title="Dialogs">
	<FC class="gap-8">

		<Card>
			<FS>
				<H2>Dialog</H2>
				<Radio options={viewOptions} bind:value={dialogView} class="mr-4" />
			</FS>
            <p>parameters:</p>
			<ul>
				<li><Code>open</Code>: bindable, controls whether the dialog is visible.</li>
				<li>
					<Code>title</Code>: optional title shown at the top of the dialog. Accepts a literal
					string, or a <Code>"#text_id"</Code> to resolve a translation (see <Link href="/language"
						>Language</Link
					>).
				</li>
				<li>
					<Code>description</Code>: optional descriptive text shown below the title. Same
					<Code>"#text_id"</Code> support as <Code>title</Code>.
				</li>
				<li><Code>showClose</Code>: shows a close button in the top-right corner (default true).</li>
				<li><Code>draggable</Code>: when true, the dialog can be moved by dragging its title.</li>
				<li>
					<Code>showOverlay</Code>: when true (default), shows a backdrop behind the dialog and
					blocks interaction with the rest of the page.
				</li>
				<li><Code>onOpenAutoFocus</Code>: callback invoked when the dialog receives focus on open.</li>
				<li><Code>class</Code>: extra CSS classes applied to the dialog content.</li>
			</ul>
			{#if dialogView === 'preview'}
				<FC class="gap-2">
					<Button onclick={() => (dialogOpen = true)}>Open dialog</Button>
					<Dialog
						bind:open={dialogOpen}
						title="Dialog Title"
						description="optional dialog description"
                        showClose
					>
						<p>This is the dialog content.</p>
					</Dialog>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Button, Dialog } from 'visit-ui';
  let open = $state(false);
</` + `script>

<Button onclick={() => (open = true)}>Open dialog</Button>
<Dialog
    bind:open
    title="Dialog Title"
    description="optional dialog description"
    showClose
>
  <p>This is the dialog content.</p>
</Dialog>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>ConfirmDialog</H2>
				<Radio options={viewOptions} bind:value={confirmView} class="mr-4" />
			</FS>
			<p>This is a dialog that returns a value, via the <Code>onconfirm</Code> callback.</p>
			<ul>
				<li>
					<Code>title</Code>, <Code>text</Code>, <Code>okLabel</Code>, <Code>cancelLabel</Code>: each
					accepts a literal string, or a <Code>"#text_id"</Code> to resolve a translation (see
					<Link href="/language">Language</Link>).
				</li>
			</ul>
			{#if confirmView === 'preview'}
				<FC class="gap-2">
					<Button onclick={() => (confirmOpen = true)}>Delete item</Button>
					<ConfirmDialog
						bind:open={confirmOpen}
						title="Confirm deletion"
						text="Are you sure you want to delete this item?"
						okLabel="Delete"
						cancelLabel="Cancel"
						onconfirm={(result) => (confirmResult = result)}
					/>
					<p>
						Result: {confirmResult === null ? 'none' : confirmResult ? 'confirmed' : 'cancelled'}
					</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Button, ConfirmDialog } from 'visit-ui';

  let open = $state(false);
  let result = $state<boolean | null>(null);
</` + `script>

<Button onclick={() => (open = true)}>Delete item</Button>
<ConfirmDialog
  bind:open
  title="Confirm deletion"
  text="Are you sure you want to delete this item?"
  okLabel="Delete"
  cancelLabel="Cancel"
  onconfirm={(value) => (result = value)}
/>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>MessageBox</H2>
				<Radio options={viewOptions} bind:value={messageBoxView} class="mr-4" />
			</FS>
			<p>
				<Code>MessageBox</Code> is a modal dialog with a single close button. Use it to display
				informational messages that require the user's acknowledgement. Controlled via the
				<Code>open</Code> bindable prop. Differs from <Code>ConfirmDialog</Code> (which has two
				buttons for a yes/no choice).
			</p>
			<ul>
				<li>
					<Code>title</Code>, <Code>text</Code>, <Code>buttonLabel</Code>: each accepts a literal
					string, or a <Code>"#text_id"</Code> to resolve a translation (see
					<Link href="/language">Language</Link>).
				</li>
			</ul>
			{#if messageBoxView === 'preview'}
				<Button onclick={() => (messageBoxOpen = true)}>Open MessageBox</Button>
				<MessageBox
					bind:open={messageBoxOpen}
					title="Information"
					text="Your data has been saved successfully."
					buttonLabel="Got it"
					onclose={() => (messageBoxOpen = false)}
				/>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { MessageBox } from 'visit-ui';
  let open = $state(false);
</` + `script>

<Button onclick={() => open = true}>Open</Button>
<MessageBox
  bind:open
  title="Information"
  text="Your data has been saved successfully."
  buttonLabel="Got it"
  onclose={() => open = false}
/>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>ColorEditor</H2>
				<Radio options={viewOptions} bind:value={colorEditorView} class="mr-4" />
			</FS>
			<p>
				The <Code>ColorEditor</Code> does not use a backdrop, so colors can be picked from the rest
				of the page. It can be moved by dragging its title.
			</p>
			{#if colorEditorView === 'preview'}
				<FR class="items-center gap-4">
					<Button onclick={() => (editorOpen = true)}>Open color editor</Button>
					<div
						class="size-8 rounded border border-input-border"
						style="background-color: {editorColor};"
					></div>
					<p>{editorColor}</p>
				</FR>
				<ColorEditor bind:open={editorOpen} bind:color={editorColor} />
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Button, ColorEditor } from 'visit-ui';

  let open = $state(false);
  let color = $state('#22c55eff');
</` + `script>

<Button onclick={() => (open = true)}>Open color editor</Button>
<div class="size-8 rounded border border-input-border" style="background-color: {color};"></div>
<p>{color}</p>
<ColorEditor bind:open bind:color />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
