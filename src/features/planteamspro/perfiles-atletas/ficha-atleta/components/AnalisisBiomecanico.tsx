// Análisis biomecánico evaluación movimientos fundamentales
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle } from 'lucide-react';

const AnalisisBiomecanico = () => {
  const movimientos = [
    { nombre: 'Sentadilla', puntuacion: 85, estado: 'Excelente' },
    { nombre: 'Zancada', puntuacion: 72, estado: 'Bueno' },
    { nombre: 'Salto Vertical', puntuacion: 90, estado: 'Excelente' },
    { nombre: 'Sprint', puntuacion: 78, estado: 'Bueno' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Activity className="w-7 h-7" />
          </div>
          Análisis Biomecánico
        </h3>
        <p className="text-blue-100 mt-2 relative z-10">Evaluación de movimientos fundamentales del atleta</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {movimientos.map((mov, index) => (
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

              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{mov.nombre}</p>
                      <p className="text-sm text-gray-600">{mov.estado}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    {mov.puntuacion}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mov.puntuacion}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalisisBiomecanico;
