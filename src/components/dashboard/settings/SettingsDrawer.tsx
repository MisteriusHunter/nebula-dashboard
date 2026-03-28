import { Moon, Sun, X } from 'lucide-react';
import { useEffect, useId } from 'react';
import { saveProfile } from '../../../lib/profile';
import type { ProfileState, ThemeMode } from '../../../lib/types';
import { Toggle } from '../ui/Toggle';

const NOTIFY_KEY = 'nebula-notifications';

export interface SettingsDrawerProps {
	open: boolean;
	onClose: () => void;
	theme: ThemeMode;
	onThemeChange: (mode: ThemeMode) => void;
	notificationsEnabled: boolean;
	onNotificationsChange: (v: boolean) => void;
	profile: ProfileState;
	onProfileChange: (p: ProfileState) => void;
}

export function loadStoredNotifications(): boolean {
	try {
		const v = localStorage.getItem(NOTIFY_KEY);
		if (v === '0') return false;
		if (v === '1') return true;
	} catch {
		/* ignore */
	}
	return true;
}

export function persistNotifications(v: boolean) {
	try {
		localStorage.setItem(NOTIFY_KEY, v ? '1' : '0');
	} catch {
		/* ignore */
	}
}

export function SettingsDrawer({
	open,
	onClose,
	theme,
	onThemeChange,
	notificationsEnabled,
	onNotificationsChange,
	profile,
	onProfileChange,
}: SettingsDrawerProps) {
	const titleId = useId();

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	if (!open) return null;

	function updateProfile(next: Partial<ProfileState>) {
		const merged = { ...profile, ...next };
		onProfileChange(merged);
		saveProfile(merged);
	}

	return (
		<div className="fixed inset-0 z-[90] flex justify-end" role="presentation">
			<button
				type="button"
				className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ease-in-out dark:bg-black/65"
				aria-label="Cerrar ajustes"
				onClick={onClose}
			/>
			<aside
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className={[
					'relative z-[91] flex h-full w-full max-w-md flex-col border-l shadow-2xl transition-transform duration-300 ease-in-out',
					'border-zinc-200/80 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0c0c14]/95',
					'translate-x-0 shadow-[0_0_40px_-8px_rgba(139,92,246,0.25)]',
				].join(' ')}
			>
				<div className="flex items-center justify-between border-b border-zinc-200/80 px-4 py-4 dark:border-white/10 sm:px-5">
					<h2 id={titleId} className="text-lg font-semibold text-zinc-900 dark:text-white">
						Ajustes
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white text-zinc-600 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
					>
						<X className="h-5 w-5" aria-hidden />
						<span className="sr-only">Cerrar</span>
					</button>
				</div>

				<div className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">
					<section className="mb-8">
						<h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
							Perfil
						</h3>
						<div className="space-y-3">
							<label className="block">
								<span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">Nombre</span>
								<input
									type="text"
									value={profile.name}
									onChange={(e) => updateProfile({ name: e.target.value })}
									className={[
										'w-full rounded-xl border px-3 py-2.5 text-sm transition-all duration-300 ease-in-out',
										'border-zinc-200/80 bg-white text-zinc-900 placeholder:text-zinc-400',
										'focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20',
										'dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-100',
									].join(' ')}
								/>
							</label>
							<label className="block">
								<span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">Email</span>
								<input
									type="email"
									value={profile.email}
									onChange={(e) => updateProfile({ email: e.target.value })}
									className={[
										'w-full rounded-xl border px-3 py-2.5 text-sm transition-all duration-300 ease-in-out',
										'border-zinc-200/80 bg-white text-zinc-900 placeholder:text-zinc-400',
										'focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20',
										'dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-100',
									].join(' ')}
								/>
							</label>
						</div>
					</section>

					<section className="mb-8">
						<h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
							Notificaciones
						</h3>
						<div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]">
							<div>
								<p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Alertas en app</p>
								<p className="text-xs text-zinc-500 dark:text-zinc-400">Resumen diario y menciones</p>
							</div>
							<Toggle
								checked={notificationsEnabled}
								onChange={(v) => {
									onNotificationsChange(v);
									persistNotifications(v);
								}}
								aria-label="Activar notificaciones"
							/>
						</div>
					</section>

					<section>
						<h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
							Tema
						</h3>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => onThemeChange('light')}
								className={[
									'flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-300 ease-in-out',
									theme === 'light'
										? 'border-violet-500/50 bg-violet-500/15 text-violet-800 shadow-[0_0_20px_-4px_rgba(139,92,246,0.35)] dark:text-violet-100'
										: 'border-zinc-200/80 bg-white text-zinc-700 hover:border-violet-400/40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300',
								].join(' ')}
							>
								<Sun className="h-4 w-4" aria-hidden />
								Claro
							</button>
							<button
								type="button"
								onClick={() => onThemeChange('dark')}
								className={[
									'flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-300 ease-in-out',
									theme === 'dark'
										? 'border-violet-500/50 bg-violet-500/15 text-violet-100 shadow-[0_0_20px_-4px_rgba(139,92,246,0.35)]'
										: 'border-zinc-200/80 bg-white text-zinc-700 hover:border-violet-400/40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300',
								].join(' ')}
							>
								<Moon className="h-4 w-4" aria-hidden />
								Oscuro
							</button>
						</div>
					</section>
				</div>
			</aside>
		</div>
	);
}
