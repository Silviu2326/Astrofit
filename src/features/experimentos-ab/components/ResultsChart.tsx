import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { ABExperiment } from '../types';

interface ResultsChartProps {
  experiment: ABExperiment;
}

export function ResultsChart({ experiment }: ResultsChartProps) {
  // Simulated timeline data
  const timelineData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric'
    }),
    variants: experiment.variants.map(v => ({
      variantId: v.id,
      conversions: Math.floor(Math.random() * 20) + 5,
      revenue: Math.floor(Math.random() * 500) + 100,
    })),
  }));

  const maxConversions = Math.max(
    ...timelineData.flatMap(d => d.variants.map(v => v.conversions))
  );

  const insights = [
    {
      type: 'success' as const,
      message: 'La variante B muestra un incremento del 34% en conversiones comparado con el control',
      timestamp: '2 horas atrás',
    },
    {
      type: 'info' as const,
      message: 'El experimento ha alcanzado significancia estadística (95% confianza)',
      timestamp: '5 horas atrás',
    },
    {
      type: 'warning' as const,
      message: 'La tasa de rebote en dispositivos móviles es 15% mayor que en desktop',
      timestamp: '1 día atrás',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-medium mb-2 opacity-90">Total Usuarios</h3>
          <p className="text-3xl font-bold mb-1">
            {experiment.variants.reduce((sum, v) => sum + v.metrics.impressions, 0).toLocaleString()}
          </p>
          <p className="text-sm opacity-75">En todo el experimento</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-medium mb-2 opacity-90">Total Conversiones</h3>
          <p className="text-3xl font-bold mb-1">
            {experiment.variants.reduce((sum, v) => sum + v.metrics.conversions, 0).toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            <span>+12% vs. semana anterior</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-medium mb-2 opacity-90">Total Ingresos</h3>
          <p className="text-3xl font-bold mb-1">
            ${experiment.variants.reduce((sum, v) => sum + v.metrics.revenue, 0).toLocaleString()}
          </p>
          <p className="text-sm opacity-75">Generados por el test</p>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Evolución de Conversiones</h3>

        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-6 mb-4">
            {experiment.variants.map((variant, index) => (
              <div key={variant.id} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: variant.type === 'control'
                      ? '#3B82F6'
                      : index === 1
                      ? '#EF4444'
                      : '#F97316'
                  }}
                />
                <span className="text-sm font-medium text-gray-700">{variant.name}</span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
              <span>{maxConversions}</span>
              <span>{Math.floor(maxConversions * 0.75)}</span>
              <span>{Math.floor(maxConversions * 0.5)}</span>
              <span>{Math.floor(maxConversions * 0.25)}</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-12 h-full flex items-end justify-between gap-1">
              {timelineData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col justify-end gap-1">
                  {data.variants.map((v, vIndex) => {
                    const variant = experiment.variants.find(var2 => var2.id === v.variantId);
                    const height = (v.conversions / maxConversions) * 100;
                    const color = variant?.type === 'control'
                      ? '#3B82F6'
                      : vIndex === 1
                      ? '#EF4444'
                      : '#F97316';

                    return (
                      <div
                        key={v.variantId}
                        className="rounded-t transition-all hover:opacity-75 cursor-pointer"
                        style={{
                          height: `${height}%`,
                          backgroundColor: color,
                          minHeight: '4px',
                        }}
                        title={`${variant?.name}: ${v.conversions} conversiones`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="ml-12 flex justify-between text-xs text-gray-500">
            {timelineData.filter((_, i) => i % 5 === 0).map((data) => (
              <span key={data.day}>{data.date}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Variant Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Comparación Detallada</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Variante
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Impresiones
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Conversiones
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tasa Conv.
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  CTR
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Ingresos
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Confianza
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {experiment.variants.map((variant) => (
                <tr
                  key={variant.id}
                  className={variant.stats.isWinner ? 'bg-green-50' : ''}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: variant.type === 'control' ? '#3B82F6' : '#EF4444'
                        }}
                      />
                      <span className="font-medium text-gray-900">{variant.name}</span>
                      {variant.stats.isWinner && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                          🏆
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.metrics.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.metrics.conversions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {variant.stats.conversionRate.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.stats.ctr.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${variant.metrics.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${
                            variant.stats.confidenceLevel >= 95
                              ? 'bg-green-500'
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${variant.stats.confidenceLevel}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        {variant.stats.confidenceLevel.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Insights y Recomendaciones</h3>

        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.type === 'success'
              ? CheckCircle
              : insight.type === 'warning'
              ? AlertCircle
              : Info;

            const colorClasses = insight.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : insight.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : 'bg-blue-50 border-blue-200 text-blue-800';

            return (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg border ${colorClasses}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{insight.message}</p>
                  <p className="text-xs opacity-75 mt-1">{insight.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
