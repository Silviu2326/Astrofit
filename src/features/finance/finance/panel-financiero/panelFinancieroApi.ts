import { startOfMonth, subMonths, format } from 'date-fns';

export interface FinancialSummary {
  currentMonth: string;
  ingresos: number;
  gastos: number;
  margen: number;
  margenPorcentaje: number;
  cierraEnPositivo: boolean;
}

export interface SalesTrend {
  month: string;
  sales: number;
  growthRate: number;
}

export interface Projection {
  month: string;
  projectedRevenue: number;
  projectedExpenses: number;
  projectedProfit: number;
}

// Mock data generation
const generateMockFinancialSummary = (): FinancialSummary => {
  const currentMonth = format(startOfMonth(new Date()), 'MMMM yyyy');
  const ingresos = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000; // 100k - 200k
  const gastos = Math.floor(Math.random() * (80000 - 40000 + 1)) + 40000; // 40k - 80k
  const margen = ingresos - gastos;
  const margenPorcentaje = (margen / ingresos) * 100;
  const cierraEnPositivo = margen > 0;

  return {
    currentMonth,
    ingresos,
    gastos,
    margen,
    margenPorcentaje,
    cierraEnPositivo,
  };
};

const generateMockSalesTrends = (): SalesTrend[] => {
  const trends: SalesTrend[] = [];
  let currentSales = 80000;

  for (let i = 5; i >= 0; i--) {
    const month = format(subMonths(new Date(), i), 'MMM yy');
    const growthRate = parseFloat((Math.random() * (0.10 - (-0.05)) + (-0.05)).toFixed(2)); // -5% to +10%
    currentSales = currentSales * (1 + growthRate);
    trends.push({
      month,
      sales: parseFloat(currentSales.toFixed(2)),
      growthRate: parseFloat((growthRate * 100).toFixed(2)),
    });
  }
  return trends;
};

const generateMockProjections = (): Projection[] => {
  const projections: Projection[] = [];
  let lastRevenue = 180000;
  let lastExpenses = 70000;

  for (let i = 0; i < 6; i++) {
    const month = format(subMonths(new Date(), -i), 'MMM yy');
    const projectedRevenue = lastRevenue * (1 + (Math.random() * 0.05 - 0.02)); // -2% to +5%
    const projectedExpenses = lastExpenses * (1 + (Math.random() * 0.03 - 0.01)); // -1% to +3%
    projections.push({
      month,
      projectedRevenue: parseFloat(projectedRevenue.toFixed(2)),
      projectedExpenses: parseFloat(projectedExpenses.toFixed(2)),
      projectedProfit: parseFloat((projectedRevenue - projectedExpenses).toFixed(2)),
    });
    lastRevenue = projectedRevenue;
    lastExpenses = projectedExpenses;
  }
  return projections;
};

export const getFinancialSummary = async (): Promise<FinancialSummary> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateMockFinancialSummary()), 500);
  });
};

export const getSalesTrends = async (): Promise<SalesTrend[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateMockSalesTrends()), 700);
  });
};

export const getProjections = async (): Promise<Projection[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateMockProjections()), 600);
  });
};
