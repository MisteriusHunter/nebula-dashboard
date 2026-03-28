import {
	BarChart3,
	ChevronLeft,
	ChevronRight,
	FolderKanban,
	LayoutDashboard,
	Menu,
	Settings,
	Sparkles,
	X,
} from 'lucide-react';
import type { ActiveSection } from '../../lib/types';

const nav: { id: ActiveSection; label: string; icon: typeof LayoutDashboard }[] = [
	{ id: 'overview', label: 'Resumen', icon: LayoutDashboard },
	{ id: 'projects', label: 'Proyectos', icon: FolderKanban },
	{ id: 'analytics', label: 'Analítica', icon: BarChart3 },
	{ id: 'settings', label: 'Ajustes', icon: Settings },
];

export interface SidebarProps {
	activeSection: ActiveSection;
	onSectionChange: (section: ActiveSection) => void;
	collapsed: boolean;
	onToggleCollapsed: () => void;
	mobileOpen: boolean;
	onMobileOpenChange: (open: boolean) => void;
}

function NavList({
	collapsed,
	activeSection,
	onSectionChange,
	onNavigate,
}: {
	collapsed: boolean;
	activeSection: ActiveSection;
	onSectionChange: (section: ActiveSection) => void;
	onNavigate?: () => void;
}) {
	return (
		<nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Principal">
			{nav.map((item) => {
				const Icon = item.icon;
				const active = activeSection === item.id;
				return (
					<button
						key={item.id}
						type="button"
						onClick={() => {
							onSectionChange(item.id);
							onNavigate?.();
						}}
						className={[
							'flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium',
							'transition-[background,box-shadow,color] duration-300 ease-in-out',
							active
								? 'bg-gradient-to-r from-violet-600/40 to-blue-600/25 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]'
								: 'text-zinc-600 hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white',
							collapsed ? 'justify-center px-2' : '',
						].join(' ')}
					>
						<Icon className="h-5 w-5 shrink-0 opacity-90" strokeWidth={1.75} aria-hidden />
						{!collapsed && <span>{item.label}</span>}
					</button>
				);
			})}
		</nav>
	);
}

function Brand({ collapsed }: { collapsed: boolean }) {
	return (
		<div
			className={[
				'flex items-center gap-3 border-b border-zinc-200/80 px-4 py-4 dark:border-white/10',
				collapsed ? 'justify-center px-2' : '',
			].join(' ')}
		>
			<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/25">
				<Sparkles className="h-5 w-5 text-white" aria-hidden />
			</span>
			{!collapsed && (
				<div className="min-w-0">
					<p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">Nebula</p>
					<p className="truncate text-xs text-zinc-500">Dashboard</p>
				</div>
			)}
		</div>
	);
}

export function Sidebar({
	activeSection,
	onSectionChange,
	collapsed,
	onToggleCollapsed,
	mobileOpen,
	onMobileOpenChange,
}: SidebarProps) {
	const asideClass = [
		'flex h-full flex-col border-zinc-200/80 bg-white/90 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06]',
		'shadow-[4px_0_32px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_32px_rgba(0,0,0,0.25)]',
	].join(' ');

	return (
		<div className="flex flex-col lg:contents">
			<header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#07070d]/85 lg:hidden">
				<button
					type="button"
					onClick={() => onMobileOpenChange(true)}
					className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white text-zinc-800 transition duration-200 ease-out hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
					aria-expanded={mobileOpen}
					aria-controls="dashboard-sidebar-mobile"
				>
					<Menu className="h-5 w-5" aria-hidden />
					<span className="sr-only">Abrir menú</span>
				</button>
				<p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">Panel principal</p>
				<span className="w-10" aria-hidden />
			</header>

			{mobileOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out dark:bg-black/60 lg:hidden"
					aria-label="Cerrar menú"
					onClick={() => onMobileOpenChange(false)}
				/>
			)}
			<aside
				id="dashboard-sidebar-mobile"
				className={[
					'fixed inset-y-0 left-0 z-50 w-[min(100vw-2rem,18rem)] max-w-[288px] border-r',
					'transition-transform duration-300 ease-in-out lg:hidden',
					mobileOpen ? 'translate-x-0' : '-translate-x-full',
					asideClass,
				].join(' ')}
				aria-hidden={!mobileOpen}
			>
				<div className="flex items-center justify-end border-b border-zinc-200/80 px-2 py-2 dark:border-white/10">
					<button
						type="button"
						onClick={() => onMobileOpenChange(false)}
						className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
					>
						<X className="h-5 w-5" aria-hidden />
						<span className="sr-only">Cerrar</span>
					</button>
				</div>
				<Brand collapsed={false} />
				<NavList
					collapsed={false}
					activeSection={activeSection}
					onSectionChange={onSectionChange}
					onNavigate={() => onMobileOpenChange(false)}
				/>
			</aside>

			<aside
				id="dashboard-sidebar-desktop"
				className={[
					'relative hidden h-screen shrink-0 flex-col border-r',
					'transition-[width] duration-300 ease-in-out lg:flex',
					asideClass,
					collapsed ? 'w-[4.5rem]' : 'w-64',
				].join(' ')}
			>
				<Brand collapsed={collapsed} />
				<NavList
					collapsed={collapsed}
					activeSection={activeSection}
					onSectionChange={onSectionChange}
				/>
				<div className="mt-auto border-t border-zinc-200/80 p-3 dark:border-white/10">
					<button
						type="button"
						onClick={onToggleCollapsed}
						className={[
							'flex w-full items-center gap-2 rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-sm font-medium text-zinc-700',
							'transition duration-300 ease-in-out hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white',
							collapsed ? 'justify-center' : 'justify-between',
						].join(' ')}
						aria-pressed={collapsed}
						aria-label={collapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
					>
						{!collapsed && <span>Colapsar</span>}
						{collapsed ? (
							<ChevronRight className="h-4 w-4" aria-hidden />
						) : (
							<ChevronLeft className="h-4 w-4" aria-hidden />
						)}
					</button>
				</div>
			</aside>
		</div>
	);
}
