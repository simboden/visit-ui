<script lang="ts">
	type Props = {
		icon: string;
		size?: string;
		color?: string;
		spin?: boolean;
		class?: string;
	};

	let {
		icon,
		size = '1.5em',
		color = 'currentColor',
		spin = false,
		class: className = ''
	}: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	class={[spin && 'animate-spin', className]}
	aria-hidden="true"
>
	<path d={icon} fill={color} />
</svg>
