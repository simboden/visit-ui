visit-ui is an opinionated UI library for building Svelte 5 webapp frontends.

Live demo: https://simboden.github.io/visit-ui/

## What it provides

**Theming** — look and feel is controlled through CSS custom properties, grouped into themes.
Themes can be created and edited at runtime via the `theme` store and the `ThemeManager`
component (color pickers, size fields, accordion-grouped sections), with changes applied
live to `document.documentElement` and optionally persisted through a pluggable serializer
(`theme.setSerializer(...)`).

**Multi-language support** *(planned)* — developers will be able to edit the text shown in
each language at runtime, directly within the webapp pages.

**Application layout** — the default layout is built around `AppShell`, which renders:
- a full-width, sticky `AppNavBar` with `brand`, `center` and `end` snippet slots
- a responsive, full-height `AppLeftSidebar` (16rem) for primary navigation — pushed
  alongside content on large screens, an overlay drawer on small screens
- a fixed-width `AppRightSidebar` (300px), used for development/staff tools such as the
  `ThemeManager`

All four pieces share a single `appShell` store (`leftOpen`, `rightOpen`, `isLargeScreen`,
`navbarHeight`), so they stay in sync automatically.

**Responsive, accessibility-compliant** components throughout.

## Underlying libraries

- Svelte 5 (runes)
- Tailwind CSS v4
- bits-ui
- svelte-highlight (syntax highlighting)
- @jaames/iro (color picker)
- @mdi/js (icons)
- tailwind-variants, tailwind-merge

## Installation

```
pnpm i visit-ui
```

Import the shared theme styles once in your app's global CSS:

```css
@import 'tailwindcss';
@import 'visit-ui/theme.css';
```

## Application setup

*(planned)* — Docker setup instructions for development and release builds.
