
// Advanced Financial Interfaces
export interface FinancialSummary {
  ingresos: number;
  gastos: number;
  margen: number;
  mrr: number;  // Monthly Recurring Revenue
  arr: number;  // Annual Recurring Revenue
  churnRate: number;
  profitMargin: number;
  revenueGrowth: number;
}

export interface AdvancedMetrics {
  mrr: number;
  arr: number;
  churnRate: number;
  ltv: number;  // Lifetime Value
  cac: number;  // Customer Acquisition Cost
  paybackPeriod: number;
  cashFlowStatus: 'positive' | 'negative' | 'critical';
  burnRate: number;
  runwayMonths: number;
}

export interface CashFlowItem {
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  predicted: boolean;
}

export interface ClientProfitability {
  clientId: string;
  name: string;
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
  ltv: number;
  riskScore: number;
  tier: 'premium' | 'standard' | 'basic';
  acquisitionDate: string;
}

export interface RevenueBySource {
  source: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AlertCard {
  id: string;
  type: 'pending_payment' | 'subscription_renewal' | 'cash_flow' | 'client_risk' | 'revenue_drop';
  message: string;
  clientName?: string;
  amount?: number;
  dueDate?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  actionRequired: boolean;
}

export interface PriceSuggestion {
  id: string;
  service: string;
  currentPrice: number;
  recommendedPrice: number;
  reason: string;
  expectedImpact: string;
  confidence: number;
}

export interface UpsellOpportunity {
  id: string;
  clientName: string;
  currentPlan: string;
  suggestedPlan: string;
  potentialRevenue: number;
  probability: number;
  reasoningFactors: string[];
}

export interface MonthlyProjection {
  month: string;
  projectedRevenue: number;
  actualRevenue: number;
  confidence: number;
  factors: string[];
}

// Mock API functions with enhanced data
export const fetchFinancialSummary = async (): Promise<FinancialSummary> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ingresos: 15000,
        gastos: 8000,
        margen: 7000,
        mrr: 12500,
        arr: 150000,
        churnRate: 5.2,
        profitMargin: 46.7,
        revenueGrowth: 12.5,
      });
    }, 500);
  });
};

export const fetchAdvancedMetrics = async (): Promise<AdvancedMetrics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        mrr: 12500,
        arr: 150000,
        churnRate: 5.2,
        ltv: 2400,
        cac: 150,
        paybackPeriod: 3.2,
        cashFlowStatus: 'positive',
        burnRate: 3500,
        runwayMonths: 18,
      });
    }, 400);
  });
};

export const fetchCashFlow = async (): Promise<CashFlowItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { date: '2025-01-01', type: 'income', category: 'Entrenamientos', amount: 5000, description: 'Sesiones enero', predicted: false },
        { date: '2025-01-01', type: 'income', category: 'Suscripciones', amount: 8000, description: 'Membresías mensuales', predicted: false },
        { date: '2025-01-01', type: 'expense', category: 'Alquiler', amount: 1200, description: 'Alquiler gimnasio', predicted: false },
        { date: '2025-01-01', type: 'expense', category: 'Marketing', amount: 800, description: 'Publicidad Facebook', predicted: false },
        { date: '2025-02-01', type: 'income', category: 'Entrenamientos', amount: 5200, description: 'Sesiones febrero', predicted: true },
        { date: '2025-02-01', type: 'income', category: 'Suscripciones', amount: 8400, description: 'Membresías mensuales', predicted: true },
        { date: '2025-02-01', type: 'expense', category: 'Alquiler', amount: 1200, description: 'Alquiler gimnasio', predicted: true },
      ]);
    }, 600);
  });
};

export const fetchClientProfitability = async (): Promise<ClientProfitability[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          clientId: 'c1',
          name: 'Ana García',
          revenue: 1200,
          costs: 300,
          profit: 900,
          margin: 75,
          ltv: 3600,
          riskScore: 2,
          tier: 'premium',
          acquisitionDate: '2024-03-15'
        },
        {
          clientId: 'c2',
          name: 'Carlos Ruiz',
          revenue: 800,
          costs: 250,
          profit: 550,
          margin: 68.75,
          ltv: 2400,
          riskScore: 3,
          tier: 'standard',
          acquisitionDate: '2024-05-22'
        },
        {
          clientId: 'c3',
          name: 'María López',
          revenue: 400,
          costs: 150,
          profit: 250,
          margin: 62.5,
          ltv: 1200,
          riskScore: 6,
          tier: 'basic',
          acquisitionDate: '2024-08-10'
        },
      ]);
    }, 500);
  });
};

export const fetchRevenueBySource = async (): Promise<RevenueBySource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { source: 'Entrenamientos Personales', amount: 8500, percentage: 56.7, trend: 'up' },
        { source: 'Membresías Grupales', amount: 4200, percentage: 28.0, trend: 'stable' },
        { source: 'Planes Nutricionales', amount: 1800, percentage: 12.0, trend: 'up' },
        { source: 'Productos Fitness', amount: 500, percentage: 3.3, trend: 'down' },
      ]);
    }, 400);
  });
};

export const fetchAlerts = async (): Promise<AlertCard[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: 'pending_payment',
          message: 'Pago pendiente de Ana García - Factura vencida',
          clientName: 'Ana García',
          amount: 500,
          dueDate: '2025-01-01',
          severity: 'high',
          actionRequired: true,
        },
        {
          id: '2',
          type: 'subscription_renewal',
          message: 'Renovación de Carlos Ruiz en 3 días',
          clientName: 'Carlos Ruiz',
          dueDate: '2025-01-15',
          severity: 'medium',
          actionRequired: false,
        },
        {
          id: '3',
          type: 'cash_flow',
          message: 'Flujo de caja crítico proyectado para marzo',
          amount: -2500,
          severity: 'critical',
          actionRequired: true,
        },
        {
          id: '4',
          type: 'client_risk',
          message: 'María López - Alto riesgo de cancelación',
          clientName: 'María López',
          severity: 'medium',
          actionRequired: true,
        },
      ]);
    }, 500);
  });
};

export const fetchPriceSuggestions = async (): Promise<PriceSuggestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          service: 'Entrenamiento Personal',
          currentPrice: 60,
          recommendedPrice: 70,
          reason: 'Alta demanda y lista de espera',
          expectedImpact: '+15% ingresos mensuales',
          confidence: 87,
        },
        {
          id: '2',
          service: 'Plan Nutricional Premium',
          currentPrice: 80,
          recommendedPrice: 95,
          reason: 'Valor superior vs competencia',
          expectedImpact: '+8% margen por cliente',
          confidence: 73,
        },
        {
          id: '3',
          service: 'Membresía Grupal',
          currentPrice: 45,
          recommendedPrice: 50,
          reason: 'Incremento costos operativos',
          expectedImpact: 'Mantener rentabilidad',
          confidence: 92,
        },
      ]);
    }, 500);
  });
};

export const fetchUpsellOpportunities = async (): Promise<UpsellOpportunity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          clientName: 'Ana García',
          currentPlan: 'Entrenamiento Personal',
          suggestedPlan: 'Personal + Nutrición',
          potentialRevenue: 40,
          probability: 85,
          reasoningFactors: ['Alto engagement', 'Consultas frecuentes sobre dieta', 'Cliente premium'],
        },
        {
          id: '2',
          clientName: 'Carlos Ruiz',
          currentPlan: 'Membresía Básica',
          suggestedPlan: 'Membresía Premium',
          potentialRevenue: 25,
          probability: 65,
          reasoningFactors: ['Asistencia regular', 'Interés en clases avanzadas'],
        },
        {
          id: '3',
          clientName: 'Pedro Martín',
          currentPlan: 'Plan Grupal',
          suggestedPlan: 'Híbrido Grupal + Personal',
          potentialRevenue: 120,
          probability: 45,
          reasoningFactors: ['Progreso destacado', 'Objetivos específicos'],
        },
      ]);
    }, 500);
  });
};

export const fetchMonthlyProjection = async (): Promise<MonthlyProjection[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          month: 'Enero',
          projectedRevenue: 16800,
          actualRevenue: 15000,
          confidence: 92,
          factors: ['Temporada alta fitness', 'Nuevos propósitos año']
        },
        {
          month: 'Febrero',
          projectedRevenue: 17200,
          actualRevenue: 0,
          confidence: 87,
          factors: ['Retención enero', 'Campaña San Valentín']
        },
        {
          month: 'Marzo',
          projectedRevenue: 16500,
          actualRevenue: 0,
          confidence: 78,
          factors: ['Posible bajada post-enero', 'Operación bikini comienza']
        },
      ]);
    }, 500);
  });
};
