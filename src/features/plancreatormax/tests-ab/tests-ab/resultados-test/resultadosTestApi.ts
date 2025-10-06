import axios from 'axios';

interface TestResult {
  variant: string;
  conversions: number;
  clicks: number;
  revenue: number;
  participants: number;
}

interface StatisticalAnalysis {
  pValue: number;
  isSignificant: boolean;
  confidenceInterval: [number, number];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  action: string;
}

export const fetchTestResults = async (): Promise<TestResult[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { variant: 'A', conversions: 120, clicks: 1500, revenue: 5000, participants: 10000 },
        { variant: 'B', conversions: 150, clicks: 1600, revenue: 6200, participants: 10000 },
      ]);
    }, 500);
  });
};

export const performStatisticalAnalysis = async (data: TestResult[]): Promise<StatisticalAnalysis> => {
  // Simulate statistical analysis
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pValue: 0.03,
        isSignificant: true,
        confidenceInterval: [0.01, 0.05],
      });
    }, 700);
  });
};

export const getAIRecommendations = async (analysis: StatisticalAnalysis): Promise<Recommendation[]> => {
  // Simulate AI recommendations
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'rec1',
          title: 'Implement Variant B',
          description: 'Variant B showed statistically significant higher conversions.',
          action: 'Deploy Variant B to 100% of users.',
        },
        {
          id: 'rec2',
          title: 'Optimize Call-to-Action',
          description: 'Further testing on CTA button color could yield more improvements.',
          action: 'Create a new A/B test for CTA button.',
        },
      ]);
    }, 600);
  });
};

export const exportReport = async (format: string): Promise<string> => {
  // Simulate report export
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Reporte de resultados exportado en formato ${format}.`);
    }, 300);
  });
};
