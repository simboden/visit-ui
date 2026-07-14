export const LEFT_SIDEBAR_WIDTH = '16rem';
export const RIGHT_SIDEBAR_WIDTH = '300px';
export const DEFAULT_NAVBAR_HEIGHT = '61px';
export const LARGE_SCREEN_BREAKPOINT = 1264;

class AppShellStore {
	leftOpen = $state(false);
	rightOpen = $state(false);
	isLargeScreen = $state(false);
	navbarHeight = $state(DEFAULT_NAVBAR_HEIGHT);

	toggleLeft() {
		this.leftOpen = !this.leftOpen;
	}

	openRight() {
		this.rightOpen = true;
	}

	closeRight() {
		this.rightOpen = false;
	}

	toggleRight() {
		this.rightOpen = !this.rightOpen;
	}
}

export const appShell = new AppShellStore();
