export interface ThemeSection {
	name: string;
	vars: Record<string, string>;
}

// Sections are part of the persisted shape (default / localStorage / DB via ThemeSerializer), not
// just a ThemeManager display detail. This lets a host app add its own sections (and vars) without
// visit-ui knowing about them up front: ThemeStore merges whatever it loads against the built-in
// defaults below, keeping unknown sections instead of discarding them. A var's section is only a
// grouping label for the UI — var *names* are the real identity and must be unique across the whole
// theme, since they map 1:1 to a flat CSS custom property (`--{name}`) on `:root`.
export interface Theme {
	id: string;
	title: string;
	icon: string;
	dark: boolean;
	sections: ThemeSection[];
	// Theme shown to users who never picked one (no id in localStorage). At most one theme should
	// have it; when none does, the first theme of the list is used.
	isDefault?: boolean;
}

export interface ThemeSerializer {
	load(): Promise<Theme[]> | Theme[];
	// Return the persisted id when the backend assigns its own id format on create (e.g. a host
	// database with a fixed id pattern that differs from newTheme()'s crypto.randomUUID()) — the
	// store applies it back to `current`/`themes` so subsequent saves update the right record.
	save(theme: Theme): Promise<string | void> | string | void;
	delete?(id: string): Promise<void> | void;
	// Persist `id` as the only default theme (see Theme.isDefault). Optional: when missing,
	// ThemeManager hides its "Default" button.
	setDefault?(id: string): Promise<void> | void;
}

const STORAGE_KEY = 'visit-ui-theme';
// Snapshot of the last applied theme, so the constructor can paint it before a (slow, async)
// ThemeSerializer has loaded — avoids flashing a built-in theme over the host app's CSS defaults.
const CACHE_KEY = 'visit-ui-theme-cache';

export const DARK_THEME: Theme = {
	id: 'dark',
	title: 'Dark',
	icon: '🌙',
	dark: true,
	sections: [
		{
			name: 'Sizes',
			vars: {
				'radius-lg': '0.5rem',
				pad: '1rem',
				'card-border-sz': '1px',
				'input-border-sz': '1px',
				'input-focus-sz': '2px',
				'button-focus-sz': '2px',
				'navbar-border-sz': '1px'
			}
		},
		{
			name: 'Layout',
			vars: {
				'color-body': '#1e2939ff',
				'color-body1': '#12203dff',
				'color-body2': '#101828ff',
				'color-dialog': '#121f3aff',
				'color-overlay': '#00000080',
				'color-navbar': '#19191978',
				'color-hr': '#434b5577'
			}
		},
		{
			name: 'Text',
			vars: {
				'color-text': '#dbdbdbff',
				'color-head': '#dededeff',
				'color-lab': '#e2e2e2ff',
				'color-title': '#ffffffff',
				'color-code': '#ffffffff',
				'color-code-bg': '#444c56ff',
				'color-hero': '#f7b047ff',
				'color-link': '#ff7a52ff'
			}
		},
		{
			name: 'Card',
			vars: {
				'color-card': '#51596536',
				'color-card-border': '#75757554'
			}
		},
		{
			name: 'Accordion',
			vars: {
				'color-acc': '#34425200',
				'color-acc-hover': '#3e5264ff',
				'color-acc-border': '#75757554'
			}
		},
		{
			name: 'Input',
			vars: {
				'color-input': '#364153ff',
				'color-input-hover': '#404d61ff',
				'color-input-text': '#c7c7c7ff',
				'color-input-border': '#4e5b6fff',
				'color-input-focus': '#ef562fff',
				'color-input-error': '#ff9191ff'
			}
		},
		{
			name: 'Primary',
			vars: {
				'color-pri': '#c74828ff',
				'color-pri-hover': '#ff5c33ff',
				'color-pri-focus': '#f7b047ff',
				'color-pri-text': '#ffffffff',
				'color-pri-down': '#9e3820ff'
			}
		},
		{
			name: 'Secondary',
			vars: {
				'color-sec': '#35465bff',
				'color-sec-hover': '#42546aff',
				'color-sec-focus': '#556d8aff',
				'color-sec-text': '#ffffffff',
				'color-sec-down': '#2a3849ff'
			}
		},
		{
			name: 'Danger',
			vars: {
				'color-danger': '#dc2626ff',
				'color-danger-hover': '#b91c1cff',
				'color-danger-focus': '#f87171ff',
				'color-danger-text': '#ffffffff'
			}
		},
		{
			name: 'Toast',
			vars: {
				'color-info': '#60a5faff',
				'color-success': '#4ade80ff',
				'color-warning': '#fbbf24ff',
				'color-error': '#f87171ff'
			}
		},
		{
			name: 'Chip',
			vars: {
				'color-chip': '#35465bff'
			}
		}
	]
};

export const LIGHT_THEME: Theme = {
	id: 'light',
	title: 'Light',
	icon: '☀️',
	dark: false,
	sections: [
		{
			name: 'Sizes',
			vars: {
				'radius-lg': '0.5rem',
				pad: '1rem',
				'card-border-sz': '1px',
				'input-border-sz': '1px',
				'input-focus-sz': '2px',
				'button-focus-sz': '2px',
				'navbar-border-sz': '1px'
			}
		},
		{
			name: 'Layout',
			vars: {
				'color-body': '#f3f4f6ff',
				'color-body1': '#e5e7ebff',
				'color-body2': '#ffffffff',
				'color-dialog': '#ffffffff',
				'color-overlay': '#00000040',
				'color-navbar': '#ffffffb8',
				'color-hr': '#d1d5db77'
			}
		},
		{
			name: 'Text',
			vars: {
				'color-text': '#1f2937ff',
				'color-head': '#111827ff',
				'color-lab': '#374151ff',
				'color-title': '#000000ff',
				'color-code': '#c2410cff',
				'color-code-bg': '#00000010',
				'color-hero': '#c2410cff',
				'color-link': '#d9481fff'
			}
		},
		{
			name: 'Card',
			vars: {
				'color-card': '#ffffffb0',
				'color-card-border': '#d1d5db88'
			}
		},
		{
			name: 'Accordion',
			vars: {
				'color-acc': '#e5e7eb00',
				'color-acc-hover': '#e4e9f0ff',
				'color-acc-border': '#d1d5db88'
			}
		},
		{
			name: 'Input',
			vars: {
				'color-input': '#ffffffff',
				'color-input-hover': '#f3f4f6ff',
				'color-input-text': '#111827ff',
				'color-input-border': '#d1d5dbff',
				'color-input-focus': '#ef562fff',
				'color-input-error': '#dc2626ff'
			}
		},
		{
			name: 'Primary',
			vars: {
				'color-pri': '#ef562fff',
				'color-pri-hover': '#d9481fff',
				'color-pri-focus': '#ef562fff',
				'color-pri-text': '#ffffffff',
				'color-pri-down': '#b93a17ff'
			}
		},
		{
			name: 'Secondary',
			vars: {
				'color-sec': 'rgb(201, 205, 210)',
				'color-sec-hover': '#e4e9f0ff',
				'color-sec-focus': '#ced3d9ff',
				'color-sec-text': 'rgb(73, 73, 73)',
				'color-sec-down': '#b4b9c0ff'
			}
		},
		{
			name: 'Danger',
			vars: {
				'color-danger': '#dc2626ff',
				'color-danger-hover': '#b91c1cff',
				'color-danger-focus': '#f87171ff',
				'color-danger-text': '#ffffffff'
			}
		},
		{
			name: 'Toast',
			vars: {
				'color-info': '#3b82f6ff',
				'color-success': '#22c55eff',
				'color-warning': '#f59e0bff',
				'color-error': '#ef4444ff'
			}
		},
		{
			name: 'Chip',
			vars: {
				'color-chip': '#e5e7ebff'
			}
		}
	]
};

// Flattens a theme's sections into name -> {value, section}. Var names are global (flat CSS custom
// property namespace), so a name repeated across two sections of the *same* theme is a data error:
// we keep the first occurrence and report the rest, rather than silently letting one clobber the
// other depending on object/array order.
function flattenSections(sections: ThemeSection[]): Map<string, { value: string; section: string }> {
	const flat = new Map<string, { value: string; section: string }>();
	for (const section of sections) {
		for (const [name, value] of Object.entries(section.vars)) {
			const existing = flat.get(name);
			if (existing) {
				console.error(
					`Duplicate theme var "${name}" in section "${section.name}" (already defined in "${existing.section}") — ignoring duplicate`
				);
				continue;
			}
			flat.set(name, { value, section: section.name });
		}
	}
	return flat;
}

// Fills `loaded` (e.g. from a ThemeSerializer / DB) with whatever it's missing relative to `base`
// (DARK_THEME or LIGHT_THEME), so the in-memory theme is complete right after load — not just at
// CSS-apply time — and ThemeManager has something to show for sections the loaded theme never had.
// Override is by var *name*, not by section: a var keeps base's canonical section even if `loaded`
// had filed it under a different one. Sections that exist in `loaded` but not in `base` (e.g. a host
// app's own custom section) are kept, appended after the canonical ones in their original order.
function mergeWithDefault(loaded: Theme, base: Theme): Theme {
	const baseFlat = flattenSections(base.sections);
	const loadedFlat = flattenSections(loaded.sections);

	const sections: ThemeSection[] = base.sections.map((section) => ({
		name: section.name,
		vars: Object.fromEntries(
			Object.keys(section.vars).map((name) => [name, loadedFlat.get(name)?.value ?? section.vars[name]])
		)
	}));

	const extraSections = new Map<string, Record<string, string>>();
	for (const [name, { value, section }] of loadedFlat) {
		if (baseFlat.has(name)) continue;
		if (!extraSections.has(section)) extraSections.set(section, {});
		extraSections.get(section)![name] = value;
	}
	for (const [name, vars] of extraSections) {
		sections.push({ name, vars });
	}

	return {
		id: loaded.id,
		title: loaded.title,
		icon: loaded.icon,
		dark: loaded.dark,
		sections,
		...(loaded.isDefault ? { isDefault: true } : {})
	};
}

class ThemeStore {
	themes = $state<Theme[]>([DARK_THEME, LIGHT_THEME]);
	current = $state<Theme>(DARK_THEME);
	#serializer: ThemeSerializer | null = null;
	#original: Theme = structuredClone(DARK_THEME);

	constructor() {
		const id = localStorage.getItem(STORAGE_KEY);
		const cached = readCache();
		const initial =
			(cached && cached.id === id ? cached : null) ?? this.themes.find((t) => t.id === id);
		// Nothing known for this id (e.g. a DB theme never cached): leave the CSS defaults
		// (theme.css / host app.css) in place until setSerializer() applies the real theme.
		if (!initial) return;
		this.current = initial;
		this.#original = structuredClone($state.snapshot(initial));
		this.#apply(initial);
	}

	get hasSerializer() {
		return this.#serializer !== null;
	}

	get canSetDefault() {
		return !!this.#serializer?.setDefault;
	}

	setCurrent(id: string) {
		const t = this.themes.find((t) => t.id === id);
		if (!t) return;
		this.current = t;
		this.#original = structuredClone($state.snapshot(t));
		this.#apply(t);
		localStorage.setItem(STORAGE_KEY, t.id);
	}

	next() {
		const idx = this.themes.findIndex((t) => t.id === this.current.id);
		const nextTheme = this.themes[(idx + 1) % this.themes.length];
		this.setCurrent(nextTheme.id);
	}

	setSerializer(serializer: ThemeSerializer) {
		this.#serializer = serializer;
		Promise.resolve(serializer.load()).then((loaded) => {
			if (!loaded.length) return;
			this.themes = loaded.map((t) => mergeWithDefault(t, t.dark ? DARK_THEME : LIGHT_THEME));
			const id = localStorage.getItem(STORAGE_KEY);
			// the default is not written to localStorage: users who never chose a theme keep
			// following it if it changes later
			const match =
				this.themes.find((t) => t.id === id) ??
				this.themes.find((t) => t.isDefault) ??
				this.themes[0];
			this.current = match;
			this.#original = structuredClone($state.snapshot(match));
			this.#apply(match);
		});
	}

	applyVar(key: string) {
		for (const section of this.current.sections) {
			if (key in section.vars) {
				document.documentElement.style.setProperty(`--${key}`, section.vars[key]);
				return;
			}
		}
	}

	// Nested literal matching `ThemeSection[]`, meant to be pasted back into DARK_THEME/LIGHT_THEME
	// in this file when tweaking a default theme via ThemeManager.
	varsAsTs(): string {
		return this.current.sections
			.map((section) => {
				const vars = Object.entries(section.vars)
					.map(([key, value]) => `\t\t\t\t'${key}': '${value}',`)
					.join('\n');
				return `\t\t{\n\t\t\tname: '${section.name}',\n\t\t\tvars: {\n${vars}\n\t\t\t}\n\t\t}`;
			})
			.join(',\n');
	}

	reset() {
		this.current.sections = structuredClone(this.#original.sections);
		this.current.title = this.#original.title;
		this.current.icon = this.#original.icon;
		this.#apply(this.current);
	}

	newTheme() {
		const copy = structuredClone($state.snapshot(this.current));
		copy.id = crypto.randomUUID();
		copy.title = 'New theme';
		delete copy.isDefault;
		this.themes.push(copy);
		this.setCurrent(copy.id);
	}

	async save() {
		if (!this.#serializer) return;
		const persistedId = await this.#serializer.save($state.snapshot(this.current));
		if (persistedId && persistedId !== this.current.id) {
			this.current.id = persistedId;
			localStorage.setItem(STORAGE_KEY, persistedId);
		}
		const idx = this.themes.findIndex((t) => t.id === this.current.id);
		if (idx >= 0) this.themes[idx] = this.current;
		else this.themes.push(this.current);
		this.#original = structuredClone($state.snapshot(this.current));
		writeCache(this.#original);
	}

	async makeCurrentDefault() {
		if (!this.#serializer?.setDefault) return;
		const id = this.current.id;
		await this.#serializer.setDefault(id);
		for (const t of this.themes) {
			if (t.id === id) t.isDefault = true;
			else delete t.isDefault;
		}
		this.current.isDefault = true;
		this.#original.isDefault = true;
	}

	async deleteCurrent() {
		if (!this.#serializer?.delete || this.themes.length <= 1) return;
		const id = this.current.id;
		const idx = this.themes.findIndex((t) => t.id === id);
		await this.#serializer.delete(id);
		this.themes.splice(idx, 1);
		const next = this.themes[Math.max(0, idx - 1)];
		this.setCurrent(next.id);
	}

	#apply(t: Theme) {
		// enables Tailwind `dark:` utilities in host apps declaring `@custom-variant dark (&:where(.dark, .dark *))`
		document.documentElement.classList.toggle('dark', t.dark);
		for (const section of t.sections) {
			for (const [key, value] of Object.entries(section.vars)) {
				document.documentElement.style.setProperty(`--${key}`, value);
			}
		}
		writeCache($state.snapshot(t));
	}
}

function readCache(): Theme | null {
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const t = JSON.parse(raw) as Theme;
		return t && typeof t.id === 'string' && Array.isArray(t.sections) ? t : null;
	} catch {
		return null;
	}
}

function writeCache(t: Theme) {
	try {
		localStorage.setItem(CACHE_KEY, JSON.stringify(t));
	} catch {
		// storage full/unavailable: cache is only an optimization
	}
}

export const theme = new ThemeStore();
