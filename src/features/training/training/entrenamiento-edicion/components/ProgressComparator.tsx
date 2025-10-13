import React from 'react';
import { TrendingUp, TrendingDown, Minus, Trophy, AlertCircle } from 'lucide-react';

interface ExerciseProgress {
  exerciseName: string;
  exerciseImage: string;
  week1: {
    sets: number;
    reps: string;
    weight: number;
    volume: number;
  };
  week8: {
    sets: number;
    reps: string;
    weight: number;
    volume: number;
  };
  improvement: number; // Percentage
  isPR: boolean;
}

interface ProgressComparatorProps {
  comparisons: ExerciseProgress[];
  week1Label?: string;
  week2Label?: string;
}

const ProgressComparator: React.FC<ProgressComparatorProps> = ({
  comparisons,
  week1Label = "Semana 1",
  week2Label = "Semana Actual"
}) => {
  const getProgressColor = (improvement: number) => {
    if (improvement > 10) return 'text-green-600';
    if (improvement > 0) return 'text-blue-600';
    if (improvement === 0) return 'text-gray-600';
    return 'text-red-600';
  };

  const getProgressIcon = (improvement: number) => {
    if (improvement > 0) return <TrendingUp className="w-4 h-4" />;
    if (improvement === 0) return <Minus className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const getProgressBg = (improvement: number) => {
    if (improvement > 10) return 'bg-green-50 border-green-300';
    if (improvement > 0) return 'bg-blue-50 border-blue-300';
    if (improvement === 0) return 'bg-gray-50 border-gray-300';
    return 'bg-red-50 border-red-300';
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300">
          <div className="text-2xl font-black text-green-600">
            {comparisons.filter(c => c.improvement > 0).length}
          </div>
          <div className="text-sm text-gray-600">Ejercicios Mejorados</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300">
          <div className="text-2xl font-black text-yellow-600">
            {comparisons.filter(c => c.improvement === 0).length}
          </div>
          <div className="text-sm text-gray-600">Sin Cambios</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-300">
          <div className="text-2xl font-black text-purple-600">
            {comparisons.filter(c => c.isPR).length}
          </div>
          <div className="text-sm text-gray-600">Récords Personales</div>
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="space-y-3">
        {comparisons.map((comp, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 border-2 transition-all ${getProgressBg(comp.improvement)}`}
          >
            <div className="flex items-start justify-between">
              {/* Exercise Info */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{comp.exerciseImage}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{comp.exerciseName}</h4>
                    {comp.isPR && (
                      <span className="flex items-center gap-1 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        <Trophy className="w-3 h-3" />
                        PR!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Badge */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold ${getProgressColor(comp.improvement)}`}>
                {getProgressIcon(comp.improvement)}
                <span className="text-lg">
                  {comp.improvement > 0 ? '+' : ''}{comp.improvement.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Comparison Details */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {/* Week 1 */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1 font-semibold">{week1Label}</div>
                <div className="text-sm font-bold text-gray-900">
                  {comp.week1.sets}x{comp.week1.reps} @ {comp.week1.weight}kg
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Volumen: {comp.week1.volume.toLocaleString()}kg
                </div>
              </div>

              {/* Week 8 */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1 font-semibold">{week2Label}</div>
                <div className="text-sm font-bold text-gray-900">
                  {comp.week8.sets}x{comp.week8.reps} @ {comp.week8.weight}kg
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Volumen: {comp.week8.volume.toLocaleString()}kg
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    comp.improvement > 10
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : comp.improvement > 0
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : 'bg-gray-400'
                  }`}
                  style={{ width: `${Math.min(Math.abs(comp.improvement) * 2, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comparisons.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No hay datos suficientes para comparar</p>
          <p className="text-sm mt-2">Completa al menos 2 semanas para ver el progreso</p>
        </div>
      )}
    </div>
  );
};

export default ProgressComparator;
