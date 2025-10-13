import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { TrainingDay } from '../../types/training.types';
import { calculateVolumeStats, VolumeWarning } from '../../utils/volumeCalculations';

interface VolumeMeterPanelProps {
  trainingDays: TrainingDay[];
  compact?: boolean;
}

const VolumeMeterPanel: React.FC<VolumeMeterPanelProps> = ({ trainingDays, compact = false }) => {
  const stats = useMemo(() => calculateVolumeStats(trainingDays), [trainingDays]);

  const getStatusColor = (
    status: 'below-mev' | 'mev-to-mav' | 'mav-to-mrv' | 'above-mrv'
  ) => {
    switch (status) {
      case 'below-mev':
        return { bg: 'bg-yellow-500', text: 'text-yellow-600', label: 'Bajo MEV' };
      case 'mev-to-mav':
        return { bg: 'bg-green-500', text: 'text-green-600', label: 'Óptimo' };
      case 'mav-to-mrv':
        return { bg: 'bg-orange-500', text: 'text-orange-600', label: 'Alto' };
      case 'above-mrv':
        return { bg: 'bg-red-500', text: 'text-red-600', label: 'Excesivo' };
    }
  };

  const getMuscleStatusColor = (status: 'low' | 'optimal' | 'high' | 'excessive') => {
    switch (status) {
      case 'low':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'optimal':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'high':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'excessive':
        return 'bg-red-100 border-red-300 text-red-800';
    }
  };

  const getWarningIcon = (severity: VolumeWarning['severity']) => {
    switch (severity) {
      case 'low':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getWarningColor = (severity: VolumeWarning['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const statusColor = getStatusColor(stats.volumeLandmarks.status);

  if (compact) {
    return (
      <div className="p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border-2 border-orange-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <span className="font-bold text-gray-900">Volumen Semanal</span>
          </div>
          <span className={`text-sm font-bold ${statusColor.text}`}>{statusColor.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(stats.volumeLandmarks.percentage, 100)}%` }}
              className={`h-full ${statusColor.bg}`}
            />
          </div>
          <span className="text-sm font-bold text-gray-700">
            {stats.volumeLandmarks.current}/{stats.volumeLandmarks.mav}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border-b-2 border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <Activity className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-black text-gray-900">Medidor de Volumen en Tiempo Real</h3>
            <p className="text-sm text-gray-600">Análisis basado en landmarks científicos (MEV/MAV/MRV)</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Resumen Global */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-black text-blue-600">{stats.totalSets}</div>
            <div className="text-xs text-gray-600">Series Totales</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-black text-green-600">{stats.totalReps}</div>
            <div className="text-xs text-gray-600">Repeticiones</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-black text-purple-600">
              {Math.round(stats.totalVolume)}kg
            </div>
            <div className="text-xs text-gray-600">Volumen (kg)</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-black text-orange-600">
              {Object.keys(stats.byMuscleGroup).length}
            </div>
            <div className="text-xs text-gray-600">Grupos Musc.</div>
          </div>
        </div>

        {/* Barra de Progreso Global */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">Volumen Global</span>
            <span className={`text-sm font-bold ${statusColor.text}`}>
              {statusColor.label} ({Math.round(stats.volumeLandmarks.percentage)}%)
            </span>
          </div>
          <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
            {/* Marcadores MEV/MAV/MRV */}
            <div
              className="absolute h-full w-0.5 bg-yellow-600"
              style={{ left: `${(stats.volumeLandmarks.mev / stats.volumeLandmarks.mrv) * 100}%` }}
              title="MEV"
            />
            <div
              className="absolute h-full w-0.5 bg-green-600"
              style={{ left: `${(stats.volumeLandmarks.mav / stats.volumeLandmarks.mrv) * 100}%` }}
              title="MAV"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min((stats.volumeLandmarks.current / stats.volumeLandmarks.mrv) * 100, 100)}%`,
              }}
              className={`h-full ${statusColor.bg}`}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>MEV: {stats.volumeLandmarks.mev}</span>
            <span>MAV: {stats.volumeLandmarks.mav}</span>
            <span>MRV: {stats.volumeLandmarks.mrv}</span>
          </div>
        </div>

        {/* Volumen por Grupo Muscular */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            Volumen por Grupo Muscular
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats.byMuscleGroup)
              .sort(([, a], [, b]) => b.sets - a.sets)
              .map(([muscle, data]) => (
                <div
                  key={muscle}
                  className={`p-2 rounded-lg border ${getMuscleStatusColor(data.status)}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{muscle}</span>
                    <span className="text-xs">
                      {data.status === 'low' && '⚠️'}
                      {data.status === 'optimal' && '✅'}
                      {data.status === 'high' && '⚡'}
                      {data.status === 'excessive' && '🔥'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>{data.sets} series</span>
                    <span>{data.exercises} ejercicios</span>
                  </div>
                  {data.volume > 0 && (
                    <div className="text-xs mt-1 opacity-75">{Math.round(data.volume)}kg total</div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Advertencias */}
        {stats.warnings.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Advertencias y Recomendaciones
            </h4>
            <div className="space-y-2">
              {stats.warnings.map((warning, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${getWarningColor(warning.severity)}`}>
                  <div className="flex gap-2">
                    {getWarningIcon(warning.severity)}
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{warning.message}</p>
                      <p className="text-xs mt-1 opacity-90">{warning.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leyenda */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">📊 Landmarks de Volumen:</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="font-bold text-yellow-600">MEV</span>
              <p className="text-gray-600">Mínimo Efectivo</p>
            </div>
            <div>
              <span className="font-bold text-green-600">MAV</span>
              <p className="text-gray-600">Óptimo</p>
            </div>
            <div>
              <span className="font-bold text-red-600">MRV</span>
              <p className="text-gray-600">Máximo Recuperable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeMeterPanel;
