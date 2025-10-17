import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { searchExperiments } from '../historialExperimentosApi';

const BuscadorTests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim() && !filterType && !filterDate) {
      toast.error('Por favor, ingresa al menos un criterio de búsqueda');
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchExperiments({
        type: filterType || undefined,
        date: filterDate || undefined
      });
      
      toast.success(`Búsqueda completada. Se encontraron ${results.length} experimentos`);
      // Aquí podrías actualizar el estado de los resultados en el componente padre
    } catch (error) {
      toast.error('Error al realizar la búsqueda');
    } finally {
      setIsSearching(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterDate('');
    toast.success('Filtros limpiados');
  };

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por descripción, notas o resultados..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro por tipo */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="UI">UI/UX</option>
            <option value="Content">Contenido</option>
            <option value="Feature">Funcionalidad</option>
            <option value="Performance">Rendimiento</option>
            <option value="Conversion">Conversión</option>
          </select>
        </div>

        {/* Filtro por fecha */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={isSearching}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Buscando...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Buscar
              </>
            )}
          </motion.button>

          {(searchTerm || filterType || filterDate) && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearFilters}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Indicadores de filtros activos */}
      {(searchTerm || filterType || filterDate) && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              Búsqueda: "{searchTerm}"
              <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-indigo-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filterType && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Tipo: {filterType}
              <button onClick={() => setFilterType('')} className="ml-1 hover:text-purple-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filterDate && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              Fecha: {new Date(filterDate).toLocaleDateString()}
              <button onClick={() => setFilterDate('')} className="ml-1 hover:text-emerald-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BuscadorTests;
