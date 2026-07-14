import type { LangEntry, LangSerializer } from 'visit-ui';

const KEY = 'visit-ui-lang-demo';

function readAll(): LangEntry[] {
	const raw = localStorage.getItem(KEY);
	return raw ? JSON.parse(raw) : [];
}

function writeAll(entries: LangEntry[]) {
	localStorage.setItem(KEY, JSON.stringify(entries));
}

const SEED: LangEntry[] = [
	{ id: 'demo.greeting', type: 'p', values: { en: 'Hello!', it: 'Ciao!', fr: 'Bonjour !' } },
	{
		id: 'demo.about',
		type: 'm',
		values: {
			en: 'This is **markdown** content.\n\n* try editing it (the pencil icon below)\n* switch language above',
			it: 'Questo è contenuto in **markdown**.\n\n* provalo a modificare (icona matita qui sotto)\n* cambia lingua qui sopra',
			fr: 'Ceci est du contenu **markdown**.\n\n* essayez de le modifier (icône crayon ci-dessous)\n* changez de langue ci-dessus'
		}
	},
	{
		id: 'demo.note',
		type: 'h',
		values: {
			en: 'Raw <strong>HTML</strong> content.',
			it: 'Contenuto <strong>HTML</strong> grezzo.',
			fr: 'Contenu <strong>HTML</strong> brut.'
		}
	}
];

export const localStorageLangSerializer: LangSerializer = {
	languages: [
		{ code: 'en', label: 'English', icon: '🇬🇧' },
		{ code: 'it', label: 'Italiano', icon: '🇮🇹' },
		{ code: 'fr', label: 'Français', icon: '🇫🇷' }
	],
	load() {
		const saved = readAll();
		const result = SEED.map((d) => saved.find((s) => s.id === d.id) ?? d);
		for (const s of saved) if (!result.find((r) => r.id === s.id)) result.push(s);
		return result;
	},
	save(id, values, type) {
		const all = readAll();
		const base = all.length ? all : SEED.map((e) => ({ ...e }));
		const idx = base.findIndex((x) => x.id === id);
		if (idx >= 0) base[idx] = { id, type: type ?? base[idx].type, values };
		else base.push({ id, type, values });
		writeAll(base);
	}
};
