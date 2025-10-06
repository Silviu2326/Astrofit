import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Heart, Zap } from 'lucide-react';

const CorrelacionCargaInterna: React.FC = () => {
  const datos = [
    { tipo: 'Carga Externa', valor: '145 UA', correlacion: 85, icon: Zap, color: 'from-purple-500 to-pink-600' },
    { tipo: 'Carga Interna (FC)', valor: '162 bpm', correlacion: 78, icon: Heart, color: 'from-red-500 to-pink-500' },
    { tipo: 'RPE Reportado', valor: '7.5/10', correlacion: 92, icon: Link2, color: 'from-blue-500 to-indigo-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Link2 className="w-6 h-6" />
          </div>
          Correlación Carga Externa e Interna
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Correlación automática entre <span className="font-bold text-purple-700 px-2 py-1 bg-purple-50 rounded-lg">carga externa, carga interna y RPE</span> con datos objetivos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {datos.map((dato, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${dato.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dato.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  <dato.icon className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">{dato.tipo}</p>
                <p className="text-2xl font-bold text-gray-900 mb-3">{dato.valor}</p>

                <p className="text-xs text-gray-600 mb-2">Correlación</p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dato.correlacion}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${dato.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
                <p className="text-xs text-gray-600 mt-1 text-right font-bold">{dato.correlacion}%</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Análisis */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-indigo-700">Análisis:</span> Existe una correlación alta entre el RPE reportado y la carga externa medida (92%), lo que indica una buena percepción del esfuerzo por parte del atleta.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CorrelacionCargaInterna;
