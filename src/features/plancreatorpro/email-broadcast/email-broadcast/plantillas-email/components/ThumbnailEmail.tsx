
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye } from 'lucide-react';
import { EmailTemplate } from '../plantillasEmailApi';

interface ThumbnailEmailProps {
  template: EmailTemplate;
  isSelected?: boolean;
  onSelect?: () => void;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const ThumbnailEmail: React.FC<ThumbnailEmailProps> = ({ 
  template, 
  isSelected = false, 
  onSelect, 
  onToggleFavorite 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative border-2 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50 shadow-indigo-200' 
          : 'border-gray-200 bg-white hover:border-indigo-300'
      }`}
    >
      {/* Favorite button */}
      <button
        onClick={onToggleFavorite}
        className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
          template.isFavorite 
            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
            : 'bg-white/80 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600'
        }`}
      >
        <Star className={`w-4 h-4 ${template.isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Thumbnail */}
      <div className="relative mb-3">
        <img 
          src={template.thumbnail} 
          alt={template.name} 
          className="w-full h-32 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
          <Eye className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{template.category}</p>
        
        {isSelected && (
          <div className="flex items-center gap-1 text-indigo-600 text-sm font-medium">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            Seleccionada
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ThumbnailEmail;
