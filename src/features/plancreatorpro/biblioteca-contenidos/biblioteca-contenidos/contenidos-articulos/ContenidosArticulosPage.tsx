import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Edit3, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import ListadoArticulos from './components/ListadoArticulos';
import BlogInterno from './components/BlogInterno';
import CrearArticuloModal from './components/CrearArticuloModal';
import VerArticuloModal from './components/VerArticuloModal';
import { getArticulos } from '../bibliotecaContenidosApi';
import { ArticuloResponse } from '../types/index';
import ApiErrorPage from '../../../../../components/ApiErrorPage';

const ContenidosArticulosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticuloResponse | null>(null);
  const [articles, setArticles] = useState<ArticuloResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Integrar API centralizada directamente
  useEffect(() => {
    let isMounted = true;
    
    const loadArticles = async () => {
      if (!isMounted) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const articlesData = await getArticulos();
        if (isMounted) {
          setArticles(articlesData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar artículos');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadArticles();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const refetch = () => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const articlesData = await getArticulos();
        setArticles(articlesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar artículos');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  };

  const handleSearch = (term: string, category: string) => {
    setSearchTerm(term);
    setSearchCategory(category);
  };

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
  };

  const handleCreateArticle = () => {
    setShowCreateModal(true);
  };

  const handleViewArticle = (article: ArticuloResponse) => {
    setSelectedArticle(article);
    setShowViewModal(true);
  };

  // Manejar estados de carga y error
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Cargando artículos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ApiErrorPage
        error={`Error al cargar artículos: ${error}`}
        onRetry={() => refetch()}
        onGoHome={() => window.location.href = '/dashboard/inicio'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <FileText className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Biblioteca <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Artículos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Crea y gestiona tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">blog interno</span> con artículos profesionales y contenido de calidad
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BookOpen className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Blog Interno</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Edit3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Editor Avanzado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Contenido SEO</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="space-y-8">
        {/* Blog Interno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <BlogInterno 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onCreateArticle={handleCreateArticle}
            />
          </div>
        </motion.div>

        {/* Listado de Artículos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <ListadoArticulos 
              searchTerm={searchTerm}
              searchCategory={searchCategory}
              filterType={filterType}
              onViewArticle={handleViewArticle}
            />
          </div>
        </motion.div>
      </div>

      {/* Modales renderizados en el nivel superior */}
      <CrearArticuloModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <VerArticuloModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        article={selectedArticle}
      />
    </div>
  );
};

export default ContenidosArticulosPage;
