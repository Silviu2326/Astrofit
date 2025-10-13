import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, TrendingUp, Calendar, Plus, ArrowRight, Check } from 'lucide-react';
import { TrainingDay } from '../../types/training.types';
import { duplicateWeekWithProgression } from '../../utils/weekDuplication';

interface WeekCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeekNumber: number;
  currentWeek: TrainingDay[];
  totalWeeks: number;
  progressionRate: number;
  onCopyWeek: (targetWeek: number, newDays: TrainingDay[], applyProgression: boolean) => void;
}

type ProgressionType = 'none' | 'linear' | 'custom';

export const WeekCopyModal: React.FC<WeekCopyModalProps> = ({
  isOpen,
  onClose,
  currentWeekNumber,
  currentWeek,
  totalWeeks,
  progressionRate,
  onCopyWeek,
}) => {
  const [targetWeek, setTargetWeek] = useState(currentWeekNumber + 1);
  const [progressionType, setProgressionType] = useState<ProgressionType>('linear');
  const [customProgression, setCustomProgression] = useState({
    weight: 2.5,
    reps: 0,
    sets: 0,
  });

  if (!isOpen) return null;

  const handleCopy = () => {
    const weekDiff = targetWeek - currentWeekNumber;
    let newWeek: TrainingDay[];

    if (progressionType === 'none') {
      newWeek = JSON.parse(JSON.stringify(currentWeek));
    } else if (progressionType === 'linear') {
      newWeek = duplicateWeekWithProgression(currentWeek, progressionRate, weekDiff);
    } else {
      // Custom progression
      newWeek = JSON.parse(JSON.stringify(currentWeek));
      newWeek.forEach((day) => {
        day.exercises.forEach((exercise) => {
          if (customProgression.weight > 0 && exercise.weight) {
            exercise.weight += customProgression.weight * weekDiff;
            exercise.weight = Math.round(exercise.weight * 4) / 4;
          }
          if (customProgression.sets > 0) {
            exercise.sets += customProgression.sets;
          }
          // Reps increment (if reps is a range like "8-10", increment both)
          if (customProgression.reps > 0) {
            const repsMatch = exercise.reps.match(/(\d+)-(\d+)/);
            if (repsMatch) {
              const min = parseInt(repsMatch[1]) + customProgression.reps;
              const max = parseInt(repsMatch[2]) + customProgression.reps;
              exercise.reps = `${min}-${max}`;
            } else if (!isNaN(parseInt(exercise.reps))) {
              exercise.reps = (parseInt(exercise.reps) + customProgression.reps).toString();
            }
          }
        });
      });
    }

    onCopyWeek(targetWeek, newWeek, progressionType !== 'none');
    onClose();
  };

  const previewProgression = () => {
    const weekDiff = targetWeek - currentWeekNumber;
    if (progressionType === 'none') return 'Sin cambios';
    if (progressionType === 'linear') {
      const weightIncrease = progressionRate * weekDiff;
      return `+${weightIncrease}kg por ejercicio`;
    }
    const parts = [];
    if (customProgression.weight > 0) parts.push(`+${customProgression.weight * weekDiff}kg`);
    if (customProgression.sets > 0) parts.push(`+${customProgression.sets} series`);
    if (customProgression.reps > 0) parts.push(`+${customProgression.reps} reps`);
    return parts.join(', ') || 'Sin cambios';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Copy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Copiar Semana</h2>
                <p className="text-green-100 text-sm">Duplica y aplica progresión automática</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Source Week Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-2 text-blue-900 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="font-bold">Semana origen: Semana {currentWeekNumber}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-blue-700">Días de entrenamiento:</span>
                <span className="ml-2 font-medium">{currentWeek.length}</span>
              </div>
              <div>
                <span className="text-blue-700">Ejercicios totales:</span>
                <span className="ml-2 font-medium">
                  {currentWeek.reduce((sum, day) => sum + day.exercises.length, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Target Week Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Semana destino
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: Math.min(totalWeeks, 12) }, (_, i) => i + 1).map((week) => (
                <button
                  key={week}
                  onClick={() => setTargetWeek(week)}
                  disabled={week === currentWeekNumber}
                  className={`p-3 rounded-lg border-2 transition-all font-medium ${
                    targetWeek === week
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : week === currentWeekNumber
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  Sem {week}
                </button>
              ))}
            </div>
          </div>

          {/* Progression Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Tipo de progresión
            </label>
            <div className="space-y-3">
              {/* No Progression */}
              <button
                onClick={() => setProgressionType('none')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  progressionType === 'none'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">Sin progresión</div>
                    <div className="text-sm text-gray-600">Copiar exactamente igual</div>
                  </div>
                  {progressionType === 'none' && <Check className="w-5 h-5 text-green-600" />}
                </div>
              </button>

              {/* Linear Progression */}
              <button
                onClick={() => setProgressionType('linear')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  progressionType === 'linear'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">Progresión lineal</div>
                    <div className="text-sm text-gray-600">
                      +{progressionRate}kg por semana (configuración actual)
                    </div>
                  </div>
                  {progressionType === 'linear' && <Check className="w-5 h-5 text-green-600" />}
                </div>
              </button>

              {/* Custom Progression */}
              <button
                onClick={() => setProgressionType('custom')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  progressionType === 'custom'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-bold text-gray-900">Progresión personalizada</div>
                    <div className="text-sm text-gray-600">Define incrementos específicos</div>
                  </div>
                  {progressionType === 'custom' && <Check className="w-5 h-5 text-green-600" />}
                </div>

                {progressionType === 'custom' && (
                  <div className="grid grid-cols-3 gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <label className="text-xs text-gray-600">Peso (kg)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={customProgression.weight}
                        onChange={(e) =>
                          setCustomProgression({ ...customProgression, weight: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Series</label>
                      <input
                        type="number"
                        value={customProgression.sets}
                        onChange={(e) =>
                          setCustomProgression({ ...customProgression, sets: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Reps</label>
                      <input
                        type="number"
                        value={customProgression.reps}
                        onChange={(e) =>
                          setCustomProgression({ ...customProgression, reps: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-900">Vista previa</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-700">Semana {currentWeekNumber}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="font-bold text-green-700">Semana {targetWeek}</span>
              <span className="ml-auto text-green-700 font-medium">{previewProgression()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-2xl border-t flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={handleCopy}
            className="px-8 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Copy className="w-5 h-5" />
            Copiar Semana
          </button>
        </div>
      </motion.div>
    </div>
  );
};
