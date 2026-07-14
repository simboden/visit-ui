<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { tv } from 'tailwind-variants';
	import { Icon, Tooltip } from './index.js';

	type Props = {
		title?: string;
		href: string;
		open_in_new_tab?: boolean;
		variant?: 'filled' | 'outlined' | 'ghost';
		color?: 'primary' | 'secondary' | 'danger';
		size?: 'small' | 'medium' | 'large';
		icon?: string;
		class?: string;
		children?: Snippet;
	} & Omit<HTMLAnchorAttributes, 'href' | 'target' | 'rel' | 'class'>;

	let {
		title,
		href,
		open_in_new_tab = false,
		variant = 'filled',
		color = 'primary',
		size = 'medium',
		icon,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

    const base = [
        'inline-flex',
        'items-center',
        'justify-center',
        'gap-2',
        'rounded-lg',
        'font-medium',
        'transition-colors',
        'cursor-pointer',
        'focus:outline-none',
        'focus:ring-[length:var(--button-focus-sz)]'
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
			{ variant: 'outlined',  color: 'secondary', class: 'bg-sec/30               text-sec            hover:bg-sec/10         focus:ring-sec-focus    border-2 border-sec'   },
			{ variant: 'outlined',  color: 'danger',    class: 'bg-danger/30            text-danger         hover:bg-danger/10      focus:ring-danger-focus border-2 border-danger'},
			{ variant: 'ghost',     color: 'primary',   class: '                        text-pri            hover:bg-pri/10         focus:ring-pri-focus'   },
			{ variant: 'ghost',     color: 'secondary', class: '                        text-sec            hover:bg-sec/10         focus:ring-sec-focus'   },
			{ variant: 'ghost',     color: 'danger',    class: '                        text-danger         hover:bg-danger/10      focus:ring-danger-focus'}
		]
	});
</script>

<Tooltip text={title}>
	{#snippet child({ props })}
		<a
			{...props}
			{...restProps}
			{href}
			target={open_in_new_tab ? '_blank' : undefined}
			rel={open_in_new_tab ? 'noopener noreferrer' : undefined}
			class={styles({ size, variant, color, class: className })}
		>
			{#if icon} <Icon {icon} /> {/if}
            {@render children?.()}

		</a>
	{/snippet}
</Tooltip>
