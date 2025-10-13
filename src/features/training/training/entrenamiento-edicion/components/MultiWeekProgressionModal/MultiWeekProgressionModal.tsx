import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Calendar, ChevronLeft, ChevronRight, Edit2, Save, Copy } from 'lucide-react';
import { TrainingDay, ExerciseConfig } from '../../types/training.types';
import { duplicateWeekWithProgression } from '../../utils/weekDuplication';

interface MultiWeekProgressionModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseWeek: TrainingDay[];
  totalWeeks: number;
  progressionRate: number;
  deloadWeeks: number;
  exercises: Record<string, { name: string; muscleGroup: string }>;
  onApplyProgression: (allWeeks: TrainingDay[][]) => void;
}

export const MultiWeekProgressionModal: React.FC<MultiWeekProgressionModalProps> = ({
  isOpen,
  onClose,
  baseWeek,
  totalWeeks,
  progressionRate,
  deloadWeeks,
  exercises,
  onApplyProgression,
}) => {
  const [editableWeeks, setEditableWeeks] = useState<TrainingDay[][]>([]);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [editMode, setEditMode] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      generateProgression();
    }
  }, [isOpen, baseWeek, progressionRate, deloadWeeks]);

  const generateProgression = () => {
    const weeks: TrainingDay[][] = [];

    for (let weekNum = 0; weekNum < totalWeeks; weekNum++) {
      const isDeloadWeek = (weekNum + 1) % deloadWeeks === 0;

      if (isDeloadWeek) {
        // Deload week
        const deloadWeek = duplicateWeekWithProgression(baseWeek, progressionRate, weekNum);
        deloadWeek.forEach((day) => {
          day.name = `${day.name} (Descarga)`;
          day.exercises.forEach((exercise) => {
            if (exercise.weight) {
              exercise.weight = Math.round(exercise.weight * 0.7 * 4) / 4;
            }
            if (exercise.rpe) {
              exercise.rpe = Math.max(5, exercise.rpe - 2);
            }
          });
        });
        weeks.push(deloadWeek);
      } else {
        // Normal progression week
        weeks.push(duplicateWeekWithProgression(baseWeek, progressionRate, weekNum));
      }
    }

    setEditableWeeks(weeks);
  };

  if (!isOpen) return null;

  const currentWeek = editableWeeks[selectedWeek] || [];
  const isDeloadWeek = (selectedWeek + 1) % deloadWeeks === 0;

  const handleWeightChange = (dayIdx: number, exerciseIdx: number, newWeight: number) => {
    const updated = [...editableWeeks];
    updated[selectedWeek][dayIdx].exercises[exerciseIdx].weight = newWeight;
    setEditableWeeks(updated);
  };

  const handleApply = () => {
    onApplyProgression(editableWeeks);
    onClose();
  };

  // Get exercise details for a specific exercise config
  const getExerciseDetails = (exerciseId: string) => {
    return exercises[exerciseId] || { name: exerciseId, muscleGroup: '-' };
  };

  // Calculate total volume for a week
  const calculateWeekVolume = (week: TrainingDay[]): number => {
    return week.reduce((total, day) => {
      return total + day.exercises.reduce((dayTotal, ex) => {
        const reps = parseInt(ex.reps) || 10; // Assume 10 if range
        const weight = ex.weight || 0;
        return dayTotal + (ex.sets * reps * weight);
      }, 0);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Progresión Multi-Semana</h2>
                <p className="text-teal-100 text-sm">Visualiza y edita la progresión de {totalWeeks} semanas</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Week Navigator */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
              disabled={selectedWeek === 0}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 grid grid-cols-8 gap-2">
              {editableWeeks.slice(0, 8).map((_, weekIdx) => {
                const isDeload = (weekIdx + 1) % deloadWeeks === 0;
                return (
                  <button
                    key={weekIdx}
                    onClick={() => setSelectedWeek(weekIdx)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                      selectedWeek === weekIdx
                        ? 'bg-white text-teal-600'
                        : isDeload
                        ? 'bg-orange-500/30 text-white hover:bg-orange-500/50'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    S{weekIdx + 1}
                    {isDeload && <div className="text-xs">⚠</div>}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedWeek(Math.min(totalWeeks - 1, selectedWeek + 1))}
              disabled={selectedWeek === totalWeeks - 1}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Week Info */}
          <div className={`p-4 rounded-xl border-2 mb-6 ${
            isDeloadWeek
              ? 'bg-orange-50 border-orange-300'
              : 'bg-teal-50 border-teal-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Semana {selectedWeek + 1}
                  {isDeloadWeek && <span className="ml-2 text-orange-600">(Descarga)</span>}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isDeloadWeek
                    ? 'Semana de descarga: 70% del peso, RPE reducido'
                    : `Progresión: +${(progressionRate * selectedWeek).toFixed(1)}kg desde semana base`
                  }
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Volumen Total</div>
                <div className="text-2xl font-bold text-teal-600">
                  {calculateWeekVolume(currentWeek).toLocaleString()}kg
                </div>
              </div>
            </div>
          </div>

          {/* Training Days Table */}
          <div className="space-y-6">
            {currentWeek.map((day, dayIdx) => (
              <div key={dayIdx} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                {/* Day Header */}
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{day.day} - {day.name}</h4>
                      <p className="text-teal-100 text-sm">{day.duration} min</p>
                    </div>
                    <div className="text-sm">
                      {day.exercises.length} ejercicios
                    </div>
                  </div>
                </div>

                {/* Exercises Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">#</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Ejercicio</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Grupo</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Series</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Reps</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Peso</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Desc</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">RPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.exercises.map((exercise, exIdx) => {
                        const details = getExerciseDetails(exercise.exerciseId);
                        return (
                          <tr key={exIdx} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-600">{exIdx + 1}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{details.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{details.muscleGroup}</td>
                            <td className="px-4 py-3 text-sm font-bold">{exercise.sets}</td>
                            <td className="px-4 py-3 text-sm font-bold">{exercise.reps}</td>
                            <td className="px-4 py-3">
                              {editMode ? (
                                <input
                                  type="number"
                                  step="0.5"
                                  value={exercise.weight || 0}
                                  onChange={(e) =>
                                    handleWeightChange(dayIdx, exIdx, parseFloat(e.target.value) || 0)
                                  }
                                  className="w-20 px-2 py-1 border rounded text-sm font-bold"
                                />
                              ) : (
                                <span className="font-bold text-teal-600">
                                  {exercise.weight ? `${exercise.weight}kg` : '-'}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{exercise.rest}s</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                exercise.rpe && exercise.rpe >= 9
                                  ? 'bg-red-100 text-red-700'
                                  : exercise.rpe && exercise.rpe >= 7
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {exercise.rpe || '-'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Chart (simplified) */}
          <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4">Progresión de Volumen por Semana</h4>
            <div className="flex items-end gap-2 h-32">
              {editableWeeks.slice(0, 8).map((week, idx) => {
                const volume = calculateWeekVolume(week);
                const maxVolume = Math.max(...editableWeeks.map(calculateWeekVolume));
                const height = (volume / maxVolume) * 100;
                const isDeload = (idx + 1) % deloadWeeks === 0;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '100%' }}>
                      <div
                        className={`absolute bottom-0 w-full rounded-t transition-all ${
                          isDeload ? 'bg-orange-400' : 'bg-teal-500'
                        } ${selectedWeek === idx ? 'ring-2 ring-teal-700' : ''}`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-600">S{idx + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                editMode
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Edit2 className="w-4 h-4" />
              {editMode ? 'Editando' : 'Modo Edición'}
            </button>

            <button
              onClick={generateProgression}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Regenerar
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-8 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Aplicar Progresión
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
