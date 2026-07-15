import { base } from '$app/paths';

export function resolveHref(href?: string | null) {
	if (!href || !href.startsWith('/') || href.startsWith('//')) return href ?? '';
	if (!base) return href;
	return href === '/' ? base || '/' : `${base}${href}`;
}

export function stripBasePath(pathname: string) {
	if (!pathname) return '/';
	if (!base) return pathname;
	if (pathname === base) return '/';
	return pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
}