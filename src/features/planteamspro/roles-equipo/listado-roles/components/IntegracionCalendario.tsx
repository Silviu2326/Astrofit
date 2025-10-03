import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const IntegracionCalendario: React.FC = () => {
  const eventos = [
    { titulo: 'Reunión de Equipo', hora: '10:00 AM', lugar: 'Sala Principal', color: 'from-blue-500 to-indigo-600' },
    { titulo: 'Entrenamiento', hora: '3:00 PM', lugar: 'Campo Deportivo', color: 'from-green-500 to-emerald-600' },
    { titulo: 'Evaluación de Roles', hora: '5:00 PM', lugar: 'Oficina', color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calendar className="w-6 h-6" />
          </div>
          Calendario
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-3">
        {eventos.map((evento, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 cursor-pointer group"
          >
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${evento.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 mb-1">{evento.titulo}</p>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{evento.hora}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{evento.lugar}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default IntegracionCalendario;
