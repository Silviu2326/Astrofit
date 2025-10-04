import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb, Target, Clock, CheckCircle2,
  AlertTriangle, ArrowRight, TrendingUp, Users
} from 'lucide-react';
import { useGetFeedbackQuery } from '../encuestasNpsApi';

const AccionesMejora: React.FC = () => {
  const { data: feedback, isLoading } = useGetFeedbackQuery();
  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const improvementSuggestions = [
    {
      id: '1',
      category: 'Clases',
      priority: 'high',
      suggestion: 'Introducir nuevas clases de alta intensidad y yoga para aumentar la variedad.',
      status: 'in-progress',
      expectedImpact: '+8 puntos NPS',
      realImpact: '+6 puntos NPS',
      progress: 65,
      deadline: '15 Mar 2024',
      relatedFeedback: feedback?.filter(f => f.comment.includes('clases')) || [],
    },
    {
      id: '2',
      category: 'Atención al Cliente',
      priority: 'high',
      suggestion: 'Capacitar al personal en resolución de conflictos y mejorar los tiempos de respuesta.',
      status: 'planned',
      expectedImpact: '+12 puntos NPS',
      realImpact: '-',
      progress: 20,
      deadline: '30 Mar 2024',
      relatedFeedback: feedback?.filter(f => f.comment.includes('atención')) || [],
    },
    {
      id: '3',
      category: 'Instalaciones',
      priority: 'medium',
      suggestion: 'Modernizar el equipo de cardio y revisar la limpieza de los vestuarios.',
      status: 'in-progress',
      expectedImpact: '+5 puntos NPS',
      realImpact: '+4 puntos NPS',
      progress: 45,
      deadline: '10 Abr 2024',
      relatedFeedback: feedback?.filter(f => f.comment.includes('instalaciones') || f.comment.includes('gimnasio')) || [],
    },
    {
      id: '4',
      category: 'Horarios',
      priority: 'low',
      suggestion: 'Extender el horario de apertura los fines de semana y ofrecer clases temprano por la mañana.',
      status: 'completed',
      expectedImpact: '+6 puntos NPS',
      realImpact: '+7 puntos NPS',
      progress: 100,
      deadline: '05 Mar 2024',
      relatedFeedback: feedback?.filter(f => f.comment.includes('horario')) || [],
    },
  ];

  const priorityConfig = {
    high: { label: 'Alta', color: 'from-red-500 to-orange-600', badge: 'bg-red-500', icon: AlertTriangle },
    medium: { label: 'Media', color: 'from-yellow-500 to-orange-500', badge: 'bg-yellow-500', icon: Target },
    low: { label: 'Baja', color: 'from-blue-500 to-indigo-600', badge: 'bg-blue-500', icon: Lightbulb },
  };

  const statusConfig = {
    'planned': { label: 'Planificada', color: 'bg-gray-500', textColor: 'text-gray-700' },
    'in-progress': { label: 'En Progreso', color: 'bg-blue-500', textColor: 'text-blue-700' },
    'completed': { label: 'Completada', color: 'bg-green-500', textColor: 'text-green-700' },
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10 mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Target className="w-6 h-6" />
          </div>
          Acciones de Mejora
        </h3>
        <p className="text-green-100 text-sm relative z-10">
          Recomendaciones priorizadas con tracking de implementación
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-4">
          {improvementSuggestions.map((action, index) => {
            const priority = priorityConfig[action.priority as keyof typeof priorityConfig];
            const status = statusConfig[action.status as keyof typeof statusConfig];
            const isExpanded = expandedAction === action.id;

            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-green-300 transition-all duration-300 hover:shadow-lg"
              >
                {/* Header de acción */}
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedAction(isExpanded ? null : action.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Icono de prioridad */}
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${priority.color} shadow-lg`}>
                        <priority.icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1">
                        {/* Categoría y badges */}
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-bold text-gray-800">{action.category}</h4>
                          <div className={`px-2 py-1 ${priority.badge} text-white text-xs font-bold rounded-full`}>
                            {priority.label}
                          </div>
                          <div className={`px-2 py-1 ${status.color} text-white text-xs font-bold rounded-full`}>
                            {status.label}
                          </div>
                        </div>

                        {/* Sugerencia */}
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                          {action.suggestion}
                        </p>

                        {/* Progress bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-600 uppercase">Progreso</span>
                            <span className="text-xs font-bold text-green-600">{action.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${action.progress}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                              className={`h-full bg-gradient-to-r ${
                                action.progress === 100
                                  ? 'from-green-500 to-emerald-600'
                                  : action.progress >= 50
                                  ? 'from-blue-500 to-indigo-600'
                                  : 'from-orange-500 to-red-500'
                              } rounded-full relative`}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Métricas */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white rounded-lg p-2 border border-gray-200">
                            <div className="flex items-center gap-1 mb-1">
                              <TrendingUp className="w-3 h-3 text-green-600" />
                              <span className="text-xs font-bold text-gray-600 uppercase">Impacto Esp.</span>
                            </div>
                            <p className="text-sm font-bold text-green-600">{action.expectedImpact}</p>
                          </div>

                          <div className="bg-white rounded-lg p-2 border border-gray-200">
                            <div className="flex items-center gap-1 mb-1">
                              <CheckCircle2 className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-bold text-gray-600 uppercase">Impacto Real</span>
                            </div>
                            <p className="text-sm font-bold text-blue-600">{action.realImpact}</p>
                          </div>

                          <div className="bg-white rounded-lg p-2 border border-gray-200">
                            <div className="flex items-center gap-1 mb-1">
                              <Clock className="w-3 h-3 text-purple-600" />
                              <span className="text-xs font-bold text-gray-600 uppercase">Deadline</span>
                            </div>
                            <p className="text-sm font-bold text-purple-600">{action.deadline}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botón expandir */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                {/* Contenido expandible - Feedback relacionado */}
                {isExpanded && action.relatedFeedback.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t-2 border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Feedback Relacionado ({action.relatedFeedback.length})
                      </span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {action.relatedFeedback.map((f) => (
                        <div key={f.id} className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                              f.score >= 9 ? 'bg-green-500 text-white' :
                              f.score >= 7 ? 'bg-yellow-500 text-white' :
                              'bg-red-500 text-white'
                            }`}>
                              {f.score}/10
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                              {f.type === 'promoter' ? 'Promotor' : f.type === 'passive' ? 'Pasivo' : 'Detractor'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 italic">"{f.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Timeline de mejoras */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-700">Timeline de Implementación</p>
              <p className="text-xs text-gray-600">4 acciones planificadas | 1 completada | 2 en progreso</p>
            </div>
            <button className="px-4 py-2 bg-white border-2 border-green-300 rounded-xl text-sm font-bold text-green-700 hover:bg-green-50 transition-colors duration-300">
              Ver Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccionesMejora;