import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Calendar, Clock, Dumbbell, Target, User, Eye, Copy, Share2 } from 'lucide-react';
import { TrainingTemplate } from '../plantillasEntrenosApi';

interface PlantillaCardProps {
  template: TrainingTemplate;
  onViewDetails: (templateId: string) => void;
  onToggleFavorite: (templateId: string) => void;
}

const PlantillaCard: React.FC<PlantillaCardProps> = ({ template, onViewDetails, onToggleFavorite }) => {
  // Mapeo de colores por objetivo
  const getObjectiveColor = (objective: string) => {
    const colors = {
      'hipertrofia': 'from-purple-500 to-pink-500',
      'perdida_grasa': 'from-orange-500 to-red-500',
      'preparacion_fisica': 'from-blue-500 to-cyan-500',
    };
    return colors[objective as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getObjectiveBadgeColor = (objective: string) => {
    const colors = {
      'hipertrofia': 'bg-purple-100 text-purple-700 border-purple-300',
      'perdida_grasa': 'bg-orange-100 text-orange-700 border-orange-300',
      'preparacion_fisica': 'bg-blue-100 text-blue-700 border-blue-300',
    };
    return colors[objective as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'principiante': 'bg-green-100 text-green-700',
      'intermedio': 'bg-yellow-100 text-yellow-700',
      'avanzado': 'bg-red-100 text-red-700',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const formatObjective = (obj: string) => obj.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formatLevel = (level: string) => level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header con gradiente */}
      <div className={`relative h-32 bg-gradient-to-br ${getObjectiveColor(template.objective)} overflow-hidden`}>
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Botón favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(template.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 group/fav"
        >
          <Heart
            size={20}
            className={template.isFavorite ? 'text-pink-500' : 'text-white'}
            fill={template.isFavorite ? 'currentColor' : 'none'}
          />
        </button>

        {/* Icono central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Dumbbell size={32} className="text-white" />
          </div>
        </div>

        {/* Badge autor */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
          <User size={14} className="text-white" />
          <span className="text-xs font-semibold text-white">{template.author}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 relative z-10">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getObjectiveBadgeColor(template.objective)}`}>
            {formatObjective(template.objective)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(template.level)}`}>
            {formatLevel(template.level)}
          </span>
          {template.isSystemTemplate && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200">
              Sistema
            </span>
          )}
        </div>

        {/* Nombre */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{template.name}</h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{template.description}</p>

        {/* Detalles */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="p-1 bg-purple-50 rounded-lg">
              <Target size={14} className="text-purple-600" />
            </div>
            <span className="font-medium">{template.modality.charAt(0).toUpperCase() + template.modality.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="p-1 bg-blue-50 rounded-lg">
              <Clock size={14} className="text-blue-600" />
            </div>
            <span className="font-medium">{template.duration} • {template.frequency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="p-1 bg-green-50 rounded-lg">
              <Dumbbell size={14} className="text-green-600" />
            </div>
            <span className="font-medium">{template.materialNeeded.slice(0, 2).join(', ')}{template.materialNeeded.length > 2 && '...'}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-gray-100">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(template.rating) ? 'text-yellow-500' : 'text-gray-300'}
                fill={i < Math.floor(template.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-700">{template.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-500">({template.commentsCount} comentarios)</span>
        </div>

        {/* Acciones */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(template.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            <Eye size={16} />
            Ver Detalles
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 rounded-xl hover:from-blue-200 hover:to-cyan-200 transition-all duration-300"
          >
            <Copy size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 rounded-xl hover:from-green-200 hover:to-emerald-200 transition-all duration-300"
          >
            <Share2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantillaCard;
