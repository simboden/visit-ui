<script lang="ts">
	type Props = {
		size?: string;
		class?: string;
	};

	let {
		size = '1.5em',
		class: className = ''
	}: Props = $props();
</script>

<svg width={size} height={size} class={['animate-spin', className]} viewBox="0 0 24 24" fill="none" aria-hidden="true">
	<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
	<path class="opacity-75" fill="currentColor" d="M 0.04,12.10 C -0.04,5.60 5.43,-0.05 12,0.036 L 11.93,4.03 C 6.88,4.13 3.90,8.17 3.92,12.11 Z" />
</svg>
