import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Calendar,
  TrendingUp,
  BarChart3,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { TrainingDay, TrainingPlan } from '../../types/training.types';
import { calculateVolumeStats } from '../../utils/volumeCalculations';

interface PlanPreviewModalProps {
  show: boolean;
  plan: TrainingPlan;
  onClose: () => void;
}

type ViewMode = 'compact' | 'detailed' | 'printable';

const PlanPreviewModal: React.FC<PlanPreviewModalProps> = ({ show, plan, onClose }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('compact');
  const [currentWeek, setCurrentWeek] = useState(0);

  // Agrupar días por semana (asumiendo 7 días por semana)
  const weeklyView = useMemo(() => {
    const weeks: TrainingDay[][] = [];
    const daysPerWeek = plan.daysPerWeek.length;

    for (let i = 0; i < plan.trainingDays.length; i += daysPerWeek) {
      weeks.push(plan.trainingDays.slice(i, i + daysPerWeek));
    }

    return weeks;
  }, [plan.trainingDays, plan.daysPerWeek]);

  const totalWeeks = weeklyView.length;

  // Calcular estadísticas globales
  const globalStats = useMemo(() => calculateVolumeStats(plan.trainingDays), [plan.trainingDays]);

  // Calcular estadísticas de la semana actual
  const weekStats = useMemo(() => {
    if (weeklyView[currentWeek]) {
      return calculateVolumeStats(weeklyView[currentWeek]);
    }
    return null;
  }, [weeklyView, currentWeek]);

  const handleExport = () => {
    // TODO: Implementar exportación a PDF/imagen
    alert('Exportación a PDF en desarrollo');
  };

  const handlePrint = () => {
    window.print();
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
            className="bg-white rounded-2xl p-8 max-w-7xl w-full mx-4 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Vista Previa del Plan Completo</h3>
                  <p className="text-gray-600">
                    {plan.duration} semanas · {plan.daysPerWeek.length} días/semana · {plan.progressionMethod}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                  title="Imprimir"
                >
                  <Printer className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleExport}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                  title="Exportar PDF"
                >
                  <Download className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Selector de Vista */}
            <div className="flex gap-2 mb-6">
              {[
                { mode: 'compact' as ViewMode, label: 'Compacto', icon: <BarChart3 className="w-4 h-4" /> },
                { mode: 'detailed' as ViewMode, label: 'Detallado', icon: <Maximize2 className="w-4 h-4" /> },
                {
                  mode: 'printable' as ViewMode,
                  label: 'Imprimible',
                  icon: <Printer className="w-4 h-4" />,
                },
              ].map(({ mode, label, icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Estadísticas Globales */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3">📊 Resumen Global del Plan</h4>
              <div className="grid grid-cols-6 gap-3">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-black text-blue-600">{totalWeeks}</div>
                  <div className="text-xs text-gray-600">Semanas</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-black text-green-600">{plan.trainingDays.length}</div>
                  <div className="text-xs text-gray-600">Sesiones</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-black text-orange-600">{globalStats.totalSets}</div>
                  <div className="text-xs text-gray-600">Series Total</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-black text-purple-600">{globalStats.totalReps}</div>
                  <div className="text-xs text-gray-600">Repeticiones</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-black text-pink-600">
                    {Math.round(globalStats.totalVolume)}kg
                  </div>
                  <div className="text-xs text-gray-600">Volumen Total</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-black text-indigo-600">
                    {Object.keys(globalStats.byMuscleGroup).length}
                  </div>
                  <div className="text-xs text-gray-600">Grupos Musc.</div>
                </div>
              </div>
            </div>

            {/* Navegación de Semanas */}
            {totalWeeks > 1 && (
              <div className="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <button
                  onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                  disabled={currentWeek === 0}
                  className={`p-2 rounded-lg font-bold flex items-center gap-2 ${
                    currentWeek === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-900">Semana {currentWeek + 1}</div>
                  <div className="text-sm text-gray-600">
                    de {totalWeeks} semanas
                  </div>
                  {weekStats && (
                    <div className="text-xs text-gray-500 mt-1">
                      {weekStats.totalSets} series · {Math.round(weekStats.totalVolume)}kg
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setCurrentWeek(Math.min(totalWeeks - 1, currentWeek + 1))}
                  disabled={currentWeek === totalWeeks - 1}
                  className={`p-2 rounded-lg font-bold flex items-center gap-2 ${
                    currentWeek === totalWeeks - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Vista de Entrenamiento */}
            <div className="space-y-4">
              {weeklyView[currentWeek]?.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                  {/* Cabecera del Día */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border-b-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-black text-lg">{day.day}</span>
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900">{day.name}</h4>
                          <p className="text-sm text-gray-600">
                            {day.exercises.length} ejercicios ·{' '}
                            {day.exercises.reduce((sum, ex) => sum + ex.sets, 0)} series
                          </p>
                        </div>
                      </div>
                      {day.notes && (
                        <div className="text-sm text-gray-600 italic max-w-md">{day.notes}</div>
                      )}
                    </div>
                  </div>

                  {/* Ejercicios */}
                  {viewMode === 'compact' && (
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {day.exercises.map((exercise, exIndex) => (
                          <div
                            key={exIndex}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="font-bold text-gray-900 text-sm mb-1">{exercise.name}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="font-semibold">
                                {exercise.sets} × {exercise.reps}
                              </span>
                              {exercise.weight && <span>@ {exercise.weight}kg</span>}
                              {exercise.rpe && (
                                <span className="text-orange-600 font-semibold">RPE {exercise.rpe}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {viewMode === 'detailed' && (
                    <div className="p-4 space-y-3">
                      {day.exercises.map((exercise, exIndex) => (
                        <div
                          key={exIndex}
                          className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border-2 border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="font-black text-gray-900">{exercise.name}</h5>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {exercise.muscleGroups.map((muscle) => (
                                  <span
                                    key={muscle}
                                    className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-semibold"
                                  >
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            <div className="text-center p-2 bg-blue-50 rounded">
                              <div className="text-lg font-black text-blue-600">{exercise.sets}</div>
                              <div className="text-xs text-gray-600">Series</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                              <div className="text-lg font-black text-green-600">{exercise.reps}</div>
                              <div className="text-xs text-gray-600">Reps</div>
                            </div>
                            {exercise.weight && (
                              <div className="text-center p-2 bg-purple-50 rounded">
                                <div className="text-lg font-black text-purple-600">{exercise.weight}kg</div>
                                <div className="text-xs text-gray-600">Peso</div>
                              </div>
                            )}
                            {exercise.rpe && (
                              <div className="text-center p-2 bg-orange-50 rounded">
                                <div className="text-lg font-black text-orange-600">{exercise.rpe}</div>
                                <div className="text-xs text-gray-600">RPE</div>
                              </div>
                            )}
                            {exercise.rest && (
                              <div className="text-center p-2 bg-pink-50 rounded">
                                <div className="text-lg font-black text-pink-600">{exercise.rest}s</div>
                                <div className="text-xs text-gray-600">Descanso</div>
                              </div>
                            )}
                          </div>
                          {exercise.notes && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                              <p className="text-xs text-gray-700 italic">📝 {exercise.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {viewMode === 'printable' && (
                    <div className="p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="text-left py-2 font-bold">#</th>
                            <th className="text-left py-2 font-bold">Ejercicio</th>
                            <th className="text-center py-2 font-bold">Series</th>
                            <th className="text-center py-2 font-bold">Reps</th>
                            <th className="text-center py-2 font-bold">Peso</th>
                            <th className="text-center py-2 font-bold">RPE</th>
                            <th className="text-center py-2 font-bold">Descanso</th>
                          </tr>
                        </thead>
                        <tbody>
                          {day.exercises.map((exercise, exIndex) => (
                            <tr key={exIndex} className="border-b border-gray-200">
                              <td className="py-2 font-semibold">{exIndex + 1}</td>
                              <td className="py-2">{exercise.name}</td>
                              <td className="text-center py-2">{exercise.sets}</td>
                              <td className="text-center py-2">{exercise.reps}</td>
                              <td className="text-center py-2">{exercise.weight || '-'}</td>
                              <td className="text-center py-2">{exercise.rpe || '-'}</td>
                              <td className="text-center py-2">{exercise.rest ? `${exercise.rest}s` : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Estadísticas de la Semana */}
            {weekStats && (
              <div className="mt-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-purple-900 mb-3">📈 Estadísticas de Semana {currentWeek + 1}</h4>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(weekStats.byMuscleGroup)
                    .sort(([, a], [, b]) => b.sets - a.sets)
                    .slice(0, 8)
                    .map(([muscle, data]) => (
                      <div key={muscle} className="text-center p-2 bg-white rounded-lg">
                        <div className="text-lg font-black text-purple-600">{data.sets}</div>
                        <div className="text-xs text-gray-600">{muscle}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className="w-full mt-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
            >
              Cerrar Vista Previa
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlanPreviewModal;
