import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import {
  GripVertical, X, Copy, BarChart, ArrowUpCircle,
  TrendingUpIcon, TrendingDown, Minus
} from 'lucide-react';
import { ExerciseConfig, Exercise, ProgressIndicator } from '../../types/training.types';

interface ExerciseCardProps {
  exercise: ExerciseConfig;
  exerciseData: Exercise | undefined;
  exerciseIndex: number;
  isEditMode: boolean;
  isSelected: boolean;
  progression: ProgressIndicator | null;
  suggestedWeight: number | null;
  selectedExerciseForHistory: string | null;
  onToggleSelection: () => void;
  onToggleHistory: () => void;
  onUpdate: (field: keyof ExerciseConfig, value: any) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onApplyProgression: () => void;
  onApplySuggestedWeight: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  exerciseData,
  exerciseIndex,
  isEditMode,
  isSelected,
  progression,
  suggestedWeight,
  selectedExerciseForHistory,
  onToggleSelection,
  onToggleHistory,
  onUpdate,
  onDuplicate,
  onRemove,
  onApplyProgression,
  onApplySuggestedWeight,
}) => {
  const isGrouped = exercise.groupType && exercise.groupType !== 'normal';

  return (
    <Draggable
      key={exerciseIndex}
      draggableId={`exercise-${exerciseIndex}`}
      index={exerciseIndex}
      isDragDisabled={!isEditMode}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-gray-50 rounded-xl p-4 border-2 transition-all ${
            snapshot.isDragging
              ? 'shadow-2xl border-orange-400 bg-orange-50'
              : isSelected
              ? 'border-purple-400 bg-purple-50'
              : isGrouped
              ? 'border-orange-300 bg-orange-50'
              : 'border-gray-100 hover:border-orange-200'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {isEditMode && (
                <div {...provided.dragHandleProps} className="cursor-move">
                  <GripVertical className="w-5 h-5 text-gray-400" />
                </div>
              )}
              {isEditMode && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={onToggleSelection}
                  className="w-5 h-5 text-purple-600 rounded"
                />
              )}
              <div className="text-3xl">{exerciseData?.image}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">{exerciseData?.name}</h4>
                  {isGrouped && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-bold">
                      {exercise.groupType?.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {exerciseData?.muscleGroup} · {exerciseData?.equipment}
                </p>

                {/* Progression Indicator */}
                {progression && (
                  <div className="flex items-center gap-2 mt-1">
                    {progression.type === 'up' && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                        <TrendingUpIcon className="w-3 h-3" />
                        +{progression.diff}kg vs última sesión
                      </span>
                    )}
                    {progression.type === 'down' && (
                      <span className="flex items-center gap-1 text-xs text-red-600 font-semibold">
                        <TrendingDown className="w-3 h-3" />
                        -{progression.diff}kg vs última sesión
                      </span>
                    )}
                    {progression.type === 'same' && (
                      <span className="flex items-center gap-1 text-xs text-gray-600 font-semibold">
                        <Minus className="w-3 h-3" />
                        Mismo peso que última sesión
                      </span>
                    )}
                  </div>
                )}

                {/* Suggested Weight */}
                {suggestedWeight && isEditMode && (
                  <button
                    onClick={onApplySuggestedWeight}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold mt-1"
                  >
                    💡 Sugerido: {suggestedWeight}kg (click para aplicar)
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {exercise.history && exercise.history.length > 0 && (
                <button
                  onClick={onToggleHistory}
                  className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all"
                  title="Ver historial"
                >
                  <BarChart className="w-5 h-5" />
                </button>
              )}
              {isEditMode && (
                <>
                  <button
                    onClick={onApplyProgression}
                    className="text-green-600 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-all"
                    title="Aplicar progresión"
                  >
                    <ArrowUpCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onDuplicate}
                    className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all"
                    title="Duplicar ejercicio"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Exercise History */}
          {selectedExerciseForHistory === exercise.exerciseId && exercise.history && (
            <div className="mb-4 p-3 bg-white rounded-lg border border-blue-200">
              <h5 className="font-bold text-sm text-gray-900 mb-2">Historial de Progresión</h5>
              <div className="space-y-1">
                {exercise.history.map((record, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{record.date}</span>
                    <span className="font-semibold">
                      {record.sets}x{record.reps} @ {record.weight}kg
                      {record.rpe && ` - RPE ${record.rpe}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-semibold">Series</label>
              <input
                type="number"
                value={exercise.sets}
                onChange={(e) => onUpdate('sets', parseInt(e.target.value))}
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? 'bg-gray-100' : ''
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-semibold">Reps</label>
              <input
                type="text"
                value={exercise.reps}
                onChange={(e) => onUpdate('reps', e.target.value)}
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? 'bg-gray-100' : ''
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-semibold">Descanso (s)</label>
              <input
                type="number"
                value={exercise.rest}
                onChange={(e) => onUpdate('rest', parseInt(e.target.value))}
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? 'bg-gray-100' : ''
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-semibold">Peso (kg)</label>
              <input
                type="number"
                step="0.5"
                value={exercise.weight || ''}
                onChange={(e) => onUpdate('weight', parseFloat(e.target.value))}
                disabled={!isEditMode}
                placeholder="Opcional"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? 'bg-gray-100' : ''
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block font-semibold">RPE</label>
              <input
                type="number"
                min="1"
                max="10"
                value={exercise.rpe || ''}
                onChange={(e) => onUpdate('rpe', parseInt(e.target.value))}
                disabled={!isEditMode}
                placeholder="1-10"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? 'bg-gray-100' : ''
                }`}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-sm text-gray-600 mb-1 block font-semibold">Notas del Entrenador</label>
            <input
              type="text"
              value={exercise.notes || ''}
              onChange={(e) => onUpdate('notes', e.target.value)}
              disabled={!isEditMode}
              placeholder="Añadir notas o instrucciones..."
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                !isEditMode ? 'bg-gray-100' : ''
              }`}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseCard;
