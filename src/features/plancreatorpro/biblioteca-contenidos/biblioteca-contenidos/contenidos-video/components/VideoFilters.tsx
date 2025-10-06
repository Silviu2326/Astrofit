import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Clock, Monitor, TrendingUp, Calendar, Star, Eye } from 'lucide-react';

interface VideoFiltersProps {
  sortBy: 'relevance' | 'date' | 'views' | 'rating';
  setSortBy: (sort: 'relevance' | 'date' | 'views' | 'rating') => void;
  durationFilter: 'all' | 'short' | 'medium' | 'long';
  setDurationFilter: (duration: 'all' | 'short' | 'medium' | 'long') => void;
  qualityFilter: 'all' | 'hd' | 'sd';
  setQualityFilter: (quality: 'all' | 'hd' | 'sd') => void;
}

const VideoFilters: React.FC<VideoFiltersProps> = ({
  sortBy,
  setSortBy,
  durationFilter,
  setDurationFilter,
  qualityFilter,
  setQualityFilter
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevancia', icon: TrendingUp },
    { value: 'date', label: 'Más Recientes', icon: Calendar },
    { value: 'views', label: 'Más Vistos', icon: Eye },
    { value: 'rating', label: 'Mejor Valorados', icon: Star }
  ];

  const durationOptions = [
    { value: 'all', label: 'Todas las duraciones' },
    { value: 'short', label: 'Cortos (<5min)' },
    { value: 'medium', label: 'Medios (5-20min)' },
    { value: 'long', label: 'Largos (>20min)' }
  ];

  const qualityOptions = [
    { value: 'all', label: 'Todas las calidades' },
    { value: 'hd', label: 'HD (1080p+)' },
    { value: 'sd', label: 'SD (480p)' }
  ];

  const getSortIcon = () => {
    const option = sortOptions.find(o => o.value === sortBy);
    return option ? option.icon : TrendingUp;
  };

  const SortIcon = getSortIcon();

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Botón de mostrar filtros */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300 font-medium text-gray-700"
        >
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Ordenar por */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Ordenar por:</span>
          <div className="relative flex-1 max-w-xs">
            <SortIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300 outline-none bg-white appearance-none cursor-pointer font-medium text-gray-700"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Panel de filtros expandible */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Filtro de duración */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4" />
                  Duración
                </label>
                <div className="relative">
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value as any)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300 outline-none bg-white appearance-none cursor-pointer font-medium text-gray-700"
                  >
                    {durationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Filtro de calidad */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Monitor className="w-4 h-4" />
                  Calidad
                </label>
                <div className="relative">
                  <select
                    value={qualityFilter}
                    onChange={(e) => setQualityFilter(e.target.value as any)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-300 outline-none bg-white appearance-none cursor-pointer font-medium text-gray-700"
                  >
                    {qualityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Botón de limpiar filtros */}
            {(durationFilter !== 'all' || qualityFilter !== 'all') && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setDurationFilter('all');
                  setQualityFilter('all');
                }}
                className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                Limpiar filtros
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoFilters;
