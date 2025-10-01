
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  notes: string;
}

interface Block {
  id: string;
  type: 'Calentamiento' | 'Fuerza' | 'Cardio' | 'Cool-down';
  name: string;
  exercises: Exercise[];
}

const initialBlocks: Block[] = [
  {
    id: 'block-1',
    type: 'Calentamiento',
    name: 'Calentamiento',
    exercises: [],
  },
  {
    id: 'block-2',
    type: 'Fuerza',
    name: 'Fuerza Principal',
    exercises: [],
  },
  {
    id: 'block-3',
    type: 'Cardio',
    name: 'Cardio',
    exercises: [],
  },
  {
    id: 'block-4',
    type: 'Cool-down',
    name: 'Enfriamiento',
    exercises: [],
  },
];

const BloquesEntrenamiento: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([
    { id: 'ex-1', name: 'Flexiones', sets: 3, reps: '10-12', weight: 'Peso corporal', notes: '' },
    { id: 'ex-2', name: 'Sentadillas', sets: 3, reps: '8-10', weight: '50kg', notes: '' },
    { id: 'ex-3', name: 'Press Banca', sets: 4, reps: '6-8', weight: '60kg', notes: '' },
    { id: 'ex-4', name: 'Remo con Barra', sets: 3, reps: '10-12', weight: '40kg', notes: '' },
    { id: 'ex-5', name: 'Dominadas', sets: 3, reps: 'AMRAP', weight: 'Peso corporal', notes: '' },
  ]);

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    // Handle dragging from available exercises to a block
    if (source.droppableId === 'available-exercises' && destination.droppableId.startsWith('block-')) {
      const newExercise = availableExercises.find(ex => ex.id === draggableId);
      if (newExercise) {
        const newBlocks = blocks.map(block => {
          if (block.id === destination.droppableId) {
            return {
              ...block,
              exercises: [...block.exercises, { ...newExercise, id: `${newExercise.id}-${Date.now()}` }], // Add unique ID
            };
          }
          return block;
        });
        setBlocks(newBlocks);
      }
      return;
    }

    // Handle reordering within a block or moving between blocks
    const sourceBlockIndex = blocks.findIndex(block => block.id === source.droppableId);
    const destinationBlockIndex = blocks.findIndex(block => block.id === destination.droppableId);

    if (sourceBlockIndex === -1 || destinationBlockIndex === -1) {
      return;
    }

    const sourceBlock = blocks[sourceBlockIndex];
    const destinationBlock = blocks[destinationBlockIndex];

    // Moving within the same block
    if (source.droppableId === destination.droppableId) {
      const newExercises = Array.from(sourceBlock.exercises);
      const [reorderedItem] = newExercises.splice(source.index, 1);
      newExercises.splice(destination.index, 0, reorderedItem);

      const newBlocks = blocks.map((block, index) =>
        index === sourceBlockIndex ? { ...block, exercises: newExercises } : block
      );
      setBlocks(newBlocks);
    } else {
      // Moving between different blocks
      const sourceExercises = Array.from(sourceBlock.exercises);
      const destinationExercises = Array.from(destinationBlock.exercises);
      const [movedItem] = sourceExercises.splice(source.index, 1);
      destinationExercises.splice(destination.index, 0, movedItem);

      const newBlocks = blocks.map((block, index) => {
        if (index === sourceBlockIndex) {
          return { ...block, exercises: sourceExercises };
        }
        if (index === destinationBlockIndex) {
          return { ...block, exercises: destinationExercises };
        }
        return block;
      });
      setBlocks(newBlocks);
    }
  };

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      name: type,
      exercises: [],
    };
    setBlocks([...blocks, newBlock]);
  };

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find(block => block.id === blockId);
    if (blockToDuplicate) {
      const duplicatedBlock: Block = {
        ...blockToDuplicate,
        id: `block-${Date.now()}-duplicated`,
        name: `${blockToDuplicate.name} (Copia)`,
        exercises: blockToDuplicate.exercises.map(ex => ({ ...ex, id: `${ex.id}-${Date.now()}` })), // Deep copy exercises with new IDs
      };
      setBlocks([...blocks, duplicatedBlock]);
    }
  };

  const updateExerciseNotes = (blockId: string, exerciseId: string, notes: string) => {
    setBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId
          ? {
              ...block,
              exercises: block.exercises.map(ex =>
                ex.id === exerciseId ? { ...ex, notes } : ex
              ),
            }
          : block
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Bloques de Entrenamiento</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Ejercicios Disponibles</h3>
          <Droppable droppableId="available-exercises" isDropDisabled={true}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-3 rounded shadow-inner flex flex-wrap gap-2"
              >
                {availableExercises.map((exercise, index) => (
                  <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 border rounded shadow text-sm"
                      >
                        {exercise.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="flex gap-4 mb-4">
          <button onClick={() => addBlock('Calentamiento')} className="bg-blue-500 text-white px-4 py-2 rounded">
            Añadir Calentamiento
          </button>
          <button onClick={() => addBlock('Fuerza')} className="bg-green-500 text-white px-4 py-2 rounded">
            Añadir Fuerza
          </button>
          <button onClick={() => addBlock('Cardio')} className="bg-red-500 text-white px-4 py-2 rounded">
            Añadir Cardio
          </button>
          <button onClick={() => addBlock('Cool-down')} className="bg-purple-500 text-white px-4 py-2 rounded">
            Añadir Enfriamiento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blocks.map((block, blockIndex) => (
            <div key={block.id} className="bg-white p-4 rounded shadow-md border-t-4 border-blue-400">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{block.name}</h3>
                <button onClick={() => duplicateBlock(block.id)} className="text-sm text-gray-500 hover:text-gray-700">
                  Duplicar Bloque
                </button>
              </div>
              <Droppable droppableId={block.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[100px] bg-gray-50 p-3 rounded border border-dashed"
                  >
                    {block.exercises.length === 0 && <p className="text-gray-400">Arrastra ejercicios aquí</p>}
                    {block.exercises.map((exercise, exIndex) => (
                      <Draggable key={exercise.id} draggableId={exercise.id} index={exIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-blue-100 p-2 mb-2 rounded shadow-sm flex flex-col"
                          >
                            <span className="font-medium">{exercise.name}</span>
                            <span className="text-sm text-gray-600">Sets: {exercise.sets}, Reps: {exercise.reps}, Peso: {exercise.weight}</span>
                            <textarea
                              className="mt-1 p-1 w-full text-sm border rounded"
                              placeholder="Notas para este ejercicio..."
                              value={exercise.notes}
                              onChange={(e) => updateExerciseNotes(block.id, exercise.id, e.target.value)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default BloquesEntrenamiento;
