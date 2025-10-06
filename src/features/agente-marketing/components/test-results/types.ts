export interface TestMetrics {
  conversions: number;
  visitors: number;
  conversionRate: number;
  revenue?: number;
  averageOrderValue?: number;
}

export interface VariantResult {
  id: string;
  name: string;
  metrics: TestMetrics;
  isControl: boolean;
}

export interface StatisticalSignificance {
  pValue: number;
  isSignificant: boolean;
  confidenceLevel: number;
  zScore: number;
}

export interface TestComparison {
  variant: VariantResult;
  control: VariantResult;
  improvement: number;
  improvementRange: [number, number];
  significance: StatisticalSignificance;
  sampleSizeReached: boolean;
  minSampleSize: number;
}

export interface TestResult {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'paused';
  startDate: Date;
  endDate?: Date;
  duration: number;
  variants: VariantResult[];
  winner?: string;
  comparisons: TestComparison[];
  totalVisitors: number;
  totalConversions: number;
}

export interface Recommendation {
  id: string;
  type: 'implement' | 'continue_testing' | 'stop_test' | 'increase_traffic';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionItems: string[];
  expectedOutcome?: string;
}

export interface ResultsInsight {
  id: string;
  category: 'performance' | 'statistical' | 'behavioral' | 'technical';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
  metric?: string;
  value?: number | string;
}
