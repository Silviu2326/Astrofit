import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Star, CheckCircle, X, Dumbbell, Clock, Target } from 'lucide-react';
import { MesocicloTemplate, predefinedMesocicloTemplates } from '../plantillasMesociclosApi';

const GaleriaPlantillas: React.FC = () => {
  const [templates, setTemplates] = useState<MesocicloTemplate[]>(predefinedMesocicloTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<MesocicloTemplate | null>(null);

  const toggleFavorite = (id: string) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === id ? { ...template, isFavorite: !template.isFavorite } : template
      )
    );
  };

  const openPreview = (template: MesocicloTemplate) => {
    setSelectedTemplate(template);
  };

  const closePreview = () => {
    setSelectedTemplate(null);
  };

  // Función para obtener badge de categoría
  const getCategoryBadge = (sport: string) => {
    const categories: { [key: string]: { color: string; icon: JSX.Element } } = {
      'Fuerza': { color: 'from-red-500 to-orange-500', icon: <Dumbbell className="w-4 h-4" /> },
      'Resistencia': { color: 'from-blue-500 to-cyan-500', icon: <Target className="w-4 h-4" /> },
      'Velocidad': { color: 'from-purple-500 to-pink-500', icon: <Clock className="w-4 h-4" /> },
    };

    return categories[sport] || { color: 'from-gray-500 to-gray-600', icon: <Dumbbell className="w-4 h-4" /> };
  };

  return (
    <div>
      {/* Grid de plantillas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => {
          const category = getCategoryBadge(template.sport);

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10 p-6">
                {/* Header con badge y favorito */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${category.color} text-white text-xs font-bold rounded-full`}>
                    {category.icon}
                    <span>{template.sport}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(template.id)}
                    className={`transition-colors duration-300 ${template.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
                  >
                    <Star className={`w-6 h-6 ${template.isFavorite ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>

                {/* Título */}
                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {template.title}
                </h2>

                {/* Información */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium">{template.duration}</span>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openPreview(template)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(`Aplicando plantilla: ${template.title}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Aplicar</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal de preview con glassmorphism */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closePreview}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-white/50 relative overflow-hidden"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getCategoryBadge(selectedTemplate.sport).color} text-white text-xs font-bold rounded-full mb-3`}>
                      {getCategoryBadge(selectedTemplate.sport).icon}
                      <span>{selectedTemplate.sport}</span>
                    </div>
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                      {selectedTemplate.title}
                    </h3>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closePreview}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </motion.button>
                </div>

                {/* Descripción */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-indigo-100">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedTemplate.description}
                  </p>
                </div>

                {/* Contenido de preview */}
                <div className="bg-white/50 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Contenido del Mesociclo</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedTemplate.previewContent}
                  </p>
                </div>

                {/* Botón de cerrar */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePreview}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                >
                  Cerrar Vista Previa
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GaleriaPlantillas;
