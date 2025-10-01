import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, Filter, Flame, Activity, TrendingUp } from 'lucide-react';

interface RecetasFiltersProps {
  currentFilters: {
    search: string;
    type: string;
    prepTime: string;
    difficulty: string;
    restrictions: string[];
    caloriesRange: string;
    macroType: string;
  };
  onApplyFilters: (filters: {
    search: string;
    type: string;
    prepTime: string;
    difficulty: string;
    restrictions: string[];
    caloriesRange: string;
    macroType: string;
  }) => void;
}

const allTypes = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'];
const prepTimeRanges = [
  { value: '0-15', label: '0-15 min' },
  { value: '15-30', label: '15-30 min' },
  { value: '30-60', label: '30-60 min' },
  { value: '60+', label: '60+ min' },
];
const difficulties = ['Fácil', 'Media', 'Difícil'];
const restrictions = ['Vegano', 'Vegetariano', 'Sin gluten', 'Sin lactosa'];
const caloriesRanges = [
  { value: '0-200', label: '0-200 kcal' },
  { value: '200-400', label: '200-400 kcal' },
  { value: '400-600', label: '400-600 kcal' },
  { value: '600+', label: '600+ kcal' },
];
const macroTypes = [
  { value: 'alta-proteina', label: 'Alta Proteína' },
  { value: 'bajo-carbos', label: 'Bajo en Carbos' },
  { value: 'bajo-grasas', label: 'Bajo en Grasas' },
];

export const RecetasFilters: React.FC<RecetasFiltersProps> = ({
  currentFilters,
  onApplyFilters,
}) => {
  const handleRestrictionToggle = (restriction: string) => {
    const newRestrictions = currentFilters.restrictions.includes(restriction)
      ? currentFilters.restrictions.filter((r) => r !== restriction)
      : [...currentFilters.restrictions, restriction];
    onApplyFilters({ ...currentFilters, restrictions: newRestrictions });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 sticky top-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl text-white">
          <Filter className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Filtros</h2>
      </div>

      {/* Tipo de comida */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          Tipo de comida
        </label>
        <div className="grid grid-cols-2 gap-2">
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => onApplyFilters({ ...currentFilters, type: currentFilters.type === type ? '' : type })}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                currentFilters.type === type
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 hover:from-pink-100 hover:to-rose-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Tiempo de preparación */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          <Clock className="w-4 h-4 text-pink-600" />
          Tiempo de preparación
        </label>
        <div className="space-y-2">
          {prepTimeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onApplyFilters({ ...currentFilters, prepTime: currentFilters.prepTime === range.value ? '' : range.value })}
              className={`w-full px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 text-left ${
                currentFilters.prepTime === range.value
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dificultad */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          <ChefHat className="w-4 h-4 text-pink-600" />
          Dificultad
        </label>
        <div className="grid grid-cols-3 gap-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => onApplyFilters({ ...currentFilters, difficulty: currentFilters.difficulty === difficulty ? '' : difficulty })}
              className={`px-3 py-2 rounded-xl font-semibold text-xs transition-all duration-300 ${
                currentFilters.difficulty === difficulty
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 hover:from-pink-100 hover:to-rose-100'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Restricciones */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          <Flame className="w-4 h-4 text-pink-600" />
          Restricciones
        </label>
        <div className="space-y-2">
          {restrictions.map((restriction) => (
            <button
              key={restriction}
              onClick={() => handleRestrictionToggle(restriction)}
              className={`w-full px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 text-left flex items-center gap-2 ${
                currentFilters.restrictions.includes(restriction)
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                currentFilters.restrictions.includes(restriction)
                  ? 'border-white bg-white/20'
                  : 'border-gray-300'
              }`}>
                {currentFilters.restrictions.includes(restriction) && (
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                )}
              </div>
              {restriction}
            </button>
          ))}
        </div>
      </div>

      {/* Calorías por porción */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          <Flame className="w-4 h-4 text-pink-600" />
          Calorías por porción
        </label>
        <div className="space-y-2">
          {caloriesRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onApplyFilters({ ...currentFilters, caloriesRange: currentFilters.caloriesRange === range.value ? '' : range.value })}
              className={`w-full px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 text-left ${
                currentFilters.caloriesRange === range.value
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Macros predominantes */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          <Activity className="w-4 h-4 text-pink-600" />
          Macros predominantes
        </label>
        <div className="space-y-2">
          {macroTypes.map((macro) => (
            <button
              key={macro.value}
              onClick={() => onApplyFilters({ ...currentFilters, macroType: currentFilters.macroType === macro.value ? '' : macro.value })}
              className={`w-full px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 text-left ${
                currentFilters.macroType === macro.value
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {macro.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botón limpiar filtros */}
      {(currentFilters.type || currentFilters.prepTime || currentFilters.difficulty || currentFilters.restrictions.length > 0 || currentFilters.caloriesRange || currentFilters.macroType) && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onApplyFilters({ search: currentFilters.search, type: '', prepTime: '', difficulty: '', restrictions: [], caloriesRange: '', macroType: '' })}
          className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
        >
          Limpiar Filtros
        </motion.button>
      )}
    </motion.div>
  );
};
