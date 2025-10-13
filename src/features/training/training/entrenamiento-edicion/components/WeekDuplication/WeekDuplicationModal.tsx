import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, TrendingUp, Calendar, Zap, AlertCircle } from 'lucide-react';
import { TrainingDay } from '../../types/training.types';
import { generateWeeklyProgression } from '../../utils/weekDuplication';

interface WeekDuplicationModalProps {
  show: boolean;
  currentWeek: TrainingDay[];
  totalWeeks: number;
  progressionRate: number;
  deloadWeeks: number;
  onClose: () => void;
  onApply: (weeks: TrainingDay[][]) => void;
}

const WeekDuplicationModal: React.FC<WeekDuplicationModalProps> = ({
  show,
  currentWeek,
  totalWeeks,
  progressionRate,
  deloadWeeks,
  onClose,
  onApply,
}) => {
  const [targetWeeks, setTargetWeeks] = useState(totalWeeks);
  const [applyProgression, setApplyProgression] = useState(true);
  const [customProgressionRate, setCustomProgressionRate] = useState(progressionRate);

  const handleGenerate = () => {
    const weeks = generateWeeklyProgression(
      currentWeek,
      targetWeeks,
      applyProgression ? customProgressionRate : 0,
      deloadWeeks
    );
    onApply(weeks);
    onClose();
  };

  // Preview de lo que se va a generar
  const previewWeeks = generateWeeklyProgression(
    currentWeek,
    Math.min(targetWeeks, 4), // Solo preview de 4 semanas
    applyProgression ? customProgressionRate : 0,
    deloadWeeks
  );

  const calculateTotalVolume = (week: TrainingDay[]) => {
    return week.reduce((total, day) => {
      return total + day.exercises.reduce((dayTotal, ex) => dayTotal + ex.sets, 0);
    }, 0);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl">
                <Copy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Duplicar Semana con Progresión</h3>
                <p className="text-gray-600">Genera un plan completo a partir de esta semana base</p>
              </div>
            </div>

            {/* Configuración */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <label className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-2">
                  <Calendar className="w-4 h-4" />
                  Número de Semanas a Generar
                </label>
                <input
                  type="number"
                  min="2"
                  max="52"
                  value={targetWeeks}
                  onChange={(e) => setTargetWeeks(parseInt(e.target.value) || 2)}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-2xl font-bold text-center focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-blue-700 mt-2">
                  Genera {targetWeeks} semanas basadas en la semana actual
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <label className="flex items-center gap-2 text-sm font-bold text-green-900 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Progresión Automática
                </label>
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={applyProgression}
                    onChange={(e) => setApplyProgression(e.target.checked)}
                    className="w-6 h-6 text-green-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Aplicar progresión de peso</span>
                </div>
                {applyProgression && (
                  <div>
                    <label className="text-xs text-green-700 mb-1 block">Incremento por semana (kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={customProgressionRate}
                      onChange={(e) => setCustomProgressionRate(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border-2 border-green-300 rounded-lg text-lg font-bold text-center focus:border-green-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Vista Previa (Primeras 4 Semanas)
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {previewWeeks.map((week, weekIndex) => {
                  const isDeload = (weekIndex + 1) % deloadWeeks === 0;
                  const totalSets = calculateTotalVolume(week);

                  // Calcular peso promedio
                  const exampleExercise = week[0]?.exercises[0];
                  const baseWeight = currentWeek[0]?.exercises[0]?.weight || 0;

                  return (
                    <div
                      key={weekIndex}
                      className={`p-3 rounded-lg border-2 ${
                        isDeload
                          ? 'bg-yellow-50 border-yellow-300'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <div className="text-center mb-2">
                        <div className="text-lg font-black text-gray-900">S{weekIndex + 1}</div>
                        {isDeload && (
                          <div className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-bold mt-1">
                            DESCARGA
                          </div>
                        )}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Series:</span>
                          <span className="font-bold text-gray-900">{totalSets}</span>
                        </div>
                        {exampleExercise?.weight && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ej. peso:</span>
                            <span className="font-bold text-gray-900">
                              {exampleExercise.weight.toFixed(1)}kg
                            </span>
                          </div>
                        )}
                        {applyProgression && exampleExercise?.weight && (
                          <div className="flex justify-between text-green-600">
                            <span>Δ:</span>
                            <span className="font-bold">
                              +{(exampleExercise.weight - baseWeight).toFixed(1)}kg
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Información */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">💡 Cómo funciona:</p>
                  <ul className="space-y-1">
                    <li>✅ Se duplica la estructura de ejercicios de la semana actual</li>
                    {applyProgression && (
                      <li>✅ Cada semana incrementa el peso en +{customProgressionRate}kg automáticamente</li>
                    )}
                    <li>✅ Cada {deloadWeeks} semanas se genera una semana de descarga (70% del peso)</li>
                    <li>✅ Los ejercicios sin peso (ej: dominadas) se mantienen igual</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Resumen */}
            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-black text-orange-600">{targetWeeks}</div>
                <div className="text-xs text-gray-600">Semanas</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-black text-green-600">
                  {Math.floor(targetWeeks / deloadWeeks)}
                </div>
                <div className="text-xs text-gray-600">Descargas</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-black text-blue-600">
                  {targetWeeks * currentWeek.length}
                </div>
                <div className="text-xs text-gray-600">Sesiones</div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
              >
                Generar {targetWeeks} Semanas
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeekDuplicationModal;
