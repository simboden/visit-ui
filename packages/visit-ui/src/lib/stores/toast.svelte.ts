export type ToastColor = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
	id: string;
	title?: string;
	description?: string;
	color?: ToastColor;
	icon?: string | false;
}

export interface ToastOptions {
	id?: string;
	timeout?: number;
}

let nextId = 0;

interface Timer {
	remaining: number;
	startedAt: number;
	handle?: ReturnType<typeof setTimeout>;
}

class ToastStore {
	items = $state<ToastItem[]>([]);
	#timers = new Map<string, Timer>();

	show(item: Omit<ToastItem, 'id'>, options: ToastOptions = {}) {
		const id = options.id ?? `toast-${++nextId}`;
		const timeout = options.timeout ?? 4000;

		this.items.push({ ...item, id });

		if (timeout > 0) {
			const timer: Timer = { remaining: timeout, startedAt: Date.now() };
			this.#timers.set(id, timer);
			this.#schedule(id, timer);
		}

		return id;
	}

	success(description: string, options?: ToastOptions) {
		return this.show({ title: 'Success', description, color: 'success' }, options);
	}

	warning(description: string, options?: ToastOptions) {
		return this.show({ title: 'Warning', description, color: 'warning' }, options);
	}

	error(description: string, options?: ToastOptions) {
		return this.show({ title: 'Error', description, color: 'error' }, options);
	}

	info(description: string, options?: ToastOptions) {
		return this.show({ title: 'Info', description, color: 'info' }, options);
	}

	#schedule(id: string, timer: Timer) {
		timer.startedAt = Date.now();
		timer.handle = setTimeout(() => this.dismiss(id), timer.remaining);
	}

	/** Pauses the auto-dismiss timer, e.g. while the mouse is hovering the toast. */
	pause(id: string) {
		const timer = this.#timers.get(id);
		if (!timer || timer.handle === undefined) return;

		clearTimeout(timer.handle);
		timer.remaining -= Date.now() - timer.startedAt;
		timer.handle = undefined;
	}

	/** Resumes a previously paused auto-dismiss timer. */
	resume(id: string) {
		const timer = this.#timers.get(id);
		if (!timer || timer.handle !== undefined) return;

		if (timer.remaining <= 0) {
			this.dismiss(id);
			return;
		}

		this.#schedule(id, timer);
	}

	dismiss(id: string) {
		const timer = this.#timers.get(id);
		if (timer?.handle !== undefined) clearTimeout(timer.handle);
		this.#timers.delete(id);

		this.items = this.items.filter((item) => item.id !== id);
	}

	clear() {
		for (const id of [...this.#timers.keys()]) this.dismiss(id);
	}
}

export const toast = new ToastStore();
