import { X } from 'lucide-react';
import { useEffect, useId, type ReactNode } from 'react';

export interface ModalProps {
	open: boolean;
	title: string;
	onClose: () => void;
	children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
	const titleId = useId();

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
			role="presentation"
		>
			<button
				type="button"
				className="absolute inset-0 bg-black/50 backdrop-blur-md transition-all duration-300 ease-in-out dark:bg-black/65"
				aria-label="Cerrar diálogo"
				onClick={onClose}
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className={[
					'relative z-[101] w-full max-w-lg scale-100 rounded-2xl border p-5 transition-all duration-300 ease-in-out sm:p-6',
					'border-zinc-200/80 bg-white/95 shadow-xl',
					'dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[0_0_40px_-8px_rgba(139,92,246,0.35),0_25px_50px_-12px_rgba(0,0,0,0.5)]',
					'backdrop-blur-2xl',
				].join(' ')}
			>
				<div className="mb-4 flex items-start justify-between gap-3">
					<h2
						id={titleId}
						className="text-lg font-semibold text-zinc-900 dark:text-white sm:text-xl"
					>
						{title}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200/80 bg-white text-zinc-600 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
					>
						<X className="h-4 w-4" aria-hidden />
						<span className="sr-only">Cerrar</span>
					</button>
				</div>
				<div className="text-sm text-zinc-700 dark:text-zinc-300">{children}</div>
			</div>
		</div>
	);
}
