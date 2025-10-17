import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getArticulos } from '../contenidosArticulosApi';
import { Eye, User, MessageCircle, Calendar, Tag, Filter } from 'lucide-react';
import { Article } from '../mockData';

interface ListadoArticulosProps {
  searchTerm?: string;
  searchCategory?: string;
  filterType?: string;
  onViewArticle: (article: Article) => void;
}

const ListadoArticulos: React.FC<ListadoArticulosProps> = ({ 
  searchTerm = '', 
  searchCategory = '', 
  filterType = '',
  onViewArticle
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  // Cargar artículos al montar el componente
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const articlesData = await getArticulos();
        setArticles(articlesData as Article[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar artículos');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Función para filtrar y buscar artículos
  const filterArticles = useCallback(() => {
    if (!articles) return [];

    let filtered = [...articles];

    // Filtro por categoría
    if (filterCategory) {
      filtered = filtered.filter(article => 
        article.categories.includes(filterCategory)
      );
    }

    // Búsqueda por término
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(term) ||
        article.content.toLowerCase().includes(term) ||
        article.tags.some(tag => tag.toLowerCase().includes(term)) ||
        article.author.toLowerCase().includes(term)
      );
    }

    // Filtro por categoría de búsqueda
    if (searchCategory) {
      filtered = filtered.filter(article => 
        article.categories.includes(searchCategory)
      );
    }

    // Filtros especiales
    switch (filterType) {
      case 'recent':
        filtered = filtered.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        break;
      case 'popular':
        filtered = filtered.sort((a, b) => b.views - a.views);
        break;
      case 'category':
        // Ya filtrado por categoría arriba
        break;
      case 'community':
        filtered = filtered.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        // Orden por defecto (más recientes)
        filtered = filtered.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }

    return filtered;
  }, [articles, filterCategory, searchTerm, searchCategory, filterType]);

  // Actualizar artículos filtrados cuando cambien los filtros
  useEffect(() => {
    setFilteredArticles(filterArticles());
  }, [filterArticles]);

  const handleArticleClick = (article: Article) => {
    onViewArticle(article);
  };

  const categories = Array.from(new Set(articles?.flatMap(article => article.categories) || []));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600">Cargando artículos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-2">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar artículos</h3>
        <p className="text-red-600 mb-4">No se pudieron cargar los artículos. Por favor, intenta de nuevo.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <span className="text-sm text-gray-600">
            {filteredArticles.length} artículo{filteredArticles.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid de artículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => handleArticleClick(article)}
          >
            {article.imageUrl && (
              <div className="relative overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                  {article.readTime} min
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                {article.categories.map(category => (
                  <span key={category} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">
                {article.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.views}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {article.comments.length}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{article.tags.length - 3} más</span>
                )}
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: article.content.substring(0, 150) + '...' 
                  }} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron artículos</h3>
          <p className="text-gray-500">
            {filterCategory 
              ? `No hay artículos en la categoría "${filterCategory}"`
              : "No hay artículos disponibles en este momento"
            }
          </p>
        </div>
      )}

    </div>
  );
};

export default ListadoArticulos;
