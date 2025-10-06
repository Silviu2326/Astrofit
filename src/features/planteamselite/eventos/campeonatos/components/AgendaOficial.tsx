import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const AgendaOficial: React.FC = () => {
  const eventos = [
    { fecha: '15 Ene', hora: '14:00', equipo1: 'Team Alpha', equipo2: 'Team Beta', sede: 'Estadio Central', asistentes: 45000 },
    { fecha: '16 Ene', hora: '16:00', equipo1: 'Team Gamma', equipo2: 'Team Delta', sede: 'Arena Norte', asistentes: 32000 },
    { fecha: '17 Ene', hora: '18:00', equipo1: 'Team Epsilon', equipo2: 'Team Zeta', sede: 'Complejo Sur', asistentes: 18000 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Agenda Oficial de Campeonatos</h2>
        </div>
        <p className="text-cyan-100 mt-2 ml-11">Visualización de eventos complejos con múltiples sedes y cronogramas</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        <div className="space-y-4">
          {eventos.map((evento, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-2 bg-blue-500 text-white rounded-xl font-bold text-center min-w-[60px]">
                      <div className="text-xs">{evento.fecha}</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{evento.equipo1} vs {evento.equipo2}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">{evento.hora}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700 font-medium">{evento.sede}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700 font-medium">{evento.asistentes.toLocaleString()} asistentes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AgendaOficial;
