import type { ActiveSection } from '../../lib/types';
import { SearchField } from './ui/SearchField';

const titles: Record<Exclude<ActiveSection, 'settings'>, { h: string; p: string }> = {
	overview: {
		h: 'Bienvenido de nuevo',
		p: 'Resumen de actividad, rendimiento y proyectos recientes.',
	},
	projects: {
		h: 'Proyectos',
		p: 'Tablero Kanban — arrastra tareas entre columnas.',
	},
	analytics: {
		h: 'Analítica',
		p: 'Métricas de startups de IA (datos de demostración).',
	},
};

export interface DashboardHeaderProps {
	section: ActiveSection;
	searchQuery: string;
	onSearchChange: (q: string) => void;
	showSearch: boolean;
	/** En viewport estrecho el buscador usa modo compacto (icono). */
	searchCompact: boolean;
	searchExpanded: boolean;
	onSearchExpandedChange: (v: boolean) => void;
}

export function DashboardHeader({
	section,
	searchQuery,
	onSearchChange,
	showSearch,
	searchCompact,
	searchExpanded,
	onSearchExpandedChange,
}: DashboardHeaderProps) {
	const meta =
		section === 'settings'
			? { h: 'Ajustes', p: 'Gestiona perfil, notificaciones y tema desde el panel lateral.' }
			: titles[section as keyof typeof titles];

	return (
		<header className="flex w-full flex-col gap-3 transition-all duration-300 ease-in-out md:flex-row md:items-start md:justify-between md:gap-4">
			<div className="min-w-0 max-w-4xl flex-1">
				<h1 className="text-xl font-semibold tracking-tight text-zinc-900 transition-colors duration-300 dark:text-white sm:text-2xl md:text-3xl">
					{meta.h}
				</h1>
				<p className="mt-0.5 text-xs text-zinc-600 transition-colors duration-300 dark:text-zinc-400 sm:text-sm md:text-base">
					{meta.p}
				</p>
			</div>
			{showSearch && (
				<SearchField
					value={searchQuery}
					onChange={onSearchChange}
					compact={searchCompact}
					expanded={searchExpanded}
					onExpandChange={onSearchExpandedChange}
				/>
			)}
		</header>
	);
}
