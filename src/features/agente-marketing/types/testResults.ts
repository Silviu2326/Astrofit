export interface TestVariant {
  id: string;
  name: string;
  description?: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  conversionRate: number;
  avgOrderValue: number;
  revenuePerVisitor: number;
}

export interface TestResults {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  variants: TestVariant[];
  control: TestVariant;
  winner?: TestVariant;
  confidence: number;
  significance: StatisticalSignificance;
  improvement: number;
  estimatedRevenueLift: number;
  recommendations: Recommendation[];
}

export interface StatisticalSignificance {
  isSignificant: boolean;
  pValue: number;
  confidenceLevel: number;
  sampleSize: number;
  minimumDetectableEffect: number;
  daysToSignificance?: number;
}

export interface Recommendation {
  type: 'implement' | 'continue' | 'stop' | 'iterate';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: number;
  effort: number;
  actions: string[];
}

export interface MetricComparison {
  metric: string;
  control: number;
  variant: number;
  improvement: number;
  isSignificant: boolean;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
}
