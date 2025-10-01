import React, { useState } from 'react';
import { Filter, X, Calendar, Users, Award } from 'lucide-react';

interface Filtros {
  division?: string;
  genero?: string;
  fecha?: string;
  categoria?: string;
}

interface FiltrosCompetenciaProps {
  onFiltrosChange: (filtros: Filtros) => void;
  filtrosActivos: Filtros;
}

const FiltrosCompetencia: React.FC<FiltrosCompetenciaProps> = ({
  onFiltrosChange,
  filtrosActivos
}) => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const divisiones = ['RX', 'Scaled', 'Masters', 'Teens', 'Adaptive'];
  const generos = ['Masculino', 'Femenino', 'Mixto'];
  const categorias = ['Individual', 'Parejas', 'Equipos'];

  const handleChange = (campo: keyof Filtros, valor: string) => {
    const nuevosFiltros = {
      ...filtrosActivos,
      [campo]: valor === '' ? undefined : valor
    };
    onFiltrosChange(nuevosFiltros);
  };

  const limpiarFiltros = () => {
    onFiltrosChange({});
  };

  const contarFiltrosActivos = () => {
    return Object.values(filtrosActivos).filter(v => v !== undefined).length;
  };

  const filtrosCount = contarFiltrosActivos();

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span className="font-medium">Filtros</span>
          {filtrosCount > 0 && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {filtrosCount}
            </span>
          )}
        </button>

        {filtrosCount > 0 && (
          <button
            onClick={limpiarFiltros}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <X className="h-4 w-4" />
            Limpiar
          </button>
        )}
      </div>

      {/* Filtros expandibles */}
      {mostrarFiltros && (
        <div className="p-4 space-y-4">
          {/* División */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Award className="h-4 w-4" />
              División
            </label>
            <select
              value={filtrosActivos.division || ''}
              onChange={(e) => handleChange('division', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Todas las divisiones</option>
              {divisiones.map(division => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </div>

          {/* Género */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4" />
              Género
            </label>
            <select
              value={filtrosActivos.genero || ''}
              onChange={(e) => handleChange('genero', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Todos los géneros</option>
              {generos.map(genero => (
                <option key={genero} value={genero}>{genero}</option>
              ))}
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4" />
              Categoría
            </label>
            <select
              value={filtrosActivos.categoria || ''}
              onChange={(e) => handleChange('categoria', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4" />
              Fecha
            </label>
            <input
              type="date"
              value={filtrosActivos.fecha || ''}
              onChange={(e) => handleChange('fecha', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}

      {/* Filtros activos (chips) */}
      {filtrosCount > 0 && (
        <div className="p-4 border-t border-gray-200 flex flex-wrap gap-2">
          {filtrosActivos.division && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              <span>{filtrosActivos.division}</span>
              <button
                onClick={() => handleChange('division', '')}
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filtrosActivos.genero && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              <span>{filtrosActivos.genero}</span>
              <button
                onClick={() => handleChange('genero', '')}
                className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filtrosActivos.categoria && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <span>{filtrosActivos.categoria}</span>
              <button
                onClick={() => handleChange('categoria', '')}
                className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filtrosActivos.fecha && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              <span>{new Date(filtrosActivos.fecha).toLocaleDateString('es-ES')}</span>
              <button
                onClick={() => handleChange('fecha', '')}
                className="hover:bg-orange-200 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltrosCompetencia;
