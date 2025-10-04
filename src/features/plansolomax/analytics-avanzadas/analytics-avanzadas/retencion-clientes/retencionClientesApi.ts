// src/features/analytics-avanzadas/retencion-clientes/retencionClientesApi.ts

export interface KPIData {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface RetentionTrendData {
  month: string;
  percentage: number;
}

export interface ChurnAlert {
  id: string;
  customerName: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
}

// Simulate API calls
export const fetchRetentionKPIs = async (): Promise<KPIData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Tasa de Retención', value: '85%', change: '+2%', trend: 'up' },
        { name: 'Clientes Activos', value: '12,345', change: '+500', trend: 'up' },
        { name: 'Valor de Vida del Cliente', value: '€1,200', change: '-€50', trend: 'down' },
      ]);
    }, 500);
  });
};

export const fetchRetentionTrend = async (): Promise<RetentionTrendData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Ene', percentage: 80 },
        { month: 'Feb', percentage: 82 },
        { month: 'Mar', percentage: 81 },
        { month: 'Abr', percentage: 85 },
        { month: 'May', percentage: 84 },
        { month: 'Jun', percentage: 86 },
      ]);
    }, 500);
  });
};

export const fetchChurnAlerts = async (): Promise<ChurnAlert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', customerName: 'Cliente A', reason: 'Baja actividad', severity: 'medium', date: '2025-09-20' },
        { id: '2', customerName: 'Cliente B', reason: 'Quejas recientes', severity: 'high', date: '2025-09-22' },
      ]);
    }, 500);
  });
};

export const fetchMonthlyActiveClients = async (): Promise<RetentionTrendData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Ene', percentage: 70 },
        { month: 'Feb', percentage: 72 },
        { month: 'Mar', percentage: 71 },
        { month: 'Abr', percentage: 75 },
        { month: 'May', percentage: 74 },
        { month: 'Jun', percentage: 76 },
      ]);
    }, 500);
  });
};

// Placeholder for churn predictor API
export const predictChurn = async (customerId: string): Promise<{ customerId: string; churnProbability: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ customerId, churnProbability: Math.random() });
    }, 500);
  });
};

// Placeholder for industry benchmarks API
export const fetchIndustryBenchmarks = async (): Promise<KPIData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Retención Sector', value: '80%', change: 'N/A', trend: 'neutral' },
        { name: 'Churn Sector', value: '15%', change: 'N/A', trend: 'neutral' },
      ]);
    }, 500);
  });
};
