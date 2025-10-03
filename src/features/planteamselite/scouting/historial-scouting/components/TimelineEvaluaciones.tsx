import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Star, Award, AlertTriangle } from 'lucide-react';
import { Evaluation, PlayerEvent } from '../historialScoutingApi';

interface TimelineEvaluacionesProps {
  evaluations: Evaluation[];
  events: PlayerEvent[];
}

export const TimelineEvaluaciones: React.FC<TimelineEvaluacionesProps> = ({ evaluations, events }) => {
  // Combine and sort all timeline items by date
  const timelineItems = [...evaluations, ...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getEventIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'debut':
        return <Award className="w-5 h-5" />;
      case 'lesión':
      case 'lesion':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'debut':
        return 'from-green-500 to-emerald-500';
      case 'lesión':
      case 'lesion':
        return 'from-red-500 to-orange-500';
      default:
        return 'from-blue-500 to-indigo-500';
    }
  };

  return (
    <div className="relative">
      {/* Línea vertical del timeline */}
      <div className="absolute left-[25px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"></div>

      <div className="space-y-6">
        {timelineItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative flex items-start gap-4"
          >
            {/* Icono del timeline */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl z-10 bg-gradient-to-br ${
              'scout' in item
                ? 'from-blue-500 to-indigo-600'
                : getEventColor(item.type)
            }`}>
              {'scout' in item ? <Star className="w-6 h-6" /> : getEventIcon(item.type)}
            </div>

            {/* Card de contenido */}
            <motion.div
              whileHover={{ scale: 1.02, x: 8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-10 bg-gradient-to-br ${
                'scout' in item
                  ? 'from-blue-300 to-indigo-300'
                  : 'from-green-300 to-emerald-300'
              }`}></div>

              <div className="p-4 relative z-10">
                {/* Fecha badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>

                  {'scout' in item && (
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                      <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {item.scout}
                      </span>
                    </div>
                  )}
                </div>

                {'scout' in item ? (
                  // This is an evaluation
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">Evaluación de Scouting</h3>
                      <div className="flex items-center gap-2">
                        <div className={`px-4 py-2 rounded-xl font-bold text-lg ${
                          item.rating >= 8.0 ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                          item.rating >= 7.0 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' :
                          'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                        }`}>
                          {item.rating}
                        </div>
                        <span className="text-gray-500 text-sm font-semibold">/10</span>
                      </div>
                    </div>

                    {/* Barra de rating visual */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.rating / 10) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${
                          item.rating >= 8.0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          item.rating >= 7.0 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                          'bg-gradient-to-r from-orange-500 to-amber-500'
                        }`}
                      ></motion.div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-800">Notas:</span> {item.notes}
                      </p>
                    </div>
                  </div>
                ) : (
                  // This is an event
                  <div>
                    <div className={`inline-block px-4 py-2 rounded-xl mb-2 bg-gradient-to-r ${getEventColor(item.type)} text-white`}>
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        {getEventIcon(item.type)}
                        {item.type}
                      </h3>
                    </div>

                    <div className={`bg-gradient-to-r ${
                      item.type.toLowerCase() === 'debut' ? 'from-green-50 to-emerald-50 border-green-200' :
                      item.type.toLowerCase().includes('lesión') || item.type.toLowerCase().includes('lesion') ? 'from-red-50 to-orange-50 border-red-200' :
                      'from-blue-50 to-indigo-50 border-blue-200'
                    } rounded-xl p-3 border`}>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
