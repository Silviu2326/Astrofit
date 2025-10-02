import React from 'react';

interface FiltrosCuponesProps {
  filterEstado: string;
  setFilterEstado: (value: string) => void;
  filterTipo: string;
  setFilterTipo: (value: string) => void;
}

export const FiltrosCupones: React.FC<FiltrosCuponesProps> = ({
  filterEstado,
  setFilterEstado,
  filterTipo,
  setFilterTipo
}) => {
  return (
    <>
      {/* Estado */}
      <div className="flex flex-col">
        <label htmlFor="estado" className="text-sm font-semibold text-gray-700 mb-2">
          Estado
        </label>
        <select
          id="estado"
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
        >
          <option value="">Todos los estados</option>
          <option value="activo">✅ Activo</option>
          <option value="caducado">⏰ Caducado</option>
          <option value="agotado">🚫 Agotado</option>
        </select>
      </div>

      {/* Tipo */}
      <div className="flex flex-col">
        <label htmlFor="tipoDescuento" className="text-sm font-semibold text-gray-700 mb-2">
          Tipo de Descuento
        </label>
        <select
          id="tipoDescuento"
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
        >
          <option value="">Todos los tipos</option>
          <option value="porcentaje">📊 Porcentaje</option>
          <option value="fijo">💵 Monto Fijo</option>
        </select>
      </div>
    </>
  );
};
