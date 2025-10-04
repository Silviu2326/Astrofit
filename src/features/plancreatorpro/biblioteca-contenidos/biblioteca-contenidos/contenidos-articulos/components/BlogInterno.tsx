import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, BookOpen, Users, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogInternoProps {
  onSearch: (term: string, category: string) => void;
  onFilterChange: (filter: string) => void;
  onCreateArticle: () => void;
}

const BlogInterno: React.FC<BlogInternoProps> = ({ onSearch, onFilterChange, onCreateArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Nutrición', 'Entrenamiento', 'Bienestar', 'Motivación', 'Tecnología'];
  
  const stats = [
    { label: 'Artículos Publicados', value: '127', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Miembros Activos', value: '2,341', icon: Users, color: 'text-green-600' },
    { label: 'Lecturas Este Mes', value: '15,847', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Por favor, ingresa un término de búsqueda");
      return;
    }
    
    onSearch(searchTerm, selectedCategory);
    toast.success(`Buscando: "${searchTerm}"${selectedCategory ? ` en ${selectedCategory}` : ''}`);
  };

  const handleCreateArticle = () => {
    onCreateArticle();
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Artículos Recientes':
        onFilterChange('recent');
        break;
      case 'Más Populares':
        onFilterChange('popular');
        break;
      case 'Por Categoría':
        onFilterChange('category');
        break;
      case 'Comunidad':
        onFilterChange('community');
        break;
      default:
        toast.success(`Abriendo: ${action}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Blog Interno Exclusivo</h2>
            <p className="text-blue-100">Artículos y recursos exclusivos para nuestra comunidad</p>
          </div>
          <button
            onClick={handleCreateArticle}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Crear Artículo
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-blue-100">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar artículos, temas o autores..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleQuickAction('Artículos Recientes')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Artículos Recientes</h3>
          <p className="text-sm text-gray-600">Ver los últimos artículos publicados</p>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleQuickAction('Más Populares')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Más Populares</h3>
          <p className="text-sm text-gray-600">Artículos con más lecturas</p>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleQuickAction('Por Categoría')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
            <Filter className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Por Categoría</h3>
          <p className="text-sm text-gray-600">Explorar por temas específicos</p>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleQuickAction('Comunidad')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Comunidad</h3>
          <p className="text-sm text-gray-600">Interactuar con otros miembros</p>
        </motion.button>
      </div>

    </div>
  );
};

export default BlogInterno;
