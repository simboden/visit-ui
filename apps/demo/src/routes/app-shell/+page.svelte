<script lang="ts">
	import { appShell, Button, Card, Code, Dimmed, FC, FR, H2, H3, H4, HR, Page } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<Page title="AppShell">
	<FC class="gap-8">

        <p>
            Visit-ui provides a set of layout components, designed to construct a web application layout 
            using an opinionated setup including a sticky, full-width top navigation bar 
            and two specialized sidebars:
        </p>
<!-- 
        <p>
            The <Code>visit-ui</Code> library provides a set of layout components, centered around the 
            <Code>AppShell</Code>, designed to construct a web application layout using an opinionated setup.
        </p>

        <p>
            By default, the <Code>AppShell</Code> structure includes a sticky, full-width top navigation bar 
            and two specialized sidebars:
        </p>
 -->

        <ul>
            <li>
            <strong>Navbar:</strong> A full-width header fixed at the top of the viewport, 
            ensuring global navigation and branding are always accessible while scrolling.
            </li>
            <li>
            <strong>Left Sidebar:</strong> Designed for primary application navigation. 
            It is fully responsive and automatically expands into view on larger screens when space permits. 
            On smaller screens, it collapses into a drawer overlay and can be toggled manually using the 
            hamburger button located in the top navbar.
            </li>
            <li>
            <strong>Right Sidebar:</strong> Unlike the left sidebar, the right sidebar 
            is non-responsive and dedicated to utility tools for the staff, like the ThemeManager.
            </li>
        </ul>
        
<!-- 
        <H3>Components Included</H3>
        <p>
            To build this specific layout, <Code>visit-ui</Code> offers the following sub-components 
            to be used within the main shell:
        </p>
        <ul>
            <li><Code>AppShell</Code>: The main wrapper that orchestrates the layout grid.</li>
            <li><Code>AppNavbar</Code>: The sticky top header.</li>
            <li><Code>AppLeftSidebar</Code>: The responsive navigation drawer/sidebar.</li>
            <li><Code>AppRightSidebar</Code>: The fixed-width utility sidebar.</li>
            <li><Code>AppMain</Code>: The core page content area that automatically adjusts its margins based on the sidebars' states.</li>
        </ul>

 -->
<!--         
        <Card>
            <div class="mx-auto">
                <div class="w-120 border-2 rounded-t-lg border-text/20 bg-body">
                    <div class="w-full text-center py-3">AppNavbar</div>
                </div>
                <FR class="gap-0 m-0 p-0">
                <div class="w-40 h-40 border-l-2 border-b-2 rounded-bl-lg  border-text/20 bg-body">
                    <div class="w-full text-center mt-6">AppLeftSideBar</div>
                </div>
                <div class="w-40 h-40 border-2 border-t-0 border-text/20 bg-body">
                    <div class="w-full text-center mt-6">AppMain</div>
                </div>
                <div class="w-40 h-40 border-r-2 border-b-2 rounded-br-lg  border-text/20 bg-body">
                    <div class="w-full text-center mt-6">AppRightSideBar</div>
                </div>
                </FR>
            </div>
        </Card>    
 -->

        <H2>Usage</H2>
		<CodeBlock code={`[+layout.svelte] 
<script lang="ts">
  import { AppLeftSidebar, AppNavBar, AppRightSidebar, AppShell, ... } from 'visit-ui';
</` + `script>
<AppShell>
  {#snippet navbar()}
    <AppNavBar>
      {#snippet brand() }  the app title                              {/snippet}
      {#snippet center()}  links, search widget, ...                  {/snippet}
      {#snippet end()   }  lang switch, theme switch, user badge ...  {/snippet}
    </AppNavBar>
  {/snippet}
  {#snippet leftSidebar()}  <AppLeftSidebar>  Sidebar contents </AppLeftSidebar>  {/snippet}
  {#snippet rightSidebar()} <AppRightSidebar> Sidebar contents </AppRightSidebar> {/snippet}
  <!-- page content goes here -->

</AppShell>`}
		/>

		<H2>Components Details</H2>

		<H3>AppShell</H3>
		<p>
			The root container. It renders the optional <Code>navbar</Code>, <Code>leftSidebar</Code>
			and <Code>rightSidebar</Code> snippets plus the page <Code>children</Code> inside a full
			height (<Code>h-dvh</Code>) wrapper, and provides the tooltip context used by
			<Code>Button</Code>, <Code>ButtonLink</Code>, etc.
            Subcomponents are all wired together through the shared <Code>appShell</Code> store, so they
			coordinate automatically. 
		</p>

        <p>What it does:</p>
        <ul>
            <li>
                Tracks the window width and updates <Code>appShell.isLargeScreen</Code> on every
                resize across the {1264}px breakpoint.
            </li>
            <li>
                Whenever the screen crosses that breakpoint, it automatically opens the left sidebar
                on large screens and closes it on small screens.
            </li>
            <li>
                Computes the content's left/right margins from <Code>appShell.leftOpen</Code>,
                <Code>appShell.rightOpen</Code> and <Code>appShell.isLargeScreen</Code>, with a smooth
                transition.
            </li>
            <li>
                Offsets the content with <Code>padding-top: appShell.navbarHeight</Code> so it never
                sits under the sticky navbar.
            </li>
        </ul>

		<H3>AppNavBar</H3>
		<p>
			A sticky navbar with three snippet slots: <Code>brand</Code> (left, always visible),
			<Code>center</Code> (hidden on small screens) and <Code>end</Code> (right, always visible).
			It includes a built-in hamburger button that calls <Code>appShell.toggleLeft()</Code>, and
			measures its own rendered height to keep <Code>appShell.navbarHeight</Code> in sync.
		</p>

		<H3>AppLeftSidebar</H3>
		<p>
			A fixed-position sidebar, <Code>16rem</Code> wide (<Code>LEFT_SIDEBAR_WIDTH</Code>). Its
			visibility is driven entirely by <Code>appShell.leftOpen</Code>:
		</p>
		<FC class="gap-1">
			<p>
				• <strong>Large screens</strong>: shown by default ("push" mode) — <Code>AppShell</Code>
				adds a matching left margin to the content.
			</p>
			<p>
				• <strong>Small screens</strong>: hidden by default ("overlay" mode) — when opened it
				slides in over the content with a dimmed backdrop. Pressing <Code>Esc</Code> or clicking
				the backdrop closes it.
			</p>
		</FC>

		<H3>AppRightSidebar</H3>
		<p>
			A fixed-position right sidebar, <Code>300px</Code> wide (<Code>RIGHT_SIDEBAR_WIDTH</Code>).
			It always slides in as an overlay, controlled with <Code>appShell.openRight()</Code> and
			<Code>appShell.closeRight()</Code>. It's typically used for contextual panels — in this
			demo it hosts the <Code>ThemeManager</Code>.
		</p>

		<HR />

		<H3>The appShell store</H3>
		<p>
			All four components read and write a single shared store, imported as <Code>appShell</Code>
			from <Code>visit-ui</Code>.
		</p>

<!-- 
        <Card class="max-w-none">
			<FC class="gap-3 md:flex-row">
				<FC class="flex-1 gap-1">
					<p class="font-semibold">State</p>
					<p><Code>leftOpen: boolean</Code> — is the left sidebar open?</p>
					<p><Code>rightOpen: boolean</Code> — is the right sidebar open?</p>
					<p><Code>isLargeScreen: boolean</Code> — are we above the breakpoint?</p>
					<p><Code>navbarHeight: string</Code> — measured navbar height (CSS length)</p>
				</FC>
				<FC class="flex-1 gap-1">
					<p class="font-semibold">Methods</p>
					<p><Code>toggleLeft()</Code> — flips <Code>leftOpen</Code></p>
					<p><Code>openRight()</Code> — sets <Code>rightOpen = true</Code></p>
					<p><Code>closeRight()</Code> — sets <Code>rightOpen = false</Code></p>
				</FC>
			</FC>
		</Card>
		<p>
			Constants exported alongside it: <Code>LEFT_SIDEBAR_WIDTH</Code> (16rem),
			<Code>RIGHT_SIDEBAR_WIDTH</Code> (300px), <Code>LARGE_SCREEN_BREAKPOINT</Code> (1264px) and
			<Code>DEFAULT_NAVBAR_HEIGHT</Code> (61px).
		</p>
 -->
<!--         
		<p>
        Constants exported alongside it: <Code>LEFT_SIDEBAR_WIDTH</Code> (16rem),
        <Code>RIGHT_SIDEBAR_WIDTH</Code> (300px), <Code>LARGE_SCREEN_BREAKPOINT</Code> (1264px) and
        <Code>DEFAULT_NAVBAR_HEIGHT</Code> (61px).
		</p>
 -->
        <Card>
            <p class="font-semibold">Constants</p>
            <p><Code>LEFT_SIDEBAR_WIDTH</Code>(16rem)</p>
            <p><Code>RIGHT_SIDEBAR_WIDTH</Code>(300px)</p>
            <p><Code>LARGE_SCREEN_BREAKPOINT</Code>(1264px)</p>
            <p><Code>DEFAULT_NAVBAR_HEIGHT</Code>(61px)</p>

            <p class="font-semibold">State</p>
            <p><Code>leftOpen: boolean</Code> — is the left sidebar open?</p>
            <p><Code>rightOpen: boolean</Code> — is the right sidebar open?</p>
            <p><Code>isLargeScreen: boolean</Code> — are we above the breakpoint?</p>
            <p><Code>navbarHeight: string</Code> — measured navbar height (CSS length)</p>

            <p class="font-semibold">Methods</p>
            <p><Code>toggleLeft()</Code> — flips leftOpen</p>
            <p><Code>openRight()</Code> — sets rightOpen = true</p>
            <p><Code>closeRight()</Code> — sets rightOpen = false</p>
        </Card>
            
        <H3>Try it</H3>
        <p>
            These buttons call the same store methods used by the navbar hamburger and by
            <Code>RightSidebarToggle</Code> in this demo:
        </p>
        <FR class="items-center gap-4 flex-wrap">
            <Button onclick={() => appShell.toggleLeft()}>Toggle left sidebar</Button>
            <Button onclick={() => appShell.openRight()}>Open right sidebar</Button>
            <Button onclick={() => appShell.closeRight()}>Close right sidebar</Button>
            <Dimmed>
                left: {appShell.leftOpen ? 'open' : 'closed'} · right: {appShell.rightOpen
                    ? 'open'
                    : 'closed'} · large screen: {appShell.isLargeScreen ? 'yes' : 'no'}
            </Dimmed>
        </FR>
	</FC>
</Page>
