import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Droplet, Zap, TrendingDown } from 'lucide-react';

const SistemaSustentabilidad: React.FC = () => {
  const metricas = [
    { titulo: 'CO₂ Reducido', valor: '12.5 Ton', icono: Leaf, color: 'from-green-500 to-emerald-500', progreso: 85 },
    { titulo: 'Reciclaje', valor: '87%', icono: Recycle, color: 'from-blue-500 to-cyan-500', progreso: 87 },
    { título: 'Agua Ahorrada', valor: '3500 L', icono: Droplet, color: 'from-cyan-500 to-blue-500', progreso: 70 },
    { titulo: 'Energía Verde', valor: '95%', icono: Zap, color: 'from-yellow-500 to-orange-500', progreso: 95 },
  ];

  const impactos = [
    { categoria: 'Residuos Reciclados', cantidad: '2.8 Ton', porcentaje: 87 },
    { categoria: 'Energía Renovable', cantidad: '15,000 kWh', porcentaje: 95 },
    { categoria: 'Compensación CO₂', cantidad: '12.5 Ton', porcentaje: 85 },
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
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sistema de Sustentabilidad</h2>
        </div>
        <p className="text-green-100 mt-2 ml-11">Tracking de huella de carbono del evento y gestión de residuos</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        {/* Métricas de Sustentabilidad */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metricas.map((metrica, index) => {
            const IconComponent = metrica.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metrica.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metrica.valor}</p>
                <p className="text-xs text-gray-600 font-medium">{metrica.titulo}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Impacto Ambiental */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Impacto Ambiental Positivo</h3>
          {impactos.map((impacto, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <h4 className="font-bold text-gray-900">{impacto.categoria}</h4>
                </div>
                <span className="text-sm font-bold text-green-600">{impacto.cantidad}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${impacto.porcentaje}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs font-semibold text-gray-600">{impacto.porcentaje}% del objetivo</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Evento Carbono Neutral - Certificación en proceso</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SistemaSustentabilidad;
