/** Datos de ejemplo — sustituye por fetch/API cuando integres la lógica. */

export type ProjectStatus = 'activo' | 'pausa' | 'completado';

export interface ProjectRow {
	id: string;
	nombre: string;
	cliente: string;
	progreso: number;
	estatus: ProjectStatus;
	fecha: string;
	/** Presupuesto asignado (texto para mostrar en modal). */
	presupuesto: string;
	/** Descripción breve para el modal de detalle. */
	descripcion: string;
}

export const summaryMetrics = [
	{
		id: 'ingresos',
		label: 'Ingresos',
		value: '$48.2k',
		change: '+12.4%',
		positive: true,
		icon: 'trending' as const,
	},
	{
		id: 'usuarios',
		label: 'Usuarios activos',
		value: '2,840',
		change: '+5.1%',
		positive: true,
		icon: 'users' as const,
	},
	{
		id: 'conversion',
		label: 'Conversión',
		value: '3.8%',
		change: '-0.2%',
		positive: false,
		icon: 'sparkles' as const,
	},
	{
		id: 'tareas',
		label: 'Tareas hoy',
		value: '127',
		change: '+18',
		positive: true,
		icon: 'check' as const,
	},
];

export const recentProjects: ProjectRow[] = [
	{
		id: '1',
		nombre: 'Portal Analytics',
		cliente: 'Nebula Labs',
		progreso: 72,
		estatus: 'activo',
		fecha: '2026-03-26',
		presupuesto: '$32.500',
		descripcion:
			'Panel de analítica en tiempo real con embudos de conversión, cohortes y exportación a BI.',
	},
	{
		id: '2',
		nombre: 'App de inventario',
		cliente: 'Orbit Retail',
		progreso: 45,
		estatus: 'pausa',
		fecha: '2026-03-22',
		presupuesto: '$18.200',
		descripcion:
			'Gestión de stock multi-almacén con escaneo y sincronización offline-first para tiendas.',
	},
	{
		id: '3',
		nombre: 'Landing producto',
		cliente: 'Pulse Media',
		progreso: 100,
		estatus: 'completado',
		fecha: '2026-03-18',
		presupuesto: '$9.800',
		descripcion:
			'Landing con A/B testing, formularios conectados a CRM y animaciones ligeras orientadas a conversión.',
	},
	{
		id: '4',
		nombre: 'API interna',
		cliente: 'Vertex',
		progreso: 88,
		estatus: 'activo',
		fecha: '2026-03-27',
		presupuesto: '$54.000',
		descripcion:
			'API REST documentada (OpenAPI), autenticación por roles y observabilidad con métricas y trazas.',
	},
	{
		id: '5',
		nombre: 'Dashboard ventas',
		cliente: 'Aurora Co.',
		progreso: 33,
		estatus: 'activo',
		fecha: '2026-03-25',
		presupuesto: '$27.400',
		descripcion:
			'Vista unificada de pipeline, pronósticos y alertas por región para el equipo comercial.',
	},
];
