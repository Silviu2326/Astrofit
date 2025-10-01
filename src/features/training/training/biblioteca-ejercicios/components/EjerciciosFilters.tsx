import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Check, ChevronDown, Dumbbell, Target, Activity, Heart } from 'lucide-react';

interface EjerciciosFiltersProps {
  onFilterChange: (filters: { category: string; material: string; difficulty: string }) => void;
}

const CATEGORIES = [
  { value: 'piernas', label: 'Piernas', color: 'from-blue-500 to-indigo-600', icon: '🦵' },
  { value: 'torso', label: 'Torso', color: 'from-purple-500 to-pink-600', icon: '💪' },
  { value: 'core', label: 'Core', color: 'from-orange-500 to-red-600', icon: '🔥' },
  { value: 'brazos', label: 'Brazos', color: 'from-green-500 to-emerald-600', icon: '💪' },
  { value: 'espalda', label: 'Espalda', color: 'from-cyan-500 to-blue-600', icon: '🏋️' },
  { value: 'cardio', label: 'Cardio', color: 'from-red-500 to-pink-600', icon: '❤️' },
  { value: 'flexibilidad', label: 'Flexibilidad', color: 'from-teal-500 to-cyan-600', icon: '🧘' },
  { value: 'funcional', label: 'Funcional', color: 'from-indigo-500 to-purple-600', icon: '⚡' }
];

const MATERIALS = [
  { value: 'mancuernas', label: 'Mancuernas' },
  { value: 'gomas', label: 'Gomas' },
  { value: 'barra', label: 'Barra' },
  { value: 'peso corporal', label: 'Peso Corporal' },
  { value: 'maquina', label: 'Máquina' },
  { value: 'kettlebell', label: 'Kettlebell' },
  { value: 'trx', label: 'TRX' },
  { value: 'bosu', label: 'Bosu' },
  { value: 'fitball', label: 'Fitball' }
];

const DIFFICULTIES = [
  { value: 'principiante', label: 'Principiante', color: 'bg-green-500' },
  { value: 'intermedio', label: 'Intermedio', color: 'bg-yellow-500' },
  { value: 'avanzado', label: 'Avanzado', color: 'bg-red-500' }
];

export const EjerciciosFilters: React.FC<EjerciciosFiltersProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleCategoryChange = (value: string) => {
    const newCategory = category === value ? '' : value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, material, difficulty });
  };

  const handleMaterialChange = (value: string) => {
    const newMaterial = material === value ? '' : value;
    setMaterial(newMaterial);
    onFilterChange({ category, material: newMaterial, difficulty });
  };

  const handleDifficultyChange = (value: string) => {
    const newDifficulty = difficulty === value ? '' : value;
    setDifficulty(newDifficulty);
    onFilterChange({ category, material, difficulty: newDifficulty });
  };

  const handleClearFilters = () => {
    setCategory('');
    setMaterial('');
    setDifficulty('');
    onFilterChange({ category: '', material: '', difficulty: '' });
  };

  const activeFiltersCount = [category, material, difficulty].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden relative"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Filtros</h3>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-white/80">{activeFiltersCount} activo{activeFiltersCount > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6 relative z-10">
              {/* Categoría */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  Categoría
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.value;
                    return (
                      <motion.button
                        key={cat.value}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleCategoryChange(cat.value)}
                        className={`relative overflow-hidden p-3 rounded-xl font-semibold text-sm transition-all duration-300 border-2 ${
                          isSelected
                            ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                            : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                          </span>
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Material/Equipamiento */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Dumbbell className="w-4 h-4 text-purple-600" />
                  Equipamiento
                </label>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((mat) => {
                    const isSelected = material === mat.value;
                    return (
                      <motion.button
                        key={mat.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMaterialChange(mat.value)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{mat.label}</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Dificultad */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Target className="w-4 h-4 text-orange-600" />
                  Dificultad
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {DIFFICULTIES.map((diff) => {
                    const isSelected = difficulty === diff.value;
                    return (
                      <motion.button
                        key={diff.value}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDifficultyChange(diff.value)}
                        className={`relative overflow-hidden p-4 rounded-2xl font-bold text-sm transition-all duration-300 border-2 ${
                          isSelected
                            ? `${diff.color} text-white border-transparent shadow-xl`
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span>{diff.label}</span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Botón limpiar filtros */}
              {activeFiltersCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearFilters}
                  className="w-full p-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <X className="w-5 h-5" />
                  Limpiar Filtros
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
