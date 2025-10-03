// src/features/historial-asistencias/components/FiltrosAvanzados.tsx
import React from 'react';

interface FiltrosAvanzadosProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
}

export const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({
  searchTerm,
  setSearchTerm,
  filterDate,
  setFilterDate,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        placeholder="Buscar por cliente..."
        className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          className={`py-2 px-4 rounded-md text-sm font-medium ${
            filterDate === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilterDate('all')}
        >
          Todo
        </button>
        <button
          className={`py-2 px-4 rounded-md text-sm font-medium ${
            filterDate === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilterDate('today')}
        >
          Hoy
        </button>
        <button
          className={`py-2 px-4 rounded-md text-sm font-medium ${
            filterDate === 'yesterday' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilterDate('yesterday')}
        >
          Ayer
        </button>
        <button
          className={`py-2 px-4 rounded-md text-sm font-medium ${
            filterDate === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilterDate('week')}
        >
          Esta Semana
        </button>
      </div>
    </div>
  );
};
