export type KanbanColumnId = 'todo' | 'in-progress' | 'done';

export interface KanbanTask {
	id: string;
	title: string;
	column: KanbanColumnId;
}

export const initialKanbanTasks: KanbanTask[] = [
	{ id: 't1', title: 'Diseñar flujo de embeddings', column: 'todo' },
	{ id: 't2', title: 'Fine-tuning modelo de soporte', column: 'todo' },
	{ id: 't3', title: 'Pipeline RAG + evaluación', column: 'in-progress' },
	{ id: 't4', title: 'Dashboard de costos GPU', column: 'in-progress' },
	{ id: 't5', title: 'Despliegue en edge', column: 'done' },
	{ id: 't6', title: 'Políticas de privacidad datos', column: 'done' },
];
