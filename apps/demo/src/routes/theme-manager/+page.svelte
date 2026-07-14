<script lang="ts">
	import { appShell, Button, Card, Code, FC, H2, Page, ThemeSwitch } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const groups: { label: string; vars: { key: string; usedIn: string }[] }[] = [
		{
			label: 'Sizes',
			vars: [
				{ key: 'radius-lg', usedIn: 'Card, AccordionItem — border radius; scrollbar thumb' },
				{ key: 'pad', usedIn: 'Card, AccordionItem, Dialog, Toast — internal padding' },
				{ key: 'card-border-sz', usedIn: 'Card, Accordion, Dialog — border width' },
				{ key: 'input-border-sz', usedIn: 'Input, Select, TextArea, AutoComplete, Menu — border width' },
				{ key: 'input-focus-sz', usedIn: 'Input, Select, AutoComplete, Check, Radio, AccordionItem, Toast — focus outline width' },
				{ key: 'button-focus-sz', usedIn: 'Button, ButtonLink — focus ring width' },
				{ key: 'navbar-border-sz', usedIn: 'Reserved for app use' }
			]
		},
		{
			label: 'Layout',
			vars: [
				{ key: 'color-body', usedIn: 'AppShell — page background; AppLeftSidebar overlay; Splitter divider' },
				{ key: 'color-body1', usedIn: 'Reserved for app use' },
				{ key: 'color-body2', usedIn: 'Reserved for app use' },
				{ key: 'color-dialog', usedIn: 'Dialog — background' },
				{ key: 'color-overlay', usedIn: 'Dialog.Overlay — backdrop' },
				{ key: 'color-navbar', usedIn: 'AppNavBar — background (with backdrop blur)' },
				{ key: 'color-hr', usedIn: 'HR — separator line' }
			]
		},
		{
			label: 'Text',
			vars: [
				{ key: 'color-text', usedIn: 'body (global text), AppShell, AppNavBar, AppLeftSidebar, AccordionItem, Radio, SidebarItem, Toast; Dimmed at 50% opacity; ul/ol bullet color' },
				{ key: 'color-head', usedIn: 'H1, H2, H3, H4, Dialog title' },
				{ key: 'color-lab', usedIn: 'Label, Chip text, FieldSearch icon, MultiAutoComplete chip label' },
				{ key: 'color-title', usedIn: 'Reserved for app use' },
				{ key: 'color-code', usedIn: 'Code — inline code text' },
				{ key: 'color-code-bg', usedIn: 'Code — inline code background' }
			]
		},
		{
			label: 'Card',
			vars: [
				{ key: 'color-card', usedIn: 'Card, Alert, AppLeftSidebar, AppRightSidebar, Splitter handle — background' },
				{ key: 'color-card-border', usedIn: 'Card, Alert, Dialog, AppNavBar, AppLeftSidebar, AppRightSidebar, SidebarGroup divider, AutoComplete dropdown, Splitter — border; scrollbar thumb' }
			]
		},
		{
			label: 'Accordion',
			vars: [
				{ key: 'color-acc', usedIn: 'AccordionItem — background' },
				{ key: 'color-acc-hover', usedIn: 'AccordionItem — hover background' },
				{ key: 'color-acc-border', usedIn: 'Accordion — outer border (when showBorder=true)' }
			]
		},
		{
			label: 'Input',
			vars: [
				{ key: 'color-input', usedIn: 'Input, Select, TextArea, AutoComplete, MultiAutoComplete, Check, Menu — background; Radio hover; scrollbar track' },
				{ key: 'color-input-hover', usedIn: 'Input, Select, TextArea, AutoComplete, MultiAutoComplete, SidebarItem, SidebarDropdown — hover background' },
				{ key: 'color-input-text', usedIn: 'Input, Select, TextArea, AutoComplete, MultiAutoComplete, Check label, Radio label, MenuItem — text' },
				{ key: 'color-input-border', usedIn: 'Input, Select, TextArea, AutoComplete, MultiAutoComplete, Check, Radio, Menu — border' },
				{ key: 'color-input-focus', usedIn: 'Input, Select, AutoComplete, TextArea — focused border color' },
				{ key: 'color-input-error', usedIn: 'LabelError — text; Input — error state border' }
			]
		},
		{
			label: 'Primary',
			vars: [
				{ key: 'color-pri', usedIn: 'Button/ButtonLink primary — background/text; Link — color; Check — checked bg; Radio — selected dot; Splitter — divider hover' },
				{ key: 'color-pri-hover', usedIn: 'Button/ButtonLink primary — hover background' },
				{ key: 'color-pri-focus', usedIn: 'Button/ButtonLink primary — focus ring' },
				{ key: 'color-pri-text', usedIn: 'Button/ButtonLink primary filled — text; Check — checkmark icon' }
			]
		},
		{
			label: 'Secondary',
			vars: [
				{ key: 'color-sec', usedIn: 'Button/ButtonLink secondary filled — background' },
				{ key: 'color-sec-hover', usedIn: 'Button/ButtonLink secondary — hover background' },
				{ key: 'color-sec-focus', usedIn: 'Button/ButtonLink secondary — focus ring' },
				{ key: 'color-sec-text', usedIn: 'Button/ButtonLink secondary filled — text' }
			]
		},
		{
			label: 'Danger',
			vars: [
				{ key: 'color-danger', usedIn: 'Button/ButtonLink danger filled — background' },
				{ key: 'color-danger-hover', usedIn: 'Button/ButtonLink danger — hover background' },
				{ key: 'color-danger-focus', usedIn: 'Button/ButtonLink danger — focus ring' },
				{ key: 'color-danger-text', usedIn: 'Button/ButtonLink danger filled — text' }
			]
		},
		{
			label: 'Toast',
			vars: [
				{ key: 'color-info', usedIn: 'Toast — info variant background and border' },
				{ key: 'color-success', usedIn: 'Toast — success variant background and border' },
				{ key: 'color-warning', usedIn: 'Toast — warning variant background and border' },
				{ key: 'color-error', usedIn: 'Toast — error variant background and border' }
			]
		},
		{
			label: 'Chip',
			vars: [
				{ key: 'color-chip', usedIn: 'Chip — default background; MultiAutoComplete — chip background' }
			]
		}
	];
</script>

<Page title="Theme Manager">
	<FC class="gap-8">
		<p>
			<Code>ThemeManager</Code> is a panel component that lets users edit all theme variables at
			runtime — colors grouped by category, size values, plus Reset / New / Save / Delete actions and
			a "Copy vars" button. It is designed to live inside <Code>AppRightSidebar</Code> and
			coordinates with it through the <Code>appShell</Code> store.
		</p>

		<Card>
			<H2>Usage</H2>
			<p>
				Place <Code>ThemeManager</Code> inside <Code>AppRightSidebar</Code> in your layout. Add a
				<Code>RightSidebarToggle</Code> (or any button calling
				<Code>appShell.openRight()</Code>) to let users open it.
			</p>
			<CodeBlock
code={`[+layout.svelte]
<script lang="ts">
  import { AppRightSidebar, AppShell, ThemeManager, ... } from 'visit-ui';
  import RightSidebarToggle from '$lib/components/RightSidebarToggle.svelte';
</` + `script>

<AppShell>
  {#snippet navbar()}
    <AppNavBar>
      {#snippet end()}
        <ThemeSwitch />
        <RightSidebarToggle icon={mdiPencil} />
      {/snippet}
    </AppNavBar>
  {/snippet}

  {#snippet rightSidebar()}
    <AppRightSidebar>
      <ThemeManager />
    </AppRightSidebar>
  {/snippet}

  {@render children()}
</AppShell>`}
			/>
		</Card>

		<Card>
			<H2>ThemeSwitch</H2>
			<p>
				<Code>ThemeSwitch</Code> is a compact button that cycles through all available themes by
				calling <Code>theme.next()</Code>. It displays the current theme's icon. Use it in the
				navbar alongside <Code>RightSidebarToggle</Code>.
			</p>
			<ThemeSwitch />
		</Card>

		<Card>
			<H2>Custom themes and persistence</H2>
			<p>
				By default the theme store holds <Code>DARK_THEME</Code> and
				<Code>LIGHT_THEME</Code>. Call <Code>theme.setSerializer(serializer)</Code> to supply a
				custom theme list and persist changes. The serializer must implement
				<Code>load()</Code>, <Code>save(theme)</Code> and optionally <Code>delete(id)</Code>.
			</p>
			<CodeBlock
code={`import { theme } from 'visit-ui';

theme.setSerializer({
  load() {
    const raw = localStorage.getItem('my-themes');
    return raw ? JSON.parse(raw) : [];
  },
  save(t) {
    const all = this.load();
    const idx = all.findIndex((x) => x.id === t.id);
    if (idx >= 0) all[idx] = t; else all.push(t);
    localStorage.setItem('my-themes', JSON.stringify(all));
  },
  delete(id) {
    const all = this.load().filter((x) => x.id !== id);
    localStorage.setItem('my-themes', JSON.stringify(all));
  }
});`}
			/>
		</Card>

		<Card>
			<H2>Try it</H2>
			<p>The ThemeManager is live in this demo — click to open it.</p>
			<Button onclick={() => appShell.openRight()}>Open ThemeManager</Button>
		</Card>

		<Card>
			<H2>Theme variables</H2>
			<p>
				All variables are CSS custom properties applied to <Code>:root</Code> at runtime. They map
				to Tailwind utilities via the <Code>@theme</Code> block in <Code>theme.css</Code>.
			</p>
			<table class="w-full text-sm border-collapse mt-2">
				<thead>
					<tr class="border-b border-card-border text-left text-head">
						<th class="py-2 pr-4 font-semibold w-48">Variable</th>
						<th class="py-2 font-semibold">Used in</th>
					</tr>
				</thead>
				<tbody>
					{#each groups as group}
						<tr class="border-b border-card-border bg-input/30">
							<td colspan="2" class="py-1.5 px-2 text-xs font-bold uppercase tracking-wider text-text/50">
								{group.label}
							</td>
						</tr>
						{#each group.vars as v}
							<tr class="border-b border-card-border/50 hover:bg-input/20">
								<td class="py-2 pr-4 align-top">
									<Code>--{v.key}</Code>
								</td>
								<td class="py-2 text-text/80 align-top">{v.usedIn}</td>
							</tr>
						{/each}
					{/each}
				</tbody>
			</table>
		</Card>
	</FC>
</Page>
