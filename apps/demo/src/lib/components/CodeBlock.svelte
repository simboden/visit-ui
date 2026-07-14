<script lang="ts">
	import { theme } from 'visit-ui';
	import { Highlight } from 'svelte-highlight';
	import { svelte as svelteLang } from 'svelte-highlight/languages';
	import github from 'svelte-highlight/styles/github';
	import githubDark from 'svelte-highlight/styles/github-dark';

	type Props = {
		code: string;
		language?: typeof svelteLang;
	};

	const { code: rawCode, language = svelteLang }: Props = $props();

	const code = $derived(rawCode.replace(/^\n+/, '').replace(/\n+$/, ''));

	const style = $derived(theme.current.dark ? githubDark : github);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html style}
</svelte:head>

<div
	class="rounded-lg border border-card-border overflow-x-auto text-sm bg-card [&_pre]:!m-0 [&_pre]:!bg-transparent [&_.hljs]:!bg-transparent"
>
	<Highlight {language} {code} />
</div>
