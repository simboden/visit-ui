<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	type Props = {
		class?: string;
	};

	let { class: className = '' }: Props = $props();
</script>

<DropdownMenu.Separator class={['my-1 h-px bg-hr', className].join(' ')} />
