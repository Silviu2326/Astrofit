import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
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

  // Función para aplicar filtros automáticamente
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        estado: estado === 'todas' ? undefined : (estado as Tarea['estado']),
        fechaVencimiento: fechaVencimiento || undefined,
        asignadoA: asignadoA || undefined,
        clienteRelacionado: clienteRelacionado || undefined,
      });
    }
  };

  const handleClearFilters = () => {
    setEstado('todas');
    setFechaVencimiento('');
    setAsignadoA('');
    setClienteRelacionado('');
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  // Aplicar filtros automáticamente cuando cambien los valores
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300); // Delay de 300ms para evitar demasiadas actualizaciones

    return () => clearTimeout(timeoutId);
  }, [estado, fechaVencimiento, asignadoA, clienteRelacionado]);

  const hasActiveFilters = estado !== 'todas' || fechaVencimiento || asignadoA || clienteRelacionado;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">Filtros de Tareas</h2>
        {hasActiveFilters && (
          <div className="ml-auto">
            <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
              Filtros activos
            </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="filterEstado" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="filterEstado"
            value={estado}
            onChange={(e) => setEstado(e.target.value as Tarea['estado'] | '' | 'todas')}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="filterAsignadoA" className="block text-sm font-medium text-gray-700">Asignado a</label>
          <input
            type="text"
            id="filterAsignadoA"
            value={asignadoA}
            onChange={(e) => setAsignadoA(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="filterClienteRelacionado" className="block text-sm font-medium text-gray-700">Cliente Relacionado</label>
          <input
            type="text"
            id="filterClienteRelacionado"
            value={clienteRelacionado}
            onChange={(e) => setClienteRelacionado(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>
      {hasActiveFilters && (
        <div className="pt-4">
          <button
            onClick={handleClearFilters}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Limpiar Todos los Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default TareasFilters;