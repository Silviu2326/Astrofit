import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const OptimizadorPosicional: React.FC = () => {
  const sugerencias = [
    {
      tipo: 'Mejora',
      titulo: 'Intercambio Delantero-Extremo',
      descripcion: 'Cambiar al delantero #9 a extremo derecho mejoraría la creación de oportunidades en un 15%',
      impacto: 'alto',
      prioridad: 1,
      color: 'from-green-500 to-emerald-500',
      icon: CheckCircle,
    },
    {
      tipo: 'Optimización',
      titulo: 'Refuerzo Mediocampo Central',
      descripcion: 'Añadir un pivote defensivo reduciría las oportunidades del rival en un 12%',
      impacto: 'medio',
      prioridad: 2,
      color: 'from-blue-500 to-indigo-500',
      icon: Lightbulb,
    },
    {
      tipo: 'Advertencia',
      titulo: 'Debilidad en Banda Izquierda',
      descripcion: 'La banda izquierda muestra vulnerabilidad, considera reforzar esta posición',
      impacto: 'alto',
      prioridad: 1,
      color: 'from-orange-500 to-red-500',
      icon: AlertTriangle,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Lightbulb className="w-6 h-6" />
          </div>
          Optimizador Posicional
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 text-lg">
          Sugerencias inteligentes para maximizar el rendimiento del equipo.
        </p>

        {/* Lista de sugerencias */}
        <div className="space-y-4">
          {sugerencias.map((sugerencia, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                {/* Icono */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${sugerencia.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <sugerencia.icon className="w-8 h-8 text-white" />
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${sugerencia.color}`}>
                          {sugerencia.tipo}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          sugerencia.prioridad === 1
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          Prioridad {sugerencia.prioridad}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">{sugerencia.titulo}</h4>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-700 mb-4">{sugerencia.descripcion}</p>

                  {/* Acción */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${sugerencia.color} text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300`}
                  >
                    <span>Aplicar Sugerencia</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumen de impacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200"
        >
          <h4 className="text-lg font-bold text-gray-900 mb-4">Impacto Estimado Total</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                +27%
              </p>
              <p className="text-sm text-gray-600 mt-1">Efectividad</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                -18%
              </p>
              <p className="text-sm text-gray-600 mt-1">Vulnerabilidades</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                +32%
              </p>
              <p className="text-sm text-gray-600 mt-1">Rendimiento</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OptimizadorPosicional;
