import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ExerciseSubstitution } from '../../types/exercise.types';

interface SubstitutionModalProps {
  show: boolean;
  substitution: ExerciseSubstitution | null;
  onClose: () => void;
  onSelectAlternative: (exerciseId: string) => void;
}

const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
  show,
  substitution,
  onClose,
  onSelectAlternative,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!substitution) return null;

  const getDifficultyIcon = (difficulty: 'easier' | 'same' | 'harder') => {
    switch (difficulty) {
      case 'easier':
        return <TrendingDown className="w-4 h-4 text-green-600" />;
      case 'harder':
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: 'easier' | 'same' | 'harder') => {
    switch (difficulty) {
      case 'easier':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'harder':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'text-green-600';
    if (similarity >= 60) return 'text-yellow-600';
    return 'text-orange-600';
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
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="w-8 h-8 text-orange-600" />
                  <h3 className="text-2xl font-black text-gray-900">Sustituir Ejercicio</h3>
                </div>
                <p className="text-gray-600">
                  Ejercicio original: <strong>{substitution.originalExercise.name}</strong>
                </p>
              </div>
            </div>

            {/* Información del ejercicio original */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{substitution.originalExercise.image}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{substitution.originalExercise.name}</h4>
                  <div className="flex gap-2 mt-1 text-sm text-gray-600">
                    <span>🎯 {substitution.originalExercise.primaryMuscle}</span>
                    <span>•</span>
                    <span>🏋️ {substitution.originalExercise.equipment.join(', ')}</span>
                    <span>•</span>
                    <span>📊 Dificultad: {substitution.originalExercise.difficulty}/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje si no hay alternativas */}
            {substitution.alternatives.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <p className="text-lg text-gray-600">
                  No se encontraron alternativas adecuadas con los criterios actuales.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Intenta ajustar el equipamiento disponible o las restricciones.
                </p>
              </div>
            ) : (
              <>
                {/* Alternativas */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Alternativas Sugeridas ({substitution.alternatives.length})
                  </h4>
                  <div className="space-y-3">
                    {substitution.alternatives.map((alt, index) => (
                      <div
                        key={alt.exercise.id}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedId === alt.exercise.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                        }`}
                        onClick={() => setSelectedId(alt.exercise.id)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Ranking */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                index === 0
                                  ? 'bg-yellow-400 text-yellow-900'
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>

                          {/* Imagen del ejercicio */}
                          <div className="text-3xl">{alt.exercise.image}</div>

                          {/* Información */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-bold text-gray-900">{alt.exercise.name}</h5>
                                <p className="text-sm text-gray-600 mt-1">{alt.reason}</p>
                              </div>

                              {/* Similarity Score */}
                              <div className="text-right">
                                <div className={`text-2xl font-black ${getSimilarityColor(alt.similarity)}`}>
                                  {alt.similarity}%
                                </div>
                                <div className="text-xs text-gray-500">similitud</div>
                              </div>
                            </div>

                            {/* Detalles */}
                            <div className="flex gap-3 mt-3 text-sm">
                              <div className="flex items-center gap-1">
                                <span>🎯</span>
                                <span className="text-gray-700">{alt.exercise.primaryMuscle}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>🏋️</span>
                                <span className="text-gray-700">{alt.equipmentNeeded.join(', ')}</span>
                              </div>
                              <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getDifficultyColor(
                                  alt.difficulty
                                )}`}
                              >
                                {getDifficultyIcon(alt.difficulty)}
                                <span className="font-semibold capitalize">{alt.difficulty}</span>
                              </div>
                            </div>

                            {/* Tags */}
                            {alt.exercise.tags && alt.exercise.tags.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                {alt.exercise.tags.slice(0, 4).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Checkbox */}
                          <div className="flex-shrink-0">
                            {selectedId === alt.exercise.id && (
                              <CheckCircle className="w-6 h-6 text-orange-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nota informativa */}
                <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200 mb-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">💡 Consejo del entrenador</p>
                      <p>
                        Las alternativas están ordenadas por compatibilidad. La primera opción es la más similar
                        al ejercicio original considerando músculos trabajados, patrón de movimiento y equipamiento
                        disponible.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (selectedId) {
                        onSelectAlternative(selectedId);
                        onClose();
                      }
                    }}
                    disabled={!selectedId}
                    className={`flex-1 px-6 py-3 rounded-xl transition-all font-bold ${
                      selectedId
                        ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Aplicar Sustitución
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubstitutionModal;
