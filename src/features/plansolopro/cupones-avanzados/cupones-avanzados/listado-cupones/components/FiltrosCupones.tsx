import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

export const FiltrosCupones: React.FC = () => {
  const [filtros, setFiltros] = useState({
    estado: '',
    tipoDescuento: '',
    busqueda: ''
  });

  const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handleLimpiarFiltros = () => {
    setFiltros({
      estado: '',
      tipoDescuento: '',
      busqueda: ''
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtros de Búsqueda</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label htmlFor="busqueda" className="text-sm font-medium text-gray-700 mb-1">
            Buscar Cupón
          </label>
          <div className="relative">
            <input
              type="text"
              id="busqueda"
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleFiltroChange}
              placeholder="Código o nombre..."
              className="w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="estado" className="text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            value={filtros.estado}
            onChange={handleFiltroChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todos</option>
            <option value="activo">Activo</option>
            <option value="caducado">Caducado</option>
            <option value="agotado">Agotado</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="tipoDescuento" className="text-sm font-medium text-gray-700 mb-1">
            Tipo de Descuento
          </label>
          <select
            id="tipoDescuento"
            name="tipoDescuento"
            value={filtros.tipoDescuento}
            onChange={handleFiltroChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todos</option>
            <option value="porcentaje">Porcentaje</option>
            <option value="fijo">Fijo</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleLimpiarFiltros}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};
