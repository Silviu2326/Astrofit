import React, { useState } from 'react';
import { Tarea } from '../tareasApi';

interface TareasFiltersProps {
  onFilterChange?: (filters: {
    estado?: Tarea['estado'];
    fechaVencimiento?: string;
    asignadoA?: string;
    clienteRelacionado?: string;
  }) => void;
}

const TareasFilters: React.FC<TareasFiltersProps> = ({ onFilterChange }) => {
  const [estado, setEstado] = useState<Tarea['estado'] | '' | 'todas'>('todas');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [asignadoA, setAsignadoA] = useState('');
  const [clienteRelacionado, setClienteRelacionado] = useState('');

  const handleFilterApply = () => {
    if (onFilterChange) {
      onFilterChange({
        estado: estado === 'todas' ? undefined : (estado as Tarea['estado']),
        fechaVencimiento: fechaVencimiento || undefined,
        asignadoA: asignadoA || undefined,
        clienteRelacionado: clienteRelacionado || undefined,
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-3">Filtros de Tareas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="filterEstado" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="filterEstado"
            value={estado}
            onChange={(e) => setEstado(e.target.value as Tarea['estado'] | '' | 'todas')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
            <option value="vencida">Vencida</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterFechaVencimiento" className="block text-sm font-medium text-gray-700">Fecha Vencimiento</label>
          <input
            type="date"
            id="filterFechaVencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="filterAsignadoA" className="block text-sm font-medium text-gray-700">Asignado a</label>
          <input
            type="text"
            id="filterAsignadoA"
            value={asignadoA}
            onChange={(e) => setAsignadoA(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="filterClienteRelacionado" className="block text-sm font-medium text-gray-700">Cliente Relacionado</label>
          <input
            type="text"
            id="filterClienteRelacionado"
            value={clienteRelacionado}
            onChange={(e) => setClienteRelacionado(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <button
        onClick={handleFilterApply}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default TareasFilters;