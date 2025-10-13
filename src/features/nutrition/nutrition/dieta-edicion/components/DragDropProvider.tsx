import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Recipe, Comida } from '../types';

interface DragDropContextType {
  draggedItem: Recipe | null;
  setDraggedItem: (item: Recipe | null) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  dropZones: string[];
  setDropZones: (zones: string[]) => void;
}

const DragDropContextProvider = createContext<DragDropContextType | null>(null);

export const useDragDrop = () => {
  const context = useContext(DragDropContextProvider);
  if (!context) {
    throw new Error('useDragDrop must be used within DragDropProvider');
  }
  return context;
};

interface DragDropProviderProps {
  children: React.ReactNode;
  onRecipeMove: (recipeId: string, fromSlot: string, toSlot: string) => void;
  onRecipeAdd: (recipe: Recipe, toSlot: string) => void;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  onRecipeMove,
  onRecipeAdd
}) => {
  const [draggedItem, setDraggedItem] = useState<Recipe | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dropZones, setDropZones] = useState<string[]>([]);

  const handleDragStart = useCallback((result: any) => {
    const { draggableId, source } = result;
    setIsDragging(true);
    // Aquí podrías obtener la receta por ID
    console.log('Drag started:', draggableId, 'from', source.droppableId);
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;
    setIsDragging(false);
    setDropZones([]);

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Determinar si es un movimiento o una adición
    if (source.droppableId === 'recipe-catalog') {
      // Añadir nueva receta
      onRecipeAdd(draggedItem!, destination.droppableId);
    } else {
      // Mover receta existente
      onRecipeMove(draggedItem!.id, source.droppableId, destination.droppableId);
    }
  }, [draggedItem, onRecipeMove, onRecipeAdd]);

  const handleDragUpdate = useCallback((result: any) => {
    const { destination } = result;
    if (destination) {
      setDropZones([destination.droppableId]);
    } else {
      setDropZones([]);
    }
  }, []);

  const value: DragDropContextType = {
    draggedItem,
    setDraggedItem,
    isDragging,
    setIsDragging,
    dropZones,
    setDropZones
  };

  return (
    <DragDropContextProvider.Provider value={value}>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragUpdate={handleDragUpdate}
      >
        {children}
        
        {/* Overlay de drag activo */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-blue-500/10 backdrop-blur-sm z-40 pointer-events-none"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-500"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">Arrastra la receta</p>
                    <p className="text-sm text-gray-600">Suelta en cualquier slot de comida</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DragDropContext>
    </DragDropContextProvider.Provider>
  );
};

// Componente para slots de comida con drop zones
interface DropZoneProps {
  slotId: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ slotId, children, className = '', isActive = false }) => {
  const { dropZones } = useDragDrop();
  const isDropTarget = dropZones.includes(slotId);

  return (
    <Droppable droppableId={slotId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
            relative transition-all duration-200
            ${isDropTarget || snapshot.isDraggingOver
              ? 'bg-blue-50 border-2 border-blue-400 border-dashed scale-105 shadow-lg'
              : 'bg-white border border-gray-200'
            }
            ${isActive ? 'ring-2 ring-blue-500' : ''}
            ${className}
          `}
        >
          {children}
          {provided.placeholder}
          
          {/* Indicador visual de drop zone */}
          {snapshot.isDraggingOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-blue-100/50 rounded-lg flex items-center justify-center"
            >
              <div className="text-blue-600 font-semibold text-sm">
                ✨ Suelta aquí
              </div>
            </motion.div>
          )}
        </div>
      )}
    </Droppable>
  );
};

// Componente para recetas draggables
interface DraggableRecipeProps {
  recipe: Recipe;
  index: number;
  children: React.ReactNode;
  className?: string;
}

export const DraggableRecipe: React.FC<DraggableRecipeProps> = ({ 
  recipe, 
  index, 
  children, 
  className = '' 
}) => {
  return (
    <Draggable draggableId={recipe.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            transition-all duration-200
            ${snapshot.isDragging
              ? 'rotate-3 scale-105 shadow-2xl z-50'
              : 'hover:scale-102 hover:shadow-lg'
            }
            ${className}
          `}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};
