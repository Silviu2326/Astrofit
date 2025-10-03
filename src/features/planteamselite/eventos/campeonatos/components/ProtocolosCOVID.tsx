import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Thermometer, ClipboardCheck, Users, AlertCircle } from 'lucide-react';

const ProtocolosCOVID: React.FC = () => {
  const medidas = [
    { nombre: 'Control de Temperatura', icono: Thermometer, estado: 'Activo', progreso: 100, color: 'text-red-600' },
    { nombre: 'Verificación de Vacunas', icono: ShieldCheck, estado: 'Activo', progreso: 95, color: 'text-blue-600' },
    { nombre: 'Distanciamiento', icono: Users, estado: 'Monitoreando', progreso: 87, color: 'text-green-600' },
    { nombre: 'Desinfección', icono: ClipboardCheck, estado: 'Programado', progreso: 100, color: 'text-purple-600' },
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
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Gestión Automatizada de Protocolos COVID</h2>
        </div>
        <p className="text-cyan-100 mt-2 ml-11">Implementación y seguimiento de medidas sanitarias</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        <div className="space-y-4">
          {medidas.map((medida, index) => {
            const IconComponent = medida.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-5 h-5 ${medida.color}`} />
                    <h3 className="font-bold text-gray-900">{medida.nombre}</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                    {medida.estado}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${medida.progreso}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs font-semibold text-gray-600">{medida.progreso}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Cumplimiento total de protocolos sanitarios</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProtocolosCOVID;
