import { Search, X } from 'lucide-react';

export interface SearchFieldProps {
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	/** Móvil: modo compacto con icono hasta expandir */
	compact?: boolean;
	expanded?: boolean;
	onExpandChange?: (expanded: boolean) => void;
}

export function SearchField({
	value,
	onChange,
	placeholder = 'Buscar proyectos…',
	compact = false,
	expanded = false,
	onExpandChange,
}: SearchFieldProps) {
	const showInput = !compact || expanded;

	if (!compact) {
		return (
			<div className="relative w-full min-w-0 max-w-md flex-1">
				<Search
					className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
					aria-hidden
				/>
				<input
					type="search"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={[
						'w-full rounded-xl border border-zinc-200/80 bg-white/90 py-2.5 pl-10 pr-3 text-sm text-zinc-900 shadow-sm',
						'placeholder:text-zinc-400',
						'transition-all duration-300 ease-in-out focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/25',
						'dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-100 dark:placeholder:text-zinc-500',
					].join(' ')}
					autoComplete="off"
					aria-label="Buscar en proyectos recientes"
				/>
			</div>
		);
	}

	return (
		<div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:max-w-md">
			{showInput ? (
				<div className="relative min-w-0 flex-1">
					<Search
						className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
						aria-hidden
					/>
					<input
						type="search"
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder={placeholder}
						autoFocus
						className={[
							'w-full min-w-0 rounded-xl border border-zinc-200/80 bg-white/90 py-2.5 pl-10 pr-10 text-sm text-zinc-900 shadow-sm',
							'placeholder:text-zinc-400',
							'transition-all duration-300 ease-in-out focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/25',
							'dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-100 dark:placeholder:text-zinc-500',
						].join(' ')}
						autoComplete="off"
						aria-label="Buscar en proyectos recientes"
					/>
					<button
						type="button"
						onClick={() => {
							onChange('');
							onExpandChange?.(false);
						}}
						className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 transition hover:bg-white/10 hover:text-white dark:text-zinc-400"
						aria-label="Cerrar búsqueda"
					>
						<X className="h-4 w-4" />
					</button>
				</div>
			) : (
				<button
					type="button"
					onClick={() => onExpandChange?.(true)}
					className={[
						'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
						'border-zinc-200/80 bg-white/90 text-zinc-700 shadow-sm transition-all duration-300 ease-in-out',
						'hover:border-violet-400/40 hover:text-violet-700',
						'dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200 dark:hover:text-white',
					].join(' ')}
					aria-label="Abrir búsqueda"
				>
					<Search className="h-5 w-5" aria-hidden />
				</button>
			)}
		</div>
	);
}
