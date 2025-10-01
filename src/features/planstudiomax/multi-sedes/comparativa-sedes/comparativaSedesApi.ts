export interface SedeMetrics {
  id: string;
  name: string;
  ingresos: number;
  clientesActivos: number;
  indicadorRendimiento: number;
}

const mockSedesData: SedeMetrics[] = [
  {
    id: 'sede-1',
    name: 'Sede Principal',
    ingresos: 120000,
    clientesActivos: 500,
    indicadorRendimiento: 85,
  },
  {
    id: 'sede-2',
    name: 'Sede Norte',
    ingresos: 85000,
    clientesActivos: 320,
    indicadorRendimiento: 78,
  },
  {
    id: 'sede-3',
    name: 'Sede Sur',
    ingresos: 95000,
    clientesActivos: 410,
    indicadorRendimiento: 92,
  },
];

export const fetchComparativaSedes = async (): Promise<SedeMetrics[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSedesData);
    }, 500);
  });
};

export interface AnalyticsData {
  sedeId: string;
  month: string;
  revenue: number;
  newClients: number;
  churnRate: number;
}

const mockAnalyticsData: AnalyticsData[] = [
  { sedeId: 'sede-1', month: 'Jan', revenue: 10000, newClients: 50, churnRate: 0.05 },
  { sedeId: 'sede-1', month: 'Feb', revenue: 11000, newClients: 55, churnRate: 0.04 },
  { sedeId: 'sede-2', month: 'Jan', revenue: 8000, newClients: 40, churnRate: 0.06 },
  { sedeId: 'sede-2', month: 'Feb', revenue: 8500, newClients: 42, churnRate: 0.05 },
];

export const fetchAnalyticsData = async (): Promise<AnalyticsData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnalyticsData);
    }, 700);
  });
};

export interface ExecutiveReport {
  reportId: string;
  title: string;
  summary: string;
  date: string;
}

const mockExecutiveReports: ExecutiveReport[] = [
  {
    reportId: 'rep-001',
    title: 'Informe de Rendimiento Q1',
    summary: 'Resumen ejecutivo del rendimiento de todas las sedes durante el primer trimestre.',
    date: '2025-03-31',
  },
  {
    reportId: 'rep-002',
    title: 'Proyecciones Anuales 2025',
    summary: 'Análisis de proyecciones de crecimiento y rentabilidad para el año fiscal 2025.',
    date: '2025-06-30',
  },
];

export const fetchExecutiveReports = async (): Promise<ExecutiveReport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExecutiveReports);
    }, 600);
  });
};
