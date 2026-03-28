export interface ToggleProps {
	checked: boolean;
	onChange: (next: boolean) => void;
	id?: string;
	'aria-label'?: string;
	disabled?: boolean;
}

export function Toggle({ checked, onChange, id, 'aria-label': ariaLabel, disabled }: ToggleProps) {
	return (
		<button
			id={id}
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={() => !disabled && onChange(!checked)}
			className={[
				'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-all duration-300 ease-in-out',
				'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/70',
				disabled ? 'cursor-not-allowed opacity-50' : '',
				checked
					? 'border-violet-500/50 bg-gradient-to-r from-violet-600/80 to-blue-600/70 shadow-[0_0_16px_-4px_rgba(139,92,246,0.6)]'
					: 'border-white/15 bg-white/10 dark:border-white/15 dark:bg-white/10',
			].join(' ')}
		>
			<span
				className={[
					'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ease-in-out',
					checked ? 'translate-x-6' : 'translate-x-1',
				].join(' ')}
				aria-hidden
			/>
		</button>
	);
}
