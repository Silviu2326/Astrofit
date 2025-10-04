import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Video, Download, Headphones, Image as ImageIcon,
  Star, Clock, Calendar, Eye, Heart, Share2, ExternalLink,
  Grid3x3, List, TrendingUp, Filter, ChevronDown
} from 'lucide-react';

interface Resultado {
  id: number;
  title: string;
  type: string;
  duration: string;
  topic: string;
  category: string;
  description?: string;
  thumbnail?: string;
  author?: string;
  date?: string;
  rating?: number;
  views?: number;
  tags?: string[];
  isFavorite?: boolean;
}

interface ResultadosOrganizadosProps {
  results?: Resultado[];
}

const ResultadosOrganizados: React.FC<ResultadosOrganizadosProps> = ({ results }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular' | 'rating'>('relevance');

  // Datos mockeados de contenidos
  const mockResults: Resultado[] = results || [
    {
      id: 1,
      title: 'Guía Completa de Nutrición Deportiva',
      type: 'article',
      duration: '8 min lectura',
      topic: 'Nutrición',
      category: 'Nutrición',
      description: 'Descubre los fundamentos de la nutrición deportiva y cómo optimizar tu rendimiento',
      author: 'Dr. María González',
      date: '2024-01-15',
      rating: 4.8,
      views: 1250,
      tags: ['Nutrición', 'Deportes', 'Salud'],
      isFavorite: false
    },
    {
      id: 2,
      title: 'Rutina HIIT para Principiantes',
      type: 'video',
      duration: '12 min',
      topic: 'Entrenamiento',
      category: 'Entrenamiento',
      description: 'Entrenamiento de alta intensidad perfecto para comenzar tu viaje fitness',
      author: 'Carlos Ruiz',
      date: '2024-01-14',
      rating: 4.9,
      views: 2340,
      tags: ['HIIT', 'Cardio', 'Principiante'],
      isFavorite: true
    },
    {
      id: 3,
      title: 'eBook: Meditación y Mindfulness',
      type: 'pdf',
      duration: '45 páginas',
      topic: 'Bienestar',
      category: 'Bienestar',
      description: 'Técnicas prácticas para incorporar la meditación en tu vida diaria',
      author: 'Laura Sánchez',
      date: '2024-01-13',
      rating: 4.7,
      views: 890,
      tags: ['Meditación', 'Mindfulness', 'Bienestar'],
      isFavorite: false
    },
    {
      id: 4,
      title: 'Podcast: Marketing Digital para Coaches',
      type: 'podcast',
      duration: '28 min',
      topic: 'Marketing',
      category: 'Negocio',
      description: 'Estrategias efectivas para promocionar tus servicios de coaching online',
      author: 'Pedro Martínez',
      date: '2024-01-12',
      rating: 4.6,
      views: 1560,
      tags: ['Marketing', 'Digital', 'Coaching'],
      isFavorite: false
    },
    {
      id: 5,
      title: 'Infografía: Macronutrientes Esenciales',
      type: 'infographic',
      duration: '1 página',
      topic: 'Nutrición',
      category: 'Nutrición',
      description: 'Visualización clara de proteínas, carbohidratos y grasas en tu dieta',
      author: 'Ana Torres',
      date: '2024-01-11',
      rating: 4.9,
      views: 3120,
      tags: ['Nutrición', 'Macros', 'Dieta'],
      isFavorite: true
    },
    {
      id: 6,
      title: 'Video: Yoga para Flexibilidad',
      type: 'video',
      duration: '18 min',
      topic: 'Bienestar',
      category: 'Bienestar',
      description: 'Secuencia de yoga diseñada para mejorar tu flexibilidad gradualmente',
      author: 'Sofía Ramírez',
      date: '2024-01-10',
      rating: 4.8,
      views: 1780,
      tags: ['Yoga', 'Flexibilidad', 'Principiante'],
      isFavorite: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Video;
      case 'pdf': return Download;
      case 'podcast': return Headphones;
      case 'infographic': return ImageIcon;
      default: return BookOpen;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      article: { label: 'Artículo', color: 'from-blue-500 to-indigo-600' },
      video: { label: 'Video', color: 'from-purple-500 to-pink-600' },
      pdf: { label: 'PDF', color: 'from-emerald-500 to-teal-600' },
      podcast: { label: 'Podcast', color: 'from-orange-500 to-red-600' },
      infographic: { label: 'Infografía', color: 'from-cyan-500 to-blue-600' }
    };
    return badges[type as keyof typeof badges] || badges.article;
  };

  const categorizedResults = mockResults.reduce((acc, result) => {
    (acc[result.category] = acc[result.category] || []).push(result);
    return acc;
  }, {} as Record<string, Resultado[]>);

  return (
    <div className="space-y-6">
      {/* BARRA DE HERRAMIENTAS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-4"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Contador de resultados */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                {mockResults.length} resultados encontrados
              </p>
              <p className="text-xs text-gray-600">Mostrando todos los contenidos</p>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-3">
            {/* Ordenar por */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="relevance">Relevancia</option>
                <option value="recent">Más recientes</option>
                <option value="popular">Más populares</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>

            {/* Toggle vista */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-md text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white shadow-md text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RESULTADOS */}
      {Object.keys(categorizedResults).length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-600">Intenta ajustar tu búsqueda o filtros</p>
        </motion.div>
      ) : (
        Object.entries(categorizedResults).map(([category, items], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-4"
          >
            {/* Título de categoría */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <h3 className="text-xl font-bold text-gray-900 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200">
                {category}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Grid o Lista de resultados */}
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {items.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type);
                const typeBadge = getTypeBadge(item.type);

                return viewMode === 'grid' ? (
                  // VISTA GRID
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group relative"
                  >
                    {/* Decoración de fondo */}
                    <div className={`absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br ${typeBadge.color} opacity-5 rounded-full blur-2xl`}></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                    <div className="relative z-10 p-6">
                      {/* Header con badge y favorito */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`px-3 py-1 bg-gradient-to-r ${typeBadge.color} rounded-full flex items-center gap-2 text-white text-xs font-bold shadow-lg`}>
                          <TypeIcon className="w-3 h-3" />
                          {typeBadge.label}
                        </div>
                        <button className="p-2 hover:bg-red-50 rounded-xl transition-colors group/heart">
                          <Heart className={`w-5 h-5 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500'}`} />
                        </button>
                      </div>

                      {/* Título */}
                      <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>

                      {/* Descripción */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Metadata */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                          <span>•</span>
                          <span className="font-medium">{item.author}</span>
                        </div>
                      </div>

                      {/* Rating y vistas */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating || 0)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm font-bold text-gray-900 ml-1">
                            {item.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">{item.views?.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags?.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Ver más
                        </button>
                        <button className="p-2 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-xl transition-all">
                          <Share2 className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // VISTA LISTA
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-4 border border-white/50 flex gap-4 group"
                  >
                    {/* Icono */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${typeBadge.color} flex items-center justify-center text-white shadow-lg`}>
                      <TypeIcon className="w-8 h-8" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {item.title}
                            </h4>
                            <span className={`px-2 py-0.5 bg-gradient-to-r ${typeBadge.color} rounded-full text-white text-xs font-bold`}>
                              {typeBadge.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                        </div>
                        <button>
                          <Heart className={`w-5 h-5 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views?.toLocaleString()}
                        </span>
                        <span>{item.author}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-indigo-600 hover:to-purple-700 transition-all">
                            Ver más
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default ResultadosOrganizados;
