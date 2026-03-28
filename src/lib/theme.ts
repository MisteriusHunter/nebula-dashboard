import type { ThemeMode } from './types';

export const THEME_STORAGE_KEY = 'nebula-theme';

export function getStoredTheme(): ThemeMode {
	if (typeof window === 'undefined') return 'dark';
	try {
		const v = localStorage.getItem(THEME_STORAGE_KEY);
		return v === 'light' ? 'light' : 'dark';
	} catch {
		return 'dark';
	}
}

export function applyTheme(mode: ThemeMode): void {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	if (mode === 'dark') root.classList.add('dark');
	else root.classList.remove('dark');
	try {
		localStorage.setItem(THEME_STORAGE_KEY, mode);
	} catch {
		/* ignore */
	}
}
