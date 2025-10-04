import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, X, BookOpen, Video, Download, Headphones,
  Image, Calendar, Globe, Tag, ChevronDown, Sparkles,
  Zap, Clock, TrendingUp
} from 'lucide-react';

interface FiltrosAvanzadosProps {
  onApplyFilters?: (filters: any) => void;
}

const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({ onApplyFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    contentType: string[];
    category: string[];
    difficulty: string;
    duration: string;
    dateRange: string;
    language: string;
    tags: string[];
  }>({
    contentType: [],
    category: [],
    difficulty: '',
    duration: '',
    dateRange: '',
    language: '',
    tags: []
  });

  // Opciones de filtros
  const contentTypes = [
    { id: 'article', label: 'Artículos', icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
    { id: 'video', label: 'Videos', icon: Video, color: 'from-purple-500 to-pink-600' },
    { id: 'pdf', label: 'PDFs/eBooks', icon: Download, color: 'from-emerald-500 to-teal-600' },
    { id: 'podcast', label: 'Podcasts', icon: Headphones, color: 'from-orange-500 to-red-600' },
    { id: 'infographic', label: 'Infografías', icon: Image, color: 'from-cyan-500 to-blue-600' }
  ];

  const categories = [
    'Nutrición', 'Entrenamiento', 'Bienestar', 'Motivación',
    'Negocio', 'Marketing', 'Salud Mental', 'Recetas'
  ];

  const difficulties = ['Principiante', 'Intermedio', 'Avanzado'];

  const durations = [
    { id: 'short', label: 'Cortos (<5min)', icon: Zap },
    { id: 'medium', label: 'Medios (5-15min)', icon: Clock },
    { id: 'long', label: 'Largos (>15min)', icon: Clock }
  ];

  const quickFilters = [
    { id: 'new', label: 'Nuevo esta semana', icon: Sparkles },
    { id: 'popular', label: 'Más populares', icon: TrendingUp },
    { id: 'short-videos', label: 'Videos cortos', icon: Zap },
    { id: 'free', label: 'Descargables gratis', icon: Download }
  ];

  const toggleContentType = (type: string) => {
    setActiveFilters(prev => ({
      ...prev,
      contentType: prev.contentType.includes(type)
        ? prev.contentType.filter(t => t !== type)
        : [...prev.contentType, type]
    }));
  };

  const toggleCategory = (category: string) => {
    setActiveFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      contentType: [],
      category: [],
      difficulty: '',
      duration: '',
      dateRange: '',
      language: '',
      tags: []
    });
    if (onApplyFilters) {
      onApplyFilters({});
    }
  };

  const applyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(activeFilters);
    }
  };

  const hasActiveFilters =
    activeFilters.contentType.length > 0 ||
    activeFilters.category.length > 0 ||
    activeFilters.difficulty ||
    activeFilters.duration ||
    activeFilters.dateRange;

  return (
    <div className="space-y-4">
      {/* FILTROS RÁPIDOS (Pills horizontales) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3"
      >
        {quickFilters.map((filter, index) => (
          <motion.button
            key={filter.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="px-4 py-2 bg-white/80 backdrop-blur-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-full border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 group"
          >
            <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 flex items-center gap-2">
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* PANEL DE FILTROS AVANZADOS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Header del panel */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900">Filtros Avanzados</h2>
              <p className="text-sm text-gray-600">
                {hasActiveFilters
                  ? `${activeFilters.contentType.length + activeFilters.category.length} filtros activos`
                  : 'Refina tu búsqueda'}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </motion.div>
        </button>

        {/* Pills de filtros activos */}
        {hasActiveFilters && (
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {activeFilters.contentType.map(type => {
              const contentType = contentTypes.find(ct => ct.id === type);
              return (
                <motion.div
                  key={type}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`px-3 py-1 bg-gradient-to-r ${contentType?.color} rounded-full flex items-center gap-2 text-white text-sm font-semibold`}
                >
                  {contentType?.label}
                  <button onClick={() => toggleContentType(type)}>
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              );
            })}
            {activeFilters.category.map(cat => (
              <motion.div
                key={cat}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center gap-2 text-white text-sm font-semibold"
              >
                {cat}
                <button onClick={() => toggleCategory(cat)}>
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            <button
              onClick={clearFilters}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-full text-red-600 text-sm font-semibold transition-colors"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {/* Contenido expandible */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 space-y-6">
                {/* TIPO DE CONTENIDO */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    <BookOpen className="w-4 h-4" />
                    Tipo de Contenido
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {contentTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleContentType(type.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                          activeFilters.contentType.includes(type.id)
                            ? `bg-gradient-to-br ${type.color} border-transparent text-white shadow-lg`
                            : 'bg-white border-gray-200 hover:border-indigo-300 text-gray-700'
                        }`}
                      >
                        <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                          activeFilters.contentType.includes(type.id) ? 'text-white' : 'text-gray-600'
                        }`} />
                        <span className="text-xs font-semibold block">{type.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* CATEGORÍA */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    <Tag className="w-4 h-4" />
                    Categoría
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleCategory(category)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                          activeFilters.category.includes(category)
                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 border-transparent text-white shadow-lg'
                            : 'bg-white border-gray-200 hover:border-pink-300 text-gray-700'
                        }`}
                      >
                        <span className="text-sm font-semibold">{category}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* NIVEL DE DIFICULTAD */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    <Sparkles className="w-4 h-4" />
                    Nivel de Dificultad
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {difficulties.map((level) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveFilters(prev => ({ ...prev, difficulty: level }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          activeFilters.difficulty === level
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-transparent text-white shadow-lg'
                            : 'bg-white border-gray-200 hover:border-amber-300 text-gray-700'
                        }`}
                      >
                        <span className="text-sm font-semibold">{level}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* DURACIÓN (para videos) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    <Clock className="w-4 h-4" />
                    Duración
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {durations.map((dur) => (
                      <motion.button
                        key={dur.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveFilters(prev => ({ ...prev, duration: dur.id }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeFilters.duration === dur.id
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 border-transparent text-white shadow-lg'
                            : 'bg-white border-gray-200 hover:border-teal-300 text-gray-700'
                        }`}
                      >
                        <dur.icon className="w-4 h-4" />
                        <span className="text-sm font-semibold">{dur.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* FECHA DE PUBLICACIÓN */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    <Calendar className="w-4 h-4" />
                    Fecha de Publicación
                  </label>
                  <select
                    value={activeFilters.dateRange}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none bg-white"
                  >
                    <option value="">Cualquier fecha</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                    <option value="3months">Últimos 3 meses</option>
                    <option value="year">Último año</option>
                  </select>
                </div>

                {/* IDIOMA */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                    <Globe className="w-4 h-4" />
                    Idioma
                  </label>
                  <select
                    value={activeFilters.language}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none bg-white"
                  >
                    <option value="">Todos los idiomas</option>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="pt">Portugués</option>
                    <option value="fr">Francés</option>
                  </select>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  >
                    Limpiar Filtros
                  </button>
                  <button
                    onClick={applyFilters}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FiltrosAvanzados;
