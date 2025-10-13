import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Calendar, Activity, BarChart3, Target, Award, CheckCircle } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ExerciseHistory {
  date: string;
  weight: number;
  sets: number;
  reps: string;
  rpe?: number;
  volume?: number; // sets x reps x weight
  oneRM?: number;
}

interface SessionHistory {
  date: string;
  dayName: string;
  completed: boolean;
  duration?: number;
  notes?: string;
}

interface ClientHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientAvatar: string;
  exerciseHistory: Record<string, ExerciseHistory[]>; // exerciseId -> history
  sessionHistory: SessionHistory[];
}

export const ClientHistoryModal: React.FC<ClientHistoryModalProps> = ({
  isOpen,
  onClose,
  clientName,
  clientAvatar,
  exerciseHistory,
  sessionHistory,
}) => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'exercise' | 'sessions'>('overview');

  if (!isOpen) return null;

  // Calculate adherence
  const totalSessions = sessionHistory.length;
  const completedSessions = sessionHistory.filter((s) => s.completed).length;
  const adherenceRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

  // Last 30 days sessions
  const last30Days = sessionHistory.slice(-30);

  // Exercise list with progress
  const exerciseList = Object.keys(exerciseHistory).map((exerciseId) => {
    const history = exerciseHistory[exerciseId];
    const latest = history[history.length - 1];
    const first = history[0];

    const weightProgress = latest && first ? ((latest.weight - first.weight) / first.weight) * 100 : 0;

    return {
      exerciseId,
      name: exerciseId, // In real app, map to exercise name
      totalSessions: history.length,
      latestWeight: latest?.weight || 0,
      weightProgress,
      latest1RM: latest?.oneRM || 0,
    };
  });

  // Chart data for selected exercise
  const getExerciseChartData = (exerciseId: string) => {
    const history = exerciseHistory[exerciseId] || [];

    return {
      labels: history.map((h) => new Date(h.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })),
      datasets: [
        {
          label: 'Peso (kg)',
          data: history.map((h) => h.weight),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          yAxisID: 'y',
        },
        {
          label: '1RM Estimado (kg)',
          data: history.map((h) => h.oneRM || 0),
          borderColor: 'rgb(147, 51, 234)',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          tension: 0.3,
          yAxisID: 'y',
        },
      ],
    };
  };

  // Volume chart data
  const getVolumeChartData = (exerciseId: string) => {
    const history = exerciseHistory[exerciseId] || [];

    return {
      labels: history.map((h) => new Date(h.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })),
      datasets: [
        {
          label: 'Volumen (kg total)',
          data: history.map((h) => h.volume || 0),
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
    },
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
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl text-3xl">
                {clientAvatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{clientName}</h2>
                <p className="text-indigo-100 text-sm">Historial Completo de Entrenamiento</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'overview'
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Resumen
              </div>
            </button>
            <button
              onClick={() => setViewMode('exercise')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'exercise'
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Por Ejercicio
              </div>
            </button>
            <button
              onClick={() => setViewMode('sessions')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'sessions'
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Sesiones
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Mode */}
          {viewMode === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium">Total Sesiones</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-900">{totalSessions}</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Completadas</span>
                  </div>
                  <div className="text-3xl font-bold text-green-900">{completedSessions}</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-purple-700 font-medium">Adherencia</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-900">{adherenceRate.toFixed(0)}%</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-orange-700 font-medium">Ejercicios</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-900">{exerciseList.length}</div>
                </div>
              </div>

              {/* Top Exercises by Progress */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Ejercicios por Progreso</h3>
                <div className="space-y-3">
                  {exerciseList
                    .sort((a, b) => b.weightProgress - a.weightProgress)
                    .slice(0, 5)
                    .map((exercise) => (
                      <div key={exercise.exerciseId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-bold text-gray-900">{exercise.name}</div>
                          <div className="text-sm text-gray-600">{exercise.totalSessions} sesiones</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${exercise.weightProgress >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {exercise.weightProgress >= 0 ? '+' : ''}{exercise.weightProgress.toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">{exercise.latestWeight}kg actual</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Exercise Mode */}
          {viewMode === 'exercise' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Exercise List Sidebar */}
              <div className="col-span-4 space-y-2">
                <h3 className="font-bold text-gray-900 mb-3">Ejercicios</h3>
                {exerciseList.map((exercise) => (
                  <button
                    key={exercise.exerciseId}
                    onClick={() => setSelectedExercise(exercise.exerciseId)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      selectedExercise === exercise.exerciseId
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-gray-900 text-sm">{exercise.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {exercise.totalSessions} sesiones • {exercise.latestWeight}kg
                    </div>
                  </button>
                ))}
              </div>

              {/* Exercise Detail */}
              <div className="col-span-8">
                {selectedExercise ? (
                  <div className="space-y-6">
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Progreso de Peso y 1RM</h3>
                      <Line data={getExerciseChartData(selectedExercise)} options={chartOptions} />
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Volumen Total</h3>
                      <Bar data={getVolumeChartData(selectedExercise)} options={chartOptions} />
                    </div>

                    {/* History Table */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Historial Detallado</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Fecha</th>
                              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Peso</th>
                              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Series x Reps</th>
                              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">RPE</th>
                              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Volumen</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exerciseHistory[selectedExercise]?.slice(-10).reverse().map((entry, idx) => (
                              <tr key={idx} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm">{new Date(entry.date).toLocaleDateString('es-ES')}</td>
                                <td className="px-4 py-2 text-sm font-bold">{entry.weight}kg</td>
                                <td className="px-4 py-2 text-sm">{entry.sets} x {entry.reps}</td>
                                <td className="px-4 py-2 text-sm">{entry.rpe || '-'}</td>
                                <td className="px-4 py-2 text-sm">{entry.volume?.toFixed(0) || '-'}kg</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Selecciona un ejercicio para ver su historial</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sessions Mode */}
          {viewMode === 'sessions' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Historial de Sesiones</h3>
              <div className="space-y-2">
                {sessionHistory.slice().reverse().map((session, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      session.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {session.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <div className="font-bold text-gray-900">{session.dayName}</div>
                          <div className="text-sm text-gray-600">{new Date(session.date).toLocaleDateString('es-ES')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {session.duration && (
                          <div className="text-sm text-gray-600">{session.duration} min</div>
                        )}
                        {session.notes && (
                          <div className="text-xs text-gray-500 mt-1">{session.notes}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};
