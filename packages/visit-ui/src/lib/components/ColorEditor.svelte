<script lang="ts">
	import { untrack } from 'svelte';
	import iroImport from '@jaames/iro';
	import { mdiEyedropper } from '@mdi/js';
	import { Button, Dialog, FR, Icon, Input, Select } from './index.js';

	interface IroColor {
		red: number;
		green: number;
		blue: number;
		alpha: number;
		hue: number;
		saturation: number;
		value: number;
		hexString: string;
		hex8String: string;
		rgbString: string;
		rgbaString: string;
		hslString: string;
		hslaString: string;
		rgb: { r: number; g: number; b: number };
		hsv: { h: number; s: number; v: number };
		set(color: string): void;
	}

	interface IroColorPicker {
		color: IroColor;
		on(event: 'color:change', cb: (color: IroColor) => void): void;
		off(event: 'color:change', cb: (color: IroColor) => void): void;
	}

	const iro = iroImport as unknown as {
		ColorPicker: (parent: HTMLElement, props: Record<string, unknown>) => IroColorPicker;
		ui: { Box: unknown; Slider: unknown };
	};

	type Props = {
		open?: boolean;
		color?: string;
		onChange?: (color: string) => void;
	};

	let { open = $bindable(false), color = $bindable('#ff0'), onChange }: Props = $props();

	let initialColor = '#ff0';
	let colorMode = $state('HEX');
	const colorModes = ['HEX', 'HEXA', 'RGB', 'RGBA', 'HSL', 'HSLA'];

	let r = $state(0);
	let g = $state(0);
	let b = $state(0);
	let a = $state(0);
	let h = $state(0);
	let s = $state(0);
	let v = $state(0);

	let picker: IroColorPicker | null = null;
	let pickerContainer: HTMLDivElement | undefined = $state();
	let eyeDropperSupported = $state(false);

	function onIro(iroColor: IroColor) {
		if (!iroColor) return;
		r = iroColor.red || 0;
		g = iroColor.green || 0;
		b = iroColor.blue || 0;
		a = Math.round((iroColor.alpha ?? 0) * 255);
		h = Math.round(iroColor.hue) || 0;
		s = Math.round(iroColor.saturation) || 0;
		v = Math.round(iroColor.value) || 0;
		updateColor();
	}

	function onRGB() {
		if (!picker || Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return;
		picker.color.rgb = { r, g, b };
		updateColor();
	}

	function onHSV() {
		if (!picker || Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(v)) return;
		picker.color.hsv = { h, s, v };
		updateColor();
	}

	function onAlpha() {
		if (!picker || Number.isNaN(a)) return;
		picker.color.alpha = +(a / 255).toFixed(2);
		updateColor();
	}

	function initColorMode() {
		const trimmed = color.trim();
		colorMode = 'HEXA';
		if (trimmed.startsWith('#')) {
			colorMode = trimmed.length === 9 ? 'HEXA' : 'HEX';
		} else if (trimmed.startsWith('rgb')) {
			colorMode = trimmed.startsWith('rgba') ? 'RGBA' : 'RGB';
		} else if (trimmed.startsWith('hs')) {
			colorMode = trimmed.split(',').length == 4 ? 'HSLA' : 'HSL';
		}
	}

	function updateColor() {
		if (!picker) return;
		switch (colorMode) {
			case 'HEX':
				color = picker.color.hexString;
				break;
			case 'HEXA':
				color = picker.color.hex8String;
				break;
			case 'RGB':
				color = picker.color.rgbString;
				break;
			case 'RGBA':
				color = picker.color.rgbaString;
				break;
			case 'HSL':
				color = picker.color.hslString;
				break;
			case 'HSLA':
				color = picker.color.hslaString;
				break;
			default:
				console.error('bad colorMode', colorMode);
		}
		onChange?.(color);
	}

	async function handleEyeDropper() {
		if (!eyeDropperSupported || !picker) return;
		try {
			// @ts-expect-error EyeDropper is not in TypeScript's lib types yet
			const eyeDropper = new EyeDropper();
			const result = await eyeDropper.open();
			if (result?.sRGBHex) {
				const currentAlpha = picker.color.alpha;
				picker.color.set(result.sRGBHex);
				picker.color.alpha = currentAlpha;
				updateColor();
			}
		} catch (error) {
			console.error('EyeDropper cancelled or error:', error);
		}
	}

	function onOk() {
		open = false;
	}

	function onCancel() {
		color = initialColor;
		onChange?.(color);
		open = false;
	}

	$effect(() => {
		if (!open || !pickerContainer) return;
		const container = pickerContainer;

		untrack(() => {
			eyeDropperSupported = 'EyeDropper' in window;
			initialColor = color;
			picker = iro.ColorPicker(container, {
				width: 350,
				color: '#000',
				borderWidth: 0,
				borderColor: '#ccc',
				layout: [
					{ component: iro.ui.Box },
					{ component: iro.ui.Slider, options: { sliderType: 'hue' } },
					{ component: iro.ui.Slider, options: { sliderType: 'alpha' } }
				]
			});
			picker!.on('color:change', onIro);
			initColorMode();
			picker!.color.set(color);
			onIro(picker!.color);
		});

		return () => {
			picker?.off('color:change', onIro);
			picker = null;
		};
	});
</script>

<Dialog bind:open 
    title="Color Editor" 
    class="min-w-[20rem]" 
    draggable 
    showOverlay={false}
    onOpenAutoFocus={(e) => e.preventDefault()}
    >
	<div bind:this={pickerContainer} class="flex justify-center"></div>

	<div class="mt-4 grid grid-cols-4 gap-2">
		<div class="rounded-md border border-input-border" style="background-color: {color};"></div>
		<p class="col-span-2 truncate rounded-md border border-input-border bg-input px-2 py-2"
			>{color}</p
		>
		<Button
			class="w-full"
			variant="ghost"
			color="secondary"
			disabled={!eyeDropperSupported}
			onclick={handleEyeDropper}
		>
			<Icon icon={mdiEyedropper} />
		</Button>

		<Input type="number" label="red" bind:value={r} min={0} max={255} oninput={onRGB} />
		<Input type="number" label="green" bind:value={g} min={0} max={255} oninput={onRGB} />
		<Input type="number" label="blue" bind:value={b} min={0} max={255} oninput={onRGB} />
		<Input type="number" label="alpha" bind:value={a} min={0} max={255} oninput={onAlpha} />

		<Input type="number" label="hue" bind:value={h} min={0} max={360} oninput={onHSV} />
		<Input type="number" label="saturation" bind:value={s} min={0} max={100} oninput={onHSV} />
		<Input type="number" label="value" bind:value={v} min={0} max={100} oninput={onHSV} />
		<Select label="format" bind:value={colorMode} items={colorModes} onchange={updateColor} />

        <div></div>
		<Button class="mt-3" onclick={onOk}>OK</Button>
		<Button class="mt-3" variant="ghost" color="secondary" onclick={onCancel}>Cancel</Button>
        <div></div>

    </div>

<!-- 
    <FR class="mt-4 justify-end gap-2">
		<Button variant="ghost" color="secondary" onclick={onCancel}>Cancel</Button>
		<Button onclick={onOk}>OK</Button>
	</FR>
 -->
</Dialog>
