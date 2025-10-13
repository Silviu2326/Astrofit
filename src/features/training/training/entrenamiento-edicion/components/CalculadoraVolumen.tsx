import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, AlertTriangle, TrendingUp, CheckCircle, Activity, Target, AlertCircle } from 'lucide-react';

interface ExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  weight?: number;
}

interface TrainingDay {
  day: string;
  name: string;
  exercises: ExerciseConfig[];
}

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  muscleGroups?: string[];
}

interface CalculadoraVolumenProps {
  trainingDays: TrainingDay[];
  exerciseDatabase: Exercise[];
  isVisible?: boolean;
}

interface VolumeData {
  muscle: string;
  sets: number;
  optimal: [number, number];
  status: 'low' | 'optimal' | 'high';
  percentage: number;
  exercises: { name: string; sets: number }[];
}

// Volumen óptimo por grupo muscular (series por semana)
const OPTIMAL_VOLUME: { [key: string]: [number, number] } = {
  'Pecho': [10, 20],
  'Espalda Dorsal': [12, 22],
  'Espalda Baja': [6, 12],
  'Hombros': [12, 20],
  'Cuádriceps': [10, 20],
  'Isquios': [8, 16],
  'Glúteos': [8, 16],
  'Bíceps': [8, 16],
  'Tríceps': [10, 18],
  'Core': [6, 15],
  'Gemelos': [8, 16],
  'Antebrazos': [4, 10],
};

const CalculadoraVolumen: React.FC<CalculadoraVolumenProps> = ({
  trainingDays,
  exerciseDatabase,
  isVisible = true
}) => {
  const volumeData = useMemo(() => {
    const volumeMap: { [muscle: string]: { total: number; exercises: { name: string; sets: number }[] } } = {};

    trainingDays.forEach(day => {
      day.exercises.forEach(exercise => {
        const exerciseData = exerciseDatabase.find(e => e.id === exercise.exerciseId);
        if (!exerciseData?.muscleGroups) return;

        exerciseData.muscleGroups.forEach(muscle => {
          if (!volumeMap[muscle]) {
            volumeMap[muscle] = { total: 0, exercises: [] };
          }
          volumeMap[muscle].total += exercise.sets;

          const existingEx = volumeMap[muscle].exercises.find(e => e.name === exerciseData.name);
          if (existingEx) {
            existingEx.sets += exercise.sets;
          } else {
            volumeMap[muscle].exercises.push({
              name: exerciseData.name,
              sets: exercise.sets
            });
          }
        });
      });
    });

    const result: VolumeData[] = Object.entries(volumeMap).map(([muscle, data]) => {
      const optimal = OPTIMAL_VOLUME[muscle] || [10, 20];
      const [min, max] = optimal;
      const sets = data.total;

      let status: 'low' | 'optimal' | 'high' = 'optimal';
      if (sets < min) status = 'low';
      if (sets > max) status = 'high';

      const percentage = Math.min((sets / max) * 100, 150);

      return {
        muscle,
        sets,
        optimal,
        status,
        percentage,
        exercises: data.exercises
      };
    });

    return result.sort((a, b) => b.sets - a.sets);
  }, [trainingDays, exerciseDatabase]);

  const stats = useMemo(() => {
    const low = volumeData.filter(v => v.status === 'low').length;
    const optimal = volumeData.filter(v => v.status === 'optimal').length;
    const high = volumeData.filter(v => v.status === 'high').length;

    return { low, optimal, high, total: volumeData.length };
  }, [volumeData]);

  const getStatusColor = (status: 'low' | 'optimal' | 'high') => {
    switch (status) {
      case 'low': return 'bg-yellow-500';
      case 'optimal': return 'bg-green-500';
      case 'high': return 'bg-red-500';
    }
  };

  const getStatusBorderColor = (status: 'low' | 'optimal' | 'high') => {
    switch (status) {
      case 'low': return 'border-yellow-300';
      case 'optimal': return 'border-green-300';
      case 'high': return 'border-red-300';
    }
  };

  const getStatusBgColor = (status: 'low' | 'optimal' | 'high') => {
    switch (status) {
      case 'low': return 'bg-yellow-50';
      case 'optimal': return 'bg-green-50';
      case 'high': return 'bg-red-50';
    }
  };

  const getStatusIcon = (status: 'low' | 'optimal' | 'high') => {
    switch (status) {
      case 'low': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'optimal': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Análisis de Volumen Semanal</h3>
            <p className="text-sm text-blue-100">Series totales por grupo muscular</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle className="w-3 h-3" />
              <span className="text-xs">Bajo</span>
            </div>
            <p className="text-xl font-bold">{stats.low}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs">Óptimo</span>
            </div>
            <p className="text-xl font-bold">{stats.optimal}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3" />
              <span className="text-xs">Alto</span>
            </div>
            <p className="text-xl font-bold">{stats.high}</p>
          </div>
        </div>
      </div>

      {/* Volume Bars */}
      <div className="p-4 max-h-[500px] overflow-y-auto">
        {volumeData.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No hay ejercicios añadidos aún</p>
          </div>
        ) : (
          <div className="space-y-3">
            {volumeData.map((item, idx) => (
              <motion.div
                key={item.muscle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`border-2 rounded-xl p-3 ${getStatusBorderColor(item.status)} ${getStatusBgColor(item.status)}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(item.status)}
                      <h4 className="font-bold text-gray-900">{item.muscle}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-gray-900">{item.sets} series</span>
                      <span className="text-gray-500">
                        (Óptimo: {item.optimal[0]}-{item.optimal[1]})
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    item.status === 'low' ? 'bg-yellow-200 text-yellow-800' :
                    item.status === 'optimal' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {item.status === 'low' ? '⚠️ Bajo' :
                     item.status === 'optimal' ? '✓ Óptimo' :
                     '⚡ Alto'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden mb-2">
                  {/* Optimal Range Background */}
                  <div
                    className="absolute h-full bg-green-200/50"
                    style={{
                      left: `${(item.optimal[0] / item.optimal[1]) * 100}%`,
                      width: `${((item.optimal[1] - item.optimal[0]) / item.optimal[1]) * 100}%`
                    }}
                  />

                  {/* Actual Volume Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full flex items-center justify-end pr-2 ${getStatusColor(item.status)}`}
                  >
                    <span className="text-white text-xs font-bold">{item.sets}</span>
                  </motion.div>

                  {/* Min/Max Markers */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-green-600"
                    style={{ left: `${(item.optimal[0] / item.optimal[1]) * 100}%` }}
                  />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-green-600"
                    style={{ left: '100%' }}
                  />
                </div>

                {/* Recommendations */}
                {item.status !== 'optimal' && (
                  <div className={`rounded-lg p-2 text-xs ${
                    item.status === 'low' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <p className="font-medium">
                      {item.status === 'low' ? (
                        <>
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          Añadir {item.optimal[0] - item.sets} series más para alcanzar el mínimo óptimo
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          Reducir {item.sets - item.optimal[1]} series para evitar sobreentrenamiento
                        </>
                      )}
                    </p>
                  </div>
                )}

                {/* Exercise Breakdown (collapsible) */}
                <details className="mt-2">
                  <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900 font-medium">
                    Ver desglose por ejercicio ({item.exercises.length})
                  </summary>
                  <div className="mt-2 space-y-1">
                    {item.exercises.map(ex => (
                      <div key={ex.name} className="flex items-center justify-between text-xs bg-white/50 rounded px-2 py-1">
                        <span className="text-gray-700">{ex.name}</span>
                        <span className="font-bold text-gray-900">{ex.sets} series</span>
                      </div>
                    ))}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Tips */}
      {stats.low > 0 || stats.high > 0 ? (
        <div className="border-t border-gray-200 bg-blue-50 p-4">
          <div className="flex items-start gap-2">
            <BarChart className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900">
              <p className="font-bold mb-1">💡 Recomendaciones:</p>
              <ul className="space-y-1 list-disc list-inside">
                {stats.low > 0 && (
                  <li>Hay {stats.low} grupo{stats.low > 1 ? 's' : ''} con volumen bajo. Considera añadir ejercicios accesorios.</li>
                )}
                {stats.high > 0 && (
                  <li>Hay {stats.high} grupo{stats.high > 1 ? 's' : ''} con volumen alto. Reduce series o programa una descarga.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-900 font-medium">
              ¡Excelente! El volumen está bien balanceado para todos los grupos musculares.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraVolumen;
