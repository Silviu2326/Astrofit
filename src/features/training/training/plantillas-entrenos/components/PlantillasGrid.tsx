import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion } from 'lucide-react';
import { TrainingTemplate } from '../plantillasEntrenosApi';
import PlantillaCard from './PlantillaCard';

interface PlantillasGridProps {
  templates: TrainingTemplate[];
  onViewDetails: (templateId: string) => void;
  onToggleFavorite: (templateId: string) => void;
}

const PlantillasGrid: React.FC<PlantillasGridProps> = ({ templates, onViewDetails, onToggleFavorite }) => {
  if (templates.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50 max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
            <FileQuestion size={48} className="text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No se encontraron plantillas
          </h3>
          <p className="text-gray-600 leading-relaxed">
            No hay plantillas que coincidan con los filtros seleccionados. Intenta ajustar tus criterios de búsqueda.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <PlantillaCard
            template={template}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PlantillasGrid;
