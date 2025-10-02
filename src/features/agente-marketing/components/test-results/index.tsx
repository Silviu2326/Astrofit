export { ResultsDashboard } from './ResultsDashboard';
export { StatisticsCard } from './StatisticsCard';
export { VariantComparison } from './VariantComparison';
export { RecommendationsPanel } from './RecommendationsPanel';
export { InsightsPanel } from './InsightsPanel';

export type {
  TestMetrics,
  VariantResult,
  StatisticalSignificance,
  TestComparison,
  TestResult,
  Recommendation,
  ResultsInsight
} from './types';

export {
  calculateZScore,
  calculatePValue,
  calculateConfidenceInterval,
  calculateStatisticalSignificance,
  calculateMinSampleSize,
  calculateImprovement,
  isSampleSizeSufficient,
  calculateExpectedTimeToSignificance,
  calculateStatisticalPower
} from './statisticalUtils';
