import React from 'react';
import { Edit2, Copy, Trash2, ArrowUpCircle } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  image: string;
}

interface ExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  weight?: number;
  rpe?: number;
  notes?: string;
}

interface CompactTableViewProps {
  exercises: ExerciseConfig[];
  exerciseLibrary: Exercise[];
  onUpdate: (index: number, field: keyof ExerciseConfig, value: any) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
  onApplyProgression: (index: number) => void;
  isEditMode?: boolean;
}

const CompactTableView: React.FC<CompactTableViewProps> = ({
  exercises,
  exerciseLibrary,
  onUpdate,
  onRemove,
  onDuplicate,
  onApplyProgression,
  isEditMode = false
}) => {
  const getExercise = (id: string) => {
    return exerciseLibrary.find(ex => ex.id === id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-2 text-left font-bold text-gray-700 w-8">#</th>
            <th className="px-3 py-2 text-left font-bold text-gray-700">Ejercicio</th>
            <th className="px-3 py-2 text-center font-bold text-gray-700 w-20">Series</th>
            <th className="px-3 py-2 text-center font-bold text-gray-700 w-24">Reps</th>
            <th className="px-3 py-2 text-center font-bold text-gray-700 w-24">Descanso</th>
            <th className="px-3 py-2 text-center font-bold text-gray-700 w-24">Peso (kg)</th>
            <th className="px-3 py-2 text-center font-bold text-gray-700 w-20">RPE</th>
            <th className="px-3 py-2 text-left font-bold text-gray-700">Notas</th>
            {isEditMode && (
              <th className="px-3 py-2 text-center font-bold text-gray-700 w-32">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {exercises.length === 0 ? (
            <tr>
              <td colSpan={isEditMode ? 9 : 8} className="px-3 py-8 text-center text-gray-400">
                No hay ejercicios en esta sesión
              </td>
            </tr>
          ) : (
            exercises.map((exercise, index) => {
              const exerciseData = getExercise(exercise.exerciseId);
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-orange-50 transition-colors"
                >
                  <td className="px-3 py-2 text-gray-500 font-semibold">{index + 1}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{exerciseData?.image}</span>
                      <span className="font-semibold text-gray-900">{exerciseData?.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => onUpdate(index, 'sets', parseInt(e.target.value))}
                      disabled={!isEditMode}
                      className={`w-full px-2 py-1 border border-gray-300 rounded text-center ${
                        !isEditMode ? 'bg-gray-100' : 'focus:border-orange-500 focus:outline-none'
                      }`}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => onUpdate(index, 'reps', e.target.value)}
                      disabled={!isEditMode}
                      className={`w-full px-2 py-1 border border-gray-300 rounded text-center ${
                        !isEditMode ? 'bg-gray-100' : 'focus:border-orange-500 focus:outline-none'
                      }`}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={exercise.rest}
                        onChange={(e) => onUpdate(index, 'rest', parseInt(e.target.value))}
                        disabled={!isEditMode}
                        className={`w-full px-2 py-1 border border-gray-300 rounded text-center ${
                          !isEditMode ? 'bg-gray-100' : 'focus:border-orange-500 focus:outline-none'
                        }`}
                      />
                      <span className="text-xs text-gray-500">s</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      step="0.5"
                      value={exercise.weight || ''}
                      onChange={(e) => onUpdate(index, 'weight', parseFloat(e.target.value))}
                      disabled={!isEditMode}
                      placeholder="-"
                      className={`w-full px-2 py-1 border border-gray-300 rounded text-center ${
                        !isEditMode ? 'bg-gray-100' : 'focus:border-orange-500 focus:outline-none'
                      }`}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={exercise.rpe || ''}
                      onChange={(e) => onUpdate(index, 'rpe', parseInt(e.target.value))}
                      disabled={!isEditMode}
                      placeholder="-"
                      className={`w-full px-2 py-1 border border-gray-300 rounded text-center ${
                        !isEditMode ? 'bg-gray-100' : 'focus:border-orange-500 focus:outline-none'
                      }`}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={exercise.notes || ''}
                      onChange={(e) => onUpdate(index, 'notes', e.target.value)}
                      disabled={!isEditMode}
                      placeholder="Notas..."
                      className={`w-full px-2 py-1 border border-gray-300 rounded text-sm ${
                        !isEditMode ? 'bg-gray-100' : 'focus:border-orange-500 focus:outline-none'
                      }`}
                    />
                  </td>
                  {isEditMode && (
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onApplyProgression(index)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Aplicar progresión"
                        >
                          <ArrowUpCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDuplicate(index)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Duplicar"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemove(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompactTableView;
