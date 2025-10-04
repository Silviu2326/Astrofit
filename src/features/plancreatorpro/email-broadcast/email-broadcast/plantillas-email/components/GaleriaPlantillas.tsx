
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import ThumbnailEmail from './ThumbnailEmail';
import { getEmailTemplates, EmailTemplate, toggleFavoriteTemplate } from '../plantillasEmailApi';

interface GaleriaPlantillasProps {
  onTemplateSelect?: (template: EmailTemplate) => void;
  selectedTemplateId?: string | null;
}

const GaleriaPlantillas: React.FC<GaleriaPlantillasProps> = ({ onTemplateSelect, selectedTemplateId }) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getEmailTemplates();
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (err) {
        setError('Error al cargar las plantillas.');
        toast.error('Error al cargar las plantillas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Filter templates based on search term and category
  useEffect(() => {
    let filtered = templates;

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
  }, [templates, searchTerm, selectedCategory]);

  const handleTemplateSelect = (template: EmailTemplate) => {
    if (onTemplateSelect) {
      onTemplateSelect(template);
      toast.success(`Plantilla "${template.name}" seleccionada`);
    }
  };

  const handleToggleFavorite = async (templateId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const updatedTemplate = await toggleFavoriteTemplate(templateId);
      if (updatedTemplate) {
        setTemplates(prev => 
          prev.map(t => t.id === templateId ? updatedTemplate : t)
        );
        toast.success(updatedTemplate.isFavorite ? 'Agregado a favoritos' : 'Removido de favoritos');
      }
    } catch (err) {
      toast.error('Error al actualizar favoritos');
      console.error(err);
    }
  };

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando plantillas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Layout className="w-6 h-6" />
            </div>
            Galería de Plantillas
          </h2>
          
          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="text"
                placeholder="Buscar plantillas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white hover:bg-white/30 transition-colors duration-300"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Filtros</span>
            </button>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-white/30 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {category === 'all' ? 'Todas' : category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Grid de plantillas */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ThumbnailEmail 
                template={template} 
                isSelected={selectedTemplateId === template.id}
                onSelect={() => handleTemplateSelect(template)}
                onToggleFavorite={(e) => handleToggleFavorite(template.id, e)}
              />
            </motion.div>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && templates.length > 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No se encontraron plantillas</p>
            <p className="text-gray-400 text-sm">Intenta con otros términos de búsqueda</p>
          </div>
        )}

        {templates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Layout className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No hay plantillas disponibles</p>
            <p className="text-gray-400 text-sm">Crea tu primera plantilla personalizada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaPlantillas;
