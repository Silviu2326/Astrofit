import React from 'react';

interface EntrenamientosActionsProps {
  viewMode: 'table' | 'cards';
  setViewMode: (mode: 'table' | 'cards') => void;
}

const EntrenamientosActions: React.FC<EntrenamientosActionsProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Crear Nuevo Entrenamiento
        </button>
      </div>
      <div>
        <button
          className={`py-2 px-4 rounded-l ${viewMode === 'table' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setViewMode('table')}
        >
          Tabla
        </button>
        <button
          className={`py-2 px-4 rounded-r ${viewMode === 'cards' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setViewMode('cards')}
        >
          Tarjetas
        </button>
      </div>
    </div>
  );
};

export default EntrenamientosActions;
