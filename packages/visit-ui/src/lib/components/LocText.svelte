<script lang="ts">
	import { mdiPencilOutline } from '@mdi/js';
	import { lang } from '../stores/lang.svelte.js';
	import { Button, Icon, Card, FR, Spring, H3, TextArea } from './index.js';
	import Markdown from '../markdown/Markdown.svelte';
	import { resolveHref } from '../utils/routeHref.js';

	type Props = {
		text_id: string;
		link?: string | null;
		datacy?: string | null;
		class?: string;
	};

	let {
		text_id,
		link = null,
		datacy = null,
		class: klass = ''
	}: Props = $props();

	let show_dialog = $state(false);
	// deve essere $state: viene letto dentro l'$effect sotto, altrimenti l'effect
	// non si riattiva quando bind:this lo assegna
	let dialog: HTMLDialogElement = $state()!;
	// inizializzato gia' completo (non {}) perche' il dialog (sotto) monta bind:value su questi
	// campi appena lang.lang_edit diventa true, prima ancora che on_show_dialog venga chiamato
	let edit_values = $state<Record<string, string>>(lang.values(text_id));

	let text = $derived(lang.t(text_id));
	let type = $derived(lang.type(text_id));
	let resolvedLink = $derived(resolveHref(link));

	$effect(() => {
		if (show_dialog && dialog) dialog.showModal();
		else if (!show_dialog && dialog?.open) dialog.close();
	});

	function on_show_dialog() {
		edit_values = { ...lang.values(text_id) };
		show_dialog = true;
	}

	function on_submit() {
		lang.save(text_id, edit_values);
		show_dialog = false;
	}

	function on_cancel() {
		show_dialog = false;
	}
</script>

<span>
	{#if link}
		<a
			href={resolvedLink}
			data-cy={datacy}
			class="text-text no-underline hover:no-underline hover:bg-input-hover p-2 rounded-lg"
		>
			{text}
		</a>
	{:else if type === 'h'}
		<div data-cy={datacy} class={klass}>
			{@html text}
		</div>
	{:else if type === 'm'}
		<div data-cy={datacy} class={klass}>
			<Markdown source={text} />
		</div>
	{:else}
		<span data-cy={datacy}>{text}</span>
	{/if}

	{#if lang.lang_edit}
		<button
			type="button"
			onclick={on_show_dialog}
			class="text-red-500 hover:text-red-400 ml-1 align-middle"
		>
			<Icon icon={mdiPencilOutline} size="1.5rem" class="inline mb-2" />
		</button>
	{/if}
</span>

{#if lang.lang_edit}
	<dialog
		bind:this={dialog}
		class="m-auto bg-dialog rounded-lg shadow-2xl border border-(--color-card-border) p-0 w-[800px] max-w-[95vw]"
	>
		<Card class="max-w-none! w-full">
			<H3>Editing "{text_id}"</H3>
			{#each lang.languages as language (language.code)}
				<TextArea label={language.label} rows={6} bind:value={edit_values[language.code]} />
			{/each}
			<FR class="pt-2">
				<Spring />
				<Button onclick={on_submit}>submit</Button>
				<Button color="secondary" onclick={on_cancel}>cancel</Button>
			</FR>
		</Card>
	</dialog>
{/if}

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
</style>
