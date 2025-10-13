import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Plus, Search, Tag, Trash2, Edit2, Check, Copy } from 'lucide-react';
import { ExerciseConfig } from '../../types/training.types';

export interface ExerciseCombo {
  id: string;
  name: string;
  description: string;
  exercises: Omit<ExerciseConfig, 'history'>[];
  tags: string[];
  type: 'superset' | 'circuit' | 'cluster' | 'normal';
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
}

interface CombosLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertCombo: (combo: ExerciseCombo) => void;
  savedCombos: ExerciseCombo[];
  onSaveCombo: (combo: ExerciseCombo) => void;
  onDeleteCombo: (comboId: string) => void;
}

// Default pre-made combos
const DEFAULT_COMBOS: ExerciseCombo[] = [
  {
    id: 'combo-1',
    name: 'Superserie Pecho/Espalda Horizontal',
    description: 'Agonista-antagonista para máxima eficiencia',
    type: 'superset',
    muscleGroups: ['Pecho', 'Espalda'],
    difficulty: 'intermediate',
    estimatedTime: 15,
    tags: ['hipertrofia', 'upper', 'eficiente'],
    exercises: [
      { exerciseId: 'chest001', sets: 4, reps: '8-10', rest: 90, rpe: 8, weight: 80, groupType: 'superset', groupId: 'ss1' },
      { exerciseId: 'back005', sets: 4, reps: '8-10', rest: 90, rpe: 8, weight: 70, groupType: 'superset', groupId: 'ss1' },
    ],
  },
  {
    id: 'combo-2',
    name: 'Circuito Metabólico Pierna',
    description: 'Alta intensidad, quemar grasa y resistencia',
    type: 'circuit',
    muscleGroups: ['Piernas', 'Glúteos'],
    difficulty: 'advanced',
    estimatedTime: 20,
    tags: ['quema-grasa', 'metabólico', 'cardio'],
    exercises: [
      { exerciseId: 'legs001', sets: 3, reps: '15', rest: 30, rpe: 8, weight: 60, groupType: 'circuit', groupId: 'c1' },
      { exerciseId: 'legs003', sets: 3, reps: '12', rest: 30, rpe: 8, weight: 20, groupType: 'circuit', groupId: 'c1' },
      { exerciseId: 'legs010', sets: 3, reps: '20', rest: 30, rpe: 7, weight: 40, groupType: 'circuit', groupId: 'c1' },
      { exerciseId: 'legs006', sets: 3, reps: '15', rest: 120, rpe: 8, weight: 30, groupType: 'circuit', groupId: 'c1' },
    ],
  },
  {
    id: 'combo-3',
    name: 'Cluster Set Fuerza Hombros',
    description: 'Para romper mesetas de fuerza en press militar',
    type: 'cluster',
    muscleGroups: ['Hombros'],
    difficulty: 'advanced',
    estimatedTime: 12,
    tags: ['fuerza', 'hombros', 'avanzado'],
    exercises: [
      { exerciseId: 'shoulders001', sets: 5, reps: '3+3+3', rest: 180, rpe: 9, weight: 55, groupType: 'cluster', groupId: 'cl1', notes: '20s descanso entre mini-sets' },
    ],
  },
  {
    id: 'combo-4',
    name: 'PPL Push Completo',
    description: 'Día completo de empuje optimizado',
    type: 'normal',
    muscleGroups: ['Pecho', 'Hombros', 'Tríceps'],
    difficulty: 'intermediate',
    estimatedTime: 60,
    tags: ['push', 'ppl', 'volumen'],
    exercises: [
      { exerciseId: 'chest001', sets: 4, reps: '6-8', rest: 150, rpe: 8, weight: 85 },
      { exerciseId: 'chest003', sets: 3, reps: '8-10', rest: 120, rpe: 7, weight: 60 },
      { exerciseId: 'shoulders001', sets: 3, reps: '8-10', rest: 90, rpe: 7, weight: 45 },
      { exerciseId: 'shoulders003', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 10 },
      { exerciseId: 'arms004', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 30 },
    ],
  },
  {
    id: 'combo-5',
    name: 'Core + Movilidad Finalizador',
    description: 'Perfecto para terminar cualquier sesión',
    type: 'circuit',
    muscleGroups: ['Core', 'Movilidad'],
    difficulty: 'beginner',
    estimatedTime: 10,
    tags: ['core', 'movilidad', 'finalizador'],
    exercises: [
      { exerciseId: 'core001', sets: 3, reps: '60s', rest: 30, rpe: 7, groupType: 'circuit', groupId: 'c2' },
      { exerciseId: 'core002', sets: 3, reps: '45s', rest: 30, rpe: 7, groupType: 'circuit', groupId: 'c2' },
      { exerciseId: 'core003', sets: 3, reps: '20', rest: 60, rpe: 7, groupType: 'circuit', groupId: 'c2' },
    ],
  },
  {
    id: 'combo-6',
    name: 'Superserie Cuádriceps/Isquios',
    description: 'Balance perfecto para piernas',
    type: 'superset',
    muscleGroups: ['Cuádriceps', 'Isquiosurales'],
    difficulty: 'intermediate',
    estimatedTime: 18,
    tags: ['piernas', 'balance', 'hipertrofia'],
    exercises: [
      { exerciseId: 'legs008', sets: 4, reps: '10-12', rest: 90, rpe: 8, weight: 80, groupType: 'superset', groupId: 'ss2' },
      { exerciseId: 'legs007', sets: 4, reps: '10-12', rest: 90, rpe: 8, weight: 35, groupType: 'superset', groupId: 'ss2' },
    ],
  },
];

export const CombosLibraryModal: React.FC<CombosLibraryModalProps> = ({
  isOpen,
  onClose,
  onInsertCombo,
  savedCombos,
  onSaveCombo,
  onDeleteCombo,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!isOpen) return null;

  const allCombos = [...DEFAULT_COMBOS, ...savedCombos];

  // Extract all unique tags
  const allTags = Array.from(new Set(allCombos.flatMap((c) => c.tags)));

  // Filter combos
  const filteredCombos = allCombos.filter((combo) => {
    const matchesSearch = combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      combo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => combo.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getTypeIcon = (type: ExerciseCombo['type']) => {
    switch (type) {
      case 'superset':
        return '⚡';
      case 'circuit':
        return '🔄';
      case 'cluster':
        return '💥';
      default:
        return '📋';
    }
  };

  const getDifficultyColor = (difficulty: ExerciseCombo['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Biblioteca de Combos</h2>
                <p className="text-purple-100 text-sm">Inserta combinaciones de ejercicios pre-hechas</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Buscar combos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCombos.map((combo) => (
              <motion.div
                key={combo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-lg transition-all group"
              >
                {/* Combo Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(combo.type)}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{combo.name}</h3>
                      <p className="text-xs text-gray-500">{combo.description}</p>
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(combo.difficulty)}`}>
                    {combo.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {combo.estimatedTime} min
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {combo.exercises.length} ej.
                  </span>
                </div>

                {/* Muscle Groups */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {combo.muscleGroups.map((mg) => (
                      <span key={mg} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {mg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exercise Preview */}
                <div className="space-y-1 mb-3 text-xs text-gray-600">
                  {combo.exercises.slice(0, 3).map((ex, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span className="text-purple-600">•</span>
                      <span>{ex.sets}x{ex.reps}</span>
                      {ex.weight && <span className="text-gray-400">@ {ex.weight}kg</span>}
                    </div>
                  ))}
                  {combo.exercises.length > 3 && (
                    <div className="text-gray-400 text-xs">+{combo.exercises.length - 3} más...</div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onInsertCombo(combo)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Insertar
                  </button>
                  {savedCombos.some((c) => c.id === combo.id) && (
                    <button
                      onClick={() => onDeleteCombo(combo.id)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCombos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron combos</h3>
              <p className="text-gray-600">Intenta con otros términos de búsqueda o etiquetas</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {filteredCombos.length} combos disponibles
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};
