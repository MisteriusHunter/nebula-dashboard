import { PanelRight } from 'lucide-react';

export function SettingsPlaceholderView() {
	return (
		<div
			className={[
				'flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-2xl border p-8 text-center transition-all duration-300 ease-in-out',
				'border-zinc-200/80 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10',
				'dark:border-white/10 dark:from-violet-500/15 dark:to-cyan-500/10',
			].join(' ')}
		>
			<span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-white/80 text-violet-600 shadow-lg shadow-violet-500/15 dark:bg-white/10 dark:text-violet-300">
				<PanelRight className="h-7 w-7" strokeWidth={1.75} aria-hidden />
			</span>
			<div className="max-w-md space-y-2">
				<p className="text-base font-semibold text-zinc-900 dark:text-white">Panel de ajustes</p>
				<p className="text-sm text-zinc-600 dark:text-zinc-400">
					Edita tu perfil, notificaciones y tema en el panel lateral derecho. Puedes cerrarlo con la X
					o haciendo clic fuera.
				</p>
			</div>
		</div>
	);
}
