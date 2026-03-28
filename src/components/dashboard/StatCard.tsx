import {
	CheckCircle2,
	Sparkles,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

const iconMap: Record<'trending' | 'users' | 'sparkles' | 'check', LucideIcon> = {
	trending: TrendingUp,
	users: Users,
	sparkles: Sparkles,
	check: CheckCircle2,
};

const gradientPresets = [
	'from-violet-600/35 via-fuchsia-500/20 to-transparent',
	'from-blue-500/35 via-cyan-400/15 to-transparent',
	'from-indigo-500/35 via-violet-500/20 to-transparent',
	'from-sky-500/30 via-blue-600/20 to-transparent',
];

export interface StatCardProps {
	label: string;
	value: string;
	change: string;
	positive: boolean;
	icon: keyof typeof iconMap;
	index: number;
}

export function StatCard({ label, value, change, positive, icon, index }: StatCardProps) {
	const Icon = iconMap[icon];
	const gradient = gradientPresets[index % gradientPresets.length];

	return (
		<article
			className={[
				'group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 backdrop-blur-xl shadow-sm',
				'dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
				'transition duration-300 ease-in-out will-change-transform',
				'hover:scale-[1.02] hover:brightness-110',
				'hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.35),0_0_40px_-8px_rgba(34,211,238,0.2)]',
			].join(' ')}
		>
			<div
				className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient}`}
				aria-hidden
			/>
			<div className="relative flex flex-col gap-3 p-4 sm:p-5 md:p-6">
				<div className="flex items-start justify-between gap-3">
					<span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:text-sm">{label}</span>
					<span
						className={[
							'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10',
							'border border-zinc-200/80 bg-zinc-50 text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-violet-300',
							'transition duration-300 ease-in-out group-hover:border-violet-400/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-200',
						].join(' ')}
					>
						<Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden />
					</span>
				</div>
				<p className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl md:text-3xl">
					{value}
				</p>
				<p
					className={[
						'text-[11px] font-medium tabular-nums sm:text-xs',
						positive ? 'text-emerald-400/95' : 'text-rose-400/95',
					].join(' ')}
				>
					{change}{' '}
					<span className="text-zinc-500 dark:text-zinc-500">vs. mes anterior</span>
				</p>
			</div>
		</article>
	);
}
