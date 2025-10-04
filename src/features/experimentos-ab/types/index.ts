export type ABTestStatus = 'draft' | 'running' | 'paused' | 'completed' | 'archived';

export type ABTestGoal = {
  id: string;
  name: string;
  type: 'click' | 'conversion' | 'engagement' | 'revenue' | 'custom';
  description?: string;
};

export type ABTestVariant = {
  id: string;
  name: string;
  description?: string;
  traffic: number; // Porcentaje de tráfico 0-100
  content: {
    headline?: string;
    description?: string;
    image?: string;
    buttonText?: string;
    buttonColor?: string;
    customHTML?: string;
    customCSS?: string;
  };
  isControl: boolean;
};

export type ABTestMetrics = {
  variantId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  engagementRate: number;
  conversionRate: number;
  confidenceLevel: number;
  uplift: number; // Comparado con control
};

export type ABTestResult = {
  testId: string;
  winner?: string;
  confidence: number;
  metrics: ABTestMetrics[];
  startDate: string;
  endDate?: string;
  duration: number; // en días
  totalSampleSize: number;
  statisticalSignificance: boolean;
};

export type ABTest = {
  id: string;
  name: string;
  description: string;
  status: ABTestStatus;
  variants: ABTestVariant[];
  goals: ABTestGoal[];
  targetAudience?: {
    segments?: string[];
    devices?: ('desktop' | 'mobile' | 'tablet')[];
    locations?: string[];
    customRules?: Record<string, any>;
  };
  schedule?: {
    startDate: string;
    endDate?: string;
    autoStop?: boolean;
    minSampleSize?: number;
  };
  result?: ABTestResult;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

export type ABTestFormData = Omit<ABTest, 'id' | 'createdAt' | 'updatedAt' | 'result'>;

export type ABTestAnalytics = {
  testId: string;
  timestamp: string;
  metrics: ABTestMetrics[];
  realTimeData: {
    activeUsers: number;
    currentConversions: number;
    projectedWinner?: string;
  };
};
