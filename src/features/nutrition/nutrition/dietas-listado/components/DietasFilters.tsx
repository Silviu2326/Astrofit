import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Calendar, Target, UserCheck } from 'lucide-react';

interface DietasFiltersProps {
  onFilterChange: (filters: any) => void;
  currentFilters: {
    estado: string;
    search: string;
    objetivo: string;
    nutricionista: string;
    fechaInicio: string;
  };
}

export const DietasFilters: React.FC<DietasFiltersProps> = ({ onFilterChange, currentFilters }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ estado: e.target.value });
  };

  const handleObjetivoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ objetivo: e.target.value });
  };

  const handleNutricionistaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ nutricionista: e.target.value });
  };

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ fechaInicio: e.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      estado: '',
      search: '',
      objetivo: '',
      nutricionista: '',
      fechaInicio: ''
    });
  };

  const hasActiveFilters =
    currentFilters.estado ||
    currentFilters.search ||
    currentFilters.objetivo ||
    currentFilters.nutricionista ||
    currentFilters.fechaInicio;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-lime-200 to-green-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 space-y-4">
        {/* Búsqueda principal y filtros básicos */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por cliente o plan..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100 transition-all duration-300 outline-none bg-white"
              value={currentFilters.search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Estado */}
          <div className="sm:w-48 relative">
            <select
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100 transition-all duration-300 outline-none bg-white appearance-none cursor-pointer font-medium text-gray-700"
              value={currentFilters.estado}
              onChange={handleEstadoChange}
            >
              <option value="">Todos los estados</option>
              <option value="activo">✅ Activo</option>
              <option value="en pausa">⏸️ En pausa</option>
              <option value="completado">✔️ Completado</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Botón filtros avanzados */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              showAdvanced
                ? 'bg-gradient-to-br from-lime-500 to-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-5 h-5" />
            Más filtros
          </button>

          {/* Botón limpiar filtros */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleClearFilters}
              className="px-6 py-3 rounded-2xl font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <X className="w-5 h-5" />
              Limpiar
            </motion.button>
          )}
        </div>

        {/* Filtros avanzados */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros Avanzados
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Objetivo */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Objetivo Nutricional
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100 transition-all duration-300 outline-none bg-white appearance-none cursor-pointer text-sm"
                      value={currentFilters.objetivo}
                      onChange={handleObjetivoChange}
                    >
                      <option value="">Todos los objetivos</option>
                      <option value="Pérdida de peso">Pérdida de peso</option>
                      <option value="Ganancia muscular">Ganancia muscular</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Definición muscular">Definición muscular</option>
                      <option value="Salud digestiva">Salud digestiva</option>
                      <option value="Control colesterol">Control colesterol</option>
                      <option value="Control hipertensión">Control hipertensión</option>
                      <option value="Recomposición corporal">Recomposición corporal</option>
                      <option value="Salud cardiovascular">Salud cardiovascular</option>
                      <option value="Rendimiento atlético">Rendimiento atlético</option>
                      <option value="Salud articular">Salud articular</option>
                    </select>
                  </div>

                  {/* Nutricionista */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      Nutricionista Asignado
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100 transition-all duration-300 outline-none bg-white appearance-none cursor-pointer text-sm"
                      value={currentFilters.nutricionista}
                      onChange={handleNutricionistaChange}
                    >
                      <option value="">Todos los nutricionistas</option>
                      <option value="Dra. Laura Gómez">Dra. Laura Gómez</option>
                      <option value="Dr. Carlos Ruiz">Dr. Carlos Ruiz</option>
                      <option value="Lic. Sofia Torres">Lic. Sofia Torres</option>
                    </select>
                  </div>

                  {/* Fecha de inicio */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Fecha de Inicio (desde)
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100 transition-all duration-300 outline-none bg-white text-sm"
                      value={currentFilters.fechaInicio}
                      onChange={handleFechaInicioChange}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resumen de filtros activos */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2"
          >
            {currentFilters.estado && (
              <div className="px-3 py-1 bg-lime-50 border border-lime-200 rounded-full text-xs font-semibold text-lime-700 flex items-center gap-1">
                Estado: {currentFilters.estado}
                <button onClick={() => onFilterChange({ estado: '' })} className="hover:text-lime-900">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {currentFilters.objetivo && (
              <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-semibold text-green-700 flex items-center gap-1">
                Objetivo: {currentFilters.objetivo}
                <button onClick={() => onFilterChange({ objetivo: '' })} className="hover:text-green-900">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {currentFilters.nutricionista && (
              <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700 flex items-center gap-1">
                Nutricionista: {currentFilters.nutricionista}
                <button onClick={() => onFilterChange({ nutricionista: '' })} className="hover:text-emerald-900">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {currentFilters.fechaInicio && (
              <div className="px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-semibold text-teal-700 flex items-center gap-1">
                Desde: {currentFilters.fechaInicio}
                <button onClick={() => onFilterChange({ fechaInicio: '' })} className="hover:text-teal-900">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
