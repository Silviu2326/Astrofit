import React from 'react';

interface FiltrosCursosProps {
  filtroEstado: string;
  setFiltroEstado: (estado: string) => void;
  filtroCategoria: string;
  setFiltroCategoria: (categoria: string) => void;
}

const FiltrosCursos: React.FC<FiltrosCursosProps> = ({
  filtroEstado,
  setFiltroEstado,
  filtroCategoria,
  setFiltroCategoria,
}) => {
  const estados = ['todos', 'borrador', 'activo', 'pausado'];
  const categorias = ['todas', 'Desarrollo Web', 'Diseño UI/UX', 'Marketing']; // Example categories

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label htmlFor="estado" className="font-medium text-gray-700">Estado:</label>
        <select
          id="estado"
          className="border border-gray-300 rounded-md p-2"
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
          className="border border-gray-300 rounded-md p-2"
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
  );
};

export default FiltrosCursos;
