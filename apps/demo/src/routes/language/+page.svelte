<script lang="ts">
	import { Card, Code, FC, H2, LangPage, Page } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<Page title="Language">
	<FC class="gap-8">
		<Card>
			<H2>Internazionalizzazione</H2>
			<p>
				visit-ui non sa nulla del backend dell'app che lo usa: lo store <Code>lang</Code> tiene lo
				stato (lingue disponibili, lingua corrente, testi caricati) ma non sa <em>dove</em> i testi
				vengano letti o scritti. Esattamente come <Code>theme</Code>/<Code>ThemeSerializer</Code>,
				la persistenza è iniettata dall'app tramite un <Code>LangSerializer</Code>: un oggetto con
				<Code>languages</Code> (l'elenco delle lingue previste, es. <Code>&#123; code: 'it', label: 'Italiano', icon: '🇮🇹' &#125;</Code>),
				<Code>load()</Code> (restituisce tutte le voci) e <Code>save(id, values, type)</Code>
				(persiste una voce). L'app chiama <Code>lang.setSerializer(myLangSerializer)</Code> una
				volta, all'avvio — questa pagina lo fa con un serializzatore basato su
				<Code>localStorage</Code>, un'app reale lo farebbe verso il proprio database.
			</p>
			<p>
				Ogni voce di traduzione (<Code>LangEntry</Code>) ha un <Code>id</Code> (es.
				<Code>"home.title"</Code>), una mappa <Code>values</Code> con un testo per ogni codice di
				lingua, e un <Code>type</Code> opzionale che indica come va interpretato il testo:
				<Code>'p'</Code> (plain text, il default), <Code>'m'</Code> (markdown, renderizzato con il
				componente <Code>Markdown</Code>) oppure <Code>'h'</Code> (HTML, inserito con
				<Code>&#123;@html&#125;</Code>). Il tipo è una proprietà della voce stessa, non un parametro
				passato a ogni utilizzo: lo decide chi scrive il contenuto, non chi lo mostra.
			</p>
			<p>
				I componenti coinvolti sono pochi e con responsabilità separate:
			</p>
			<ul class="list-disc pl-6 space-y-1">
				<li>
					<Code>LocText</Code> — mostra il testo di un <Code>text_id</Code> nella lingua corrente,
					scegliendo automaticamente plain/markdown/html in base al <Code>type</Code> della voce.
					Se <Code>lang.lang_edit</Code> è attivo, mostra anche un'iconcina che apre un dialog di
					editing con un campo per ciascuna lingua configurata.
				</li>
				<li>
					<Code>LocOrText</Code> — helper minimale: dato un prop stringa, se inizia con
					<Code>"#"</Code> lo interpreta come <Code>text_id</Code> e delega a <Code>LocText</Code>,
					altrimenti mostra il valore letterale. È il modo in cui componenti come <Code>Label</Code>
					accettano <em>sia</em> testo fisso <em>sia</em> un riferimento localizzato con un unico prop.
				</li>
				<li>
					<Code>LangSwitch</Code> — menu a tendina con le lingue disponibili (quelle dichiarate dal
					serializzatore), per cambiare <Code>lang.current</Code>. Lo vedi nella navbar qui sopra.
				</li>
				<li>
					<Code>LangPage</Code> — pagina di amministrazione: elenca tutte le voci raggruppate per
					sezione, permette di crearne di nuove e di modificarle. È riportata qui sotto.
				</li>
			</ul>
			<CodeBlock
code={`<script lang="ts">
  import { lang, type LangSerializer } from 'visit-ui';

  const myLangSerializer: LangSerializer = {
    languages: [
      { code: 'it', label: 'Italiano', icon: '🇮🇹' },
      { code: 'en', label: 'English',  icon: '🇬🇧' }
    ],
    async load() {
      // legge tutte le voci dal proprio backend
      return await myApi.getAllTexts();
    },
    async save(id, values, type) {
      // persiste una voce (id, valori per lingua, tipo plain/markdown/html)
      await myApi.saveText(id, values, type);
    }
  };

  lang.setSerializer(myLangSerializer); // una volta, all'avvio dell'app
</` + `script>

<LocText text_id="home.title" />
<Label label="#home.title" />     <!-- stesso text_id, via convenzione "#" -->
<LangSwitch />                    <!-- selettore lingua -->`}
			/>
		</Card>

		<Card>
			<p>Sotto, il componente <Code>LangPage</Code> riusato da questo demo.</p>
			<LangPage />
		</Card>
	</FC>
</Page>
