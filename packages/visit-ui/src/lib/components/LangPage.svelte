<script lang="ts">
	import { lang } from '../stores/lang.svelte.js';
	import { Button, Accordion, AccordionItem, FC, Spring, Check, H1, H3, Label } from './index.js';

	// raccoglie tutte le sezioni presenti tra le entry caricate
	function sections(): string[] {
		const keys = new Set(lang.entries.map((e) => e.id.split('.')[0]))
		return [...keys].sort()
	}

	// raccoglie tutte le chiavi di una sezione
	function keys_of(section: string): string[] {
		const ks = lang.entries
			.filter((e) => e.id.split('.')[0] === section)
			.map((e) => e.id.split('.')[1])
		return [...ks].sort()
	}

	function values_of(id: string): Record<string, string> {
		return lang.entries.find((e) => e.id === id)?.values ?? {}
	}

	function next_lang() {
		const idx = lang.languages.findIndex((l) => l.code === lang.current)
		const next = lang.languages[(idx + 1) % lang.languages.length]
		if (next) lang.setCurrent(next.code)
	}

	// stato editing inline
	let editing      = $state<string | null>(null)   // "section.name"
	let edit_values  = $state<Record<string, string>>({})
	let save_status  = $state<'idle' | 'saving' | 'ok' | 'error'>('idle')

	function start_edit(id: string) {
		editing     = id
		edit_values = { ...values_of(id) }
		save_status = 'idle'
	}

	async function save_edit() {
		if (!editing) return
		save_status = 'saving'
		try {
			await lang.save(editing, edit_values)
			save_status = 'ok'
			setTimeout(() => { editing = null; save_status = 'idle' }, 800)
		} catch {
			save_status = 'error'
		}
	}

	function cancel_edit() {
		editing     = null
		save_status = 'idle'
	}

	const textareaClass = [
		'w-full bg-input text-input-text text-sm',
		'border border-(--color-input-border) rounded p-1',
		'resize-none focus:outline-none focus:border-(--color-input-focus)',
	].join(' ')

	const tdClass = 'px-3 py-2 border-b border-(--color-card-border) text-text text-sm align-top'
	const thClass = 'px-3 py-2 text-left text-xs font-semibold text-lab uppercase tracking-wider bg-body2'

	// stato nuovo record
	let new_id      = $state('')
	let new_values  = $state<Record<string, string>>({})
	let new_status  = $state<'idle' | 'saving' | 'ok' | 'error' | 'dup'>('idle')
	let new_error   = $state('')

	async function create_record() {
		const id = new_id.trim()
		if (!id.includes('.')) { new_status = 'error'; new_error = 'Il formato deve essere "sezione.chiave"'; return }
		if (lang.entries.some((e) => e.id === id)) { new_status = 'dup'; new_error = `"${id}" esiste già`; return }
		new_status = 'saving'
		try {
			await lang.save(id, new_values)
			new_id = ''; new_values = {}
			new_status = 'ok'
			setTimeout(() => { new_status = 'idle' }, 1500)
		} catch (e: any) {
			new_status = 'error'
			new_error = e?.message ?? 'errore sconosciuto'
		}
	}
</script>

<FC class="w-full px-4">

	<H1>Lang Store</H1>

	<!-- ---- CONTROLS ---- -->
	<div class="flex flex-wrap gap-6 items-center bg-card border border-(--color-card-border) rounded-lg p-4">
		<div class="flex items-center gap-3">
			<Label>Lingua corrente:</Label>
			<button
				type="button"
				onclick={next_lang}
				class="px-4 py-1 rounded-full font-bold text-sm border border-(--color-input-border)
				       bg-pri text-pri-text hover:bg-(--color-pri-hover) transition-colors"
			>
				{lang.languages.find((l) => l.code === lang.current)?.label ?? lang.current}
			</button>
		</div>

		<div class="flex items-center gap-3">
			<Label>Modalità editing:</Label>
			<Check bind:value={lang.lang_edit} />
		</div>

		<Spring />

		<Button onclick={() => lang.reload()}>
			Ricarica da DB
		</Button>
	</div>

	<!-- ---- RIEPILOGO ---- -->
	<div class="flex gap-4 flex-wrap">
		<div class="bg-card border border-(--color-card-border) rounded-lg px-4 py-3 text-sm text-text">
			<span class="text-lab">Sezioni:</span>
			<span class="ml-2 font-semibold">{sections().length}</span>
		</div>
		<div class="bg-card border border-(--color-card-border) rounded-lg px-4 py-3 text-sm text-text">
			<span class="text-lab">Chiavi totali:</span>
			<span class="ml-2 font-semibold">
				{sections().reduce((n, s) => n + keys_of(s).length, 0)}
			</span>
		</div>
		<div class="bg-card border border-(--color-card-border) rounded-lg px-4 py-3 text-sm text-text">
			<span class="text-lab">lang_edit:</span>
			<span class="ml-2 font-semibold {lang.lang_edit ? 'text-green-400' : 'text-text'}">
				{lang.lang_edit ? 'attivo' : 'disattivo'}
			</span>
		</div>
	</div>

	<!-- ---- NUOVO RECORD ---- -->
	<div class="bg-card border border-(--color-card-border) rounded-lg p-4 flex flex-col gap-3">
		<H3>Nuovo record</H3>
		<div class="flex flex-col gap-2">
			<Label>ID (formato: sezione.chiave)</Label>
			<input
				type="text"
				bind:value={new_id}
				placeholder="es. home.welcome_title"
				class="w-full bg-input text-input-text text-sm border border-(--color-input-border) rounded p-1.5 focus:outline-none focus:border-(--color-input-focus)"
			/>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			{#each lang.languages as language (language.code)}
				<div class="flex flex-col gap-1">
					<Label>{language.label}</Label>
					<textarea rows="3" bind:value={new_values[language.code]} class={textareaClass}></textarea>
				</div>
			{/each}
		</div>
		<div class="flex items-center gap-3">
			<Button onclick={create_record} disabled={!new_id.trim()}>
				{new_status === 'saving' ? '...' : new_status === 'ok' ? '✓ creato' : 'crea'}
			</Button>
			{#if new_status === 'error' || new_status === 'dup'}
				<span class="text-sm text-red-400">{new_error}</span>
			{/if}
		</div>
	</div>

	<!-- ---- TABELLE PER SEZIONE ---- -->
	<Accordion>
	{#each sections() as section}
		<AccordionItem title="{section} ({keys_of(section).length})">
			<div class="overflow-x-auto">
				<table class="w-full border-collapse">
					<thead>
						<tr class="bg-body2">
							<th class="{thClass} w-40">chiave</th>
							{#each lang.languages as language (language.code)}
								<th class={thClass}>{language.label}</th>
							{/each}
							<th class="{thClass} w-24"></th>
						</tr>
					</thead>
					<tbody>
						{#each keys_of(section) as name}
							{@const id = `${section}.${name}`}
							{@const is_editing = editing === id}
							<tr class="hover:bg-body2/50 transition-colors">
								<td class="{tdClass} font-mono text-xs text-lab">{name}</td>

								{#if is_editing}
									{#each lang.languages as language (language.code)}
										<td class={tdClass}>
											<textarea rows="3" bind:value={edit_values[language.code]} class={textareaClass}></textarea>
										</td>
									{/each}
									<td class="{tdClass}">
										<div class="flex flex-col gap-1">
											<Button
												onclick={save_edit}
												class="text-xs px-2 py-1 w-full"
											>
												{save_status === 'saving' ? '...' : save_status === 'ok' ? '✓' : 'salva'}
											</Button>
											<Button
												color="secondary"
												onclick={cancel_edit}
												class="text-xs px-2 py-1 w-full"
											>
												annulla
											</Button>
										</div>
									</td>
								{:else}
									{#each lang.languages as language (language.code)}
										<td class="{tdClass} whitespace-pre-wrap">
											{values_of(id)[language.code] ?? '—'}
										</td>
									{/each}
									<td class={tdClass}>
										<Button
											color="secondary"
											onclick={() => start_edit(id)}
											class="text-xs px-2 py-1"
										>
											modifica
										</Button>
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</AccordionItem>
	{/each}
	</Accordion>

	{#if sections().length === 0}
		<div class="text-center text-lab py-12">
			Nessun testo caricato. Clicca "Ricarica da DB" oppure verifica che lang.setSerializer() venga chiamato all'avvio.
		</div>
	{/if}

</FC>
