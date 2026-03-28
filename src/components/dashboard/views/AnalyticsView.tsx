import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export interface AnalyticsViewProps {
	isDark: boolean;
}

function ChartSkeleton() {
	return (
		<div className="flex h-[280px] items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-100/50 dark:border-white/10 dark:bg-white/[0.04]">
			<div className="h-8 w-8 animate-pulse rounded-full bg-violet-500/30" />
		</div>
	);
}

export function AnalyticsView({ isDark }: AnalyticsViewProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const mode = isDark ? 'dark' : 'light';
	const labelColor = isDark ? '#a1a1aa' : '#52525b';

	const donutSeries = [38, 27, 22, 13];
	const donutOptions = useMemo(
		() => ({
			chart: { type: 'donut' as const, toolbar: { show: false }, fontFamily: 'inherit' },
			labels: ['LLM API', 'Fine-tuning', 'Embeddings', 'Evals'],
			theme: { mode: mode as 'dark' | 'light' },
			colors: ['#8b5cf6', '#3b82f6', '#22d3ee', '#a78bfa'],
			legend: { position: 'bottom' as const, labels: { colors: labelColor } },
			stroke: { colors: [isDark ? '#0c0c14' : '#ffffff'] },
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							total: {
								show: true,
								label: 'Mix',
								color: labelColor,
							},
						},
					},
				},
			},
		}),
		[isDark, labelColor, mode],
	);

	const barSeries = useMemo(
		() => [
			{
				name: 'MRR (k USD)',
				data: [12.4, 15.1, 18.3, 21.0, 24.6, 28.2],
			},
		],
		[],
	);

	const barOptions = useMemo(
		() => ({
			chart: { type: 'bar' as const, toolbar: { show: false }, fontFamily: 'inherit' },
			theme: { mode: mode as 'dark' | 'light' },
			colors: ['#8b5cf6'],
			xaxis: {
				categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
				labels: { style: { colors: labelColor } },
			},
			yaxis: { labels: { style: { colors: labelColor } } },
			grid: { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' },
			plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } },
		}),
		[isDark, labelColor, mode],
	);

	const heatmapSeries = useMemo(
		() => [
			{ name: 'Embeddings', data: [12, 18, 22, 30, 28, 35, 32] },
			{ name: 'RAG', data: [8, 15, 20, 25, 30, 32, 38] },
			{ name: 'FT', data: [5, 10, 15, 18, 22, 30, 28] },
			{ name: 'Agents', data: [20, 24, 28, 32, 36, 40, 44] },
		],
		[],
	);

	const heatmapOptions = useMemo(
		() => ({
			chart: { type: 'heatmap' as const, toolbar: { show: false }, fontFamily: 'inherit' },
			theme: { mode: mode as 'dark' | 'light' },
			plotOptions: {
				heatmap: {
					shadeIntensity: 0.55,
					colorScale: {
						ranges: [
							{ from: 0, to: 15, color: '#312e81', name: 'low' },
							{ from: 16, to: 28, color: '#6d28d9', name: 'mid' },
							{ from: 29, to: 50, color: '#0891b2', name: 'high' },
						],
					},
				},
			},
			dataLabels: { enabled: false },
			xaxis: {
				categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
				labels: { style: { colors: labelColor } },
			},
			yaxis: { labels: { style: { colors: labelColor } } },
		}),
		[isDark, labelColor, mode],
	);

	const lineSeries = useMemo(
		() => [
			{
				name: 'Latencia p95 (ms)',
				data: [120, 108, 95, 88, 82, 76, 72],
			},
		],
		[],
	);

	const lineOptions = useMemo(
		() => ({
			chart: { type: 'line' as const, toolbar: { show: false }, fontFamily: 'inherit' },
			theme: { mode: mode as 'dark' | 'light' },
			colors: ['#22d3ee'],
			stroke: { width: 3, curve: 'smooth' as const },
			xaxis: {
				categories: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'],
				labels: { style: { colors: labelColor } },
			},
			yaxis: { labels: { style: { colors: labelColor } } },
			grid: { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' },
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.35,
					opacityTo: 0.05,
					stops: [0, 90, 100],
				},
			},
		}),
		[isDark, labelColor, mode],
	);

	if (!mounted) {
		return (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
				{[0, 1, 2, 3].map((k) => (
					<ChartSkeleton key={k} />
				))}
			</div>
		);
	}

	const card = [
		'rounded-2xl border p-4 shadow-sm transition-all duration-300 ease-in-out',
		'border-zinc-200/80 bg-white/90 dark:border-white/10 dark:bg-white/[0.05]',
	].join(' ');

	return (
		<div className="grid grid-cols-1 gap-4 transition-all duration-300 ease-in-out md:grid-cols-2 md:gap-5 lg:gap-6">
			<div className={card}>
				<h3 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
					Mix de ingresos (IA)
				</h3>
				<ReactApexChart type="donut" height={280} series={donutSeries} options={donutOptions} />
			</div>
			<div className={card}>
				<h3 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
					MRR — startups IA (k USD)
				</h3>
				<ReactApexChart type="bar" height={280} series={barSeries} options={barOptions} />
			</div>
			<div className={card}>
				<h3 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
					Uso por workload (heatmap)
				</h3>
				<ReactApexChart
					type="heatmap"
					height={320}
					series={heatmapSeries}
					options={heatmapOptions}
				/>
			</div>
			<div className={card}>
				<h3 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
					Latencia API (p95)
				</h3>
				<ReactApexChart type="line" height={280} series={lineSeries} options={lineOptions} />
			</div>
		</div>
	);
}
