import React from 'react';
import { CheckCircle2, XCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatisticalSignificance as SignificanceType } from '../types/testResults';

interface StatisticalSignificanceProps {
  significance: SignificanceType;
  improvement: number;
}

export function StatisticalSignificance({ significance, improvement }: StatisticalSignificanceProps) {
  const { isSignificant, pValue, confidenceLevel, sampleSize, daysToSignificance } = significance;

  const getConfidenceColor = () => {
    const confidence = (1 - pValue) * 100;
    if (confidence >= 95) return 'green';
    if (confidence >= 90) return 'emerald';
    if (confidence >= 80) return 'teal';
    return 'gray';
  };

  const confidenceColor = getConfidenceColor();
  const confidencePercent = ((1 - pValue) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`
        px-6 py-4 bg-gradient-to-r
        ${isSignificant
          ? 'from-green-500 to-emerald-500'
          : 'from-gray-400 to-gray-500'
        }
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isSignificant ? (
              <CheckCircle2 className="w-6 h-6 text-white" />
            ) : (
              <Clock className="w-6 h-6 text-white" />
            )}
            <div>
              <h3 className="text-lg font-bold text-white">
                {isSignificant ? 'Resultados Estadísticamente Significativos' : 'Recolectando Datos'}
              </h3>
              <p className="text-sm text-white/90">
                {isSignificant
                  ? 'Los resultados son confiables para tomar decisiones'
                  : 'Aún no hay suficientes datos para conclusiones definitivas'
                }
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {confidencePercent}%
            </div>
            <div className="text-sm text-white/90">
              Confianza
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-6 p-6">
        {/* P-Value */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
            <span className="text-sm font-medium">P-Value</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {pValue.toFixed(4)}
          </div>
          <p className="text-xs text-gray-600">
            {pValue < 0.05 ? 'Altamente significativo' : 'No significativo'}
          </p>
        </div>

        {/* Sample Size */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
            <span className="text-sm font-medium">Tamaño de Muestra</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {sampleSize.toLocaleString()}
          </div>
          <p className="text-xs text-gray-600">
            Visitantes totales
          </p>
        </div>

        {/* Improvement */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Mejora Observada</span>
          </div>
          <div className={`text-3xl font-bold ${
            improvement > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-600">
            vs. control
          </p>
        </div>

        {/* Confidence Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
            <span className="text-sm font-medium">Nivel de Confianza</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {(confidenceLevel * 100).toFixed(0)}%
          </div>
          <p className="text-xs text-gray-600">
            Configurado
          </p>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="px-6 pb-6">
        <div className="relative">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>0%</span>
            <span>50%</span>
            <span>80%</span>
            <span>95%</span>
            <span>99%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-${confidenceColor}-400 to-${confidenceColor}-500 transition-all rounded-full relative`}
              style={{ width: `${confidencePercent}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50" />
            </div>
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
            <span>No confiable</span>
            <span>Moderado</span>
            <span>Confiable</span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {!isSignificant && daysToSignificance && (
        <div className="mx-6 mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">
                Tiempo estimado para significancia
              </h4>
              <p className="text-sm text-amber-800">
                Se requieren aproximadamente <span className="font-bold">{daysToSignificance} días más</span> de recolección
                de datos para alcanzar un nivel de confianza del 95%.
              </p>
            </div>
          </div>
        </div>
      )}

      {isSignificant && (
        <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-1">
                Resultados validados
              </h4>
              <p className="text-sm text-green-800">
                Los resultados han alcanzado significancia estadística. Puedes tomar decisiones
                basadas en estos datos con un {confidencePercent}% de confianza.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interpretation Guide */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Guía de Interpretación</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
              <p className="text-gray-700">
                <span className="font-medium">P-Value {'<'} 0.05:</span> Resultados estadísticamente significativos
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
              <p className="text-gray-700">
                <span className="font-medium">Confianza {'>'} 95%:</span> Alta confiabilidad en los resultados
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 flex-shrink-0" />
              <p className="text-gray-700">
                <span className="font-medium">Muestra grande:</span> Mayor precisión en las estimaciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
