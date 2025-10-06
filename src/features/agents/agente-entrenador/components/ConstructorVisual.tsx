import React, { useState, useEffect } from 'react';
import { agenteEntrenadorApi, Exercise, TrainingBlock } from '../agenteEntrenadorApi';

const ConstructorVisual: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [trainingBlocks, setTrainingBlocks] = useState<TrainingBlock[]>([]);
  const [currentBlocks, setCurrentBlocks] = useState<TrainingBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const exercisesData = agenteEntrenadorApi.getExercises();
      const blocksData = agenteEntrenadorApi.getTrainingBlocks();
      setExercises(exercisesData);
      setTrainingBlocks(blocksData);
      setCurrentBlocks(blocksData);
      setIsLoading(false);
    }, 300);
  }, []);

  if (isLoading) return <div className="text-gray-600">Cargando constructor visual...</div>;
  if (!exercises.length || !trainingBlocks.length) return <div className="text-red-600">Error al cargar datos.</div>;

  const handleDragStart = (e: React.DragEvent, exercise: Exercise) => {
    e.dataTransfer.setData('application/json', JSON.stringify(exercise));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    const droppedExercise: Exercise = JSON.parse(e.dataTransfer.getData('application/json'));

    setCurrentBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId
          ? { ...block, exercises: [...block.exercises, droppedExercise] }
          : block
      )
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exercise Bank */}
        <div className="col-span-1 border-r pr-4">
          <h3 className="text-lg font-medium mb-3">Ejercicios Disponibles</h3>
          <div className="space-y-2">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md cursor-grab"
                draggable
                onDragStart={(e) => handleDragStart(e, exercise)}
              >
                {exercise.name} ({exercise.category})
              </div>
            ))}
          </div>
        </div>

        {/* Training Blocks */}
        <div className="col-span-2 pl-4">
          <h3 className="text-lg font-medium mb-3">Bloques de Entrenamiento</h3>
          <div className="space-y-4">
            {currentBlocks.map((block) => (
              <div
                key={block.id}
                className="border border-dashed border-gray-300 p-3 rounded-md min-h-[100px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, block.id)}
              >
                <h4 className="font-semibold mb-2">{block.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {block.exercises.map((ex) => (
                    <span key={ex.id} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm">
                      {ex.name}
                    </span>
                  ))}
                </div>
                {block.exercises.length === 0 && (
                  <p className="text-gray-400 text-sm">Arrastra ejercicios aquí</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructorVisual;
