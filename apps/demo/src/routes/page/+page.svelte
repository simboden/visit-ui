<script lang="ts">
	import { Button, Card, Check, Code, FC, FR, H2, Page } from 'visit-ui';

	let fullWidth = $state(false);
    let breadcrumb = $state(false);
    let showTitle = $state(true);
    let title = $derived( showTitle ? "Page" : "" );
</script>

<Page {fullWidth} class="border-2 border-pri border-dashed rounded-lg" {title} {breadcrumb}>
<FC class="gap-8">
    <Card>
        <p> Page is the main page container, it provide the following attributes:</p>
        <ul>
        <li><Code>fullWidth</Code><p>(boolean,optional) toggle between full width and responsive</p></li>
        <li><Code>title</Code><p>(string, optional) the page title</p></li>
        <li><Code>breacrumb</Code><p>(boolean, optional) toggle the breadcrumb</p></li>
        <FR>
            <Button onclick={() => (fullWidth = true)}>Set full width</Button>
            <Button onclick={() => (fullWidth = false)}>Set responsive</Button>
            <Check label="breadcrumb" bind:value={breadcrumb} ></Check>
            <Check label="use title"  bind:value={showTitle} ></Check>
        </FR>
    </Card>

<!-- 
    <Card>
        <H2 class="mt-8">FC</H2>
        <p> FC (flex column) stacks children vertically, providing a default margin and gap. </p>
        <FC class="border-[length:var(--card-border-sz)] border-text/30 border-dashed rounded-lg p-3 mt-3" >
            <Card class="w-28" ><p>children 1</p></Card>
            <Card class="w-28" ><p>children 2</p></Card>
            <Card class="w-28" ><p>children 3</p></Card>
        </FC>    
    </Card>


    <Card>
        <H2 class="mt-10">FR</H2>
        <p>
            FR (flex row) stacks children horizontally, providing a default margin and gap. 
        </p>
        <FR class="border-[length:var(--card-border-sz)] border-text/30 border-dashed rounded-lg p-3 mt-3" >
            <Card><p>children 1</p></Card>
            <Card><p>children 2</p></Card>
            <Card><p>children 3</p></Card>
        </FR>    
    </Card>
     -->
</FC>
</Page>
