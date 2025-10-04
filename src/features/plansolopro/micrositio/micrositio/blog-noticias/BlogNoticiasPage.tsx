import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FeedArticulos from './components/FeedArticulos';
import CategoriasFiltro from './components/CategoriasFiltro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticuloCompleto from './components/ArticuloCompleto';
import { BookOpen, Eye, FileText, Folder, TrendingUp, Users } from 'lucide-react';
import { getArticulos } from './blogNoticiasApi';

const BlogNoticiasPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stats, setStats] = useState({
    totalArticles: 0,
    monthlyViews: 0,
    published: 0,
    categories: 0
  });

  useEffect(() => {
    // Calcular estadísticas
    const fetchStats = async () => {
      const articulos = await getArticulos();
      setStats({
        totalArticles: articulos.length,
        monthlyViews: 1247,
        published: articulos.length,
        categories: 3
      });
    };
    fetchStats();
  }, []);

  const statsData = [
    {
      icon: FileText,
      title: 'Total de Artículos',
      value: stats.totalArticles.toString(),
      change: 12,
      progress: 75,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Eye,
      title: 'Vistas Este Mes',
      value: stats.monthlyViews.toLocaleString(),
      change: 24,
      progress: 85,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Artículos Publicados',
      value: stats.published.toString(),
      change: 8,
      progress: 65,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Folder,
      title: 'Categorías Activas',
      value: stats.categories.toString(),
      change: 0,
      progress: 100,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-fuchsia-50/30 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
                >
                  {/* Efectos de fondo animados */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '50px 50px'
                    }}></div>
                  </div>

                  <div className="relative z-10">
                    {/* Título con icono */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <BookOpen className="w-10 h-10 text-yellow-300 animate-pulse" />
                        <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                      </div>
                      <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Blog y <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Noticias</span>
                      </h1>
                    </div>

                    {/* Descripción */}
                    <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
                      Tips, consejos y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">actualizaciones</span> para tu estilo de vida saludable
                    </p>

                    {/* Pills de características */}
                    <div className="mt-8 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <FileText className="w-5 h-5 text-green-300" />
                        <span className="text-sm font-semibold text-white">Contenido de Calidad</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <Users className="w-5 h-5 text-blue-300" />
                        <span className="text-sm font-semibold text-white">Comunidad Activa</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <TrendingUp className="w-5 h-5 text-yellow-300" />
                        <span className="text-sm font-semibold text-white">Actualizado Regularmente</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Estadísticas Rápidas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {statsData.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.03, y: -8 }}
                      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                      {/* Decoración de fondo */}
                      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

                      <div className="relative z-10">
                        {/* Icono */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className="w-8 h-8" />
                        </div>

                        {/* Título */}
                        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                          {stat.title}
                        </p>

                        {/* Valor */}
                        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                          {stat.value}
                        </p>

                        {/* Cambio */}
                        {stat.change > 0 && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1 bg-green-50 rounded-lg">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                            <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
                          </div>
                        )}

                        {/* Barra decorativa */}
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.progress}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Filtros y Búsqueda */}
                <CategoriasFiltro
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                {/* Feed de Artículos */}
                <FeedArticulos
                  selectedCategory={selectedCategory}
                  searchTerm={searchTerm}
                />
              </>
            } />
            <Route path="/articulo/:id" element={<ArticuloCompleto />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default BlogNoticiasPage;
