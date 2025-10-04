import React from 'react';
import { Search } from 'lucide-react';

interface FiltrosCursosProps {
  filtroEstado: string;
  setFiltroEstado: (estado: string) => void;
  filtroCategoria: string;
  setFiltroCategoria: (categoria: string) => void;
  busqueda: string;
  setBusqueda: (busqueda: string) => void;
}

const FiltrosCursos: React.FC<FiltrosCursosProps> = ({
  filtroEstado,
  setFiltroEstado,
  filtroCategoria,
  setFiltroCategoria,
  busqueda,
  setBusqueda,
}) => {
  const estados = ['todos', 'borrador', 'activo', 'pausado'];
  const categorias = ['todas', 'Desarrollo Web', 'Diseño UI/UX', 'Marketing']; // Example categories

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por título o categoría..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="estado" className="font-medium text-gray-700">Estado:</label>
          <select
            id="estado"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            {estados.map(estado => (
              <option key={estado} value={estado}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="categoria" className="font-medium text-gray-700">Categoría:</label>
          <select
            id="categoria"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrosCursos;
