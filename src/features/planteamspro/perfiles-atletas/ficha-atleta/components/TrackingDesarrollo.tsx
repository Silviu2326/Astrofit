// Tracking desarrollo físico técnico táctico mental
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Brain, Target, ArrowUpRight } from 'lucide-react';

const TrackingDesarrollo = () => {
  const areas = [
    { area: 'Físico', progreso: 78, tendencia: '+12%', icono: Activity, color: 'from-emerald-500 to-teal-600' },
    { area: 'Técnico', progreso: 85, tendencia: '+8%', icono: Target, color: 'from-blue-500 to-indigo-600' },
    { area: 'Táctico', progreso: 72, tendencia: '+15%', icono: BarChart3, color: 'from-purple-500 to-pink-600' },
    { area: 'Mental', progreso: 88, tendencia: '+10%', icono: Brain, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart3 className="w-7 h-7" />
          </div>
          Tracking de Desarrollo
        </h3>
        <p className="text-indigo-100 mt-2 relative z-10">Seguimiento de desarrollo físico, técnico, táctico y mental</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, index) => {
            const Icono = area.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${area.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icono className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{area.area}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                          {area.progreso}%
                        </p>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-lg">
                          <ArrowUpRight className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-bold text-green-600">{area.tendencia}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${area.progreso}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${area.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>

                  {/* Timeline indicator */}
                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                    <span>Inicio</span>
                    <span className="font-semibold text-indigo-600">Progreso actual</span>
                    <span>Objetivo</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackingDesarrollo;
