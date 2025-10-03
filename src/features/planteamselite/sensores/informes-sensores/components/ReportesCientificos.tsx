import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Lightbulb, CheckCircle } from 'lucide-react';

const ReportesCientificos: React.FC = () => {
  const recomendaciones = [
    'Incrementar trabajo de fuerza explosiva en miembros inferiores',
    'Mantener volumen actual de entrenamiento aeróbico',
    'Incorporar sesiones de pliometría 2x por semana',
    'Monitorear asimetrías en próxima sesión de evaluación',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileText className="w-6 h-6" />
            </div>
            Reportes Científicos
          </h2>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold text-white transition-all duration-300 flex items-center gap-2 border border-white/30">
            <Download className="w-5 h-5" />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Generación de reportes científicos y <span className="font-bold text-purple-700 px-2 py-1 bg-purple-50 rounded-lg">recomendaciones específicas</span> para próximas sesiones.
        </p>

        {/* Recomendaciones */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 mb-6 border border-purple-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-purple-600" />
            Recomendaciones para Próximas Sesiones
          </h3>
          <ul className="space-y-3">
            {recomendaciones.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 p-3 bg-white rounded-xl border border-purple-100"
              >
                <div className="p-1 bg-purple-500 rounded-lg mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-gray-700 flex-1">{rec}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Botones de exportar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { formato: 'PDF Completo', icon: FileText, color: 'from-red-500 to-pink-500' },
            { formato: 'Excel Data', icon: FileText, color: 'from-green-500 to-emerald-500' },
            { formato: 'Gráficos PNG', icon: FileText, color: 'from-blue-500 to-indigo-500' },
          ].map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-3 bg-gradient-to-r ${item.color} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <item.icon className="w-5 h-5" />
              {item.formato}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportesCientificos;
