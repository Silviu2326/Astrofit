import { TestMetrics, StatisticalSignificance } from './types';

/**
 * Calculate Z-score for two proportions
 */
export function calculateZScore(
  conversions1: number,
  visitors1: number,
  conversions2: number,
  visitors2: number
): number {
  const p1 = conversions1 / visitors1;
  const p2 = conversions2 / visitors2;

  const pooledProbability = (conversions1 + conversions2) / (visitors1 + visitors2);
  const standardError = Math.sqrt(
    pooledProbability * (1 - pooledProbability) * (1 / visitors1 + 1 / visitors2)
  );

  if (standardError === 0) return 0;

  return (p1 - p2) / standardError;
}

/**
 * Calculate p-value from Z-score (two-tailed test)
 */
export function calculatePValue(zScore: number): number {
  const z = Math.abs(zScore);

  // Approximation of the cumulative distribution function
  const t = 1 / (1 + 0.2316419 * z);
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

  return 2 * probability; // Two-tailed test
}

/**
 * Calculate confidence interval for proportion difference
 */
export function calculateConfidenceInterval(
  conversions1: number,
  visitors1: number,
  conversions2: number,
  visitors2: number,
  confidenceLevel: number = 0.95
): [number, number] {
  const p1 = conversions1 / visitors1;
  const p2 = conversions2 / visitors2;
  const difference = p1 - p2;

  // Standard error for difference in proportions
  const se = Math.sqrt(
    (p1 * (1 - p1)) / visitors1 + (p2 * (1 - p2)) / visitors2
  );

  // Z-score for confidence level
  const zScoreForCI = confidenceLevel === 0.95 ? 1.96 : confidenceLevel === 0.99 ? 2.576 : 1.645;

  const marginOfError = zScoreForCI * se;

  return [
    (difference - marginOfError) * 100,
    (difference + marginOfError) * 100
  ];
}

/**
 * Calculate statistical significance
 */
export function calculateStatisticalSignificance(
  variantMetrics: TestMetrics,
  controlMetrics: TestMetrics,
  confidenceLevel: number = 0.95
): StatisticalSignificance {
  const zScore = calculateZScore(
    variantMetrics.conversions,
    variantMetrics.visitors,
    controlMetrics.conversions,
    controlMetrics.visitors
  );

  const pValue = calculatePValue(zScore);
  const alpha = 1 - confidenceLevel;

  return {
    pValue,
    isSignificant: pValue < alpha,
    confidenceLevel: confidenceLevel * 100,
    zScore
  };
}

/**
 * Calculate minimum sample size needed for test
 */
export function calculateMinSampleSize(
  baselineConversionRate: number,
  minimumDetectableEffect: number = 0.1, // 10% relative improvement
  alpha: number = 0.05,
  power: number = 0.8
): number {
  const p1 = baselineConversionRate;
  const p2 = p1 * (1 + minimumDetectableEffect);

  // Simplified formula for sample size per variant
  const zAlpha = 1.96; // Z-score for 95% confidence
  const zBeta = 0.84; // Z-score for 80% power

  const pooledP = (p1 + p2) / 2;

  const n = Math.pow(zAlpha + zBeta, 2) *
            (p1 * (1 - p1) + p2 * (1 - p2)) /
            Math.pow(p2 - p1, 2);

  return Math.ceil(n);
}

/**
 * Calculate improvement percentage
 */
export function calculateImprovement(
  variantRate: number,
  controlRate: number
): number {
  if (controlRate === 0) return 0;
  return ((variantRate - controlRate) / controlRate) * 100;
}

/**
 * Determine if sample size is sufficient
 */
export function isSampleSizeSufficient(
  actualSampleSize: number,
  requiredSampleSize: number
): boolean {
  return actualSampleSize >= requiredSampleSize;
}

/**
 * Calculate expected time to significance
 */
export function calculateExpectedTimeToSignificance(
  currentVisitors: number,
  requiredVisitors: number,
  dailyVisitors: number
): number {
  const remainingVisitors = Math.max(0, requiredVisitors - currentVisitors);
  return Math.ceil(remainingVisitors / dailyVisitors);
}

/**
 * Calculate statistical power achieved
 */
export function calculateStatisticalPower(
  conversions1: number,
  visitors1: number,
  conversions2: number,
  visitors2: number,
  alpha: number = 0.05
): number {
  const zScore = Math.abs(calculateZScore(conversions1, visitors1, conversions2, visitors2));
  const zAlpha = 1.96; // for 95% confidence

  // Approximation of statistical power
  const power = 1 - calculatePValue(zScore - zAlpha) / 2;

  return Math.max(0, Math.min(1, power)) * 100;
}
