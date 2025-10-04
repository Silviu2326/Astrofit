import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, TrendingUp, MapPin, Calendar, Dumbbell } from 'lucide-react';
import { Objective, Level, Modality } from '../plantillasEntrenosApi';

interface PlantillasFiltersProps {
  filters: {
    search: string;
    objective: Objective | '';
    level: Level | '';
    modality: Modality | '';
    showFavorites: boolean;
    showMyTemplates: boolean;
  };
  onFilterChange: (name: string, value: string | boolean) => void;
}

const PlantillasFilters: React.FC<PlantillasFiltersProps> = ({ filters, onFilterChange }) => {
  const objectives: { value: Objective | ''; label: string }[] = [
    { value: '', label: 'Todos los objetivos' },
    { value: 'hipertrofia', label: 'Hipertrofia' },
    { value: 'perdida_grasa', label: 'Pérdida de Grasa' },
    { value: 'preparacion_fisica', label: 'Preparación Física' },
  ];

  const levels: { value: Level | ''; label: string }[] = [
    { value: '', label: 'Todos los niveles' },
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' },
  ];

  const modalities: { value: Modality | ''; label: string }[] = [
    { value: '', label: 'Todas las modalidades' },
    { value: 'gimnasio', label: 'Gimnasio' },
    { value: 'casa', label: 'Entrenamiento en Casa' },
    { value: 'outdoor', label: 'Outdoor' },
  ];

  return (
    <div className="space-y-6">
      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          id="search"
          name="search"
          value={filters.search}
          onChange={(e) => onFilterChange(e.target.name, e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          placeholder="Buscar plantilla por nombre o descripción..."
        />
      </div>

      {/* Grid de filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Objetivo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="objective" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            <Target size={16} className="text-purple-600" />
            Objetivo
          </label>
          <select
            id="objective"
            name="objective"
            value={filters.objective}
            onChange={(e) => onFilterChange(e.target.name, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
          >
            {objectives.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </motion.div>

        {/* Nivel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="level" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            <TrendingUp size={16} className="text-blue-600" />
            Nivel
          </label>
          <select
            id="level"
            name="level"
            value={filters.level}
            onChange={(e) => onFilterChange(e.target.name, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
          >
            {levels.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </motion.div>

        {/* Modalidad */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="modality" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            <MapPin size={16} className="text-green-600" />
            Modalidad
          </label>
          <select
            id="modality"
            name="modality"
            value={filters.modality}
            onChange={(e) => onFilterChange(e.target.name, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
          >
            {modalities.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* Checkboxes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 pt-4 border-t-2 border-gray-100"
      >
        <label className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl cursor-pointer hover:from-pink-100 hover:to-rose-100 transition-all duration-300 border border-pink-200">
          <input
            id="showFavorites"
            name="showFavorites"
            type="checkbox"
            checked={filters.showFavorites}
            onChange={(e) => onFilterChange(e.target.name, e.target.checked)}
            className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 focus:ring-2"
          />
          <span className="text-sm font-bold text-pink-700">Solo Favoritas</span>
        </label>

        <label className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl cursor-pointer hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-200">
          <input
            id="showMyTemplates"
            name="showMyTemplates"
            type="checkbox"
            checked={filters.showMyTemplates}
            onChange={(e) => onFilterChange(e.target.name, e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 focus:ring-2"
          />
          <span className="text-sm font-bold text-purple-700">Solo Mis Plantillas</span>
        </label>
      </motion.div>
    </div>
  );
};

export default PlantillasFilters;
