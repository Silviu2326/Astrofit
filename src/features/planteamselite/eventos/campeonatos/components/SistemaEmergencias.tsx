import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Ambulance, Phone, MapPinned, CheckCircle } from 'lucide-react';

const SistemaEmergencias: React.FC = () => {
  const servicios = [
    { nombre: 'Ambulancias', cantidad: 8, estado: 'Disponibles', icono: Ambulance, color: 'bg-red-500' },
    { nombre: 'Líneas Directas', cantidad: 5, estado: 'Activas', icono: Phone, color: 'bg-blue-500' },
    { nombre: 'Puntos Médicos', cantidad: 12, estado: 'Operativos', icono: MapPinned, color: 'bg-green-500' },
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
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sistema de Emergencias</h2>
        </div>
        <p className="text-orange-100 mt-2 ml-11">Escalamiento automático a servicios médicos y de seguridad</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {servicios.map((servicio, index) => {
            const IconComponent = servicio.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 ${servicio.color} rounded-xl`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{servicio.cantidad}</p>
                    <p className="text-xs text-gray-600 font-medium">{servicio.nombre}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">{servicio.estado}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Sistema de respuesta activo - Tiempo de respuesta: 2 min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SistemaEmergencias;
