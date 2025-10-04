import React from 'react';
import { TrendingUp, TrendingDown, Users, MousePointer, ShoppingCart, DollarSign } from 'lucide-react';
import { TestVariant } from '../types/testResults';

interface TestResultsCardProps {
  variant: TestVariant;
  control: TestVariant;
  isWinner?: boolean;
}

export function TestResultsCard({ variant, control, isWinner }: TestResultsCardProps) {
  const calculateImprovement = (variantValue: number, controlValue: number) => {
    return ((variantValue - controlValue) / controlValue) * 100;
  };

  const metrics = [
    {
      label: 'Impresiones',
      value: variant.impressions.toLocaleString(),
      icon: Users,
      improvement: calculateImprovement(variant.impressions, control.impressions)
    },
    {
      label: 'CTR',
      value: `${variant.ctr.toFixed(2)}%`,
      icon: MousePointer,
      improvement: calculateImprovement(variant.ctr, control.ctr)
    },
    {
      label: 'Tasa de Conversión',
      value: `${variant.conversionRate.toFixed(2)}%`,
      icon: ShoppingCart,
      improvement: calculateImprovement(variant.conversionRate, control.conversionRate)
    },
    {
      label: 'Revenue/Visitor',
      value: `$${variant.revenuePerVisitor.toFixed(2)}`,
      icon: DollarSign,
      improvement: calculateImprovement(variant.revenuePerVisitor, control.revenuePerVisitor)
    }
  ];

  return (
    <div className={`
      bg-white rounded-xl shadow-sm border-2 transition-all
      ${isWinner ? 'border-green-400 ring-4 ring-green-100' : 'border-gray-200'}
    `}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-gray-900">{variant.name}</h3>
              {isWinner && (
                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full">
                  GANADOR
                </span>
              )}
            </div>
            {variant.description && (
              <p className="text-sm text-gray-600 mt-1">{variant.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.improvement > 0;
          const isNeutral = Math.abs(metric.improvement) < 0.1;

          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </span>

                {!isNeutral && (
                  <div className={`
                    flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold mb-1
                    ${isPositive
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                    }
                  `}>
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}{metric.improvement.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Comparison bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    isPositive
                      ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                      : isNeutral
                      ? 'bg-gray-300'
                      : 'bg-gradient-to-r from-red-400 to-rose-400'
                  }`}
                  style={{
                    width: `${Math.min(Math.abs(metric.improvement) + 50, 100)}%`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Summary */}
      <div className="px-6 py-4 bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Revenue Total</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${variant.revenue.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">AOV</p>
            <p className="text-xl font-bold text-gray-900">
              ${variant.avgOrderValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
