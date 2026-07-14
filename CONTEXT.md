# visit-ui

A Svelte5/bits-ui component library, published to npm as `visit-ui`, with a companion demo/docs webapp (one route per component/feature).

## Language

**AppShell**:
The top-level layout component. Drives the responsive open/closed state of the left and right sidebars (via the `appShell` store) and arranges AppNavBar, AppLeftSidebar, AppRightSidebar, and page content using named snippet props (`navbar`, `leftSidebar`, `rightSidebar`, `children`).

**AppNavBar**:
The fixed, transparent/blurred horizontal bar at the top of the page. Renders the hamburger toggle for the left sidebar and exposes `brand`, `center`, `end` snippet zones.
_Avoid_: Navbar (ambiguous — in immich-ui this term refers to the left sidebar, not the top bar).

**AppLeftSidebar**:
The left-side panel below AppNavBar. On large screens it pushes page content (open by default); on small screens it overlays with a backdrop (closed by default), auto-toggling on resize across the breakpoint.

**AppRightSidebar**:
The right-side panel below AppNavBar. Always pushes page content when open (never overlays), and includes its own close control.

**Page**:
A page-content container, always at least full-height (minus the navbar). Defaults to a centered, max-width layout (`fullWidth: false`); pass `fullWidth` for an edge-to-edge layout with no max-width constraint.

**FC / FR**:
Flex column / flex row layout primitives (ported from visit_letters_s5's `FC`/`FR`). Used both internally by AppShell components and by consumers, so pages avoid raw Tailwind flex classes.

**appShell**:
The global store (`lib/stores/app.svelte.ts`, single instance shared app-wide) holding sidebar/layout state: `leftOpen`, `rightOpen`, `isLargeScreen`, `toggleLeft()`, `openRight()`, `closeRight()`. Any component can import and use it directly — no context, no prop drilling. Assumes one AppShell per app.

**Theme**:
A named set of CSS custom-property overrides: `{ id, title, icon, dark, vars }`. `vars` is keyed by CSS custom-property name minus the leading `--` (e.g. `color-pri-hover`, `radius-lg`, `pad`), so its keys correspond 1:1 with the `@theme` block in a consuming app's `app.css`. `dark` selects which of `DARK_THEME`/`LIGHT_THEME` supplies fallback values for keys missing from `vars`.

**theme**:
The global store (`lib/stores/theme.svelte.ts`, single instance shared app-wide, self-initializing on import). Holds `themes` (the available Themes) and `current` (the active Theme), and applies the active theme by setting `--<key>` custom properties on `document.documentElement`. Mirrors `appShell`'s "no context, single instance" pattern. `setCurrent(id)`/`next()` switch themes and persist the choice (`localStorage['visit-ui-theme']`); `setSerializer({ load, save })` lets a host app supply its own theme list instead of the two hardcoded defaults.

**ThemeSwitch**:
A small navbar button that cycles through `theme.themes` on click, displaying the next theme's icon.

**Icon**:
Renders an `@mdi/js` icon path (`mdiHome`, `mdiAccount`, ...) as an SVG. Props: `icon` (path string), `size` (default `1em`), `color` (default `currentColor`), `spin`, `class`.

**Spinner**:
A small animated loading indicator (circle + arc SVG). Props: `size` (`small`/`medium`/`large`), `class`. Color follows `currentColor`.

**Tooltip / TooltipProvider**:
`Tooltip` wraps a `child` snippet with a `bits-ui` tooltip showing `text` on hover/focus; if `text` is falsy, renders `child` directly. `TooltipProvider` configures the shared `bits-ui` tooltip context (delay, focus behavior) and is mounted once inside `AppShell` — consumers don't wire it themselves.

**Button / ButtonLink**:
`Button` (a `<button>`) and `ButtonLink` (an `<a>`, with `href`/`open_in_new_tab`) share the same visual API: `variant` (`filled`/`outlined`/`ghost`), `color` (`primary`/`secondary`/`danger`), `size` (`small`/`medium`/`large`), `icon` (an `@mdi/js` path, rendered after the children), `title` (tooltip text). `Button` additionally has `disabled` and `loading` (forces `disabled`, shows `Spinner`).

**color-danger / color-danger-hover / color-danger-focus / color-danger-text**:
Theme vars for the `danger` button color, alongside the existing `color-pri-*`/`color-sec-*` sets (see `theme.svelte.ts` and `app.css`'s `@theme` block).
