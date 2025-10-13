import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Zap, AlertTriangle, Brain, Target, BarChart, CheckCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface ExerciseHistory {
  date: string;
  weight: number;
  sets: number;
  reps: string;
  rpe?: number;
}

interface ExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  tempo?: string;
  rpe?: number;
  weight?: number;
  notes?: string;
  history?: ExerciseHistory[];
}

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  image: string;
}

interface AutoajusteCargasProps {
  exercises: ExerciseConfig[];
  exerciseDatabase: Exercise[];
  onApplySuggestions: (suggestions: { exerciseIndex: number; newWeight: number; newRPE?: number; reason: string }[]) => void;
  onClose: () => void;
  progressionRate?: number;
}

interface Suggestion {
  exerciseIndex: number;
  exerciseName: string;
  exerciseImage: string;
  currentWeight: number;
  suggestedWeight: number;
  currentRPE?: number;
  suggestedRPE?: number;
  reason: string;
  confidence: 'high' | 'medium' | 'low';
  type: 'increase' | 'decrease' | 'maintain' | 'deload';
}

const AutoajusteCargas: React.FC<AutoajusteCargasProps> = ({
  exercises,
  exerciseDatabase,
  onApplySuggestions,
  onClose,
  progressionRate = 2.5
}) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState<number[]>([]);

  const suggestions = useMemo(() => {
    const result: Suggestion[] = [];

    exercises.forEach((exercise, index) => {
      const exerciseData = exerciseDatabase.find(e => e.id === exercise.exerciseId);
      if (!exerciseData || !exercise.weight) return;

      const history = exercise.history || [];

      // Análisis de progresión
      let suggestion: Suggestion = {
        exerciseIndex: index,
        exerciseName: exerciseData.name,
        exerciseImage: exerciseData.image,
        currentWeight: exercise.weight,
        suggestedWeight: exercise.weight,
        currentRPE: exercise.rpe,
        suggestedRPE: exercise.rpe,
        reason: '',
        confidence: 'medium',
        type: 'maintain'
      };

      if (history.length >= 2) {
        const lastSession = history[0];
        const previousSession = history[1];

        // Calcular tendencia
        const weightTrend = lastSession.weight - previousSession.weight;
        const lastRPE = lastSession.rpe || 7;

        // Estrategia 1: Progresión consistente con RPE bajo
        if (lastRPE <= 7 && weightTrend >= 0) {
          suggestion.suggestedWeight = exercise.weight + progressionRate;
          suggestion.reason = `RPE bajo (${lastRPE}), hay margen para incrementar carga`;
          suggestion.confidence = 'high';
          suggestion.type = 'increase';
        }
        // Estrategia 2: RPE muy alto (sobrecarga)
        else if (lastRPE >= 9) {
          suggestion.suggestedWeight = exercise.weight - progressionRate;
          suggestion.suggestedRPE = 8;
          suggestion.reason = `RPE muy alto (${lastRPE}), reducir para evitar sobrecarga`;
          suggestion.confidence = 'high';
          suggestion.type = 'decrease';
        }
        // Estrategia 3: Estancamiento (3+ sesiones sin progreso)
        else if (history.length >= 3) {
          const lastThree = history.slice(0, 3);
          const allSameWeight = lastThree.every(h => h.weight === lastThree[0].weight);

          if (allSameWeight && lastRPE < 8) {
            suggestion.suggestedWeight = exercise.weight + progressionRate;
            suggestion.reason = 'Estancamiento detectado. Incrementar carga para estimular adaptación';
            suggestion.confidence = 'medium';
            suggestion.type = 'increase';
          } else if (allSameWeight && lastRPE >= 8) {
            // Cambiar estrategia: reducir peso, aumentar volumen
            suggestion.suggestedWeight = exercise.weight * 0.9;
            suggestion.reason = 'Estancamiento con RPE alto. Reducir intensidad y trabajar volumen';
            suggestion.confidence = 'medium';
            suggestion.type = 'deload';
          }
        }
        // Estrategia 4: Progresión normal
        else if (lastRPE >= 7 && lastRPE <= 8 && weightTrend >= 0) {
          suggestion.suggestedWeight = exercise.weight + (progressionRate * 0.5);
          suggestion.reason = 'Progresión conservadora. RPE óptimo';
          suggestion.confidence = 'high';
          suggestion.type = 'increase';
        }
      } else if (history.length === 1) {
        // Solo hay 1 sesión de historial
        const lastRPE = history[0].rpe || 7;

        if (lastRPE <= 7) {
          suggestion.suggestedWeight = exercise.weight + progressionRate;
          suggestion.reason = 'Primera sesión con RPE bajo. Incrementar carga';
          suggestion.confidence = 'medium';
          suggestion.type = 'increase';
        } else if (lastRPE >= 9) {
          suggestion.suggestedWeight = exercise.weight;
          suggestion.reason = 'Primera sesión con RPE alto. Mantener carga';
          suggestion.confidence = 'medium';
          suggestion.type = 'maintain';
        }
      } else {
        // No hay historial - estimación basada en 1RM teórico
        suggestion.suggestedWeight = exercise.weight;
        suggestion.reason = 'Sin historial suficiente. Empezar conservador';
        suggestion.confidence = 'low';
        suggestion.type = 'maintain';
      }

      // Redondear a 2.5kg
      suggestion.suggestedWeight = Math.round(suggestion.suggestedWeight / 2.5) * 2.5;

      // Solo agregar si hay cambio real
      if (suggestion.suggestedWeight !== exercise.weight || suggestion.suggestedRPE !== exercise.rpe) {
        result.push(suggestion);
      }
    });

    // Seleccionar todas las sugerencias por defecto
    setSelectedSuggestions(result.map((_, idx) => idx));

    return result;
  }, [exercises, exerciseDatabase, progressionRate]);

  const toggleSuggestion = (index: number) => {
    if (selectedSuggestions.includes(index)) {
      setSelectedSuggestions(selectedSuggestions.filter(i => i !== index));
    } else {
      setSelectedSuggestions([...selectedSuggestions, index]);
    }
  };

  const handleApply = () => {
    const applicableSuggestions = suggestions
      .filter((_, idx) => selectedSuggestions.includes(idx))
      .map(s => ({
        exerciseIndex: s.exerciseIndex,
        newWeight: s.suggestedWeight,
        newRPE: s.suggestedRPE,
        reason: s.reason
      }));

    onApplySuggestions(applicableSuggestions);
    onClose();
  };

  const getTypeColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'increase': return 'text-green-600 bg-green-100 border-green-300';
      case 'decrease': return 'text-red-600 bg-red-100 border-red-300';
      case 'deload': return 'text-orange-600 bg-orange-100 border-orange-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getTypeIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'increase': return <ArrowUp className="w-4 h-4" />;
      case 'decrease': return <ArrowDown className="w-4 h-4" />;
      case 'deload': return <AlertTriangle className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: Suggestion['confidence']) => {
    switch (confidence) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Autoajuste Inteligente de Cargas</h2>
                <p className="text-purple-100 text-sm">Análisis basado en historial y RPE</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-gray-200">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-gray-600">Sugerencias</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{suggestions.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUp className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-gray-600">Incrementos</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {suggestions.filter(s => s.type === 'increase').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-medium text-gray-600">Descargas</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {suggestions.filter(s => s.type === 'deload' || s.type === 'decrease').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-600">Confianza Alta</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {suggestions.filter(s => s.confidence === 'high').length}
            </p>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="flex-1 overflow-y-auto p-6">
          {suggestions.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-semibold">¡Todo perfecto!</p>
              <p className="text-gray-500 text-sm">Las cargas actuales son óptimas según el historial</p>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion, idx) => {
                const isSelected = selectedSuggestions.includes(idx);
                const weightChange = suggestion.suggestedWeight - suggestion.currentWeight;
                const percentChange = ((weightChange / suggestion.currentWeight) * 100).toFixed(1);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`border-2 rounded-xl p-5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-400 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-purple-200'
                    }`}
                    onClick={() => toggleSuggestion(idx)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>

                      {/* Exercise Info */}
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {suggestion.exerciseImage}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{suggestion.exerciseName}</h4>

                          {/* Weight Change */}
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Actual:</span>
                              <span className="font-bold text-gray-900">{suggestion.currentWeight}kg</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(suggestion.type)}
                              <span className={`font-bold ${
                                weightChange > 0 ? 'text-green-600' : weightChange < 0 ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {weightChange > 0 ? '+' : ''}{weightChange}kg
                              </span>
                              <span className="text-xs text-gray-500">({percentChange}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">→</span>
                              <span className="font-bold text-purple-700">{suggestion.suggestedWeight}kg</span>
                            </div>
                          </div>

                          {/* RPE Change (if applicable) */}
                          {suggestion.suggestedRPE && suggestion.suggestedRPE !== suggestion.currentRPE && (
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm text-gray-600">RPE:</span>
                              <span className="text-sm font-medium text-gray-700">{suggestion.currentRPE || 7}</span>
                              <span className="text-sm text-gray-500">→</span>
                              <span className="text-sm font-bold text-purple-700">{suggestion.suggestedRPE}</span>
                            </div>
                          )}

                          {/* Reason */}
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Razón:</span> {suggestion.reason}
                          </p>

                          {/* Tags */}
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getTypeColor(suggestion.type)}`}>
                              {suggestion.type === 'increase' ? 'Incrementar' :
                               suggestion.type === 'decrease' ? 'Reducir' :
                               suggestion.type === 'deload' ? 'Descarga' : 'Mantener'}
                            </span>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getConfidenceColor(suggestion.confidence)}`} />
                              <span className="text-xs text-gray-500">
                                Confianza: {suggestion.confidence === 'high' ? 'Alta' : suggestion.confidence === 'medium' ? 'Media' : 'Baja'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {suggestions.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{selectedSuggestions.length}</span> de {suggestions.length} sugerencias seleccionadas
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApply}
                  disabled={selectedSuggestions.length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Aplicar Sugerencias ({selectedSuggestions.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AutoajusteCargas;
