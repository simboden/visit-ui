<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { tv } from 'tailwind-variants';
	import { Icon, Spinner, Tooltip } from './index.js';

	type Props = {
		title?: string;
		disabled?: boolean;
		loading?: boolean;
		variant?: 'filled' | 'outlined' | 'ghost';
		color?: 'primary' | 'secondary' | 'danger';
		size?: 'small' | 'medium' | 'large';
		icon?: string;
		icon2?: string;
		class?: string;
		children?: Snippet;
	} & Omit<HTMLButtonAttributes, 'disabled' | 'class'>;

	let {
		title,
		disabled = false,
		loading = false,
		variant = 'filled',
		color = 'primary',
		size = 'medium',
		icon,
		icon2,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);

	const spinnerSize = $derived({ small: '1rem', medium: '1.25rem', large: '1.5rem' }[size]);

    const base = [
        'inline-flex',
        'items-center',
        'justify-center',
        'gap-2',
        'rounded-lg',
        'font-medium',
        'transition-colors',
        'cursor-pointer',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'focus:outline-none',
        'focus:ring-[length:var(--button-focus-sz)]',
        'w-fit'
    ].join(" ")

	const styles = tv({
		base: base,
		variants: {
			size: {
				small:  'px-3 py-1 text-sm',
				medium: 'px-4 py-2 text-base',
				large:  'px-6 py-3 text-lg'
			},
			variant: {
				filled: '',
				outlined: '',
				ghost: ''
			},
			color: {
				primary: '',
				secondary: '',
				danger: ''
			}
		},
		compoundVariants: [
			{ variant: 'filled',    color: 'primary',   class: 'bg-pri                  text-pri-text       hover:bg-pri-hover      focus:ring-pri-focus'   },
			{ variant: 'filled',    color: 'secondary', class: 'bg-sec                  text-sec-text       hover:bg-sec-hover      focus:ring-sec-focus'   },
			{ variant: 'filled',    color: 'danger',    class: 'bg-danger               text-danger-text    hover:bg-danger-hover   focus:ring-danger-focus'},
			{ variant: 'outlined',  color: 'primary',   class: 'bg-pri/30               text-pri            hover:bg-pri/10         focus:ring-pri-focus,   border-2 border-pri'   },
			{ variant: 'outlined',  color: 'secondary', class: 'bg-sec/30               text-text           hover:bg-sec/10         focus:ring-sec-focus    border-2 border-sec'   },
			{ variant: 'outlined',  color: 'danger',    class: 'bg-danger/30            text-danger         hover:bg-danger/10      focus:ring-danger-focus border-2 border-danger'},
			{ variant: 'ghost',     color: 'primary',   class: '                        text-pri            hover:bg-pri/30         focus:ring-pri-focus'   },
			{ variant: 'ghost',     color: 'secondary', class: '                        text-text           hover:bg-sec/30         focus:ring-sec-focus'   },
			{ variant: 'ghost',     color: 'danger',    class: '                        text-danger         hover:bg-danger/30      focus:ring-danger-focus'}
		]
	});
</script>

<Tooltip text={title}>
	{#snippet child({ props })}
		<Button.Root
			{...props}
			{...restProps}
			disabled={isDisabled}
			class={styles({ size, variant, color, class: className })}
		>
			{#if loading}
				<Spinner size={spinnerSize} />
			{:else if icon}
				<Icon {icon} />
			{/if}

            {@render children?.()}

			{#if icon2}
				<Icon icon={icon2} />
			{/if}
		</Button.Root>
	{/snippet}
</Tooltip>
