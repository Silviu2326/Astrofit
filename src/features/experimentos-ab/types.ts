export type ExperimentStatus = 'draft' | 'running' | 'paused' | 'completed' | 'archived';
export type VariantType = 'control' | 'variant';
export type MetricType = 'conversion' | 'ctr' | 'revenue' | 'engagement' | 'custom';
export type TrafficSplit = 25 | 33 | 50 | 75;

export interface ABVariant {
  id: string;
  name: string;
  type: VariantType;
  description: string;
  trafficPercentage: number;

  // Configuración visual
  config: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonColor?: string;
    image?: string;
    layout?: 'single' | 'split' | 'grid';
    backgroundColor?: string;
    textColor?: string;
  };

  // Métricas
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
    engagementTime: number;
  };

  // Estadísticas calculadas
  stats: {
    conversionRate: number;
    ctr: number;
    averageRevenue: number;
    confidenceLevel: number;
    isWinner?: boolean;
  };
}

export interface ABMetric {
  id: string;
  name: string;
  type: MetricType;
  description: string;
  goal: number;
  current: number;
  unit: string;
  isPrimary: boolean;
}

export interface ABExperiment {
  id: string;
  name: string;
  description: string;
  status: ExperimentStatus;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;

  // Configuración
  targetAudience: {
    segment: string;
    percentage: number;
    filters: {
      location?: string[];
      device?: string[];
      newUsers?: boolean;
    };
  };

  // Duración
  duration: {
    startDate: string;
    endDate: string;
    minSampleSize: number;
    currentSampleSize: number;
  };

  // Variantes
  variants: ABVariant[];

  // Métricas
  metrics: ABMetric[];

  // Ganador
  winner?: {
    variantId: string;
    confidence: number;
    uplift: number;
    declaredAt: string;
  };

  // Tags y categorización
  tags: string[];
  category: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ExperimentResults {
  experimentId: string;
  summary: {
    totalImpressions: number;
    totalConversions: number;
    totalRevenue: number;
    duration: number;
    participatingUsers: number;
  };

  variantComparison: {
    variantId: string;
    name: string;
    metrics: {
      name: string;
      value: number;
      change: number;
      significance: number;
    }[];
  }[];

  timeline: {
    date: string;
    variants: {
      variantId: string;
      conversions: number;
      revenue: number;
    }[];
  }[];

  insights: {
    type: 'warning' | 'success' | 'info';
    message: string;
    timestamp: string;
  }[];
}

export interface VariantPreview {
  variantId: string;
  previewUrl?: string;
  screenshot?: string;
  device: 'desktop' | 'mobile' | 'tablet';
}
