import type { ProjectRow } from '../../../data/dashboard';
import { summaryMetrics } from '../../../data/dashboard';
import { Chart } from '../Chart';
import { ProjectTable } from '../ProjectTable';
import { StatCard } from '../StatCard';

export interface OverviewViewProps {
	filteredProjects: ProjectRow[];
	onOpenDetails: (p: ProjectRow) => void;
}

export function OverviewView({ filteredProjects, onOpenDetails }: OverviewViewProps) {
	return (
		<div className="flex flex-col gap-5 transition-all duration-300 ease-in-out sm:gap-6 md:gap-7">
			<section
				className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:gap-6"
				aria-label="Métricas de resumen"
			>
				{summaryMetrics.map((m, i) => (
					<StatCard
						key={m.id}
						label={m.label}
						value={m.value}
						change={m.change}
						positive={m.positive}
						icon={m.icon}
						index={i}
					/>
				))}
			</section>

			<Chart />

			<ProjectTable projects={filteredProjects} onOpenDetails={onOpenDetails} />
		</div>
	);
}
