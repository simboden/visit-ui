<script lang="ts">
	import { Card, Code, FC, H1, H2, H3, Page } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import VisitLogo from '$lib/assets/visit3.svg';
</script>

<Page>
	<FC class="gap-8">
		
        <H1 class="text-6xl flex items-center justify-center"><img src={VisitLogo} alt="visit-ui" class="h-24 w-24 mr-4" />visit-ui</H1>
        <p class="text-center">An opinionated UI library for building Svelte 5 webapp frontends.</p>

        <Card class="mt-10">
            <H2 class="mt-2">What it provides</H2>

            <p class="font-semibold">Theming</p>
            <p>
                Look and feel is controlled through CSS custom properties, grouped into themes. Themes can
                be created and edited at runtime via the <Code>theme</Code> store and the
                <Code>ThemeManager</Code> component (color pickers, size fields, accordion-grouped sections),
                with changes applied live to <Code>document.documentElement</Code> and optionally persisted
                through a pluggable serializer (<Code>theme.setSerializer(...)</Code>).
            </p>

            <p class="font-semibold">Multi-language support (planned)</p>
            <p>
                Developers will be able to edit the text shown in each language at runtime, directly within
                the webapp pages.
            </p>

            <p class="font-semibold">Application layout</p>
            <p>
                The default layout is built around <Code>AppShell</Code>, which renders:
            </p>
            <ul>
                <li>
                    a full-width, sticky <Code>AppNavBar</Code> with <Code>brand</Code>, <Code>center</Code> and
                    <Code>end</Code> snippet slots
                </li>
                <li>
                    a responsive, full-height <Code>AppLeftSidebar</Code> (16rem) for primary navigation — pushed
                    alongside content on large screens, an overlay drawer on small screens
                </li>
                <li>
                    a fixed-width <Code>AppRightSidebar</Code> (300px), used for development/staff tools such as
                    the <Code>ThemeManager</Code>
                </li>
            </ul>
            <p>
                All four pieces share a single <Code>appShell</Code> store (<Code>leftOpen</Code>,
                <Code>rightOpen</Code>, <Code>isLargeScreen</Code>, <Code>navbarHeight</Code>), so they stay in
                sync automatically.
            </p>

            <p class="font-semibold">Responsive, accessibility-compliant</p>
            <p>Components are designed to be responsive and accessibility-compliant throughout.</p>
        </Card>
        
        <Card>
            <H2 class="mt-2">Underlying libraries</H2>
            <ul>
                <li>Svelte 5 (runes)</li>
                <li>Tailwind CSS v4, tailwind-variants, tailwind-merge (css)</li>
                <li>bits-ui (accessibility)</li>
                <li>@mdi/js (icons)</li>
                <li>@jaames/iro (color editor)</li>
                <li>svelte-highlight (syntax highlighting)</li>
            </ul>
        </Card>

        <Card>
            <H2 class="mt-2">Installation</H2>
            <CodeBlock code={`npm i visit-ui`} />

            <p>Import the shared theme styles once in your app's global CSS:</p>
            <CodeBlock
code={
`@import 'tailwindcss';
import 'visit-ui/theme.css';`}
            />
        </Card>

    </FC>
</Page>
