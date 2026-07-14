<script lang="ts">

    // i colori sono forzati a bianco e nero in app.css

    // https://www.npmjs.com/package/html2pdf.js/v/0.9.0
    // https://github.com/eKoopmans/html2pdf.js/issues/522
    // https://ekoopmans.github.io/html2pdf.js/#page-break-settings
    // https://ekoopmans.github.io/html2pdf.js/ docs
    // https://github.com/eKoopmans/html2pdf.js/issues/675    (pagebreak)

    import { tick }         from 'svelte';
    import Markdown         from '../markdown/Markdown.svelte';
    import html2pdf         from 'html2pdf.js';
    import Button           from './Button.svelte';
    import FC               from './FC.svelte';

    interface Chapter {
        body?: string;
    }

    type Props = {
        chapters?: Chapter[];
        filename?: string;
        title?: string;
    };

    let {
        chapters = [],
        filename = "BrainBridge.pdf",
        title = "Risultati del Test degli Stili Comportamentali"
    } : Props = $props();

    let printing = $state(false);
    let print_element : HTMLElement | undefined = $state()


    function format_pages(pdf: any) {
        var totalPages = pdf.internal.getNumberOfPages();
        for ( let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text('Page ' + i + ' of ' + totalPages,
                (pdf.internal.pageSize.getWidth() / 2.3),
                (pdf.internal.pageSize.getHeight() - 5  )
            );
        }
    }

    async function SaveAsPdf() {

        printing = true;
        await tick();
        if(print_element)
        {
            const options = {
                margin: 12,
                filename: filename,
                html2canvas: { scale: 1 },
                jsPDF: {orientation: 'portrait' as const, unit: 'mm', format: 'a4' },
                pagebreak: { mode: 'avoid-all' }
            }

            const worker = html2pdf()
                .from(print_element)
                .set(options)
                .toPdf()
                .get('pdf')
                .then(format_pages);
            // html2pdf chain: .then() returns the worker object, not a Promise
            (worker as any).save().then(() => { printing = false; });
        }
    }
</script>


<Button class="w-48" onclick={SaveAsPdf} disabled={printing}>scarica come pdf</Button>

{#if printing}
    <!--div con l'HTML passato ad html2pdf, usa gli stili in app.css, deve essere posizionato e visibile --->
    <div bind:this={print_element} class="PRINT">
        <h1 class="h1 text-center mb-4">{title}</h1>
        <FC class="m-3 p-3" >
            {#each chapters as c }
                {#if c.body }
                    <Markdown source={c.body} />
                {/if}
            {/each}
        </FC>
    </div>

    <!-- overlay che nasconde tutto  -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-body">
        <span class="text-text text-lg">Generazione PDF in corso...</span>
    </div>
{/if}

