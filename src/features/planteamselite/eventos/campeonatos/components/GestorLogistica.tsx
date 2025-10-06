import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Hotel, UtensilsCrossed, Shield, CheckCircle } from 'lucide-react';

const GestorLogistica: React.FC = () => {
  const servicios = [
    { nombre: 'Transporte', icono: Truck, estado: 'Confirmado', color: 'from-green-500 to-emerald-500', cantidad: '12 Buses' },
    { nombre: 'Hospedaje', icono: Hotel, estado: 'Reservado', color: 'from-blue-500 to-indigo-500', cantidad: '250 Habitaciones' },
    { nombre: 'Catering', icono: UtensilsCrossed, estado: 'Programado', color: 'from-orange-500 to-red-500', cantidad: '5000 Comidas' },
    { nombre: 'Seguridad', icono: Shield, estado: 'Activo', color: 'from-purple-500 to-pink-500', cantidad: '80 Agentes' },
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
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Gestor de Logística</h2>
        </div>
        <p className="text-emerald-100 mt-2 ml-11">Gestión completa de transporte, hospedaje, catering y seguridad</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicios.map((servicio, index) => {
            const IconComponent = servicio.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${servicio.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-bold text-gray-900 mb-1">{servicio.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2">{servicio.cantidad}</p>

                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">{servicio.estado}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default GestorLogistica;
