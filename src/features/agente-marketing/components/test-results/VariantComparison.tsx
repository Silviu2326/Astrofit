import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Target,
  DollarSign
} from 'lucide-react';
import { TestComparison } from './types';

interface VariantComparisonProps {
  comparison: TestComparison;
  isSelected: boolean;
  onSelect: () => void;
}

export const VariantComparison: React.FC<VariantComparisonProps> = ({
  comparison,
  isSelected,
  onSelect
}) => {
  const { variant, control, improvement, improvementRange, significance, sampleSizeReached } = comparison;

  const getImprovementIcon = () => {
    if (improvement > 0) return <TrendingUp className="w-5 h-5" />;
    if (improvement < 0) return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  const getImprovementColor = () => {
    if (!significance.isSignificant) return 'text-gray-500 bg-gray-50';
    if (improvement > 0) return 'text-green-600 bg-green-50';
    if (improvement < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getStatusIcon = () => {
    if (significance.isSignificant && improvement > 0) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (significance.isSignificant && improvement < 0) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    if (!sampleSizeReached) {
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const getStatusText = () => {
    if (significance.isSignificant && improvement > 0) return 'Winner';
    if (significance.isSignificant && improvement < 0) return 'Loser';
    if (!sampleSizeReached) return 'Need More Data';
    return 'No Clear Difference';
  };

  const getStatusColor = () => {
    if (significance.isSignificant && improvement > 0) return 'text-green-600';
    if (significance.isSignificant && improvement < 0) return 'text-red-600';
    if (!sampleSizeReached) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const sampleSizeProgress = Math.min(
    100,
    (variant.metrics.visitors / comparison.minSampleSize) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        onClick={onSelect}
        className="w-full p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          {/* Variant Info */}
          <div className="flex items-center gap-4">
            {getStatusIcon()}

            <div className="text-left">
              <div className="font-semibold text-gray-900">
                {variant.name}
                <span className="text-gray-400 text-sm ml-2">vs {control.name}</span>
              </div>
              <div className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </div>
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-500">Conversion Rate</div>
              <div className="text-lg font-bold text-gray-900">
                {variant.metrics.conversionRate.toFixed(2)}%
              </div>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${getImprovementColor()}`}>
              {getImprovementIcon()}
              <span className="font-bold text-lg">
                {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
              </span>
            </div>

            {isSelected ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 bg-gray-50"
          >
            <div className="p-6 space-y-6">
              {/* Statistical Significance */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Statistical Analysis
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Confidence Level</div>
                    <div className="text-lg font-bold text-gray-900">
                      {significance.confidenceLevel}%
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">P-Value</div>
                    <div className="text-lg font-bold text-gray-900">
                      {significance.pValue.toFixed(4)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Significance</div>
                    <div className={`text-lg font-bold ${
                      significance.isSignificant ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {significance.isSignificant ? 'Significant' : 'Not Significant'}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Improvement Range</div>
                    <div className="text-lg font-bold text-gray-900">
                      {improvementRange[0].toFixed(1)}% to {improvementRange[1].toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics Comparison */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Detailed Metrics
                </h4>

                <div className="space-y-3">
                  {/* Visitors */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Visitors</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Control: </span>
                        <span className="font-semibold text-gray-900">
                          {control.metrics.visitors.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Variant: </span>
                        <span className="font-semibold text-gray-900">
                          {variant.metrics.visitors.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Conversions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">Conversions</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Control: </span>
                        <span className="font-semibold text-gray-900">
                          {control.metrics.conversions.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Variant: </span>
                        <span className="font-semibold text-gray-900">
                          {variant.metrics.conversions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Revenue (if available) */}
                  {variant.metrics.revenue && control.metrics.revenue && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">Revenue</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-gray-500">Control: </span>
                          <span className="font-semibold text-gray-900">
                            ${control.metrics.revenue.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Variant: </span>
                          <span className="font-semibold text-gray-900">
                            ${variant.metrics.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Size Progress */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Sample Size Progress</h4>
                  <span className="text-sm text-gray-600">
                    {variant.metrics.visitors.toLocaleString()} / {comparison.minSampleSize.toLocaleString()}
                  </span>
                </div>

                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sampleSizeProgress}%` }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      sampleSizeReached
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    }`}
                  />
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  {sampleSizeReached ? (
                    <span className="text-green-600 font-medium">
                      ✓ Minimum sample size reached
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-medium">
                      {(100 - sampleSizeProgress).toFixed(0)}% more data needed
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
