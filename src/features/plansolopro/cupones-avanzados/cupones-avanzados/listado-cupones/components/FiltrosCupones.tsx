import React from 'react';

export const FiltrosCupones: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <label htmlFor="estado" className="text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          id="estado"
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
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Todos</option>
          <option value="porcentaje">Porcentaje</option>
          <option value="fijo">Fijo</option>
        </select>
      </div>
    </div>
  );
};
