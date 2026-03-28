import type { ProfileState } from './types';

export const PROFILE_STORAGE_KEY = 'nebula-profile';

export function loadProfile(): ProfileState {
	if (typeof window === 'undefined') {
		return { name: 'Andres Felipe G', email: 'grimaldosgarciaa@gmail.com' };
	}
	try {
		const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
		if (raw) return JSON.parse(raw) as ProfileState;
	} catch {
		/* ignore */
	}
	return { name: 'Andres Felipe G', email: 'grimaldosgarciaa@gmail.com' };
}

export function saveProfile(p: ProfileState): void {
	try {
		localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(p));
	} catch {
		/* ignore */
	}
}
