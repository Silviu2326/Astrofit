import React from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Dumbbell, Plus, Search } from 'lucide-react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { ExerciseConfig, Exercise, ExerciseGroupType } from '../../types/training.types';
import { getProgressionIndicator, suggestNextWeight } from '../../utils/trainingCalculations';

interface ExerciseListProps {
  exercises: ExerciseConfig[];
  exerciseLibrary: Exercise[];
  isEditMode: boolean;
  selectedExercisesForGroup: number[];
  selectedExerciseForHistory: string | null;
  searchExercise: string;
  progressionRate: number;
  onDragEnd: (result: DropResult) => void;
  onToggleSelection: (index: number) => void;
  onToggleHistory: (exerciseId: string) => void;
  onUpdate: (index: number, field: keyof ExerciseConfig, value: any) => void;
  onDuplicate: (index: number) => void;
  onRemove: (index: number) => void;
  onApplyProgression: (index: number) => void;
  onAddExercise: (exerciseId: string) => void;
  onSearchChange: (value: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  exerciseLibrary,
  isEditMode,
  selectedExercisesForGroup,
  selectedExerciseForHistory,
  searchExercise,
  progressionRate,
  onDragEnd,
  onToggleSelection,
  onToggleHistory,
  onUpdate,
  onDuplicate,
  onRemove,
  onApplyProgression,
  onAddExercise,
  onSearchChange,
}) => {
  const getExerciseById = (id: string) => exerciseLibrary.find(ex => ex.id === id);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="exercises">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4 mb-6"
            >
              {exercises.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Dumbbell className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No hay ejercicios en esta sesión</p>
                  {isEditMode && <p className="text-sm mt-2">Agrega ejercicios usando el selector abajo</p>}
                </div>
              ) : (
                exercises.map((exercise, exerciseIndex) => {
                  const exerciseData = getExerciseById(exercise.exerciseId);
                  const progression = getProgressionIndicator(exercise);
                  const suggestedWt = suggestNextWeight(exercise, progressionRate);
                  const isSelected = selectedExercisesForGroup.includes(exerciseIndex);

                  return (
                    <ExerciseCard
                      key={exerciseIndex}
                      exercise={exercise}
                      exerciseData={exerciseData}
                      exerciseIndex={exerciseIndex}
                      isEditMode={isEditMode}
                      isSelected={isSelected}
                      progression={progression}
                      suggestedWeight={suggestedWt}
                      selectedExerciseForHistory={selectedExerciseForHistory}
                      onToggleSelection={() => onToggleSelection(exerciseIndex)}
                      onToggleHistory={() => onToggleHistory(
                        selectedExerciseForHistory === exercise.exerciseId ? '' : exercise.exerciseId
                      )}
                      onUpdate={(field, value) => onUpdate(exerciseIndex, field, value)}
                      onDuplicate={() => onDuplicate(exerciseIndex)}
                      onRemove={() => onRemove(exerciseIndex)}
                      onApplyProgression={() => onApplyProgression(exerciseIndex)}
                      onApplySuggestedWeight={() => {
                        if (suggestedWt) onUpdate(exerciseIndex, 'weight', suggestedWt);
                      }}
                    />
                  );
                })
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Exercise Section */}
      {isEditMode && (
        <div className="border-t-2 border-gray-100 pt-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Añadir Ejercicio
          </h4>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar ejercicio..."
                value={searchExercise}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {exerciseLibrary
              .filter(ex => ex.name.toLowerCase().includes(searchExercise.toLowerCase()))
              .map(exercise => (
                <button
                  key={exercise.id}
                  onClick={() => onAddExercise(exercise.id)}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 hover:border-orange-300 border-2 border-transparent transition-all text-left"
                >
                  <div className="text-2xl">{exercise.image}</div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{exercise.name}</div>
                    <div className="text-xs text-gray-500">{exercise.muscleGroup}</div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseList;
