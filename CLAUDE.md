# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is a pnpm workspace with two packages:

- `packages/visit-ui` — the `visit-ui` component library (Svelte 5 + bits-ui), published to npm. Source in `src/lib`, built to `dist` via `svelte-package`.
- `apps/demo` — a SvelteKit demo/docs webapp consuming `visit-ui` via `workspace:*`. One route per component/feature under `src/routes`.

The demo imports the library's shared theme via `@import 'visit-ui/theme.css'` (exported from `packages/visit-ui/package.json`'s `./theme.css` export, built from `packages/visit-ui/src/lib/theme.css`).

**Version control is SVN, not git** — there is a `.svn` directory at the repo root. Use `svn` commands (`svn status`, `svn diff`, `svn add`, `svn commit`) for VCS operations.

## Commands

Run from the repo root unless noted:

- `pnpm dev` — runs the library in watch mode and the demo dev server in parallel (`pnpm --parallel -F visit-ui -F demo dev`). Demo serves on Vite's default port (5173+).
- `./run.sh` — alternative dev launcher: watch-builds `visit-ui` and serves the demo on port 4000.
- `pnpm build` — builds `visit-ui` then `demo`.
- `pnpm check` — runs `check` in every package (`svelte-kit sync && svelte-check`).
- `pnpm --filter visit-ui build` — builds just the library (`svelte-kit sync && svelte-package && publint`); run this after library changes to verify `dist` output (incl. `dist/theme.css`) and that `publint` passes.
- `pnpm --filter demo check` / `pnpm --filter visit-ui check` — type-check a single package.

There is no test suite in this repo.

## Architecture

### Layout system (AppShell)

The demo's `+layout.svelte` wires up the app-wide layout: `AppShell` renders `navbar`, `leftSidebar`, `rightSidebar` snippets plus page `children`. All four pieces read/write a single shared store, `appShell` (`packages/visit-ui/src/lib/stores/app.svelte.ts`):

- `leftOpen` / `rightOpen` / `isLargeScreen` state, `toggleLeft()` / `openRight()` / `closeRight()`.
- `AppLeftSidebar` (width `LEFT_SIDEBAR_WIDTH` = 16rem) pushes content open by default on large screens, overlays on small screens, auto-toggling across `LARGE_SCREEN_BREAKPOINT` (1264px).
- `AppRightSidebar` (width `RIGHT_SIDEBAR_WIDTH` = 300px) always overlays; used in the demo to host `ThemeManager`.
- `AppNavBar` is sticky, full-width, and measures its own height into `appShell.navbarHeight` (default `DEFAULT_NAVBAR_HEIGHT` = 61px) so `AppShell` can offset content correctly.
- `Page` is the page-content container: `fullWidth={false}` (default) centers content with a max-width; `fullWidth={true}` is edge-to-edge.
- `FC` / `FR` are flex-column / flex-row layout primitives used everywhere instead of raw Tailwind flex classes.

### Theming

Theme is a runtime, store-driven system, not just Tailwind config:

- `theme.svelte.ts` exports the singleton `theme` store plus `DARK_THEME` / `LIGHT_THEME` (each a `{ id, title, icon, dark, vars }` object). `vars` keys are CSS custom-property names minus the leading `--` (e.g. `color-pri-hover`, `radius-lg`, `pad`, `color-card`, `card-border-sz`) and correspond to the `@theme` block in `packages/visit-ui/src/lib/theme.css`.
- `theme.current` is applied by setting `--<key>` custom properties on `document.documentElement`. `setCurrent(id)` / `next()` persist the choice to `localStorage['visit-ui-theme']`. `setSerializer({ load, save, delete })` lets a host app supply its own theme list (the demo does this via `$lib/themeSerializer`).
- `ThemeManager` is the in-app editor: accordion-grouped color/size fields (via `FieldColor` / `Input`) bound to `theme.current.vars`, plus Reset/New/Save/Delete and a "Copy vars" button (`theme.varsAsTs()`).
- `ThemeSwitch` cycles through `theme.themes`.
- No SSR is configured for the demo, so module-level `$state` singletons and direct browser API access (`localStorage`, `document`) in store constructors are safe.

### Demo conventions

- Each route under `apps/demo/src/routes` documents one component/feature, typically structured as: `H1` title, an intro `Text`/`<p>` describing the component and the theme variables that control its appearance, then one or more labeled examples (`H2`), each showing the live component followed by a `CodeBlock` with the equivalent source.
- `CodeBlock` (`apps/demo/src/lib/components/CodeBlock.svelte`) wraps `svelte-highlight` using the `github`/`github-dark` styles, switching based on `theme.current.dark`.
- Use `<ul><li>` for bulleted lists (styled globally via `theme.css`), not bullet-character `<Text>` blocks.
- Prose/typography components (`Text`, `TextMuted`, `Code`, `H1`-`H4`, `HR`) come from `visit-ui`, not raw HTML tags, except where global element styles in `theme.css` are intentionally being demonstrated.
