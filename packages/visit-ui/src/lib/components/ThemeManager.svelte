<script lang="ts">
	import { mdiCheck, mdiClose, mdiContentCopy } from '@mdi/js';
	import { theme } from '../stores/theme.svelte.js';
	import { appShell } from '../stores/app.svelte.js';
	import { Accordion, AccordionItem, Button, ConfirmDialog, FC, FieldColor, FR, Icon, Input } from './index.js';

	let confirmDelete = $state(false);
	let copied = $state(false);

	function onDeleteConfirm(result: boolean) {
		if (result) theme.deleteCurrent();
	}

	async function copyVars() {
		await navigator.clipboard.writeText(theme.varsAsTs());
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<FC class="gap-3">
	<FR class="items-center justify-between">
		<p class="text-lg font-bold">Theme Manager</p>
		<button
			type="button"
			onclick={() => appShell.closeRight()}
			aria-label="Close right sidebar"
			class="flex cursor-pointer items-center justify-center rounded p-1 hover:scale-110 transition-transform"
		>
			<Icon icon={mdiClose} class="h-5 w-5" />
		</button>
	</FR>

	<FR>
		<Input class="grow" label="Name" bind:value={theme.current.title} />
		<Input class="w-12" label="Icon" bind:value={theme.current.icon} />
	</FR>

	<FR>
		<Button class="w-full" variant="filled" color="secondary" onclick={() => theme.reset()}>
			Reset
		</Button>
		<Button class="w-full" variant="filled" color="secondary" onclick={() => theme.newTheme()}>
			New
		</Button>
	</FR>



	<FR>
		<Button class="w-full" disabled={!theme.hasSerializer} onclick={() => theme.save()}>
			Save
		</Button>
		<Button
			class="w-full"
			color="secondary"
			disabled={!theme.hasSerializer || theme.themes.length <= 1}
			onclick={() => (confirmDelete = true)}
		>
			Delete
		</Button>
	</FR>

    <!-- Sections (incl. their order) come from the theme data itself, not a hardcoded list here,
    so host apps can add their own sections without touching this component. Widget per var is
    chosen by naming convention (`color-*` -> FieldColor) rather than an explicit type field on
    the var, to keep the persisted theme shape minimal. -->
    <Accordion class="mt-0">
        {#each theme.current.sections as section (section.name)}
            <AccordionItem title={section.name}>
                <div class="grid grid-cols-[2fr_3fr] items-center gap-2">
                    {#each Object.keys(section.vars) as key (key)}
                        <p class="text-sm">{key.replace('color-', '')}</p>
                        {#if key.startsWith('color-')}
                            <FieldColor bind:value={section.vars[key]} oninput={() => theme.applyVar(key)} />
                        {:else}
                            <Input bind:value={section.vars[key]} oninput={() => theme.applyVar(key)} />
                        {/if}
                    {/each}
                </div>
            </AccordionItem>
        {/each}
    </Accordion>
    
    <Button
        class="w-full"
        color="secondary"
        icon={copied ? mdiCheck : mdiContentCopy}
        onclick={copyVars}
    >
        {copied ? 'Copied!' : 'Copy vars'}
    </Button>

</FC>

<ConfirmDialog
	bind:open={confirmDelete}
	title="Please Confirm"
	text="Delete theme {theme.current.title}?"
	onconfirm={onDeleteConfirm}
/>
