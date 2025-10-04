import React from 'react';

interface FiltrosAvanzadosProps {
  onFilterChange: (filterName: string, value: string | boolean) => void;
  currentFilters: {
    muscleGroup: string;
    equipment: string;
    difficulty: string;
    modality: string;
    showFavorites: boolean;
    showCorrective: boolean;
  };
}

const muscleGroups = ['Pecho', 'Espalda', 'Pierna', 'Hombro', 'Brazo', 'Core'];
const equipmentOptions = ['Barra', 'Mancuernas', 'Máquina', 'Peso Corporal'];
const difficultyLevels = ['Principiante', 'Intermedio', 'Avanzado'];
const modalities = ['Powerlifting', 'Calistenia', 'Funcional'];

const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({ onFilterChange, currentFilters }) => {
  return (
    <div className="p-4 border rounded shadow mb-4 bg-white">
      <h3 className="text-xl font-semibold mb-3">Filtros Avanzados</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="muscleGroup" className="block text-sm font-medium text-gray-700">Grupo Muscular</label>
          <select
            id="muscleGroup"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={currentFilters.muscleGroup}
            onChange={(e) => onFilterChange('muscleGroup', e.target.value)}
          >
            <option value="">Todos</option>
            {muscleGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">Equipamiento</label>
          <select
            id="equipment"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={currentFilters.equipment}
            onChange={(e) => onFilterChange('equipment', e.target.value)}
          >
            <option value="">Todos</option>
            {equipmentOptions.map((eq) => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Dificultad</label>
          <select
            id="difficulty"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={currentFilters.difficulty}
            onChange={(e) => onFilterChange('difficulty', e.target.value)}
          >
            <option value="">Todas</option>
            {difficultyLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="modality" className="block text-sm font-medium text-gray-700">Modalidad</label>
          <select
            id="modality"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={currentFilters.modality}
            onChange={(e) => onFilterChange('modality', e.target.value)}
          >
            <option value="">Todas</option>
            {modalities.map((mod) => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            id="showFavorites"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={currentFilters.showFavorites}
            onChange={(e) => onFilterChange('showFavorites', e.target.checked)}
          />
          <label htmlFor="showFavorites" className="ml-2 block text-sm font-medium text-gray-700">
            Mostrar Favoritos
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="showCorrective"
            type="checkbox"
            className="h-4 w-4 text-green-600 border-gray-300 rounded"
            checked={currentFilters.showCorrective}
            onChange={(e) => onFilterChange('showCorrective', e.target.checked)}
          />
          <label htmlFor="showCorrective" className="ml-2 block text-sm font-medium text-gray-700">
            Mostrar Ejercicios Correctivos
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltrosAvanzados;
