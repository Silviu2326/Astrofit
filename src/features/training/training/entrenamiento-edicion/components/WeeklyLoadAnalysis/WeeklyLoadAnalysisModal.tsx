import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, TrendingDown, AlertTriangle, Activity, BarChart3, Zap } from 'lucide-react';
import { TrainingDay, ExerciseConfig } from '../../types/training.types';

interface WeeklyLoadAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainingDays: TrainingDay[];
  clientName: string;
}

interface WeeklyMetrics {
  weekNumber: number;
  totalVolume: number; // sets x reps x weight
  totalSets: number;
  avgRPE: number;
  tss: number; // Training Stress Score
  muscleGroupVolume: Record<string, number>;
}

interface FatigueAnalysis {
  status: 'fresh' | 'moderate' | 'high' | 'overreaching';
  score: number;
  recommendation: string;
  color: string;
}

const WeeklyLoadAnalysisModal: React.FC<WeeklyLoadAnalysisModalProps> = ({
  isOpen,
  onClose,
  trainingDays,
  clientName
}) => {
  // Calcular métricas semanales
  const weeklyMetrics = useMemo(() => {
    const metrics: WeeklyMetrics[] = [];

    // Simular 8 semanas de datos (en producción vendrían de la BD)
    for (let week = 1; week <= 8; week++) {
      let totalVolume = 0;
      let totalSets = 0;
      let totalRPE = 0;
      let rpeCount = 0;
      const muscleGroupVolume: Record<string, number> = {};

      trainingDays.forEach(day => {
        day.exercises.forEach((ex: ExerciseConfig) => {
          const weight = ex.weight || 50; // Peso estimado
          const reps = parseInt(ex.reps.split('-')[0]) || 10;
          const volume = ex.sets * reps * weight;

          totalVolume += volume * (week >= 5 ? 0.8 : 1); // Deload en semana 5+
          totalSets += ex.sets;

          if (ex.rpe) {
            totalRPE += ex.rpe;
            rpeCount++;
          }

          // Volumen por grupo muscular (simplificado)
          const muscle = ex.exerciseId.includes('e1') ? 'Piernas' :
                        ex.exerciseId.includes('e2') ? 'Pecho' :
                        ex.exerciseId.includes('e3') ? 'Espalda' : 'Otros';
          muscleGroupVolume[muscle] = (muscleGroupVolume[muscle] || 0) + volume;
        });
      });

      const avgRPE = rpeCount > 0 ? totalRPE / rpeCount : 7;
      const tss = Math.round((totalSets * avgRPE * 5)); // TSS simplificado

      metrics.push({
        weekNumber: week,
        totalVolume: Math.round(totalVolume),
        totalSets,
        avgRPE: parseFloat(avgRPE.toFixed(1)),
        tss,
        muscleGroupVolume
      });
    }

    return metrics;
  }, [trainingDays]);

  // Análisis de fatiga
  const fatigueAnalysis = useMemo((): FatigueAnalysis => {
    const currentWeek = weeklyMetrics[weeklyMetrics.length - 1];
    const previousWeek = weeklyMetrics[weeklyMetrics.length - 2];

    if (!currentWeek || !previousWeek) {
      return {
        status: 'fresh',
        score: 0,
        recommendation: 'Datos insuficientes para análisis',
        color: 'gray'
      };
    }

    const volumeIncrease = ((currentWeek.totalVolume - previousWeek.totalVolume) / previousWeek.totalVolume) * 100;
    const avgTSS = weeklyMetrics.slice(-4).reduce((acc, w) => acc + w.tss, 0) / 4;

    let status: FatigueAnalysis['status'] = 'fresh';
    let recommendation = '';
    let color = '';

    if (avgTSS > 400 && volumeIncrease > 15) {
      status = 'overreaching';
      recommendation = '⚠️ ALERTA: Riesgo de sobreentrenamiento. Programa deload inmediato (50% volumen).';
      color = 'red';
    } else if (avgTSS > 350 || volumeIncrease > 10) {
      status = 'high';
      recommendation = '⚡ Fatiga alta. Considera reducir volumen 20-30% próxima semana.';
      color = 'orange';
    } else if (avgTSS > 250) {
      status = 'moderate';
      recommendation = '✅ Fatiga moderada y manejable. Continúa con la progresión.';
      color = 'yellow';
    } else {
      status = 'fresh';
      recommendation = '💪 Cliente fresco. Puedes incrementar intensidad/volumen.';
      color = 'green';
    }

    return {
      status,
      score: Math.round(avgTSS),
      recommendation,
      color
    };
  }, [weeklyMetrics]);

  if (!isOpen) return null;

  const maxVolume = Math.max(...weeklyMetrics.map(w => w.totalVolume));
  const currentWeek = weeklyMetrics[weeklyMetrics.length - 1];
  const previousWeek = weeklyMetrics[weeklyMetrics.length - 2];
  const volumeChange = previousWeek ? ((currentWeek.totalVolume - previousWeek.totalVolume) / previousWeek.totalVolume) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center justify-between border-b border-purple-400/30">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Análisis de Carga Semanal</h2>
              <p className="text-purple-100 text-sm">{clientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Estado de Fatiga */}
          <div className={`bg-gradient-to-r from-${fatigueAnalysis.color}-500/20 to-${fatigueAnalysis.color}-600/10 border border-${fatigueAnalysis.color}-500/30 rounded-xl p-6`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 bg-${fatigueAnalysis.color}-500/20 rounded-lg`}>
                {fatigueAnalysis.status === 'overreaching' ? (
                  <AlertTriangle className={`w-8 h-8 text-${fatigueAnalysis.color}-400`} />
                ) : (
                  <Zap className={`w-8 h-8 text-${fatigueAnalysis.color}-400`} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">Estado: {fatigueAnalysis.status.toUpperCase()}</h3>
                  <span className={`px-3 py-1 bg-${fatigueAnalysis.color}-500/30 text-${fatigueAnalysis.color}-300 rounded-full text-sm font-semibold`}>
                    TSS: {fatigueAnalysis.score}
                  </span>
                </div>
                <p className="text-gray-300 text-lg">{fatigueAnalysis.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Métricas Clave */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 text-sm font-semibold">Volumen Total</span>
              </div>
              <div className="text-2xl font-bold text-white">{currentWeek?.totalVolume.toLocaleString()}</div>
              <div className={`text-sm flex items-center gap-1 mt-1 ${volumeChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {volumeChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {volumeChange.toFixed(1)}% vs semana anterior
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 text-sm font-semibold">Series Totales</span>
              </div>
              <div className="text-2xl font-bold text-white">{currentWeek?.totalSets}</div>
              <div className="text-sm text-gray-400 mt-1">
                Promedio: {(weeklyMetrics.reduce((acc, w) => acc + w.totalSets, 0) / weeklyMetrics.length).toFixed(0)} series/semana
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-300 text-sm font-semibold">RPE Promedio</span>
              </div>
              <div className="text-2xl font-bold text-white">{currentWeek?.avgRPE}</div>
              <div className="text-sm text-gray-400 mt-1">
                {currentWeek && currentWeek.avgRPE > 8.5 ? '⚠️ Intensidad muy alta' : '✅ Intensidad óptima'}
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-green-300 text-sm font-semibold">TSS Semanal</span>
              </div>
              <div className="text-2xl font-bold text-white">{currentWeek?.tss}</div>
              <div className="text-sm text-gray-400 mt-1">
                Training Stress Score
              </div>
            </div>
          </div>

          {/* Gráfico de Volumen por Semana */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Evolución de Volumen (8 semanas)
            </h3>
            <div className="space-y-3">
              {weeklyMetrics.map((week) => (
                <div key={week.weekNumber} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Semana {week.weekNumber}</span>
                    <span className="text-white font-semibold">{week.totalVolume.toLocaleString()} kg</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(week.totalVolume / maxVolume) * 100}%` }}
                      transition={{ duration: 0.5, delay: week.weekNumber * 0.05 }}
                      className={`h-full rounded-full ${
                        week.weekNumber === weeklyMetrics.length ? 'bg-gradient-to-r from-purple-500 to-blue-500' :
                        week.weekNumber >= 5 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TSS por Semana */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Training Stress Score (TSS)
            </h3>
            <div className="grid grid-cols-8 gap-2">
              {weeklyMetrics.map((week) => (
                <div key={week.weekNumber} className="flex flex-col items-center gap-2">
                  <div className="relative w-full h-32 bg-gray-700 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(week.tss / 500) * 100}%` }}
                      transition={{ duration: 0.5, delay: week.weekNumber * 0.05 }}
                      className={`absolute bottom-0 w-full ${
                        week.tss > 400 ? 'bg-red-500' :
                        week.tss > 300 ? 'bg-orange-500' :
                        week.tss > 200 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{week.tss}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">S{week.weekNumber}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-gray-400">&lt;200 (Bajo)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded" />
                <span className="text-gray-400">200-300 (Moderado)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded" />
                <span className="text-gray-400">300-400 (Alto)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span className="text-gray-400">&gt;400 (Riesgo)</span>
              </div>
            </div>
          </div>

          {/* Predicción de Sobreentrenamiento */}
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Predictor de Sobreentrenamiento
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">Ratio Fatiga/Forma</span>
                  <span className="text-white font-semibold">
                    {(fatigueAnalysis.score / 300).toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      fatigueAnalysis.score / 300 > 1.3 ? 'bg-red-500' :
                      fatigueAnalysis.score / 300 > 1.1 ? 'bg-orange-500' :
                      fatigueAnalysis.score / 300 > 0.9 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((fatigueAnalysis.score / 300) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Próxima semana</div>
                  <div className="text-sm font-semibold text-white">
                    {fatigueAnalysis.status === 'overreaching' ? 'Deload obligatorio' :
                     fatigueAnalysis.status === 'high' ? 'Reducir 20-30%' : 'Continuar'}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Deload recomendado</div>
                  <div className="text-sm font-semibold text-white">
                    {Math.ceil(weeklyMetrics.length / 4) * 4} semanas
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Días de descanso</div>
                  <div className="text-sm font-semibold text-white">
                    {fatigueAnalysis.status === 'overreaching' ? '3-5 días' : '1-2 días'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Volumen por Grupo Muscular */}
          {currentWeek && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Volumen por Grupo Muscular (Semana Actual)</h3>
              <div className="space-y-3">
                {Object.entries(currentWeek.muscleGroupVolume).map(([muscle, volume]) => (
                  <div key={muscle}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">{muscle}</span>
                      <span className="text-white font-semibold">{volume.toLocaleString()} kg</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${(volume / currentWeek.totalVolume) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WeeklyLoadAnalysisModal;
