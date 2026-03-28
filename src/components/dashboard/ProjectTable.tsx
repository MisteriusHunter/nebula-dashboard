import { Eye } from 'lucide-react';
import type { ProjectRow, ProjectStatus } from '../../data/dashboard';

const statusStyles: Record<
	ProjectStatus,
	{ label: string; className: string }
> = {
	activo: {
		label: 'Activo',
		className:
			'border-emerald-500/35 bg-emerald-500/15 text-emerald-300 ring-emerald-500/20',
	},
	pausa: {
		label: 'Pausa',
		className: 'border-amber-500/35 bg-amber-500/15 text-amber-200 ring-amber-500/20',
	},
	completado: {
		label: 'Completado',
		className: 'border-sky-500/35 bg-sky-500/15 text-sky-200 ring-sky-500/20',
	},
};

export interface ProjectTableProps {
	projects: ProjectRow[];
	onOpenDetails: (project: ProjectRow) => void;
}

export function ProjectTable({ projects, onOpenDetails }: ProjectTableProps) {
	return (
		<section
			className={[
				'rounded-2xl border border-zinc-200/80 bg-white/90 backdrop-blur-xl',
				'dark:border-white/10 dark:bg-white/[0.05]',
				'overflow-hidden shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
				'transition duration-300 ease-in-out hover:brightness-[1.02]',
			].join(' ')}
		>
			<div className="border-b border-zinc-200/80 px-4 py-4 dark:border-white/10 sm:px-5 md:px-6">
				<h2 className="text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">
					Proyectos recientes
				</h2>
				<p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">Estado y progreso de entregas</p>
			</div>

			<div
				className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]"
				role="region"
				aria-label="Tabla de proyectos — desplazamiento horizontal en pantallas pequeñas"
			>
				<table className="w-full min-w-[720px] border-collapse text-left text-sm">
					<thead>
						<tr className="border-b border-zinc-200/80 bg-zinc-50/80 text-[10px] uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] sm:text-xs">
							<th className="px-4 py-3 font-medium sm:px-5 md:px-6">Proyecto</th>
							<th className="px-4 py-3 font-medium sm:px-5 md:px-6">Cliente</th>
							<th className="px-4 py-3 font-medium sm:px-5 md:px-6">Progreso</th>
							<th className="px-4 py-3 font-medium sm:px-5 md:px-6">Estatus</th>
							<th className="px-4 py-3 font-medium sm:px-5 md:px-6">Actualizado</th>
							<th className="w-14 px-2 py-3 text-center font-medium sm:w-16">
								<span className="sr-only">Detalle</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-200/70 dark:divide-white/[0.06]">
						{projects.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="px-4 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
								>
									No hay proyectos que coincidan con la búsqueda.
								</td>
							</tr>
						) : (
							projects.map((p) => (
							<tr key={p.id} className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.04]">
								<td className="px-4 py-3.5 font-medium text-zinc-900 dark:text-zinc-100 sm:px-5 md:px-6">
									{p.nombre}
								</td>
								<td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 sm:px-5 md:px-6">{p.cliente}</td>
								<td className="px-4 py-3.5 sm:px-5 md:px-6">
									<div className="flex min-w-[140px] items-center gap-2 sm:gap-3">
										<div className="h-2 min-w-[72px] flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10 sm:min-w-[96px]">
											<div
												className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
												style={{ width: `${p.progreso}%` }}
											/>
										</div>
										<span className="w-9 tabular-nums text-zinc-500 dark:text-zinc-400 sm:w-10">{p.progreso}%</span>
									</div>
								</td>
								<td className="px-4 py-3.5 sm:px-5 md:px-6">
									<span
										className={[
											'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ring-1',
											statusStyles[p.estatus].className,
										].join(' ')}
									>
										{statusStyles[p.estatus].label}
									</span>
								</td>
								<td className="px-4 py-3.5 tabular-nums text-zinc-500 sm:px-5 md:px-6">{p.fecha}</td>
								<td className="px-2 py-3.5 text-center sm:px-3">
									<button
										type="button"
										onClick={() => onOpenDetails(p)}
										className={[
											'inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80',
											'bg-white text-violet-700 transition duration-200 ease-out',
											'hover:border-violet-400/50 hover:bg-violet-50 hover:text-violet-900',
											'dark:border-white/10 dark:bg-white/5 dark:text-violet-300',
											'dark:hover:border-violet-400/40 dark:hover:bg-violet-500/15 dark:hover:text-cyan-200',
											'hover:shadow-[0_0_16px_-4px_rgba(139,92,246,0.35)] dark:hover:shadow-[0_0_16px_-4px_rgba(139,92,246,0.5)]',
											'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/60',
										].join(' ')}
										aria-label={`Ver detalles de ${p.nombre}`}
									>
										<Eye className="h-4 w-4" strokeWidth={2} aria-hidden />
									</button>
								</td>
							</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
