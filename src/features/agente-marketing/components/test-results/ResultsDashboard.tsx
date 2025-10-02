import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { TestResult, TestComparison, VariantResult } from './types';
import { StatisticsCard } from './StatisticsCard';
import { VariantComparison } from './VariantComparison';
import { RecommendationsPanel } from './RecommendationsPanel';
import { InsightsPanel } from './InsightsPanel';

interface ResultsDashboardProps {
  testResult: TestResult;
  onImplementWinner?: (variantId: string) => void;
  onContinueTest?: () => void;
  onStopTest?: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  testResult,
  onImplementWinner,
  onContinueTest,
  onStopTest
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const winner = useMemo(() => {
    if (!testResult.comparisons.length) return null;

    const significantComparisons = testResult.comparisons.filter(
      c => c.significance.isSignificant && c.improvement > 0
    );

    if (significantComparisons.length === 0) return null;

    // Find variant with highest significant improvement
    const best = significantComparisons.reduce((prev, current) =>
      current.improvement > prev.improvement ? current : prev
    );

    return best.variant;
  }, [testResult.comparisons]);

  const overallStatus = useMemo(() => {
    const hasSignificantResult = testResult.comparisons.some(
      c => c.significance.isSignificant
    );

    const allSamplesReached = testResult.comparisons.every(
      c => c.sampleSizeReached
    );

    if (winner) return 'winner';
    if (hasSignificantResult) return 'significant';
    if (allSamplesReached) return 'inconclusive';
    return 'running';
  }, [testResult.comparisons, winner]);

  const getDurationText = (duration: number): string => {
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getTrendIcon = (improvement: number) => {
    if (improvement > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (improvement < 0) return <ArrowDownRight className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (improvement: number, isSignificant: boolean) => {
    if (!isSignificant) return 'text-gray-500';
    if (improvement > 0) return 'text-green-600';
    if (improvement < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">{testResult.name}</h2>
              {overallStatus === 'winner' && (
                <Award className="w-8 h-8 text-yellow-300" />
              )}
            </div>

            <div className="flex items-center gap-6 text-green-50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{getDurationText(testResult.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{testResult.totalVisitors.toLocaleString()} visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{testResult.totalConversions.toLocaleString()} conversions</span>
              </div>
            </div>
          </div>

          {winner && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
            >
              <div className="text-green-50 text-sm mb-1">Winner</div>
              <div className="text-2xl font-bold">{winner.name}</div>
              <div className="text-green-50 text-sm mt-1">
                {winner.metrics.conversionRate.toFixed(2)}% conversion rate
              </div>
            </motion.div>
          )}
        </div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4"
        >
          {overallStatus === 'winner' && (
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <div>
                <div className="font-semibold">Clear Winner Detected</div>
                <div className="text-green-50 text-sm">
                  Statistical significance achieved. Ready to implement winning variant.
                </div>
              </div>
            </div>
          )}

          {overallStatus === 'significant' && (
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <div>
                <div className="font-semibold">Significant Results Found</div>
                <div className="text-green-50 text-sm">
                  Some variants show statistically significant differences.
                </div>
              </div>
            </div>
          )}

          {overallStatus === 'inconclusive' && (
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <div>
                <div className="font-semibold">No Clear Winner</div>
                <div className="text-green-50 text-sm">
                  Sample size reached but no significant differences detected.
                </div>
              </div>
            </div>
          )}

          {overallStatus === 'running' && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" />
              <div>
                <div className="font-semibold">Test In Progress</div>
                <div className="text-green-50 text-sm">
                  Continue collecting data to reach statistical significance.
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticsCard
          title="Total Variants"
          value={testResult.variants.length}
          icon={<BarChart3 className="w-5 h-5" />}
          gradient="from-green-500 to-emerald-500"
        />

        <StatisticsCard
          title="Avg Conversion Rate"
          value={`${(testResult.variants.reduce((sum, v) => sum + v.metrics.conversionRate, 0) / testResult.variants.length).toFixed(2)}%`}
          icon={<Target className="w-5 h-5" />}
          gradient="from-emerald-500 to-teal-500"
        />

        <StatisticsCard
          title="Best Improvement"
          value={testResult.comparisons.length > 0
            ? `${Math.max(...testResult.comparisons.map(c => c.improvement)).toFixed(1)}%`
            : '0%'
          }
          icon={<TrendingUp className="w-5 h-5" />}
          gradient="from-teal-500 to-green-500"
        />
      </div>

      {/* Variant Comparisons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Variant Performance
        </h3>

        <div className="space-y-4">
          {testResult.comparisons.map((comparison, index) => (
            <VariantComparison
              key={comparison.variant.id}
              comparison={comparison}
              isSelected={selectedVariant === comparison.variant.id}
              onSelect={() => setSelectedVariant(
                selectedVariant === comparison.variant.id
                  ? null
                  : comparison.variant.id
              )}
            />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <RecommendationsPanel testResult={testResult} winner={winner} />

      {/* Insights */}
      <InsightsPanel testResult={testResult} />

      {/* Actions */}
      {winner && onImplementWinner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl p-6"
        >
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-bold mb-1">Ready to Implement</h3>
              <p className="text-green-50">
                Implement the winning variant to improve your conversion rate
              </p>
            </div>
            <button
              onClick={() => onImplementWinner(winner.id)}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Implement Winner
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
