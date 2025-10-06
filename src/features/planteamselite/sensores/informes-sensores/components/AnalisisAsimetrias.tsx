import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const AnalisisAsimetrias: React.FC = () => {
  const asimetrias = [
    { zona: 'Pierna Izquierda', porcentaje: 48, diferencia: 4, estado: 'normal', icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
    { zona: 'Pierna Derecha', porcentaje: 52, diferencia: 4, estado: 'normal', icon: CheckCircle, color: 'from-blue-500 to-indigo-600' },
    { zona: 'Carga en Saltos', porcentaje: 45, diferencia: 10, estado: 'alerta', icon: AlertTriangle, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Shield className="w-6 h-6" />
          </div>
          Análisis de Asimetrías Biomecánicas
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Análisis automático de <span className="font-bold text-emerald-700 px-2 py-1 bg-emerald-50 rounded-lg">asimetrías biomecánicas</span> y alertas de posible lesión.
        </p>

        <div className="space-y-4 mb-6">
          {asimetrias.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{item.zona}</p>
                    <p className="text-sm text-gray-600">Diferencia: {item.diferencia}%</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full ${item.estado === 'normal' ? 'bg-green-50' : 'bg-orange-50'}`}>
                  <span className={`text-sm font-bold ${item.estado === 'normal' ? 'text-green-700' : 'text-orange-700'}`}>
                    {item.estado === 'normal' ? 'Normal' : 'Alerta'}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.porcentaje}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full relative`}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alerta */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-200 flex items-start gap-3">
          <div className="p-2 bg-orange-500 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-1">Recomendación</p>
            <p className="text-sm text-gray-700">Se detecta asimetría en la carga de saltos. Considerar ejercicios de equilibrio y fortalecimiento unilateral.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisAsimetrias;
