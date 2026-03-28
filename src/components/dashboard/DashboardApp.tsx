import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ProjectRow } from '../../data/dashboard';
import { recentProjects } from '../../data/dashboard';
import { initialKanbanTasks, type KanbanTask } from '../../data/kanban';
import { loadProfile } from '../../lib/profile';
import type { ActiveSection, ProfileState, ThemeMode } from '../../lib/types';
import { applyTheme, getStoredTheme } from '../../lib/theme';
import { DashboardHeader } from './DashboardHeader';
import { Modal } from './Modal';
import { SettingsDrawer, loadStoredNotifications, persistNotifications } from './settings/SettingsDrawer';
import { Sidebar } from './Sidebar';
import { AnalyticsView } from './views/AnalyticsView';
import { KanbanView } from './views/KanbanView';
import { OverviewView } from './views/OverviewView';
import { SettingsPlaceholderView } from './views/SettingsPlaceholderView';

export function DashboardApp() {
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
	const [detailProject, setDetailProject] = useState<ProjectRow | null>(null);
	const [settingsOpen, setSettingsOpen] = useState(false);

	const [theme, setTheme] = useState<ThemeMode>('dark');
	const [searchQuery, setSearchQuery] = useState('');
	const [searchExpanded, setSearchExpanded] = useState(false);
	const [searchCompact, setSearchCompact] = useState(false);

	const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(initialKanbanTasks);
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [profile, setProfile] = useState<ProfileState>(loadProfile);

	const isDark = theme === 'dark';

	useEffect(() => {
		const mq = window.matchMedia('(max-width: 639px)');
		const update = () => setSearchCompact(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);

	useEffect(() => {
		setTheme(getStoredTheme());
		setNotificationsEnabled(loadStoredNotifications());
		setProfile(loadProfile());
	}, []);

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const handleSectionChange = useCallback((section: ActiveSection) => {
		setActiveSection(section);
		if (section === 'settings') {
			setSettingsOpen(true);
		} else {
			setSettingsOpen(false);
		}
		setMobileOpen(false);
	}, []);

	const filteredProjects = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return recentProjects;
		return recentProjects.filter(
			(p) =>
				p.nombre.toLowerCase().includes(q) ||
				p.cliente.toLowerCase().includes(q) ||
				p.estatus.toLowerCase().includes(q) ||
				p.fecha.includes(q),
		);
	}, [searchQuery]);

	const mainKey = `${activeSection}-${settingsOpen ? 's' : 'n'}`;

	return (
		<div className="flex min-h-screen flex-col transition-colors duration-300 ease-in-out lg:grid lg:min-h-screen lg:grid-cols-[auto_1fr]">
			<Sidebar
				activeSection={activeSection}
				onSectionChange={handleSectionChange}
				collapsed={collapsed}
				onToggleCollapsed={() => setCollapsed((c) => !c)}
				mobileOpen={mobileOpen}
				onMobileOpenChange={setMobileOpen}
			/>

			<div className="flex min-h-0 min-w-0 flex-1 flex-col">
				<main className="mx-auto flex w-full max-w-[min(100%,1920px)] flex-1 flex-col gap-5 px-4 py-5 transition-colors duration-300 ease-in-out sm:gap-6 sm:px-5 sm:py-6 md:px-6 md:py-7 lg:gap-7 lg:px-8 lg:py-8 xl:px-10 xl:py-10 2xl:px-12">
					<DashboardHeader
						section={activeSection}
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						showSearch={activeSection === 'overview'}
						searchCompact={searchCompact}
						searchExpanded={searchExpanded}
						onSearchExpandedChange={setSearchExpanded}
					/>

					<div key={mainKey} className="nebula-section-enter flex flex-1 flex-col gap-5 transition-all duration-300 ease-in-out">
						{activeSection === 'overview' && (
							<OverviewView
								filteredProjects={filteredProjects}
								onOpenDetails={setDetailProject}
							/>
						)}

						{activeSection === 'projects' && (
							<KanbanView tasks={kanbanTasks} onTasksChange={setKanbanTasks} />
						)}

						{activeSection === 'analytics' && <AnalyticsView isDark={isDark} />}

						{activeSection === 'settings' && <SettingsPlaceholderView />}
					</div>
				</main>
			</div>

			<Modal
				open={detailProject !== null}
				onClose={() => setDetailProject(null)}
				title={detailProject ? detailProject.nombre : ''}
			>
				{detailProject && (
					<div className="flex flex-col gap-4 transition-all duration-300 ease-in-out">
						<dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
								<dt className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
									Cliente
								</dt>
								<dd className="mt-0.5 text-zinc-900 dark:text-zinc-100">{detailProject.cliente}</dd>
							</div>
							<div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
								<dt className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
									Presupuesto
								</dt>
								<dd className="mt-0.5 font-semibold tabular-nums text-cyan-700 dark:text-cyan-200">
									{detailProject.presupuesto}
								</dd>
							</div>
						</dl>
						<div>
							<h3 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
								Descripción
							</h3>
							<p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{detailProject.descripcion}</p>
						</div>
						<p className="text-xs text-zinc-500 dark:text-zinc-500">
							Progreso {detailProject.progreso}% · Actualizado {detailProject.fecha}
						</p>
					</div>
				)}
			</Modal>

			<SettingsDrawer
				open={settingsOpen}
				onClose={() => {
					setSettingsOpen(false);
					if (activeSection === 'settings') setActiveSection('overview');
				}}
				theme={theme}
				onThemeChange={(m) => {
					setTheme(m);
					applyTheme(m);
				}}
				notificationsEnabled={notificationsEnabled}
				onNotificationsChange={(v) => {
					setNotificationsEnabled(v);
					persistNotifications(v);
				}}
				profile={profile}
				onProfileChange={setProfile}
			/>
		</div>
	);
}
