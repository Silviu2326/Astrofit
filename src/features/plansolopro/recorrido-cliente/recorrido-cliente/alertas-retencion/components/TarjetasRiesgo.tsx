import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, TrendingDown, User } from 'lucide-react';
import { getClientesConRiesgo, Cliente } from '../alertasRetencionApi';

const TarjetasRiesgo: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientesConRiesgo();
        setClientes(data);
      } catch (error) {
        // Manejar error
        // Datos mockeados de fallback
        setClientes([
          { id: '1', nombre: 'María García', riesgo: 'alto', progreso: 25, semanasSinProgreso: 3 },
          { id: '2', nombre: 'Juan Pérez', riesgo: 'alto', progreso: 30, semanasSinProgreso: 2 },
          { id: '3', nombre: 'Ana Martínez', riesgo: 'medio', progreso: 55, semanasSinProgreso: 1 },
          { id: '4', nombre: 'Carlos López', riesgo: 'medio', progreso: 60, semanasSinProgreso: 1 },
          { id: '5', nombre: 'Laura Sánchez', riesgo: 'bajo', progreso: 85, semanasSinProgreso: 0 },
          { id: '6', nombre: 'Pedro Ramírez', riesgo: 'bajo', progreso: 90, semanasSinProgreso: 0 }
        ]);
      }
    };
    fetchClientes();
  }, []);

  const getRiskConfig = (riesgo: Cliente['riesgo']) => {
    switch (riesgo) {
      case 'alto':
        return {
          gradient: 'from-red-500 via-rose-500 to-pink-500',
          bgGradient: 'from-red-50 to-rose-50',
          textColor: 'text-red-700',
          iconBg: 'bg-red-500',
          label: 'RIESGO ALTO',
          icon: AlertCircle,
          borderColor: 'border-red-200'
        };
      case 'medio':
        return {
          gradient: 'from-orange-500 via-amber-500 to-yellow-500',
          bgGradient: 'from-orange-50 to-yellow-50',
          textColor: 'text-orange-700',
          iconBg: 'bg-orange-500',
          label: 'RIESGO MEDIO',
          icon: AlertCircle,
          borderColor: 'border-orange-200'
        };
      case 'bajo':
        return {
          gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
          bgGradient: 'from-emerald-50 to-teal-50',
          textColor: 'text-emerald-700',
          iconBg: 'bg-emerald-500',
          label: 'ESTABLE',
          icon: AlertCircle,
          borderColor: 'border-emerald-200'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-100',
          textColor: 'text-gray-700',
          iconBg: 'bg-gray-500',
          label: 'DESCONOCIDO',
          icon: AlertCircle,
          borderColor: 'border-gray-200'
        };
    }
  };

  // Ordenar por nivel de riesgo
  const sortedClientes = [...clientes].sort((a, b) => {
    const riskOrder = { alto: 1, medio: 2, bajo: 3 };
    return riskOrder[a.riesgo] - riskOrder[b.riesgo];
  });

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-rose-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-2">
            Clientes por Nivel de Riesgo
          </h2>
          <p className="text-gray-600">Semáforo visual de retención</p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedClientes.map((cliente, index) => {
            const config = getRiskConfig(cliente.riesgo);
            const Icon = config.icon;

            return (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`bg-gradient-to-br ${config.bgGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 border ${config.borderColor} relative overflow-hidden group`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

                <div className="relative z-10">
                  {/* Header con icono y badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 ${config.iconBg} rounded-xl text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className={`px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full border ${config.borderColor}`}>
                      <span className={`text-xs font-bold ${config.textColor}`}>{config.label}</span>
                    </div>
                  </div>

                  {/* Nombre del cliente */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      <User className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{cliente.nombre}</h3>
                  </div>

                  {/* Progreso con barra */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-600 uppercase">Progreso</span>
                      <span className="text-sm font-bold text-gray-900">{cliente.progreso}%</span>
                    </div>
                    <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cliente.progreso}%` }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${config.gradient} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Semanas sin progreso */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className={`w-4 h-4 ${config.textColor}`} />
                    <span className="text-gray-700 font-medium">
                      {cliente.semanasSinProgreso === 0 ? (
                        'Progreso activo'
                      ) : cliente.semanasSinProgreso === 1 ? (
                        '1 semana sin progreso'
                      ) : (
                        `${cliente.semanasSinProgreso} semanas sin progreso`
                      )}
                    </span>
                  </div>

                  {/* Alerta si aplica */}
                  {cliente.semanasSinProgreso >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.5 }}
                      className="mt-3 p-2 bg-red-100 border-l-4 border-red-500 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <p className="text-xs font-bold text-red-700">¡Requiere intervención inmediata!</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TarjetasRiesgo;
