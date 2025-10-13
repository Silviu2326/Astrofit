import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Target,
  Dumbbell,
  TrendingUp,
  Zap,
  Shield,
  Check,
} from 'lucide-react';
import { ExerciseLibraryEntry } from '../../types/exercise.types';
import { ClientProfile } from '../../types/client.types';
import {
  ExerciseFilters,
  filterExercises,
  getFilterOptions,
  getFilteredStats,
} from '../../utils/exerciseFiltering';

interface SmartFilterPanelProps {
  exercises: ExerciseLibraryEntry[];
  clientProfile?: ClientProfile;
  onFiltersChange: (filtered: ExerciseLibraryEntry[]) => void;
}

const SmartFilterPanel: React.FC<SmartFilterPanelProps> = ({
  exercises,
  clientProfile,
  onFiltersChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedMovements, setSelectedMovements] = useState<string[]>([]);
  const [excludeInjuries, setExcludeInjuries] = useState(true);

  // Opciones disponibles
  const filterOptions = useMemo(() => getFilterOptions(exercises), [exercises]);

  // Ejercicios filtrados
  const filteredExercises = useMemo(() => {
    const filters: ExerciseFilters = {
      search,
      muscleGroups: selectedMuscles.length > 0 ? selectedMuscles : undefined,
      equipment: selectedEquipment.length > 0 ? selectedEquipment : undefined,
      difficulty: selectedDifficulty.length > 0 ? selectedDifficulty : undefined,
      movement: selectedMovements.length > 0 ? selectedMovements : undefined,
      excludeInjuries,
      clientProfile,
    };

    return filterExercises(exercises, filters);
  }, [
    exercises,
    search,
    selectedMuscles,
    selectedEquipment,
    selectedDifficulty,
    selectedMovements,
    excludeInjuries,
    clientProfile,
  ]);

  // Aplicar filtros cuando cambian
  React.useEffect(() => {
    onFiltersChange(filteredExercises);
  }, [filteredExercises, onFiltersChange]);

  // Estadísticas
  const stats = useMemo(() => getFilteredStats(filteredExercises), [filteredExercises]);

  const toggleArraySelection = (array: string[], setArray: (arr: string[]) => void, value: string) => {
    if (array.includes(value)) {
      setArray(array.filter((v) => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedMuscles([]);
    setSelectedEquipment([]);
    setSelectedDifficulty([]);
    setSelectedMovements([]);
    setExcludeInjuries(true);
  };

  const activeFilterCount =
    (search ? 1 : 0) +
    selectedMuscles.length +
    selectedEquipment.length +
    selectedDifficulty.length +
    selectedMovements.length +
    (excludeInjuries && clientProfile?.injuries ? 1 : 0);

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border-b-2 border-gray-200 cursor-pointer hover:bg-gradient-to-r hover:from-orange-100 hover:to-pink-100 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <Filter className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-black text-gray-900">Filtros Inteligentes</h3>
              <p className="text-sm text-gray-600">
                {stats.total} de {exercises.length} ejercicios
                {activeFilterCount > 0 && ` · ${activeFilterCount} filtros activos`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearAllFilters();
                }}
                className="px-3 py-1 text-sm bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-semibold transition-all"
              >
                Limpiar
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Búsqueda */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Search className="w-4 h-4" />
                  Buscar ejercicio
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nombre, músculo, etiqueta..."
                    className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Grupos Musculares */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Target className="w-4 h-4" />
                  Grupos Musculares
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.muscleGroups.map((muscle) => (
                    <button
                      key={muscle}
                      onClick={() => toggleArraySelection(selectedMuscles, setSelectedMuscles, muscle)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        selectedMuscles.includes(muscle)
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedMuscles.includes(muscle) && <Check className="w-3 h-3 inline mr-1" />}
                      {muscle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipamiento */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Dumbbell className="w-4 h-4" />
                  Equipamiento
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.equipment.map((eq) => (
                    <button
                      key={eq}
                      onClick={() => toggleArraySelection(selectedEquipment, setSelectedEquipment, eq)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        selectedEquipment.includes(eq)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedEquipment.includes(eq) && <Check className="w-3 h-3 inline mr-1" />}
                      {eq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dificultad */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Dificultad
                </label>
                <div className="flex gap-2">
                  {filterOptions.difficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => toggleArraySelection(selectedDifficulty, setSelectedDifficulty, diff)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        selectedDifficulty.includes(diff)
                          ? diff === 'beginner'
                            ? 'bg-green-600 text-white'
                            : diff === 'intermediate'
                            ? 'bg-blue-600 text-white'
                            : 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedDifficulty.includes(diff) && <Check className="w-3 h-3 inline mr-1" />}
                      {diff === 'beginner' ? 'Principiante' : diff === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patrón de Movimiento */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Zap className="w-4 h-4" />
                  Patrón de Movimiento
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.movements.map((mov) => (
                    <button
                      key={mov}
                      onClick={() => toggleArraySelection(selectedMovements, setSelectedMovements, mov)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        selectedMovements.includes(mov)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedMovements.includes(mov) && <Check className="w-3 h-3 inline mr-1" />}
                      {mov === 'push'
                        ? 'Empuje'
                        : mov === 'pull'
                        ? 'Tirón'
                        : mov === 'squat'
                        ? 'Sentadilla'
                        : mov === 'hinge'
                        ? 'Bisagra'
                        : mov === 'isolation'
                        ? 'Aislamiento'
                        : mov}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excluir por Lesiones */}
              {clientProfile && clientProfile.injuries && clientProfile.injuries.length > 0 && (
                <div className="p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excludeInjuries}
                      onChange={(e) => setExcludeInjuries(e.target.checked)}
                      className="w-5 h-5 text-orange-600 rounded"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Shield className="w-5 h-5 text-yellow-600" />
                      <div>
                        <span className="font-bold text-gray-900">Excluir ejercicios contraindicados</span>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Basado en lesiones del cliente: {clientProfile.injuries.map((i) => i.area).join(', ')}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              )}

              {/* Estadísticas */}
              <div className="pt-3 border-t-2 border-gray-200">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-black text-orange-600">{stats.total}</div>
                    <div className="text-xs text-gray-600">Ejercicios</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-black text-blue-600">
                      {Object.keys(stats.byMuscle).length}
                    </div>
                    <div className="text-xs text-gray-600">Grupos Musc.</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="text-2xl font-black text-green-600">
                      {Math.round(stats.avgDifficulty * 10) / 10}
                    </div>
                    <div className="text-xs text-gray-600">Dif. Promedio</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartFilterPanel;
