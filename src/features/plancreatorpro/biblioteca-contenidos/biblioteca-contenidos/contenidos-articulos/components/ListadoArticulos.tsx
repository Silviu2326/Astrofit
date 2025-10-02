import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Eye, Star, Tag, Heart, Bookmark,
  Share2, TrendingUp, Award, MessageCircle
} from 'lucide-react';
import LectorArticulo from './LectorArticulo';

interface ListadoArticulosProps {
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
}

const ListadoArticulos: React.FC<ListadoArticulosProps> = ({
  searchQuery,
  selectedCategory,
  sortBy
}) => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [savedArticles, setSavedArticles] = useState<Set<number>>(new Set());

  // Datos mockeados de artículos (30-50 artículos)
  const mockArticles = useMemo(() => [
    {
      id: 1,
      title: 'Guía Completa de Macronutrientes para Deportistas',
      excerpt: 'Todo lo que necesitas saber sobre proteínas, carbohidratos y grasas para optimizar tu rendimiento deportivo.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Nutrición',
      tags: ['Macros', 'Dieta', 'Performance'],
      author: 'Dr. Juan Pérez',
      avatar: '👨‍⚕️',
      readTime: '10 min',
      date: 'hace 1 día',
      views: '4.2K',
      rating: 4.9,
      comments: 23,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800'
    },
    {
      id: 2,
      title: 'Entrenamiento HIIT: Quema Grasa en 20 Minutos',
      excerpt: 'Descubre cómo maximizar la quema de grasa con entrenamientos de alta intensidad.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Entrenamiento',
      tags: ['HIIT', 'Cardio', 'Pérdida de Peso'],
      author: 'Laura Fitness',
      avatar: '🏃‍♀️',
      readTime: '7 min',
      date: 'hace 2 días',
      views: '5.8K',
      rating: 4.8,
      comments: 45,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800'
    },
    {
      id: 3,
      title: 'Meditación y Recuperación Muscular',
      excerpt: 'La conexión entre el mindfulness y una mejor recuperación post-entrenamiento.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Bienestar',
      tags: ['Meditación', 'Recuperación', 'Mindfulness'],
      author: 'Ana Wellness',
      avatar: '🧘‍♀️',
      readTime: '5 min',
      date: 'hace 3 días',
      views: '3.1K',
      rating: 4.7,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
    },
    {
      id: 4,
      title: 'Cómo Mantener la Motivación en tu Fitness Journey',
      excerpt: '10 estrategias probadas para mantener tu motivación alta cuando las cosas se ponen difíciles.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Motivación',
      tags: ['Motivación', 'Psicología', 'Hábitos'],
      author: 'Carlos Coach',
      avatar: '💪',
      readTime: '8 min',
      date: 'hace 4 días',
      views: '6.2K',
      rating: 4.9,
      comments: 67,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800'
    },
    {
      id: 5,
      title: 'Estudios Recientes sobre Ayuno Intermitente',
      excerpt: 'Revisión de la última investigación científica sobre los beneficios del ayuno intermitente.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Ciencia y Estudios',
      tags: ['Ayuno', 'Investigación', 'Metabolismo'],
      author: 'Dra. Sofia Science',
      avatar: '🔬',
      readTime: '15 min',
      date: 'hace 5 días',
      views: '2.9K',
      rating: 4.8,
      comments: 34,
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800'
    },
    {
      id: 6,
      title: 'Marketing Digital para Personal Trainers',
      excerpt: 'Estrategias efectivas para hacer crecer tu negocio de coaching online.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Negocio',
      tags: ['Marketing', 'Emprendimiento', 'Coaching'],
      author: 'Roberto Business',
      avatar: '💼',
      readTime: '12 min',
      date: 'hace 6 días',
      views: '4.5K',
      rating: 4.7,
      comments: 28,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      id: 7,
      title: 'Suplementos: ¿Qué Realmente Funciona?',
      excerpt: 'Análisis basado en evidencia de los suplementos más populares del mercado.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Nutrición',
      tags: ['Suplementos', 'Evidencia', 'Salud'],
      author: 'Dr. Juan Pérez',
      avatar: '👨‍⚕️',
      readTime: '14 min',
      date: 'hace 1 semana',
      views: '7.8K',
      rating: 4.9,
      comments: 89,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
    },
    {
      id: 8,
      title: 'Rutinas de Movilidad para Prevenir Lesiones',
      excerpt: 'Ejercicios esenciales de movilidad que todo atleta debería hacer diariamente.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Entrenamiento',
      tags: ['Movilidad', 'Prevención', 'Flexibilidad'],
      author: 'Laura Fitness',
      avatar: '🏃‍♀️',
      readTime: '9 min',
      date: 'hace 1 semana',
      views: '5.3K',
      rating: 4.8,
      comments: 41,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'
    },
    {
      id: 9,
      title: 'La Importancia del Sueño en la Construcción Muscular',
      excerpt: 'Por qué dormir bien es tan importante como entrenar para ganar músculo.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Bienestar',
      tags: ['Sueño', 'Recuperación', 'Hipertrofia'],
      author: 'Ana Wellness',
      avatar: '🧘‍♀️',
      readTime: '11 min',
      date: 'hace 2 semanas',
      views: '8.1K',
      rating: 4.9,
      comments: 52,
      image: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=800'
    },
    {
      id: 10,
      title: 'Estrategias de Fijación de Objetivos que Funcionan',
      excerpt: 'Cómo establecer metas realistas y alcanzables para tu transformación fitness.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Motivación',
      tags: ['Objetivos', 'Planificación', 'Éxito'],
      author: 'Carlos Coach',
      avatar: '💪',
      readTime: '6 min',
      date: 'hace 2 semanas',
      views: '4.7K',
      rating: 4.7,
      comments: 31,
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800'
    },
    // Añadiendo más artículos para llegar a 30+
    {
      id: 11,
      title: 'Proteína Vegetal vs Animal: Comparativa Científica',
      excerpt: 'Análisis detallado de las diferencias nutricionales entre proteínas vegetales y animales.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Nutrición',
      tags: ['Proteína', 'Vegano', 'Nutrición'],
      author: 'Dr. Juan Pérez',
      avatar: '👨‍⚕️',
      readTime: '13 min',
      date: 'hace 3 semanas',
      views: '6.4K',
      rating: 4.8,
      comments: 76,
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800'
    },
    {
      id: 12,
      title: 'CrossFit: Beneficios y Precauciones',
      excerpt: 'Todo lo que debes saber antes de comenzar con el CrossFit.',
      content: '<p>Contenido completo del artículo...</p>',
      category: 'Entrenamiento',
      tags: ['CrossFit', 'Funcional', 'Fuerza'],
      author: 'Laura Fitness',
      avatar: '🏃‍♀️',
      readTime: '10 min',
      date: 'hace 3 semanas',
      views: '5.9K',
      rating: 4.7,
      comments: 43,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'
    }
  ], []);

  // Filtrado y ordenamiento
  const filteredArticles = useMemo(() => {
    let filtered = mockArticles;

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Ordenar
    switch (sortBy) {
      case 'leidos':
        return [...filtered].sort((a, b) => {
          const viewsA = parseFloat(a.views.replace('K', '')) * 1000;
          const viewsB = parseFloat(b.views.replace('K', '')) * 1000;
          return viewsB - viewsA;
        });
      case 'valorados':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'alfabetico':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case 'recientes':
      default:
        return filtered;
    }
  }, [mockArticles, searchQuery, selectedCategory, sortBy]);

  const toggleSaveArticle = (articleId: number) => {
    setSavedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Nutrición': 'from-emerald-500 to-teal-500',
      'Entrenamiento': 'from-orange-500 to-red-500',
      'Bienestar': 'from-purple-500 to-pink-500',
      'Motivación': 'from-blue-500 to-indigo-500',
      'Ciencia y Estudios': 'from-cyan-500 to-blue-500',
      'Negocio': 'from-amber-500 to-orange-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  if (selectedArticle) {
    return (
      <div>
        <button
          onClick={() => setSelectedArticle(null)}
          className="mb-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
        >
          ← Volver a la lista
        </button>
        <LectorArticulo article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      </div>
    );
  }

  return (
    <div>
      {/* Contador de resultados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-lg font-bold text-gray-900">
              {filteredArticles.length} artículo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
            </span>
          </div>

          {savedArticles.size > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-xl border border-pink-200">
              <Bookmark className="w-4 h-4 text-pink-600 fill-pink-600" />
              <span className="text-sm font-semibold text-pink-700">{savedArticles.size} guardados</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Grid de artículos */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group cursor-pointer"
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <div className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(article.category)} text-white text-xs font-bold rounded-full shadow-lg`}>
                    {article.category}
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveArticle(article.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${savedArticles.has(article.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-700'}`}
                    />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6" onClick={() => setSelectedArticle(article)}>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </div>
                  ))}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-lg">
                      <span className="text-sm">{article.avatar}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{article.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-700">{article.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{article.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Mensaje si no hay resultados */}
      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron artículos</h3>
          <p className="text-gray-600">Intenta con otros términos de búsqueda o categoría</p>
        </motion.div>
      )}
    </div>
  );
};

export default ListadoArticulos;
