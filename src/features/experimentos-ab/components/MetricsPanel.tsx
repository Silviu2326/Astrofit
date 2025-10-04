import React from 'react';
import {
  TrendingUp, TrendingDown, Minus, Target, DollarSign,
  MousePointerClick, Eye, Clock, Users, Zap
} from 'lucide-react';
import { ABExperiment, ABVariant } from '../types';

interface MetricsPanelProps {
  experiment: ABExperiment;
  realtime?: boolean;
}

export function MetricsPanel({ experiment, realtime = false }: MetricsPanelProps) {
  const calculateVariantComparison = () => {
    const control = experiment.variants.find(v => v.type === 'control');
    if (!control) return [];

    return experiment.variants
      .filter(v => v.type === 'variant')
      .map(variant => {
        const conversionChange = variant.stats.conversionRate - control.stats.conversionRate;
        const ctrChange = variant.stats.ctr - control.stats.ctr;
        const revenueChange = variant.stats.averageRevenue - control.stats.averageRevenue;

        return {
          variant,
          comparison: {
            conversion: {
              value: conversionChange,
              percentage: (conversionChange / control.stats.conversionRate) * 100,
            },
            ctr: {
              value: ctrChange,
              percentage: (ctrChange / control.stats.ctr) * 100,
            },
            revenue: {
              value: revenueChange,
              percentage: (revenueChange / control.stats.averageRevenue) * 100,
            },
          },
        };
      });
  };

  const comparisons = calculateVariantComparison();

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    change,
    unit = '',
    colorClass = 'text-orange-600'
  }: {
    icon: any;
    label: string;
    value: number;
    change?: number;
    unit?: string;
    colorClass?: string;
  }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-br from-red-50 to-orange-50`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : change < 0 ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
      {realtime && (
        <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
          <Zap className="w-3 h-3" />
          <span>Actualizado ahora</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-600" />
          Métricas Generales
          {realtime && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              En vivo
            </span>
          )}
        </h3>

        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            icon={Eye}
            label="Impresiones Totales"
            value={experiment.variants.reduce((sum, v) => sum + v.metrics.impressions, 0)}
          />
          <MetricCard
            icon={MousePointerClick}
            label="Clics Totales"
            value={experiment.variants.reduce((sum, v) => sum + v.metrics.clicks, 0)}
          />
          <MetricCard
            icon={Target}
            label="Conversiones"
            value={experiment.variants.reduce((sum, v) => sum + v.metrics.conversions, 0)}
          />
          <MetricCard
            icon={DollarSign}
            label="Ingresos"
            value={experiment.variants.reduce((sum, v) => sum + v.metrics.revenue, 0)}
            unit="$"
          />
        </div>
      </div>

      {/* Variant Comparison */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Comparación de Variantes
        </h3>

        <div className="space-y-4">
          {experiment.variants.map((variant) => {
            const comparison = comparisons.find(c => c.variant.id === variant.id);
            const isControl = variant.type === 'control';

            return (
              <div
                key={variant.id}
                className={`bg-white rounded-xl border-2 p-6 ${
                  variant.stats.isWinner
                    ? 'border-green-500 bg-green-50'
                    : isControl
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                {/* Variant Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      variant.stats.isWinner
                        ? 'bg-green-500'
                        : isControl
                        ? 'bg-blue-500'
                        : 'bg-orange-500'
                    }`} />
                    <div>
                      <h4 className="font-bold text-gray-900">{variant.name}</h4>
                      <p className="text-sm text-gray-600">
                        {variant.trafficPercentage}% del tráfico
                      </p>
                    </div>
                  </div>

                  {variant.stats.isWinner && (
                    <div className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                      🏆 Ganador
                    </div>
                  )}
                  {isControl && (
                    <div className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold">
                      Control
                    </div>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Impresiones</p>
                    <p className="text-xl font-bold text-gray-900">
                      {variant.metrics.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tasa de Conversión</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-bold text-gray-900">
                        {variant.stats.conversionRate.toFixed(2)}%
                      </p>
                      {comparison && (
                        <span className={`text-sm font-semibold ${
                          comparison.comparison.conversion.percentage > 0
                            ? 'text-green-600'
                            : comparison.comparison.conversion.percentage < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}>
                          {comparison.comparison.conversion.percentage > 0 ? '+' : ''}
                          {comparison.comparison.conversion.percentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">CTR</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-bold text-gray-900">
                        {variant.stats.ctr.toFixed(2)}%
                      </p>
                      {comparison && (
                        <span className={`text-sm font-semibold ${
                          comparison.comparison.ctr.percentage > 0
                            ? 'text-green-600'
                            : comparison.comparison.ctr.percentage < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}>
                          {comparison.comparison.ctr.percentage > 0 ? '+' : ''}
                          {comparison.comparison.ctr.percentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Ingreso Promedio</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-bold text-gray-900">
                        ${variant.stats.averageRevenue.toFixed(2)}
                      </p>
                      {comparison && (
                        <span className={`text-sm font-semibold ${
                          comparison.comparison.revenue.percentage > 0
                            ? 'text-green-600'
                            : comparison.comparison.revenue.percentage < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}>
                          {comparison.comparison.revenue.percentage > 0 ? '+' : ''}
                          {comparison.comparison.revenue.percentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Confidence Level */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Nivel de Confianza
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {variant.stats.confidenceLevel.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${
                        variant.stats.confidenceLevel >= 95
                          ? 'bg-green-500'
                          : variant.stats.confidenceLevel >= 90
                          ? 'bg-yellow-500'
                          : 'bg-orange-500'
                      }`}
                      style={{ width: `${variant.stats.confidenceLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Metrics */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Métricas Principales
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {experiment.metrics.filter(m => m.isPrimary).map((metric) => (
            <div
              key={metric.id}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">
                  Principal
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{metric.description}</p>

              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl font-bold text-gray-900">
                  {metric.current.toFixed(1)}
                </span>
                <span className="text-gray-500">{metric.unit}</span>
                <span className="text-sm text-gray-500">
                  / Meta: {metric.goal}{metric.unit}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-full rounded-full ${
                    metric.current >= metric.goal
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}
                  style={{ width: `${Math.min((metric.current / metric.goal) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
