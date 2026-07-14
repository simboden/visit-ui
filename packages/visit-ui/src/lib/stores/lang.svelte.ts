export interface Language {
	code: string;
	label: string;
	icon?: string;
	// BCP-47 tag used for Intl.DateTimeFormat (format_date*). Defaults to `code` when omitted,
	// so a host app only needs to set it when `code` itself isn't a valid Intl locale tag
	// (e.g. code: 'it', locale: 'it-IT').
	locale?: string;
}

export interface LangEntry {
	id: string;
	// tipo di contenuto: interpretazione lasciata all'app/a LocText (es. 'p'|'m'|'h' per plain/markdown/html).
	// default 'p' quando assente.
	type?: string;
	values: Record<string, string>;
}

export interface LangSerializer {
	languages: Language[];
	load(): Promise<LangEntry[]> | LangEntry[];
	save(id: string, values: Record<string, string>, type?: string): Promise<void> | void;
	delete?(id: string): Promise<void> | void;
}

const STORAGE_KEY = 'visit-ui-lang';

class LangStore {
	languages = $state<Language[]>([]);
	current = $state('');
	lang_edit = $state(false);
	#entries = $state<Record<string, LangEntry>>({});
	#serializer: LangSerializer | null = null;

	get hasSerializer() {
		return this.#serializer !== null;
	}

	// tutte le entry caricate, per UI di amministrazione (es. una pagina staff che le elenca per sezione)
	get entries(): LangEntry[] {
		return Object.values(this.#entries);
	}

	setSerializer(serializer: LangSerializer) {
		this.#serializer = serializer;
		this.languages = serializer.languages;
		const stored = localStorage.getItem(STORAGE_KEY);
		this.current =
			(stored && serializer.languages.some((l) => l.code === stored) ? stored : null) ??
			serializer.languages[0]?.code ??
			'';

		this.reload();
	}

	async reload() {
		if (!this.#serializer) return;
		const entries = await Promise.resolve(this.#serializer.load());
		const map: Record<string, LangEntry> = {};
		for (const entry of entries) map[entry.id] = entry;
		this.#entries = map;
	}

	setCurrent(code: string) {
		if (!this.languages.some((l) => l.code === code)) return;
		this.current = code;
		localStorage.setItem(STORAGE_KEY, code);
	}

	// restituisce il testo per text_id "section.key" nella lingua corrente, o text_id stesso se assente
	t(text_id: string): string {
		return this.#entries[text_id]?.values[this.current] ?? text_id;
	}

	// valori per tutte le lingue di un text_id (usato dal dialog di edit di LocText). Garantisce
	// sempre una chiave per ogni lingua configurata (default '') anche se il text_id non ha ancora
	// una entry salvata, cosi' bind:value sui campi del dialog non riceve mai undefined.
	values(text_id: string): Record<string, string> {
		const existing = this.#entries[text_id]?.values ?? {};
		const result: Record<string, string> = {};
		for (const language of this.languages) result[language.code] = existing[language.code] ?? '';
		return result;
	}

	// tipo di contenuto del text_id ('p'|'m'|'h' lasciato all'app), default 'p' se assente
	type(text_id: string): string {
		return this.#entries[text_id]?.type ?? 'p';
	}

	async save(text_id: string, values: Record<string, string>) {
		if (!this.#serializer) return;
		const type = this.#entries[text_id]?.type ?? 'p';
		this.#entries[text_id] = {
			id: text_id,
			type,
			values: { ...(this.#entries[text_id]?.values ?? {}), ...values }
		};
		await this.#serializer.save(text_id, values, type);
	}

	#locale(): string {
		const lang = this.languages.find((l) => l.code === this.current);
		return lang?.locale ?? lang?.code ?? this.current;
	}

	format_date(dateString: string): string {
		if (!dateString) return '';
		try {
			return new Intl.DateTimeFormat(this.#locale(), {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}).format(new Date(dateString));
		} catch {
			return dateString;
		}
	}

	format_date_time(dateString: string): string {
		if (!dateString) return '';
		try {
			return new Intl.DateTimeFormat(this.#locale(), {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			}).format(new Date(dateString));
		} catch {
			return dateString;
		}
	}

	format_date_ns(dateString: string): string {
		if (!dateString) return '';
		try {
			return new Intl.DateTimeFormat(this.#locale(), {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})
				.format(new Date(dateString))
				.replaceAll(' ', '');
		} catch {
			return dateString;
		}
	}
}

export const lang = new LangStore();
