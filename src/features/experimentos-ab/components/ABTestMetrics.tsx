import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, MousePointerClick, DollarSign, Activity, Award } from 'lucide-react';
import { ABTestMetrics as Metrics, ABTestVariant } from '../types';

interface ABTestMetricsProps {
  variants: ABTestVariant[];
  testId: string;
  isRunning?: boolean;
}

export const ABTestMetrics: React.FC<ABTestMetricsProps> = ({ variants, testId, isRunning = false }) => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [realtimeUpdate, setRealtimeUpdate] = useState(0);

  // Simular métricas en tiempo real
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const newMetrics: Metrics[] = variants.map((variant) => {
        const impressions = Math.floor(Math.random() * 10000) + 5000;
        const clicks = Math.floor(impressions * (Math.random() * 0.1 + 0.02));
        const conversions = Math.floor(clicks * (Math.random() * 0.3 + 0.1));
        const revenue = conversions * (Math.random() * 100 + 50);

        return {
          variantId: variant.id,
          impressions,
          clicks,
          conversions,
          revenue,
          engagementRate: (clicks / impressions) * 100,
          conversionRate: (conversions / clicks) * 100,
          confidenceLevel: Math.random() * 40 + 60,
          uplift: variant.isControl ? 0 : (Math.random() * 30 - 15),
        };
      });

      setMetrics(newMetrics);
      setRealtimeUpdate(Date.now());
    }, 2000);

    return () => clearInterval(interval);
  }, [variants, isRunning]);

  // Datos iniciales
  useEffect(() => {
    if (metrics.length === 0) {
      const initialMetrics: Metrics[] = variants.map((variant) => {
        const impressions = Math.floor(Math.random() * 10000) + 5000;
        const clicks = Math.floor(impressions * (Math.random() * 0.1 + 0.02));
        const conversions = Math.floor(clicks * (Math.random() * 0.3 + 0.1));
        const revenue = conversions * (Math.random() * 100 + 50);

        return {
          variantId: variant.id,
          impressions,
          clicks,
          conversions,
          revenue,
          engagementRate: (clicks / impressions) * 100,
          conversionRate: (conversions / clicks) * 100,
          confidenceLevel: Math.random() * 40 + 60,
          uplift: variant.isControl ? 0 : (Math.random() * 30 - 15),
        };
      });
      setMetrics(initialMetrics);
    }
  }, [variants]);

  const getVariantMetrics = (variantId: string) => {
    return metrics.find(m => m.variantId === variantId);
  };

  const getBestPerformer = () => {
    if (metrics.length === 0) return null;
    return metrics.reduce((best, current) =>
      current.conversionRate > best.conversionRate ? current : best
    );
  };

  const bestPerformer = getBestPerformer();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Métricas en Tiempo Real
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Rendimiento actualizado cada 2 segundos
          </p>
        </div>
        {isRunning && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-semibold">En vivo</span>
          </div>
        )}
      </div>

      {/* Métricas globales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: 'Total Impresiones',
            value: metrics.reduce((sum, m) => sum + m.impressions, 0).toLocaleString(),
            color: 'red',
          },
          {
            icon: MousePointerClick,
            label: 'Total Clicks',
            value: metrics.reduce((sum, m) => sum + m.clicks, 0).toLocaleString(),
            color: 'orange',
          },
          {
            icon: TrendingUp,
            label: 'Total Conversiones',
            value: metrics.reduce((sum, m) => sum + m.conversions, 0).toLocaleString(),
            color: 'yellow',
          },
          {
            icon: DollarSign,
            label: 'Ingresos',
            value: `$${metrics.reduce((sum, m) => sum + m.revenue, 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
            color: 'green',
          },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
              </div>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Métricas por variante */}
      <div className="space-y-4">
        {variants.map((variant, index) => {
          const variantMetrics = getVariantMetrics(variant.id);
          if (!variantMetrics) return null;

          const isWinning = bestPerformer?.variantId === variant.id;

          return (
            <div
              key={variant.id}
              className={`bg-gray-800/50 border rounded-xl p-6 transition-all ${
                isWinning
                  ? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
                  : 'border-gray-700 hover:border-orange-500/50'
              }`}
            >
              {/* Variant Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{variant.name}</h4>
                      {variant.isControl && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                          Control
                        </span>
                      )}
                      {isWinning && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Líder
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Tráfico asignado: {variant.traffic}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Nivel de confianza</div>
                  <div className="text-xl font-bold text-white">
                    {variantMetrics.confidenceLevel.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 transition-all"
                  style={{ width: `${variantMetrics.confidenceLevel}%` }}
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Impresiones</div>
                  <div className="text-lg font-bold text-white">
                    {variantMetrics.impressions.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Clicks</div>
                  <div className="text-lg font-bold text-white">
                    {variantMetrics.clicks.toLocaleString()}
                  </div>
                  <div className="text-xs text-orange-400">
                    CTR: {variantMetrics.engagementRate.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Conversiones</div>
                  <div className="text-lg font-bold text-white">
                    {variantMetrics.conversions.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-400">
                    {variantMetrics.conversionRate.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Ingresos</div>
                  <div className="text-lg font-bold text-white">
                    ${variantMetrics.revenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              {/* Uplift vs Control */}
              {!variant.isControl && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Mejora vs Control:</span>
                    <span
                      className={`text-lg font-bold ${
                        variantMetrics.uplift > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {variantMetrics.uplift > 0 ? '+' : ''}
                      {variantMetrics.uplift.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Update Indicator */}
      {isRunning && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Última actualización: {new Date(realtimeUpdate).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};
