<script lang="ts">
	import { Button, Card, Code, FC, FR, H1, H2, H3, H4, Input, Page, Radio } from 'visit-ui';

	const sourceOptions = [
		{ value: 'local', label: 'Locale' },
		{ value: 'google', label: 'Google Fonts' },
		{ value: 'url', label: 'URL font' }
	];

	let bodyFontName = $state('');
	let bodySource = $state<string | number | null>('local');
	let bodyFontUrl = $state('');
	let headFontName = $state('');
	let headSource = $state<string | number | null>('local');
	let headFontUrl = $state('');

	function googleHref(name: string) {
		return `https://fonts.googleapis.com/css2?family=${name.trim().replace(/\s+/g, '+')}&display=swap`;
	}

	function ensureLink(id: string, name: string) {
		let link = document.getElementById(id) as HTMLLinkElement | null;
		if (!link) {
			link = document.createElement('link');
			link.id = id;
			link.rel = 'stylesheet';
			document.head.appendChild(link);
		}
		link.href = googleHref(name);
	}

	function fontFormat(url: string) {
		const ext = url.split('.').pop()?.split(/[?#]/)[0]?.toLowerCase();
		return { woff2: 'woff2', woff: 'woff', ttf: 'truetype', otf: 'opentype' }[ext ?? ''] ?? '';
	}

	function ensureFontFace(id: string, name: string, url: string) {
		let style = document.getElementById(id) as HTMLStyleElement | null;
		if (!style) {
			style = document.createElement('style');
			style.id = id;
			document.head.appendChild(style);
		}
		const format = fontFormat(url);
		style.textContent = `@font-face { font-family: "${name}"; src: url("${url}")${format ? ` format("${format}")` : ''}; font-display: swap; }`;
	}

	function ensureHeadFontFamilyRule(name: string) {
		let style = document.getElementById('font-test-head-style') as HTMLStyleElement | null;
		if (!style) {
			style = document.createElement('style');
			style.id = 'font-test-head-style';
			document.head.appendChild(style);
		}
		style.textContent = `h1, h2, h3, h4 { font-family: "${name}", sans-serif; }`;
	}

	function applyBodyFont() {
		const name = bodyFontName.trim();
		if (!name) return;
		if (bodySource === 'google') ensureLink('font-test-body-link', name);
		else if (bodySource === 'url' && bodyFontUrl.trim())
			ensureFontFace('font-test-body-face', name, bodyFontUrl.trim());
		document.body.style.fontFamily = `"${name}", sans-serif`;
	}

	function applyHeadFont() {
		const name = headFontName.trim();
		if (!name) return;
		if (headSource === 'google') ensureLink('font-test-head-link', name);
		else if (headSource === 'url' && headFontUrl.trim())
			ensureFontFace('font-test-head-face', name, headFontUrl.trim());
		ensureHeadFontFamilyRule(name);
	}

	function reset() {
		bodyFontName = '';
		headFontName = '';
		bodyFontUrl = '';
		headFontUrl = '';
		document.body.style.fontFamily = '';
		document.getElementById('font-test-head-style')?.remove();
		document.getElementById('font-test-body-link')?.remove();
		document.getElementById('font-test-head-link')?.remove();
		document.getElementById('font-test-body-face')?.remove();
		document.getElementById('font-test-head-face')?.remove();
	}
</script>

<Page title="Font">
	<FC class="gap-8">
		<p>
			Pagina di prova per testare il cambio di font a runtime, prima di integrarlo nel
			<Code>theme</Code> store. Distingue il font del testo (<Code>body</Code>) da quello dei titoli
			(<Code>h1</Code>-<Code>h4</Code>). "Locale" assume che il font sia già disponibile nel sistema/app;
			"Google Fonts" carica al volo un <Code>&lt;link&gt;</Code> da fonts.googleapis.com; "URL font"
			genera un <Code>@font-face</Code> a runtime puntando direttamente al file del font (woff2/woff/ttf),
			utile per font ospitati altrove (es. CDN di terze parti). Nota: se l'URL non risponde con header
			CORS permissivi, il browser non riuscirà a caricare il font e tornerà al fallback.
		</p>

		<Card>
			<H2>Font del testo (body)</H2>
			<FC class="gap-2">
				<FR class="items-end gap-2">
					<Input class="grow" label="Nome font" bind:value={bodyFontName} placeholder="es. Roboto" />
					<Radio options={sourceOptions} bind:value={bodySource} />
					<Button onclick={applyBodyFont}>Applica</Button>
				</FR>
				{#if bodySource === 'url'}
					<Input
						label="URL del font (woff2/woff/ttf)"
						bind:value={bodyFontUrl}
						placeholder="https://.../font.woff2"
					/>
				{/if}
			</FC>
		</Card>

		<Card>
			<H2>Font dei titoli (heading)</H2>
			<FC class="gap-2">
				<FR class="items-end gap-2">
					<Input
						class="grow"
						label="Nome font"
						bind:value={headFontName}
						placeholder="es. Playfair Display"
					/>
					<Radio options={sourceOptions} bind:value={headSource} />
					<Button onclick={applyHeadFont}>Applica</Button>
				</FR>
				{#if headSource === 'url'}
					<Input
						label="URL del font (woff2/woff/ttf)"
						bind:value={headFontUrl}
						placeholder="https://.../font.woff2"
					/>
				{/if}
			</FC>
		</Card>

		<FR>
			<Button color="secondary" onclick={reset}>Reset</Button>
		</FR>

		<Card>
			<H2>Anteprima</H2>
			<FC class="gap-2">
				<H1>H1 - Titolo principale</H1>
				<H2>H2 - Titolo di sezione</H2>
				<H3>H3 - Sottosezione</H3>
				<H4>H4 - Titolo minore</H4>
				<p>
					Questo è un paragrafo di testo normale, utile per verificare il font applicato al
					body. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua.
				</p>
			</FC>
		</Card>
	</FC>
</Page>
