// Perfil psicológico deportivo tests personalidad motivación
import { motion } from 'framer-motion';
import { Heart, Brain, Target, Smile, Zap } from 'lucide-react';

const PerfilPsicologico = () => {
  const aspectos = [
    { aspecto: 'Motivación', nivel: 88, icon: Target, color: 'from-purple-500 to-pink-600' },
    { aspecto: 'Confianza', nivel: 75, icon: Smile, color: 'from-blue-500 to-indigo-600' },
    { aspecto: 'Concentración', nivel: 92, icon: Brain, color: 'from-indigo-500 to-purple-600' },
    { aspecto: 'Resiliencia', nivel: 80, icon: Zap, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Heart className="w-7 h-7" />
          </div>
          Perfil Psicológico
        </h3>
        <p className="text-pink-100 mt-2 relative z-10">Tests de personalidad y motivación deportiva</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aspectos.map((asp, index) => {
            const Icon = asp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Decoración de fondo */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${asp.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{asp.aspecto}</p>
                      <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                        {asp.nivel}%
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${asp.nivel}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${asp.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
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

export default PerfilPsicologico;
