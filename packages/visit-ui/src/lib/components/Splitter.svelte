<script lang="ts">
	// Splitter: a resizable two-panel layout.
	//
	// direction='h' — horizontal split: first panel on top, second on bottom.
	// direction='v' — vertical split:   first panel on left,  second on right.
	//
	// The divider size (second panel) is persisted to localStorage so the user's
	// preferred layout survives page reloads.
	// Assumes at most one Splitter per page (shared localStorage keys).
	import { onDestroy, onMount, untrack } from 'svelte';
	import type { Snippet } from 'svelte';
	import { mdiReload } from '@mdi/js';
	import { Icon } from './index.js';
	import { appShell } from '../stores/app.svelte.js';

	type Props = {
		direction?: 'h' | 'v';
		first_min_size?: number;    // minimum px size of the first panel
		second_min_size?: number;   // minimum px size of the second panel
		showRotate?: boolean;
		first: Snippet;
		second: Snippet;
	};

	let {
		direction = $bindable('v'),
		first_min_size = 100,
		second_min_size = 200,
		showRotate = false,
		first,
		second
	}: Props = $props();

	const header_size = $derived(parseInt(appShell.navbarHeight));

	function toggleDirection(e: MouseEvent) {
		e.stopPropagation();
		direction = direction === 'v' ? 'h' : 'v';
	}

	const HANDLE_SIZE = 20; // px thickness of the drag handle

	let s1 = $state(200);
	let s2 = $state(400);
	let container: HTMLElement;

	function storageKey(d: 'h' | 'v') {
		return `splitter-bottom-${d}`;
	}

	function loadSecond(d: 'h' | 'v'): number | null {
		try {
			const v = localStorage.getItem(storageKey(d));
			if (v === null) return null;
			const n = Number(v);
			return Number.isFinite(n) && n > 0 ? n : null;
		} catch { return null; }
	}

	function saveSecond(d: 'h' | 'v', v: number) {
		try { localStorage.setItem(storageKey(d), String(v)); } catch {}
	}

	function recalc() {
		const rect = container?.getBoundingClientRect();
		const avail = rect
			? (direction === 'h' ? rect.height : rect.width) - HANDLE_SIZE
			: direction === 'h'
				? window.innerHeight - header_size - HANDLE_SIZE
				: window.innerWidth - HANDLE_SIZE;
		if (s2 < second_min_size) s2 = second_min_size;
		if (avail - s2 < first_min_size) s2 = Math.max(second_min_size, avail - first_min_size);
		s1 = avail - s2;
	}

	function on_mousedown(e: MouseEvent) {
		document.body.style.cursor = direction === 'h' ? 'ns-resize' : 'ew-resize';
		document.body.style.userSelect = 'none';
		document.addEventListener('mousemove', on_mousemove);
		document.addEventListener('mouseup', on_mouseup);
		e.stopPropagation();
	}

	function on_mousemove(e: MouseEvent) {
		const rect = container.getBoundingClientRect();
		const avail = (direction === 'h' ? rect.height : rect.width) - HANDLE_SIZE;
		let pos = direction === 'h' ? e.clientY - rect.top : e.clientX - rect.left;
		pos = Math.max(first_min_size, Math.min(pos, avail - second_min_size));
		s1 = pos;
		s2 = avail - pos;
		e.stopPropagation();
	}

	function on_mouseup(e: MouseEvent) {
		document.removeEventListener('mousemove', on_mousemove);
		document.removeEventListener('mouseup', on_mouseup);
		document.body.style.cursor = '';
		document.body.style.userSelect = '';
		saveSecond(direction, s2);
		e.stopPropagation();
	}

	// Reload saved size whenever direction changes.
	$effect(() => {
		direction;
		untrack(() => {
			const saved = loadSecond(direction);
			s2 = saved ?? second_min_size;
			recalc();
		});
	});

	onMount(() => { window.addEventListener('resize', recalc); });
	onDestroy(() => { window.removeEventListener('resize', recalc); });
</script>

{#if direction === 'h'}
	<div bind:this={container} class="flex flex-col w-full overflow-hidden" style="height: calc(100vh - {header_size}px);">
		<div class="overflow-hidden" style="height: {s1}px;">
			{@render first()}
		</div>

		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="group relative z-10 shrink-0 cursor-ns-resize bg-body"
			style="height: {HANDLE_SIZE}px;"
			role="separator"
			onmousedown={on_mousedown}
		>
			<div class="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-card-border group-hover:bg-pri" style="height: 2px;"></div>
			<div class="absolute inset-0 flex items-center justify-center overflow-visible">
				<div class="rounded-full bg-card border border-card-border px-2 py-0.5">
					<svg viewBox="0 0 10 4" height="8px">
						<g fill="currentColor">
							<circle cx="2" cy="2" r="1" />
							<circle cx="5" cy="2" r="1" />
							<circle cx="8" cy="2" r="1" />
						</g>
					</svg>
				</div>
			</div>
			{#if showRotate}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 rounded-full bg-card border border-card-border hover:bg-pri cursor-pointer p-0.5"
					style="left: 100px;"
					onclick={toggleDirection}
				>
					<Icon icon={mdiReload} size="1.5rem" />
				</button>
			{/if}
		</div>

		<div class="overflow-hidden" style="height: {s2}px;">
			{@render second()}
		</div>
	</div>
{:else}
	<div bind:this={container} class="flex flex-row w-full overflow-hidden" style="height: calc(100vh - {header_size}px);">
		<div class="overflow-hidden h-full" style="width: {s1}px;">
			{@render first()}
		</div>

		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="group relative z-10 shrink-0 cursor-ew-resize bg-body"
			style="width: {HANDLE_SIZE}px;"
			role="separator"
			onmousedown={on_mousedown}
		>
			<div class="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-card-border group-hover:bg-pri" style="width: 2px;"></div>
			<div class="absolute inset-0 flex items-center justify-center overflow-visible">
		        <!-- <div class="rounded-full bg-card border bg-opacity-100 border-card-border px-0.5 py-2"> -->
                <!-- <div class="rounded-full bg-card-border !bg-opacity-100 px-0.5 py-0.5"> -->
					<svg viewBox="0 0 4 10" width="8px">
						<g fill="currentColor">
							<circle cx="2" cy="2" r="1" />
							<circle cx="2" cy="5" r="1" />
							<circle cx="2" cy="8" r="1" />
						</g>
					</svg>
				<!-- </div> -->
			</div>
			{#if showRotate}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-card border border-card-border hover:bg-pri cursor-pointer p-0.5"
					style="top: 100px;"
					onclick={toggleDirection}
				>
					<Icon icon={mdiReload} size="1.5rem" />
				</button>
			{/if}
		</div>

		<div class="overflow-hidden h-full" style="width: {s2}px;">
			{@render second()}
		</div>
	</div>
{/if}

