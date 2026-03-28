import { useCallback, useMemo, useRef, useState } from 'react';

const LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom', 'Lun', 'Mar', 'Mié'];

export function Chart() {
	const points = useMemo(() => [28, 42, 35, 58, 48, 72, 64, 88, 76, 92], []);
	const w = 520;
	const h = 200;
	const pad = { top: 16, right: 12, bottom: 28, left: 12 };
	const innerW = w - pad.left - pad.right;
	const innerH = h - pad.top - pad.bottom;
	const max = Math.max(...points);
	const min = 0;
	const range = max - min || 1;

	const linePath = points
		.map((v, i) => {
			const x = pad.left + (i / (points.length - 1)) * innerW;
			const y = pad.top + innerH - ((v - min) / range) * innerH;
			return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
		})
		.join(' ');

	const areaPath = `${linePath} L ${pad.left + innerW} ${pad.top + innerH} L ${pad.left} ${pad.top + innerH} Z`;

	const wrapRef = useRef<HTMLDivElement>(null);
	const [tip, setTip] = useState<{
		index: number;
		value: number;
		label: string;
		left: number;
		top: number;
	} | null>(null);

	const updateTip = useCallback(
		(index: number, clientX: number, clientY: number) => {
			const el = wrapRef.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			setTip({
				index,
				value: points[index],
				label: LABELS[index] ?? `P${index + 1}`,
				left: clientX - r.left,
				top: clientY - r.top,
			});
		},
		[points],
	);

	return (
		<section
			className={[
				'rounded-2xl border border-zinc-200/80 bg-white/80 backdrop-blur-xl',
				'dark:border-white/10 dark:bg-white/[0.05]',
				'p-4 shadow-sm sm:p-5 md:p-6 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
				'transition duration-300 ease-in-out hover:brightness-[1.03]',
			].join(' ')}
		>
			<div className="mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h2 className="text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">
						Gráfica de rendimiento
					</h2>
					<p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
						Últimos 10 períodos · hover en los puntos
					</p>
				</div>
				<div className="mt-2 flex items-center gap-2 sm:mt-0">
					<span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
						+24% tendencia
					</span>
				</div>
			</div>

			<div
				ref={wrapRef}
				className="relative w-full min-w-0 overflow-hidden rounded-xl border border-zinc-200/60 bg-gradient-to-b from-violet-500/[0.06] to-transparent dark:border-white/5 dark:from-white/[0.04]"
			>
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.35]"
					style={{
						backgroundImage: `
							linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
						`,
						backgroundSize: '48px 32px',
					}}
					aria-hidden
				/>
				<svg
					viewBox={`0 0 ${w} ${h}`}
					className="block h-auto w-full max-w-full"
					preserveAspectRatio="xMidYMid meet"
					role="img"
					aria-label="Gráfica de línea de rendimiento"
				>
					<title>Gráfica de rendimiento</title>
					<defs>
						<linearGradient id="perfLine" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#8b5cf6" />
							<stop offset="50%" stopColor="#3b82f6" />
							<stop offset="100%" stopColor="#22d3ee" />
						</linearGradient>
						<linearGradient id="perfArea" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="rgba(139,92,246,0.35)" />
							<stop offset="100%" stopColor="rgba(59,130,246,0)" />
						</linearGradient>
					</defs>
					<path d={areaPath} fill="url(#perfArea)" />
					<path
						d={linePath}
						fill="none"
						stroke="url(#perfLine)"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					{points.map((v, i) => {
						const x = pad.left + (i / (points.length - 1)) * innerW;
						const y = pad.top + innerH - ((v - min) / range) * innerH;
						return (
							<g key={i}>
								<circle
									cx={x}
									cy={y}
									r="14"
									fill="transparent"
									className="cursor-crosshair"
									onMouseEnter={(e) => updateTip(i, e.clientX, e.clientY)}
									onMouseMove={(e) => updateTip(i, e.clientX, e.clientY)}
									onMouseLeave={() => setTip(null)}
								/>
								<circle
									cx={x}
									cy={y}
									r={tip?.index === i ? 6 : 4}
									className="pointer-events-none fill-white transition-all duration-150 dark:fill-[#0c0c14]"
									stroke="#a78bfa"
									strokeWidth="2"
									style={{
										filter:
											tip?.index === i
												? 'drop-shadow(0 0 8px rgba(167,139,250,0.9))'
												: undefined,
									}}
								/>
							</g>
						);
					})}
				</svg>

				{tip && (
					<div
						className={[
							'pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full',
							'rounded-lg border border-cyan-400/35 bg-white/95 px-2.5 py-1.5 text-zinc-900',
							'dark:bg-[#0c0c14]/90 dark:text-cyan-100',
							'text-[11px] font-semibold tabular-nums shadow-[0_0_16px_rgba(139,92,246,0.35),0_0_24px_rgba(34,211,238,0.15)]',
							'backdrop-blur-sm dark:shadow-[0_0_16px_rgba(139,92,246,0.45),0_0_24px_rgba(34,211,238,0.2)]',
						].join(' ')}
						style={{
							left: tip.left,
							top: Math.max(8, tip.top - 10),
						}}
					>
						<span className="block text-[10px] font-medium uppercase tracking-wide text-violet-700 dark:text-violet-300/90">
							{tip.label}
						</span>
						<span className="text-sm text-zinc-900 dark:text-white">{tip.value}</span>
						<span className="ml-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">pts</span>
					</div>
				)}

				<div className="flex justify-between gap-1 overflow-x-auto border-t border-zinc-200/60 px-2 py-2 text-[9px] uppercase tracking-wider text-zinc-500 dark:border-white/5 sm:px-3 sm:text-[10px] md:text-xs">
					{LABELS.map((d, i) => (
						<span key={`${d}-${i}`} className="shrink-0">
							{d}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
