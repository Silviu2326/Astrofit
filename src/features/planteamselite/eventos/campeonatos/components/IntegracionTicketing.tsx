import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, DoorOpen, TrendingUp, Users } from 'lucide-react';

const IntegracionTicketing: React.FC = () => {
  const sedes = [
    { nombre: 'Estadio Central', vendidos: 42500, capacidad: 50000, ocupacion: 85 },
    { nombre: 'Arena Norte', vendidos: 28000, capacidad: 35000, ocupacion: 80 },
    { nombre: 'Complejo Sur', vendidos: 15000, capacidad: 20000, ocupacion: 75 },
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
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Integración de Sistemas de Ticketing</h2>
        </div>
        <p className="text-violet-100 mt-2 ml-11">Control de aforo y gestión de accesos por sede</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        <div className="space-y-4">
          {sedes.map((sede, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <DoorOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-gray-900">{sede.nombre}</h3>
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {sede.vendidos.toLocaleString()} / {sede.capacidad.toLocaleString()}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-600">Ocupación</span>
                  <span className="text-sm font-bold text-purple-600">{sede.ocupacion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sede.ocupacion}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Ticket className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 font-medium">Vendidos: {sede.vendidos.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700 font-medium">Disponibles: {(sede.capacidad - sede.vendidos).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">Total Vendidos</span>
            </div>
            <p className="text-3xl font-bold text-purple-900">85,500</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-700">Ingresos</span>
            </div>
            <p className="text-3xl font-bold text-green-900">$2.1M</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntegracionTicketing;
