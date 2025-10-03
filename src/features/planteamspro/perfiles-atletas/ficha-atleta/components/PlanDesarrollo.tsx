// Plan desarrollo individualizado objetivos corto largo plazo
import { motion } from 'framer-motion';
import { Target, Calendar, CheckCircle, TrendingUp } from 'lucide-react';

const PlanDesarrollo = () => {
  const objetivos = [
    { titulo: 'Mejorar velocidad de sprint', plazo: 'Corto plazo', progreso: 65, completado: false },
    { titulo: 'Incrementar masa muscular', plazo: 'Medio plazo', progreso: 40, completado: false },
    { titulo: 'Dominar técnica de lanzamiento', plazo: 'Largo plazo', progreso: 85, completado: false },
    { titulo: 'Optimizar recuperación post-entrenamiento', plazo: 'Corto plazo', progreso: 100, completado: true }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Target className="w-7 h-7" />
          </div>
          Plan de Desarrollo
        </h3>
        <p className="text-emerald-100 mt-2 relative z-10">Objetivos individualizados a corto y largo plazo</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-4">
          {objetivos.map((obj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-3 rounded-2xl ${obj.completado ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'} shadow-xl`}>
                      {obj.completado ? <CheckCircle className="w-6 h-6 text-white" /> : <Target className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-900">{obj.titulo}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{obj.plazo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    {obj.progreso}%
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-emerald-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${obj.progreso}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full ${obj.completado ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500'} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>

                {obj.completado && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      ✓ Completado
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDesarrollo;
