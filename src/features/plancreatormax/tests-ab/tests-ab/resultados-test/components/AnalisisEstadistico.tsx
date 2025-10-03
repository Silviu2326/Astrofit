import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Info, TrendingUp, AlertCircle } from 'lucide-react';
import { mockExperiments } from '../data/mockData';

const AnalisisEstadistico: React.FC = () => {
  const experiment = mockExperiments[0]; // Usar el primer experimento como ejemplo

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'from-green-500 via-green-600 to-emerald-600';
    if (confidence >= 80) return 'from-yellow-500 via-orange-500 to-red-500';
    return 'from-gray-400 to-gray-500';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 95) return { emoji: '🏆', label: 'Altamente Significativo', color: 'green' };
    if (confidence >= 80) return { emoji: '⚠️', label: 'Preliminar', color: 'yellow' };
    return { emoji: '📊', label: 'Recolectando Datos', color: 'gray' };
  };

  const status = getConfidenceLabel(experiment.confidence);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-emerald-600" />
        Análisis Estadístico
      </h3>

      {/* Progress bar de confianza */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Nivel de Confianza</span>
          <span className="text-2xl font-bold text-emerald-600">{experiment.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${experiment.confidence}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full relative bg-gradient-to-r ${getConfidenceColor(experiment.confidence)}`}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0%</span>
          <span>Target: 95%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Badge de estado */}
      <div className="flex items-center justify-center mb-6">
        <div className={`px-6 py-4 rounded-2xl text-center ${
          status.color === 'green'
            ? 'bg-green-100 border-2 border-green-500'
            : status.color === 'yellow'
              ? 'bg-yellow-100 border-2 border-yellow-500'
              : 'bg-gray-100 border-2 border-gray-400'
        }`}>
          <div className="text-4xl mb-2">{status.emoji}</div>
          <p className="font-bold text-lg">{status.label}</p>
        </div>
      </div>

      {/* Métricas estadísticas */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs font-semibold text-blue-600 mb-1">P-Value</p>
          <p className="text-2xl font-bold text-blue-900">{experiment.pValue}</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
          <p className="text-xs font-semibold text-purple-600 mb-1">Muestra Actual</p>
          <p className="text-2xl font-bold text-purple-900">{(experiment.totalTraffic / 1000).toFixed(1)}K</p>
        </div>
      </div>

      {/* Información adicional */}
      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
        <p className="text-sm text-blue-900 flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Muestra requerida para 95%:</strong> {experiment.requiredSampleSize.toLocaleString()} visitantes.
            {experiment.totalTraffic < experiment.requiredSampleSize && (
              <span className="block mt-1">
                Faltan {(experiment.requiredSampleSize - experiment.totalTraffic).toLocaleString()} visitantes más.
              </span>
            )}
          </span>
        </p>
      </div>

      {/* Intervalos de confianza de variantes */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Intervalos de Confianza (95%)</p>
        <div className="space-y-2">
          {experiment.variants.map((variant) => (
            <div key={variant.id} className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-600 w-24">{variant.name}</span>
              <div className="flex-1 h-8 bg-gray-100 rounded-lg relative overflow-hidden">
                <div
                  className={`absolute h-full ${variant.isControl ? 'bg-blue-400' : 'bg-green-400'} opacity-30 rounded-lg`}
                  style={{
                    left: `${(variant.confidenceInterval[0] / 15) * 100}%`,
                    width: `${((variant.confidenceInterval[1] - variant.confidenceInterval[0]) / 15) * 100}%`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-700">
                    [{variant.confidenceInterval[0]}%, {variant.confidenceInterval[1]}%]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisEstadistico;
