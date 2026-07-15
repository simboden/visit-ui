<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { Icon } from './index.js';
	import LocOrText from './LocOrText.svelte';
	import { resolveHref, stripBasePath } from '../utils/routeHref.js';

	type Props = {
		// testo letterale, o "#text_id" per una traduzione (vedi LocOrText)
		label?: string;
		href?: string;
		icon?: string;
		// icona a destra (es. una "x" per rimuovere la riga) — resta sempre a filo del bordo
		// destro, come lo chevron di SidebarDropdown, indipendentemente dal contenuto centrale.
		// mr-0.5 sul bottone compensa il fatto che il glifo "close" di MDI ha meno margine
		// interno (rispetto al proprio viewBox) di mdiChevronDown, quindi a parita' di bordo
		// box i due "inchiostri" non risultano allineati di ~1-2px senza questa correzione.
		rightIcon?: string;
		rightIconLabel?: string;
		onclick?: (e: MouseEvent) => void;
		onRightIconClick?: (e: MouseEvent) => void;
		children?: Snippet;
		class?: string;
	};

	let {
		label = '',
		href = '',
		icon,
		rightIcon,
		rightIconLabel = '',
		onclick,
		onRightIconClick,
		children,
		class: className = ''
	}: Props = $props();

	function handleRightIconClick(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		onRightIconClick?.(e);
	}

	// span, non <button>: quando href e' assente la riga stessa e' un <button> e l'HTML non
	// permette un <button> annidato in un altro <button> (il parser lo spezza, rompendo il
	// layout) — role="button" + onkeydown mantiene l'accessibilita' da tastiera
	function handleRightIconKeydown(e: KeyboardEvent) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		e.stopPropagation();
		onRightIconClick?.(e as unknown as MouseEvent);
	}

	const resolvedHref = $derived(resolveHref(href));
	const active = $derived(!!href && stripBasePath(page.url.pathname) === href);

	// Quando l'item non ha icona sinistra, recupera --sidebar-dropdown-indent (impostata da
	// SidebarDropdown sull'<ul> che racchiude i suoi children) per allineare la label a quella
	// del trigger del dropdown, come se ci fosse anche qui un'icona. Se l'item non e' annidato
	// in un SidebarDropdown la variabile non esiste e il fallback (0px) lascia l'item invariato.
	// Quando l'icona c'e', l'item si allinea gia' da solo: niente margine aggiuntivo.
	const spanClass = $derived(
		[
			'flex-1 whitespace-nowrap text-left px-2',
			!icon && 'ml-[var(--sidebar-dropdown-indent,0px)]'
		]
			.filter(Boolean)
			.join(' ')
	);

	const base = [
		'flex w-full items-center gap-3',
		'px-1 py-1 rounded',
		'no-underline',
		'text-text',
		'transition-colors',
		'cursor-pointer',
		'hover:bg-input-hover'
	].join(' ');

	const activeClass = 'bg-input-hover rounded-lg';
</script>

<li class="before:hidden {className}" style="padding-inline: 0.5rem;">
	{#if href}
		<a href={resolvedHref} {onclick} aria-current={active ? 'page' : undefined} class="{base} {active ? activeClass : ''}">
			{#if icon}
				<Icon {icon} class="shrink-0" />
			{/if}
			<span class={spanClass}>
				{#if children}{@render children()}{:else}<LocOrText value={label} />{/if}
			</span>
			{#if rightIcon}
				<span
					role="button"
					tabindex="0"
					class="shrink-0 mr-0.5 cursor-pointer text-text hover:text-red-500"
					aria-label={rightIconLabel}
					onclick={handleRightIconClick}
					onkeydown={handleRightIconKeydown}
				>
					<Icon icon={rightIcon} size="1rem" />
				</span>
			{/if}
		</a>
	{:else}
		<button type="button" {onclick} aria-current={active ? 'page' : undefined} class="{base} {active ? activeClass : ''}">
			{#if icon}
				<Icon {icon} class="shrink-0" />
			{/if}
			<span class={spanClass}>
				{#if children}{@render children()}{:else}<LocOrText value={label} />{/if}
			</span>
			{#if rightIcon}
				<span
					role="button"
					tabindex="0"
					class="shrink-0 mr-0.5 cursor-pointer text-text hover:text-red-500"
					aria-label={rightIconLabel}
					onclick={handleRightIconClick}
					onkeydown={handleRightIconKeydown}
				>
					<Icon icon={rightIcon} size="1rem" />
				</span>
			{/if}
		</button>
	{/if}
</li>
