<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import {AppLeftSidebar,AppNavBar,AppRightSidebar,AppShell,SidebarGroup,SidebarItem,theme,lang,ThemeManager,ThemeSwitch,LangSwitch,ToastPanel } from 'visit-ui';
	import { mdiPencil } from '@mdi/js';
	import RightSidebarToggle from '$lib/components/RightSidebarToggle.svelte';
	import {localStorageThemeSerializer} from '$lib/themeSerializer';
	import {localStorageLangSerializer} from '$lib/langSerializer';
	import visitLogo from '$lib/assets/visit3.svg';
	theme.setSerializer(localStorageThemeSerializer);
	lang.setSerializer(localStorageLangSerializer);

	let { children } = $props();
</script>

<AppShell>
	{#snippet navbar()}
		<AppNavBar>
			{#snippet brand()}
				<a href="/" class="flex items-center gap-2 text-lg font-bold">
					<img src={visitLogo} alt="" class="h-8 w-8" />
					visit-ui demo
				</a>
			{/snippet}
			{#snippet center()}
<!--
                <a href="/page-full">Page (fullWidth)</a>
				<a href="/page-responsive">Page (responsive)</a>
				<a href="/fc-fr">FC / FR</a>
 -->
                {/snippet}
			{#snippet end()}
				<LangSwitch />
				<ThemeSwitch />
				<RightSidebarToggle icon={mdiPencil} />
			{/snippet}
		</AppNavBar>
	{/snippet}

	{#snippet leftSidebar()}
		<AppLeftSidebar>
			<SidebarGroup class="">
				<SidebarItem label="Home" href="/" />
				<SidebarItem label="Accordion" href="/accordion" />
				<SidebarItem label="Alert" href="/alert" />
				<SidebarItem label="App Shell" href="/app-shell" />
				<SidebarItem label="Autocomplete" href="/autocomplete" />
				<SidebarItem label="Button" href="/button" />
				<SidebarItem label="Card" href="/card" />
				<SidebarItem label="Check" href="/check" />
				<SidebarItem label="Chip" href="/chip" />
				<SidebarItem label="Dialogs" href="/dialog" />
				<SidebarItem label="Icon" href="/icon" />
				<SidebarItem label="Inputs" href="/inputs" />
				<SidebarItem label="Language" href="/language" />
				<SidebarItem label="Markdown" href="/markdown" />
				<SidebarItem label="Menu" href="/menu" />
				<SidebarItem label="Page" href="/page" />
				<SidebarItem label="Radio" href="/radio" />
				<SidebarItem label="Save PDF" href="/save-pdf" />
				<SidebarItem label="Select" href="/select" />
				<SidebarItem label="Sidebar" href="/sidebar" />
				<SidebarItem label="Splitter" href="/splitter" />
				<SidebarItem label="Text Editor" href="/text-editor" />
				<SidebarItem label="TextArea" href="/textarea" />
				<SidebarItem label="Toast" href="/toast" />
				<SidebarItem label="Typography" href="/typography" />
				<SidebarItem label="Utils" href="/utils" />
			</SidebarGroup>
		</AppLeftSidebar>
	{/snippet}

	{#snippet rightSidebar()}
		<AppRightSidebar>
			<ThemeManager />
		</AppRightSidebar>
	{/snippet}

	{@render children()}
</AppShell>

<ToastPanel />
