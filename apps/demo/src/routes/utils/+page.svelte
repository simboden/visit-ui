<script lang="ts">
	import { Card, Code, FC, FR, FS, H2, Page, Radio, Spring } from 'visit-ui';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];
	let fcView = $state<string | number | null>('preview');
	let frView = $state<string | number | null>('preview');
	let fsView = $state<string | number | null>('preview');
	let springView = $state<string | number | null>('preview');
</script>

<Page title="Utils">
	<FC class="gap-8">

		<Card>
			<FS>
				<H2>FC</H2>
				<Radio options={viewOptions} bind:value={fcView} class="mr-4" />
			</FS>
			
            <p> FlexColumn is syntactical sugar for <Code>flex flex-col gap-3</Code>. It stacks its children vertically </p>

			{#if fcView === 'preview'}
                <FC class="border-1 border-dashed border-pri rounded-xl p-2" >
                    <Card class="w-32">child 1</Card>
                    <Card class="w-32">child 2</Card>
                    <Card class="w-32">child 3</Card>
                </FC>
			{:else}
				<CodeBlock code={` <script lang="ts"> 
    import { FC, FR, FS, Spring } from 'visit-ui';
</` + `script>
<FS>
    <div>child 1</div>
    <div>child 2</div>
</FS>`} 
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>FR</H2>
				<Radio options={viewOptions} bind:value={frView} class="mr-4" />
			</FS>
			<p>
				FlexRow is syntactical sugar for <Code>flex flex-row w-full items-center gap-3</Code>. It stacks its children horizontally
			</p>
			{#if frView === 'preview'}
                <FR class="border-1 border-dashed border-pri rounded-xl p-2">
                    <Card class="w-32">child 1</Card>
                    <Card class="w-32">child 2</Card>
                    <Card class="w-32">child 3</Card>
                </FR>
			{:else}
				<CodeBlock code={`
<FR>
    <div>child 1</div>
    <div>child 2</div>
</FR>`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>FS</H2>
				<Radio options={viewOptions} bind:value={fsView} class="mr-4" />
			</FS>
			<p>
                FlexSpread is syntactical sugar for <Code>flex flex-row w-full items-center justify-between</Code>. It stacks its children horizontally and spread them apart
			</p>
			{#if fsView === 'preview'}
            <FS class="border-1 border-dashed border-pri rounded-xl p-2">
                <Card class="w-32">child 1</Card>
                <Card class="w-32">child 2</Card>
                <Card class="w-32">child 3</Card>
            </FS>
			{:else}
				<CodeBlock code={`            
<FS>
    <div>child 1</div>
    <div>child 2</div>
</FS>
`}
				/>
			{/if}
		</Card>

		<Card>
			<FS>
				<H2>Spring</H2>
				<Radio options={viewOptions} bind:value={springView} class="mr-4" />
			</FS>
			<p>
				Spring is syntatical sugar for <Code>min-w-0 grow shrink basis-0</Code>.
                It is a flex spacer that expands to fill all available space in a flex row
				or column. Place it between elements to push them apart, or place an element between to springs to keep it centered.
			</p>
			{#if springView === 'preview'}
                <FR>
                    <Card class="w-32">child 1</Card>
                    <Spring class="border-1 border-dashed border-pri rounded-lg p-2" />
                    <Card class="w-32">child 2</Card>
                    <Card class="w-32">child 3</Card>
                </FR>
                <FR>
                    <Spring class="border-1 border-dashed border-pri rounded-lg p-2" />
                    <Card class="w-32">child</Card>
                    <Spring class="border-1 border-dashed border-pri rounded-lg p-2" />
                </FR>

            {:else}
				<CodeBlock code={`                
<!-- spread items -->
<FR>
    <div>child 1</div>
    <Spring/>
    <div>child 2</div>
    <div>child 3</div>
</FR>
<!-- centers item -->
<FR>
    <Spring/>
    <div>child</div>
    <Spring/>
</FR>`}
				/>
			{/if}
		</Card>

	</FC>
</Page>
