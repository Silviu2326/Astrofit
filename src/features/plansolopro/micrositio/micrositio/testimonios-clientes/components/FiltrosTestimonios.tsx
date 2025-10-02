import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Star, Briefcase } from 'lucide-react';

interface FiltrosTestimoniosProps {
  onFilterChange: (filters: { serviceType?: string; rating?: number | null }) => void;
  currentFilters: { serviceType: string; rating: number | null };
}

export const FiltrosTestimonios: React.FC<FiltrosTestimoniosProps> = ({ onFilterChange, currentFilters }) => {
  const serviceTypes = ['Todos', 'Marketing Digital', 'Desarrollo Web', 'Diseño Gráfico'];
  const ratings = [null, 5, 4, 3, 2, 1]; // null para 'Todas las estrellas'

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ serviceType: e.target.value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'null' ? null : Number(e.target.value);
    onFilterChange({ rating: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header del filtro */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white shadow-lg">
          <Filter className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Filtrar Testimonios</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Filtro de Tipo de Servicio */}
        <div className="flex flex-col">
          <label htmlFor="serviceType" className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2 uppercase tracking-wide">
            <Briefcase className="w-4 h-4 text-amber-600" />
            Tipo de Servicio
          </label>
          <div className="relative">
            <select
              id="serviceType"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer font-medium text-gray-700"
              value={currentFilters.serviceType}
              onChange={handleServiceTypeChange}
            >
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filtro de Rating */}
        <div className="flex flex-col">
          <label htmlFor="rating" className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2 uppercase tracking-wide">
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            Rating Mínimo
          </label>
          <div className="relative">
            <select
              id="rating"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer font-medium text-gray-700"
              value={currentFilters.rating === null ? 'null' : currentFilters.rating}
              onChange={handleRatingChange}
            >
              <option value="null">Todas las estrellas</option>
              {ratings.filter(r => r !== null).map(r => (
                <option key={r} value={r!}>⭐ {r} estrellas o más</option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de filtro activo */}
      {(currentFilters.serviceType !== 'Todos' || currentFilters.rating !== null) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 font-medium">Filtros activos:</span>
            {currentFilters.serviceType !== 'Todos' && (
              <div className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-300">
                <span className="text-xs font-bold text-amber-700">{currentFilters.serviceType}</span>
              </div>
            )}
            {currentFilters.rating !== null && (
              <div className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-300 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                <span className="text-xs font-bold text-amber-700">{currentFilters.rating}+ estrellas</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
