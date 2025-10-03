export type ExperimentType = 'landing_page' | 'email' | 'pricing' | 'cta' | 'copy' | 'multivariate';
export type ExperimentStatus = 'draft' | 'active' | 'paused' | 'completed' | 'scheduled';
export type VariantType = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Variant {
  id: VariantType;
  name: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaColor?: string;
  price?: number;
  traffic: number; // percentage of traffic
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenue?: number;
  timeOnPage?: number;
  bounceRate?: number;
}

export interface TimeSeriesData {
  timestamp: string;
  variantA: number;
  variantB: number;
  variantC?: number;
  variantD?: number;
  variantE?: number;
}

export interface Experiment {
  id: string;
  name: string;
  type: ExperimentType;
  status: ExperimentStatus;
  hypothesis: string;
  primaryMetric: 'conversion' | 'clicks' | 'sales' | 'engagement';
  startDate: string;
  endDate: string;
  duration: number; // days
  variants: Variant[];
  winningVariant: VariantType | null;
  significance: number; // 0-1 (p-value)
  confidence: number; // 0-100 percentage
  sampleSize: number;
  currentSample: number;
  segmentation?: {
    enabled: boolean;
    location?: string[];
    plan?: string[];
    behavior?: string[];
  };
  autoStop: boolean;
  schedule?: {
    startDate: string;
    endDate?: string;
    untilSignificance: boolean;
  };
  timeSeriesData: TimeSeriesData[];
  createdAt: string;
  updatedAt: string;
  improvementVsControl: number; // percentage
  estimatedGain: number; // dollars
}

export interface ExperimentStats {
  activeExperiments: number;
  completedTests: number;
  avgConversionImprovement: number;
  totalEstimatedGain: number;
}

export interface ExperimentTemplate {
  id: string;
  name: string;
  type: ExperimentType;
  description: string;
  icon: string;
  defaultVariants: Partial<Variant>[];
}

// Mock data generator
const generateTimeSeriesData = (days: number): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      timestamp: date.toISOString(),
      variantA: 3 + Math.random() * 2,
      variantB: 3.5 + Math.random() * 2.5,
      variantC: 4 + Math.random() * 1.5,
    });
  }

  return data;
};

const mockExperiments: Experiment[] = [
  {
    id: 'exp-001',
    name: 'Hero Headline Test - Landing Principal',
    type: 'landing_page',
    status: 'active',
    hypothesis: 'Un headline más directo aumentará conversiones en 15%',
    primaryMetric: 'conversion',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 14,
    variants: [
      {
        id: 'A',
        name: 'Control - Original',
        title: 'Crea contenido increíble con IA',
        description: 'Genera textos, imágenes y videos en minutos',
        ctaText: 'Empezar gratis',
        ctaColor: '#3B82F6',
        traffic: 50,
        visitors: 4523,
        conversions: 226,
        conversionRate: 5.0,
        revenue: 22600,
        timeOnPage: 45,
        bounceRate: 42
      },
      {
        id: 'B',
        name: 'Variante - Directo',
        title: 'Aumenta tus ventas 10x con IA',
        description: 'Contenido profesional en segundos, no en horas',
        ctaText: 'Prueba gratis ahora',
        ctaColor: '#10B981',
        traffic: 50,
        visitors: 4489,
        conversions: 314,
        conversionRate: 7.0,
        revenue: 31400,
        timeOnPage: 52,
        bounceRate: 35
      }
    ],
    winningVariant: null,
    significance: 0.92,
    confidence: 92,
    sampleSize: 10000,
    currentSample: 9012,
    autoStop: true,
    timeSeriesData: generateTimeSeriesData(5),
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    improvementVsControl: 40,
    estimatedGain: 8800
  },
  {
    id: 'exp-002',
    name: 'CTA Color Test - Página de Precios',
    type: 'cta',
    status: 'active',
    hypothesis: 'Color naranja generará más urgencia y conversión',
    primaryMetric: 'clicks',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 7,
    variants: [
      {
        id: 'A',
        name: 'Control - Azul',
        ctaText: 'Empezar ahora',
        ctaColor: '#3B82F6',
        traffic: 33.33,
        visitors: 2134,
        conversions: 256,
        conversionRate: 12.0,
      },
      {
        id: 'B',
        name: 'Variante - Naranja',
        ctaText: 'Empezar ahora',
        ctaColor: '#F97316',
        traffic: 33.33,
        visitors: 2089,
        conversions: 292,
        conversionRate: 14.0,
      },
      {
        id: 'C',
        name: 'Variante - Verde',
        ctaText: 'Empezar ahora',
        ctaColor: '#10B981',
        traffic: 33.33,
        visitors: 2156,
        conversions: 281,
        conversionRate: 13.0,
      }
    ],
    winningVariant: 'B',
    significance: 0.88,
    confidence: 88,
    sampleSize: 7500,
    currentSample: 6379,
    autoStop: false,
    timeSeriesData: generateTimeSeriesData(3),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    improvementVsControl: 16.7,
    estimatedGain: 3200
  },
  {
    id: 'exp-003',
    name: 'Email Subject Line - Newsletter Semanal',
    type: 'email',
    status: 'completed',
    hypothesis: 'Subject con emoji aumentará tasa de apertura',
    primaryMetric: 'engagement',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 7,
    variants: [
      {
        id: 'A',
        name: 'Control',
        title: 'Tu resumen semanal de marketing',
        traffic: 50,
        visitors: 15000,
        conversions: 4500,
        conversionRate: 30.0,
      },
      {
        id: 'B',
        name: 'Con Emoji',
        title: '🚀 Tu resumen semanal de marketing',
        traffic: 50,
        visitors: 15000,
        conversions: 5400,
        conversionRate: 36.0,
      }
    ],
    winningVariant: 'B',
    significance: 0.95,
    confidence: 95,
    sampleSize: 30000,
    currentSample: 30000,
    autoStop: true,
    timeSeriesData: generateTimeSeriesData(7),
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    improvementVsControl: 20,
    estimatedGain: 5600
  },
  {
    id: 'exp-004',
    name: 'Pricing Strategy - Plan Pro',
    type: 'pricing',
    status: 'active',
    hypothesis: 'Mostrar ahorro anual aumentará suscripciones anuales',
    primaryMetric: 'sales',
    startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 14,
    variants: [
      {
        id: 'A',
        name: 'Control - Solo precio',
        price: 49,
        description: '$49/mes o $490/año',
        traffic: 50,
        visitors: 1234,
        conversions: 98,
        conversionRate: 7.9,
        revenue: 48020
      },
      {
        id: 'B',
        name: 'Con ahorro destacado',
        price: 49,
        description: '$49/mes o $490/año (Ahorra $98)',
        traffic: 50,
        visitors: 1289,
        conversions: 129,
        conversionRate: 10.0,
        revenue: 63210
      }
    ],
    winningVariant: null,
    significance: 0.78,
    confidence: 78,
    sampleSize: 3000,
    currentSample: 2523,
    autoStop: true,
    timeSeriesData: generateTimeSeriesData(8),
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    improvementVsControl: 26.6,
    estimatedGain: 15190
  },
  {
    id: 'exp-005',
    name: 'Copy Test - Beneficios vs Features',
    type: 'copy',
    status: 'scheduled',
    hypothesis: 'Enfocarse en beneficios mejorará engagement',
    primaryMetric: 'engagement',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 14,
    variants: [
      {
        id: 'A',
        name: 'Features',
        description: 'Editor de IA, 100+ templates, exportación PDF',
        traffic: 50,
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
      },
      {
        id: 'B',
        name: 'Beneficios',
        description: 'Ahorra 10 horas semanales, aumenta ventas 3x',
        traffic: 50,
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
      }
    ],
    winningVariant: null,
    significance: 0,
    confidence: 0,
    sampleSize: 5000,
    currentSample: 0,
    autoStop: true,
    schedule: {
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      untilSignificance: true
    },
    timeSeriesData: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    improvementVsControl: 0,
    estimatedGain: 0
  },
  {
    id: 'exp-006',
    name: 'Landing Page Redesign - Full Test',
    type: 'landing_page',
    status: 'paused',
    hypothesis: 'Diseño minimalista aumentará conversión',
    primaryMetric: 'conversion',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 14,
    variants: [
      {
        id: 'A',
        name: 'Actual',
        traffic: 50,
        visitors: 892,
        conversions: 62,
        conversionRate: 6.95,
      },
      {
        id: 'B',
        name: 'Minimalista',
        traffic: 50,
        visitors: 856,
        conversions: 58,
        conversionRate: 6.78,
      }
    ],
    winningVariant: null,
    significance: 0.23,
    confidence: 23,
    sampleSize: 5000,
    currentSample: 1748,
    autoStop: false,
    timeSeriesData: generateTimeSeriesData(2),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    improvementVsControl: -2.4,
    estimatedGain: 0
  },
  {
    id: 'exp-007',
    name: 'Multivariate - Headline + CTA + Image',
    type: 'multivariate',
    status: 'draft',
    hypothesis: 'Combinación optimizada aumentará conversión 25%',
    primaryMetric: 'conversion',
    startDate: '',
    endDate: '',
    duration: 21,
    variants: [
      {
        id: 'A',
        name: 'Control',
        title: 'Original Headline',
        ctaText: 'Empezar gratis',
        traffic: 25,
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
      },
      {
        id: 'B',
        name: 'Headline Alt + CTA Original',
        title: 'Nuevo Headline',
        ctaText: 'Empezar gratis',
        traffic: 25,
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
      },
      {
        id: 'C',
        name: 'Headline Original + CTA Alt',
        title: 'Original Headline',
        ctaText: 'Prueba gratis',
        traffic: 25,
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
      },
      {
        id: 'D',
        name: 'Todo Nuevo',
        title: 'Nuevo Headline',
        ctaText: 'Prueba gratis',
        traffic: 25,
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
      }
    ],
    winningVariant: null,
    significance: 0,
    confidence: 0,
    sampleSize: 12000,
    currentSample: 0,
    autoStop: true,
    timeSeriesData: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    improvementVsControl: 0,
    estimatedGain: 0
  },
  {
    id: 'exp-008',
    name: 'Product Description - Formato Largo vs Corto',
    type: 'copy',
    status: 'completed',
    hypothesis: 'Descripción concisa aumentará conversión',
    primaryMetric: 'conversion',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 14,
    variants: [
      {
        id: 'A',
        name: 'Descripción Larga',
        traffic: 50,
        visitors: 3456,
        conversions: 276,
        conversionRate: 8.0,
      },
      {
        id: 'B',
        name: 'Descripción Corta',
        traffic: 50,
        visitors: 3523,
        conversions: 388,
        conversionRate: 11.0,
      }
    ],
    winningVariant: 'B',
    significance: 0.98,
    confidence: 98,
    sampleSize: 7000,
    currentSample: 6979,
    autoStop: true,
    timeSeriesData: generateTimeSeriesData(14),
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    improvementVsControl: 37.5,
    estimatedGain: 12300
  },
  {
    id: 'exp-009',
    name: 'Testimonials Position Test',
    type: 'landing_page',
    status: 'active',
    hypothesis: 'Testimonios arriba del CTA aumentarán confianza',
    primaryMetric: 'conversion',
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 14,
    variants: [
      {
        id: 'A',
        name: 'Testimonios al final',
        traffic: 50,
        visitors: 2890,
        conversions: 231,
        conversionRate: 8.0,
      },
      {
        id: 'B',
        name: 'Testimonios antes de CTA',
        traffic: 50,
        visitors: 2934,
        conversions: 293,
        conversionRate: 10.0,
      }
    ],
    winningVariant: null,
    significance: 0.85,
    confidence: 85,
    sampleSize: 8000,
    currentSample: 5824,
    autoStop: true,
    timeSeriesData: generateTimeSeriesData(4),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    improvementVsControl: 25,
    estimatedGain: 6200
  },
  {
    id: 'exp-010',
    name: 'Free Trial Duration - 7 vs 14 días',
    type: 'pricing',
    status: 'active',
    hypothesis: '14 días generará más conversiones a pago',
    primaryMetric: 'sales',
    startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 14,
    variants: [
      {
        id: 'A',
        name: '7 días gratis',
        traffic: 50,
        visitors: 1567,
        conversions: 188,
        conversionRate: 12.0,
        revenue: 9400
      },
      {
        id: 'B',
        name: '14 días gratis',
        traffic: 50,
        visitors: 1623,
        conversions: 243,
        conversionRate: 15.0,
        revenue: 12150
      }
    ],
    winningVariant: 'B',
    significance: 0.91,
    confidence: 91,
    sampleSize: 4000,
    currentSample: 3190,
    autoStop: true,
    timeSeriesData: generateTimeSeriesData(6),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    improvementVsControl: 25,
    estimatedGain: 2750
  }
];

export const fetchExperiments = async (): Promise<Experiment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExperiments);
    }, 500);
  });
};

export const fetchExperimentStats = async (): Promise<ExperimentStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const active = mockExperiments.filter(e => e.status === 'active').length;
      const completed = mockExperiments.filter(e => e.status === 'completed').length;
      const completedExps = mockExperiments.filter(e => e.status === 'completed');
      const avgImprovement = completedExps.reduce((sum, e) => sum + e.improvementVsControl, 0) / completedExps.length;
      const totalGain = completedExps.reduce((sum, e) => sum + e.estimatedGain, 0);

      resolve({
        activeExperiments: active,
        completedTests: completed,
        avgConversionImprovement: avgImprovement,
        totalEstimatedGain: totalGain
      });
    }, 300);
  });
};

export const fetchExperimentById = async (id: string): Promise<Experiment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const experiment = mockExperiments.find(e => e.id === id);
      resolve(experiment || null);
    }, 300);
  });
};

export const createExperiment = async (newExperiment: Partial<Experiment>): Promise<Experiment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = `exp-${Math.floor(Math.random() * 10000)}`;
      const experiment: Experiment = {
        id,
        name: newExperiment.name || 'Nuevo Experimento',
        type: newExperiment.type || 'landing_page',
        status: 'draft',
        hypothesis: newExperiment.hypothesis || '',
        primaryMetric: newExperiment.primaryMetric || 'conversion',
        startDate: newExperiment.startDate || '',
        endDate: newExperiment.endDate || '',
        duration: newExperiment.duration || 14,
        variants: newExperiment.variants || [],
        winningVariant: null,
        significance: 0,
        confidence: 0,
        sampleSize: newExperiment.sampleSize || 5000,
        currentSample: 0,
        autoStop: newExperiment.autoStop ?? true,
        timeSeriesData: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        improvementVsControl: 0,
        estimatedGain: 0
      };
      resolve(experiment);
    }, 500);
  });
};

export const updateExperiment = async (id: string, updates: Partial<Experiment>): Promise<Experiment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const experiment = mockExperiments.find(e => e.id === id);
      if (experiment) {
        const updated = { ...experiment, ...updates, updatedAt: new Date().toISOString() };
        resolve(updated);
      } else {
        throw new Error('Experiment not found');
      }
    }, 500);
  });
};

export const experimentTemplates: ExperimentTemplate[] = [
  {
    id: 'template-landing',
    name: 'Landing Page Test',
    type: 'landing_page',
    description: 'Prueba variantes completas de diseño de landing',
    icon: 'Layout',
    defaultVariants: [
      { id: 'A', name: 'Control', traffic: 50 },
      { id: 'B', name: 'Variante', traffic: 50 }
    ]
  },
  {
    id: 'template-email',
    name: 'Email Subject Line',
    type: 'email',
    description: 'Optimiza asuntos de email para mayor apertura',
    icon: 'Mail',
    defaultVariants: [
      { id: 'A', name: 'Subject A', traffic: 50 },
      { id: 'B', name: 'Subject B', traffic: 50 }
    ]
  },
  {
    id: 'template-pricing',
    name: 'Pricing Test',
    type: 'pricing',
    description: 'Prueba diferentes estrategias de precio',
    icon: 'DollarSign',
    defaultVariants: [
      { id: 'A', name: 'Precio actual', traffic: 50 },
      { id: 'B', name: 'Precio nuevo', traffic: 50 }
    ]
  },
  {
    id: 'template-cta',
    name: 'CTA Test',
    type: 'cta',
    description: 'Optimiza botones de call-to-action',
    icon: 'MousePointer',
    defaultVariants: [
      { id: 'A', name: 'CTA Actual', traffic: 50 },
      { id: 'B', name: 'CTA Nuevo', traffic: 50 }
    ]
  },
  {
    id: 'template-copy',
    name: 'Copy Test',
    type: 'copy',
    description: 'Prueba diferentes textos y mensajes',
    icon: 'Type',
    defaultVariants: [
      { id: 'A', name: 'Copy A', traffic: 50 },
      { id: 'B', name: 'Copy B', traffic: 50 }
    ]
  },
  {
    id: 'template-multivariate',
    name: 'Multivariate Test',
    type: 'multivariate',
    description: 'Prueba múltiples elementos simultáneamente',
    icon: 'Grid',
    defaultVariants: [
      { id: 'A', name: 'Control', traffic: 25 },
      { id: 'B', name: 'Variante B', traffic: 25 },
      { id: 'C', name: 'Variante C', traffic: 25 },
      { id: 'D', name: 'Variante D', traffic: 25 }
    ]
  }
];
