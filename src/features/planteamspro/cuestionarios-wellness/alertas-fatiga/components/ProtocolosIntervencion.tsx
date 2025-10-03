// src/features/alertas-fatiga/components/ProtocolosIntervencion.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const ProtocolosIntervencion: React.FC = () => {
  const protocolos = [
    {
      nivel: 'Bajo Riesgo',
      acciones: ['Mantener rutina actual', 'Monitoreo continuo'],
      estado: 'Activo',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400'
    },
    {
      nivel: 'Riesgo Moderado',
      acciones: ['Reducir 20% volumen', 'Aumentar días de descanso'],
      estado: 'Activo',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400'
    },
    {
      nivel: 'Alto Riesgo',
      acciones: ['Descanso inmediato 48h', 'Evaluación médica', 'Terapia recuperación'],
      estado: 'Urgente',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Protocolos de Intervención</h3>
            <p className="text-xs text-gray-600">Acciones automáticas por nivel</p>
          </div>
        </div>

        {/* Lista de Protocolos */}
        <div className="space-y-4">
          {protocolos.map((protocolo, index) => {
            const Icon = protocolo.icon;
            return (
              <motion.div
                key={protocolo.nivel}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`${protocolo.bgColor} rounded-2xl p-4 border-l-4 ${protocolo.borderColor} shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 bg-gradient-to-br ${protocolo.color} rounded-xl shadow-lg`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{protocolo.nivel}</h4>
                      <span className={`text-xs font-semibold ${protocolo.estado === 'Urgente' ? 'text-red-600' : 'text-green-600'}`}>
                        Estado: {protocolo.estado}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lista de Acciones */}
                <div className="space-y-2 ml-10">
                  {protocolo.acciones.map((accion, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${protocolo.color}`}></div>
                      <span className="text-xs text-gray-700">{accion}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
          <p className="text-xs text-indigo-700 font-medium">
            <span className="font-bold">🔄 Automatización:</span> Los protocolos se activan automáticamente según el nivel de riesgo detectado.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProtocolosIntervencion;
