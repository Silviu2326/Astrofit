import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Calendar,
  Clock,
  Dumbbell,
  Target,
  MapPin,
  User,
  Copy,
  Share2,
  Play,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import { TrainingTemplate, Exercise, WorkoutDay } from '../plantillasEntrenosApi';

interface PlantillaPreviewProps {
  template: TrainingTemplate;
  onClose: () => void;
  onUseAsBase: (templateId: string) => void;
}

const PlantillaPreview: React.FC<PlantillaPreviewProps> = ({ template, onClose, onUseAsBase }) => {
  const [expandedDays, setExpandedDays] = useState<string[]>(template.workoutDays.map((_, i) => i.toString()));

  if (!template) return null;

  const formatObjective = (obj: string) => obj.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formatLevel = (level: string) => level.charAt(0).toUpperCase() + level.slice(1);
  const formatModality = (modality: string) => modality.charAt(0).toUpperCase() + modality.slice(1);

  const toggleDay = (dayIndex: string) => {
    setExpandedDays(prev =>
      prev.includes(dayIndex)
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const getObjectiveColor = (objective: string) => {
    const colors = {
      'hipertrofia': 'from-purple-600 via-purple-500 to-pink-600',
      'perdida_grasa': 'from-orange-600 via-red-500 to-pink-600',
      'preparacion_fisica': 'from-blue-600 via-cyan-500 to-teal-600',
    };
    return colors[objective as keyof typeof colors] || 'from-gray-600 via-gray-500 to-gray-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header con gradiente */}
        <div className={`relative bg-gradient-to-r ${getObjectiveColor(template.objective)} p-8`}>
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 group"
          >
            <X size={24} className="text-white" />
          </button>

          <div className="relative z-10">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/20">
                {formatObjective(template.objective)}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/20">
                {formatLevel(template.level)}
              </span>
              {template.isSystemTemplate && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/20">
                  Sistema
                </span>
              )}
            </div>

            {/* Título */}
            <h2 className="text-4xl font-bold text-white mb-3">{template.name}</h2>

            {/* Descripción */}
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl">{template.description}</p>

            {/* Rating y autor */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-300"
                    fill={i < Math.floor(template.rating) ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="text-white font-bold ml-2">{template.rating.toFixed(1)}</span>
                <span className="text-white/70">({template.commentsCount} comentarios)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <User size={16} className="text-white" />
                <span className="text-white font-semibold">{template.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto max-h-[calc(90vh-250px)] p-8">
          {/* Información rápida */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Calendar size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">Frecuencia</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{template.frequency}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Clock size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">Duración</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{template.duration}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Target size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">Modalidad</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{formatModality(template.modality)}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-2xl border border-orange-200">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <Dumbbell size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">Días</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{template.workoutDays.length}</p>
            </div>
          </div>

          {/* Material necesario */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Dumbbell size={20} className="text-indigo-600" />
              Material Necesario
            </h3>
            <div className="flex flex-wrap gap-2">
              {template.materialNeeded.map((material, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-indigo-700 border border-indigo-200"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>

          {/* Estructura del Plan */}
          {template.workoutDays.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar size={24} className="text-purple-600" />
                Estructura del Plan
              </h3>
              <div className="space-y-4">
                {template.workoutDays.map((day: WorkoutDay, dayIndex: number) => (
                  <div
                    key={dayIndex}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-gray-200 overflow-hidden"
                  >
                    {/* Day header */}
                    <button
                      onClick={() => toggleDay(dayIndex.toString())}
                      className="w-full p-5 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
                          {dayIndex + 1}
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg font-bold text-gray-900">{day.day}</h4>
                          <p className="text-sm text-gray-600">{day.exercises.length} ejercicios</p>
                        </div>
                      </div>
                      {expandedDays.includes(dayIndex.toString()) ? (
                        <ChevronUp size={24} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={24} className="text-gray-600" />
                      )}
                    </button>

                    {/* Day exercises */}
                    <AnimatePresence>
                      {expandedDays.includes(dayIndex.toString()) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 space-y-3">
                            {day.exercises.map((exercise: Exercise, exIndex: number) => (
                              <div
                                key={exercise.id}
                                className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200"
                              >
                                <div className="flex items-center gap-4 flex-1">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                                    {exIndex + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-bold text-gray-900">{exercise.name}</p>
                                    {exercise.notes && (
                                      <p className="text-xs text-gray-500 italic mt-1">{exercise.notes}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Series</p>
                                    <p className="text-lg font-bold text-purple-600">{exercise.sets}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Reps</p>
                                    <p className="text-lg font-bold text-pink-600">{exercise.reps}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Descanso</p>
                                    <p className="text-lg font-bold text-blue-600">{exercise.rest}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer con acciones */}
        <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-t-2 border-gray-200">
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onUseAsBase(template.id)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <Play size={20} />
              Usar como Base
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 rounded-2xl font-bold hover:from-blue-200 hover:to-cyan-200 transition-all duration-300"
            >
              <Copy size={20} />
              Duplicar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 rounded-2xl font-bold hover:from-green-200 hover:to-emerald-200 transition-all duration-300"
            >
              <Share2 size={20} />
              Compartir
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlantillaPreview;
