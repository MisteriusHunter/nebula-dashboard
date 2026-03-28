import {
	DndContext,
	DragOverlay,
	type DragEndEvent,
	type DragStartEvent,
	PointerSensor,
	useDraggable,
	useDroppable,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { KanbanColumnId, KanbanTask } from '../../../data/kanban';

const COLUMNS: { id: KanbanColumnId; title: string }[] = [
	{ id: 'todo', title: 'To Do' },
	{ id: 'in-progress', title: 'In Progress' },
	{ id: 'done', title: 'Done' },
];

function TaskCard({ task }: { task: KanbanTask }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: task.id,
	});

	const style = transform ? { transform: CSS.Transform.toString(transform) } : undefined;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={[
				'cursor-grab touch-none rounded-xl border px-3 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out active:cursor-grabbing',
				'border-zinc-200/80 bg-white/95 text-zinc-900',
				'dark:border-white/10 dark:bg-white/[0.08] dark:text-zinc-100',
				isDragging ? 'z-10 scale-[1.02] opacity-90 shadow-lg shadow-violet-500/20' : '',
			].join(' ')}
		>
			{task.title}
		</div>
	);
}

function Column({
	id,
	title,
	tasks,
}: {
	id: KanbanColumnId;
	title: string;
	tasks: KanbanTask[];
}) {
	const { setNodeRef, isOver } = useDroppable({ id });

	return (
		<div
			className={[
				'flex min-h-[280px] min-w-0 flex-1 flex-col rounded-2xl border p-3 transition-all duration-300 ease-in-out sm:p-4',
				'border-zinc-200/80 bg-zinc-50/80 dark:border-white/10 dark:bg-white/[0.04]',
				isOver ? 'ring-2 ring-violet-500/50 ring-offset-2 ring-offset-transparent dark:ring-violet-400/40' : '',
			].join(' ')}
		>
			<h3 className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
				{title}
				<span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-white/10 dark:text-violet-300">
					{tasks.length}
				</span>
			</h3>
			<div ref={setNodeRef} className="flex flex-1 flex-col gap-2">
				{tasks.map((t) => (
					<TaskCard key={t.id} task={t} />
				))}
				{tasks.length === 0 && (
					<p className="mt-2 text-center text-xs text-zinc-500">Suelta aquí</p>
				)}
			</div>
		</div>
	);
}

export interface KanbanViewProps {
	tasks: KanbanTask[];
	onTasksChange: (tasks: KanbanTask[]) => void;
}

export function KanbanView({ tasks, onTasksChange }: KanbanViewProps) {
	const [activeId, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 },
		}),
	);

	function handleDragStart(event: DragStartEvent) {
		setActiveId(String(event.active.id));
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		setActiveId(null);
		if (!over) return;

		const taskId = String(active.id);
		const overId = String(over.id);
		const columnIds = COLUMNS.map((c) => c.id);

		let nextColumn: KanbanColumnId | null = null;
		if (columnIds.includes(overId as KanbanColumnId)) {
			nextColumn = overId as KanbanColumnId;
		} else {
			const target = tasks.find((t) => t.id === overId);
			if (target) nextColumn = target.column;
		}

		if (!nextColumn) return;

		onTasksChange(
			tasks.map((t) => (t.id === taskId ? { ...t, column: nextColumn! } : t)),
		);
	}

	function handleDragCancel() {
		setActiveId(null);
	}

	const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

	return (
		<div className="transition-all duration-300 ease-in-out">
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 lg:gap-5">
					{COLUMNS.map((col) => (
						<Column
							key={col.id}
							id={col.id}
							title={col.title}
							tasks={tasks.filter((t) => t.column === col.id)}
						/>
					))}
				</div>
				<DragOverlay dropAnimation={null}>
					{activeTask ? (
						<div
							className={[
								'cursor-grabbing rounded-xl border px-3 py-2.5 text-sm font-medium shadow-xl',
								'border-violet-400/50 bg-white/95 text-zinc-900',
								'dark:border-violet-500/40 dark:bg-zinc-900/95 dark:text-zinc-50',
								'shadow-[0_12px_40px_-8px_rgba(139,92,246,0.45)]',
							].join(' ')}
						>
							{activeTask.title}
						</div>
					) : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
