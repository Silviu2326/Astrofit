import React from 'react';

interface FiltroEstadosProps {
  onSelectEstado: (estado: 'todos' | 'activo' | 'vencido' | 'pausado') => void;
}

const FiltroEstados: React.FC<FiltroEstadosProps> = ({ onSelectEstado }) => {
  return (
    <div className="mb-4">
      <label htmlFor="estado-filtro" className="block text-sm font-medium text-gray-700">Filtrar por Estado:</label>
      <select
        id="estado-filtro"
        onChange={(e) => onSelectEstado(e.target.value as 'todos' | 'activo' | 'vencido' | 'pausado')}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="todos">Todos</option>
        <option value="activo">Activo</option>
        <option value="vencido">Vencido</option>
        <option value="pausado">Pausado</option>
      </select>
    </div>
  );
};

export default FiltroEstados;
