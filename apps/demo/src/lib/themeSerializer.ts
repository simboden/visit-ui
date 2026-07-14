import { DARK_THEME, LIGHT_THEME, type Theme, type ThemeSerializer } from 'visit-ui';

// Bumped from 'visit-ui-themes': old data used a flat `vars` shape, replaced by nested `sections`.
// Pre-1.0, single consumer (this demo) -> breaking change accepted, no migration shim.
const KEY = 'visit-ui-themes-v2';

function readAll(): Theme[] {
	const raw = localStorage.getItem(KEY);
	return raw ? JSON.parse(raw) : [];
}

function writeAll(themes: Theme[]) {
	localStorage.setItem(KEY, JSON.stringify(themes));
}

export const localStorageThemeSerializer: ThemeSerializer = {
	load() {
		const saved = readAll();
		const result = [DARK_THEME, LIGHT_THEME].map((d) => saved.find((s) => s.id === d.id) ?? d);
		for (const s of saved) if (!result.find((r) => r.id === s.id)) result.push(s);
		return result;
	},
	save(t) {
		const all = readAll();
		const idx = all.findIndex((x) => x.id === t.id);
		if (idx >= 0) all[idx] = t;
		else all.push(t);
		writeAll(all);
	},
	delete(id) {
		writeAll(readAll().filter((x) => x.id !== id));
	}
};
