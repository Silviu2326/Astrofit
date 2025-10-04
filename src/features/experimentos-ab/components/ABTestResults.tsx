import React from 'react';
import { Trophy, TrendingUp, AlertCircle, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { ABTestResult, ABTestVariant } from '../types';

interface ABTestResultsProps {
  result: ABTestResult;
  variants: ABTestVariant[];
}

export const ABTestResults: React.FC<ABTestResultsProps> = ({ result, variants }) => {
  const getVariant = (id: string) => variants.find(v => v.id === id);
  const winnerVariant = result.winner ? getVariant(result.winner) : null;
  const winnerMetrics = result.metrics.find(m => m.variantId === result.winner);

  const getStatusColor = () => {
    if (result.statisticalSignificance && result.winner) return 'green';
    if (!result.statisticalSignificance) return 'yellow';
    return 'red';
  };

  const statusColor = getStatusColor();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl bg-${statusColor}-500/20`}>
              {result.statisticalSignificance && result.winner ? (
                <Trophy className={`w-8 h-8 text-${statusColor}-400`} />
              ) : (
                <BarChart3 className={`w-8 h-8 text-${statusColor}-400`} />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Resultados del Test A/B</h3>
              <p className="text-gray-400">
                Duración: {result.duration} días • Muestra: {result.totalSampleSize.toLocaleString()} usuarios
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-${statusColor}-500/20 border border-${statusColor}-500/50`}>
              {result.statisticalSignificance ? (
                <CheckCircle className={`w-5 h-5 text-${statusColor}-400`} />
              ) : (
                <AlertCircle className={`w-5 h-5 text-${statusColor}-400`} />
              )}
              <span className={`font-semibold text-${statusColor}-400`}>
                {result.statisticalSignificance ? 'Estadísticamente Significativo' : 'No Concluyente'}
              </span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Confianza: {result.confidence.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Winner Card */}
      {result.winner && winnerVariant && winnerMetrics && (
        <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-2 border-yellow-500/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-bold text-white">Variante Ganadora</h4>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                {winnerVariant.name}
              </div>
              <p className="text-gray-300 mb-4">{winnerVariant.description || 'Sin descripción'}</p>

              {/* Preview */}
              {winnerVariant.content.headline && (
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                  <div className="text-xs text-gray-400 mb-2">Vista previa:</div>
                  {winnerVariant.content.headline && (
                    <h5 className="text-white font-bold">{winnerVariant.content.headline}</h5>
                  )}
                  {winnerVariant.content.description && (
                    <p className="text-gray-300 text-sm">{winnerVariant.content.description}</p>
                  )}
                  {winnerVariant.content.buttonText && (
                    <button
                      style={{ backgroundColor: winnerVariant.content.buttonColor }}
                      className="px-4 py-2 rounded-lg text-white font-semibold text-sm"
                    >
                      {winnerVariant.content.buttonText}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Tasa de Conversión</div>
                  <div className="text-2xl font-bold text-green-400">
                    {winnerMetrics.conversionRate.toFixed(2)}%
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Mejora vs Control</div>
                  <div className="text-2xl font-bold text-yellow-400">
                    +{winnerMetrics.uplift.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-3">Métricas detalladas</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Impresiones:</span>
                    <span className="text-white font-semibold">
                      {winnerMetrics.impressions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Clicks:</span>
                    <span className="text-white font-semibold">
                      {winnerMetrics.clicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversiones:</span>
                    <span className="text-white font-semibold">
                      {winnerMetrics.conversions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                    <span className="text-gray-400">Ingresos generados:</span>
                    <span className="text-green-400 font-bold">
                      ${winnerMetrics.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparación de todas las variantes */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Comparación de Variantes
        </h4>

        <div className="space-y-4">
          {result.metrics
            .sort((a, b) => b.conversionRate - a.conversionRate)
            .map((metrics, index) => {
              const variant = getVariant(metrics.variantId);
              if (!variant) return null;

              const isWinner = metrics.variantId === result.winner;
              const maxConversion = Math.max(...result.metrics.map(m => m.conversionRate));

              return (
                <div
                  key={metrics.variantId}
                  className={`p-4 rounded-lg border ${
                    isWinner
                      ? 'bg-yellow-500/10 border-yellow-500/50'
                      : 'bg-gray-900/50 border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                        isWinner
                          ? 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500'
                          : 'bg-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{variant.name}</span>
                          {isWinner && <Trophy className="w-4 h-4 text-yellow-400" />}
                          {variant.isControl && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                              Control
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        {metrics.conversionRate.toFixed(2)}%
                      </div>
                      {!variant.isControl && (
                        <div className={`text-sm ${metrics.uplift > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {metrics.uplift > 0 ? '+' : ''}{metrics.uplift.toFixed(2)}%
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isWinner
                          ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500'
                          : 'bg-gray-600'
                      }`}
                      style={{ width: `${(metrics.conversionRate / maxConversion) * 100}%` }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs">Impresiones</div>
                      <div className="text-white font-semibold">
                        {metrics.impressions.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Clicks</div>
                      <div className="text-white font-semibold">
                        {metrics.clicks.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Conversiones</div>
                      <div className="text-white font-semibold">
                        {metrics.conversions.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Ingresos</div>
                      <div className="text-green-400 font-semibold">
                        ${metrics.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Recomendaciones
        </h4>
        <div className="space-y-2 text-sm text-gray-300">
          {result.statisticalSignificance && result.winner ? (
            <>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  El test ha alcanzado significancia estadística. Se recomienda implementar la variante ganadora.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  La mejora del {winnerMetrics?.uplift.toFixed(2)}% sobre el control puede resultar en un impacto significativo en conversiones.
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  El test aún no ha alcanzado significancia estadística. Se recomienda continuar el experimento.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Aumentar el tamaño de la muestra o la duración del test puede ayudar a obtener resultados concluyentes.
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
