import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  TrendingUp,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Activity,
  Users,
  Clock
} from 'lucide-react';
import { TestResult, ResultsInsight } from './types';

interface InsightsPanelProps {
  testResult: TestResult;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ testResult }) => {
  const insights = useMemo(() => {
    const results: ResultsInsight[] = [];

    // Performance insights
    const avgConversionRate = testResult.variants.reduce(
      (sum, v) => sum + v.metrics.conversionRate, 0
    ) / testResult.variants.length;

    const topVariant = testResult.variants.reduce((prev, current) =>
      current.metrics.conversionRate > prev.metrics.conversionRate ? current : prev
    );

    if (topVariant.metrics.conversionRate > avgConversionRate * 1.1) {
      results.push({
        id: 'top-performer',
        category: 'performance',
        title: 'Top Performing Variant Identified',
        description: `${topVariant.name} has the highest conversion rate at ${topVariant.metrics.conversionRate.toFixed(2)}%, which is ${((topVariant.metrics.conversionRate / avgConversionRate - 1) * 100).toFixed(1)}% above average.`,
        severity: 'success',
        metric: 'Conversion Rate',
        value: `${topVariant.metrics.conversionRate.toFixed(2)}%`
      });
    }

    // Statistical insights
    const significantTests = testResult.comparisons.filter(
      c => c.significance.isSignificant
    );

    if (significantTests.length > 0) {
      results.push({
        id: 'statistical-significance',
        category: 'statistical',
        title: 'Statistical Significance Achieved',
        description: `${significantTests.length} variant(s) have reached statistical significance. Results are reliable for decision-making.`,
        severity: 'success',
        metric: 'Significant Results',
        value: significantTests.length
      });
    } else {
      const avgSampleProgress = testResult.comparisons.reduce(
        (sum, c) => sum + (c.variant.metrics.visitors / c.minSampleSize), 0
      ) / testResult.comparisons.length;

      if (avgSampleProgress < 0.5) {
        results.push({
          id: 'early-stage',
          category: 'statistical',
          title: 'Test in Early Stage',
          description: `Test is ${(avgSampleProgress * 100).toFixed(0)}% complete. Results may change significantly as more data is collected.`,
          severity: 'warning',
          metric: 'Progress',
          value: `${(avgSampleProgress * 100).toFixed(0)}%`
        });
      }
    }

    // Behavioral insights
    const trafficDistribution = testResult.variants.map(v => ({
      name: v.name,
      percentage: (v.metrics.visitors / testResult.totalVisitors) * 100
    }));

    const isEvenDistribution = trafficDistribution.every(
      d => Math.abs(d.percentage - (100 / testResult.variants.length)) < 5
    );

    if (!isEvenDistribution) {
      results.push({
        id: 'traffic-imbalance',
        category: 'technical',
        title: 'Uneven Traffic Distribution',
        description: 'Traffic is not evenly distributed among variants. This could affect the reliability of results.',
        severity: 'warning'
      });
    }

    // Duration insights
    const durationDays = testResult.duration / (1000 * 60 * 60 * 24);

    if (durationDays < 7) {
      results.push({
        id: 'short-duration',
        category: 'statistical',
        title: 'Short Test Duration',
        description: `Test has run for ${durationDays.toFixed(1)} days. Running for at least 7-14 days captures weekly patterns and improves reliability.`,
        severity: 'info',
        metric: 'Duration',
        value: `${durationDays.toFixed(1)} days`
      });
    }

    // Conversion insights
    if (testResult.totalConversions < 100) {
      results.push({
        id: 'low-conversions',
        category: 'statistical',
        title: 'Low Conversion Count',
        description: `Only ${testResult.totalConversions} total conversions recorded. More conversions needed for reliable results (target: 100+ per variant).`,
        severity: 'warning',
        metric: 'Total Conversions',
        value: testResult.totalConversions
      });
    }

    // Revenue insights
    const variantsWithRevenue = testResult.variants.filter(v => v.metrics.revenue);

    if (variantsWithRevenue.length > 0) {
      const totalRevenue = variantsWithRevenue.reduce(
        (sum, v) => sum + (v.metrics.revenue || 0), 0
      );

      const topRevenueVariant = variantsWithRevenue.reduce((prev, current) =>
        (current.metrics.revenue || 0) > (prev.metrics.revenue || 0) ? current : prev
      );

      results.push({
        id: 'revenue-leader',
        category: 'performance',
        title: 'Revenue Performance',
        description: `${topRevenueVariant.name} has generated the most revenue at $${(topRevenueVariant.metrics.revenue || 0).toLocaleString()}.`,
        severity: 'success',
        metric: 'Revenue',
        value: `$${(topRevenueVariant.metrics.revenue || 0).toLocaleString()}`
      });
    }

    // Sample size insights
    const needsMoreSamples = testResult.comparisons.filter(
      c => !c.sampleSizeReached
    );

    if (needsMoreSamples.length > 0) {
      const avgNeeded = needsMoreSamples.reduce(
        (sum, c) => sum + (c.minSampleSize - c.variant.metrics.visitors), 0
      ) / needsMoreSamples.length;

      results.push({
        id: 'sample-size-needed',
        category: 'statistical',
        title: 'Additional Sample Size Required',
        description: `Average of ${avgNeeded.toFixed(0)} more visitors needed per variant to reach minimum sample size.`,
        severity: 'info',
        metric: 'Visitors Needed',
        value: avgNeeded.toFixed(0)
      });
    }

    // Velocity insights
    const dailyVisitors = testResult.totalVisitors / durationDays;

    if (dailyVisitors > 1000) {
      results.push({
        id: 'high-velocity',
        category: 'performance',
        title: 'High Traffic Volume',
        description: `Test is receiving ${dailyVisitors.toFixed(0)} visitors per day. High traffic enables faster results.`,
        severity: 'success',
        metric: 'Daily Visitors',
        value: dailyVisitors.toFixed(0)
      });
    } else if (dailyVisitors < 100) {
      results.push({
        id: 'low-velocity',
        category: 'performance',
        title: 'Low Traffic Volume',
        description: `Test is receiving ${dailyVisitors.toFixed(0)} visitors per day. Consider increasing traffic allocation for faster results.`,
        severity: 'warning',
        metric: 'Daily Visitors',
        value: dailyVisitors.toFixed(0)
      });
    }

    return results;
  }, [testResult]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      case 'statistical': return <Activity className="w-4 h-4" />;
      case 'behavioral': return <Users className="w-4 h-4" />;
      case 'technical': return <AlertCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'text-green-600 bg-green-100';
      case 'statistical': return 'text-purple-600 bg-purple-100';
      case 'behavioral': return 'text-blue-600 bg-blue-100';
      case 'technical': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
          <Eye className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Key Insights
        </h3>
        <span className="text-sm text-gray-500">
          {insights.length} findings
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border rounded-lg p-4 ${getSeverityColor(insight.severity)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getSeverityIcon(insight.severity)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {insight.title}
                  </h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getCategoryColor(insight.category)}`}>
                    {getCategoryIcon(insight.category)}
                    <span className="capitalize">{insight.category}</span>
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {insight.description}
                </p>

                {(insight.metric || insight.value) && (
                  <div className="flex items-center gap-2 text-xs">
                    {insight.metric && (
                      <span className="text-gray-500">{insight.metric}:</span>
                    )}
                    {insight.value && (
                      <span className="font-semibold text-gray-700">
                        {insight.value}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {insights.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No insights available yet. Continue collecting data.</p>
        </div>
      )}
    </div>
  );
};
