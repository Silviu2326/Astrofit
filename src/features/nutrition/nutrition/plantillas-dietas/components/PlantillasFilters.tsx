
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Flame, Clock, ChefHat } from 'lucide-react';

interface PlantillasFiltersProps {
  filters: {
    objective: string;
    dietType: string;
    time_level: string;
    culinary_experience: string;
    caloriesMin: string;
    caloriesMax: string;
    restrictions: string[];
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    objective: string;
    dietType: string;
    time_level: string;
    culinary_experience: string;
    caloriesMin: string;
    caloriesMax: string;
    restrictions: string[];
    search: string;
  }>>;
}

const PlantillasFilters: React.FC<PlantillasFiltersProps> = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      objective: '',
      dietType: '',
      time_level: '',
      culinary_experience: '',
      caloriesMin: '',
      caloriesMax: '',
      restrictions: [],
      search: '',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v =>
    Array.isArray(v) ? v.length > 0 : v !== ''
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden sticky top-4"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Filtros</h2>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-emerald-100">{activeFiltersCount} activos</p>
              )}
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReset}
              className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Búsqueda */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="Buscar plantillas..."
            />
          </div>
        </div>

        {/* Objetivo */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Objetivo
          </label>
          <select
            name="objective"
            value={filters.objective}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
          >
            <option value="">Todos los objetivos</option>
            <option value="perdida_peso">Pérdida de Peso</option>
            <option value="ganancia_muscular">Ganancia Muscular</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="definicion">Definición</option>
            <option value="volumen_limpio">Volumen Limpio</option>
            <option value="rendimiento">Rendimiento</option>
            <option value="salud_general">Salud General</option>
            <option value="recomposicion">Recomposición</option>
          </select>
        </div>

        {/* Tipo de Dieta */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Tipo de Dieta
          </label>
          <select
            name="dietType"
            value={filters.dietType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
          >
            <option value="">Todos los tipos</option>
            <option value="mediterranea">🫒 Mediterránea</option>
            <option value="keto">🥑 Keto</option>
            <option value="vegana">🌱 Vegana</option>
            <option value="vegetariana">🥕 Vegetariana</option>
            <option value="paleo">🦴 Paleo</option>
            <option value="flexible">⚖️ Flexible</option>
            <option value="intermitente">⏰ Ayuno Intermitente</option>
            <option value="baja_carbos">🍖 Baja en Carbos</option>
            <option value="alta_proteina">💪 Alta Proteína</option>
          </select>
        </div>

        {/* Calorías Diarias */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            Calorías Diarias
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                name="caloriesMin"
                value={filters.caloriesMin}
                onChange={handleChange}
                placeholder="Mín"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div>
              <input
                type="number"
                name="caloriesMax"
                value={filters.caloriesMax}
                onChange={handleChange}
                placeholder="Máx"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: '1200-1500', min: '1200', max: '1500' },
              { label: '1500-2000', min: '1500', max: '2000' },
              { label: '2000-2500', min: '2000', max: '2500' },
              { label: '2500-3000', min: '2500', max: '3000' },
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => setFilters(prev => ({ ...prev, caloriesMin: range.min, caloriesMax: range.max }))}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                  filters.caloriesMin === range.min && filters.caloriesMax === range.max
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nivel de Tiempo */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Nivel de Tiempo
          </label>
          <select
            name="time_level"
            value={filters.time_level}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
          >
            <option value="">Todos</option>
            <option value="quick">⚡ Rápidas (15-30 min)</option>
            <option value="advanced">🔧 Avanzadas (30-60 min)</option>
            <option value="no_cook">🍱 Sin Cocina</option>
          </select>
        </div>

        {/* Experiencia Culinaria */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-purple-500" />
            Experiencia Culinaria
          </label>
          <select
            name="culinary_experience"
            value={filters.culinary_experience}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
          >
            <option value="">Todos</option>
            <option value="beginner">👶 Principiante</option>
            <option value="intermediate">👨‍🍳 Intermedio</option>
            <option value="expert">⭐ Experto</option>
          </select>
        </div>

        {/* Restricciones Alimentarias */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Restricciones
          </label>
          <div className="flex flex-wrap gap-2">
            {['Sin gluten', 'Sin lactosa', 'Sin frutos secos', 'Vegano', 'Vegetariano'].map((restriction) => (
              <button
                key={restriction}
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    restrictions: prev.restrictions.includes(restriction)
                      ? prev.restrictions.filter(r => r !== restriction)
                      : [...prev.restrictions, restriction]
                  }));
                }}
                className={`px-3 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                  filters.restrictions.includes(restriction)
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {restriction}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantillasFilters;
