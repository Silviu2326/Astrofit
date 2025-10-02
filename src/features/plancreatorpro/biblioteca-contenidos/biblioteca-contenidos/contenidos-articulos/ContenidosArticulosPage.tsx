import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, TrendingUp, Eye, Star, Search,
  Filter, Calendar, Clock, User, Tag,
  Sparkles, ArrowUpRight, ChevronDown
} from 'lucide-react';
import ListadoArticulos from './components/ListadoArticulos';

const ContenidosArticulosPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('recientes');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos mockeados de estadísticas
  const stats = [
    {
      icon: BookOpen,
      title: 'Total de Artículos',
      value: '142',
      change: '+12',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50'
    },
    {
      icon: Calendar,
      title: 'Publicados Este Mes',
      value: '18',
      change: '+25',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50'
    },
    {
      icon: Eye,
      title: 'Lecturas Totales',
      value: '12.5K',
      change: '+18',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Star,
      title: 'Rating Promedio',
      value: '4.8',
      change: '+5',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50'
    }
  ];

  const categories = [
    'Todos',
    'Nutrición',
    'Entrenamiento',
    'Bienestar',
    'Motivación',
    'Ciencia y Estudios',
    'Negocio'
  ];

  // Artículos destacados
  const featuredArticles = [
    {
      id: 1,
      title: 'La Ciencia Detrás del Ayuno Intermitente',
      excerpt: 'Descubre cómo el ayuno intermitente puede transformar tu metabolismo y mejorar tu salud general.',
      category: 'Nutrición',
      author: 'Dr. María González',
      avatar: '👩‍⚕️',
      readTime: '8 min',
      date: 'hace 2 días',
      views: '2.3K',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
      badge: 'Editor\'s Pick'
    },
    {
      id: 2,
      title: 'Rutinas de Fuerza para Principiantes',
      excerpt: 'Guía completa para empezar tu camino en el entrenamiento de fuerza con seguridad y eficacia.',
      category: 'Entrenamiento',
      author: 'Carlos Martínez',
      avatar: '💪',
      readTime: '12 min',
      date: 'hace 1 semana',
      views: '3.1K',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      badge: 'Destacado'
    },
    {
      id: 3,
      title: 'Mindfulness y Rendimiento Deportivo',
      excerpt: 'Cómo la práctica del mindfulness puede mejorar tu enfoque y rendimiento atlético.',
      category: 'Bienestar',
      author: 'Ana Ruiz',
      avatar: '🧘‍♀️',
      readTime: '6 min',
      date: 'hace 3 días',
      views: '1.8K',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      badge: 'Destacado'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <BookOpen className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Biblioteca de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Artículos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl leading-relaxed mb-6">
            Conocimiento al <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">alcance de tu mano</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">142 Artículos Disponibles</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">este mes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ARTÍCULOS DESTACADOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Artículos Destacados</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
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
                  <div className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                    {article.badge}
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <div className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                    {article.category}
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-lg">
                      <span className="text-sm">{article.avatar}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{article.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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

                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all duration-300">
                    Leer más
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FILTROS Y BÚSQUEDA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artículos por título o contenido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900"
            />
          </div>
        </div>

        {/* Categorías tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Categorías</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Ordenamiento */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Ordenar por</span>
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 font-semibold cursor-pointer"
            >
              <option value="recientes">Más recientes</option>
              <option value="leidos">Más leídos</option>
              <option value="valorados">Mejor valorados</option>
              <option value="alfabetico">Alfabético</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* GRID DE ARTÍCULOS */}
      <ListadoArticulos
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
      />
    </div>
  );
};

export default ContenidosArticulosPage;
