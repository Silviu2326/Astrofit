// src/features/alertas-fatiga/components/SistemaEscalamiento.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Users, Stethoscope, CheckCircle, AlertCircle } from 'lucide-react';

const SistemaEscalamiento: React.FC = () => {
  const niveles = [
    {
      nivel: 'Nivel 1 - Atleta',
      descripcion: 'Notificación automática al atleta',
      estado: 'Completado',
      responsable: 'Atleta',
      icon: User,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      statusIcon: CheckCircle
    },
    {
      nivel: 'Nivel 2 - Entrenador',
      descripcion: 'Alerta enviada al entrenador principal',
      estado: 'En Proceso',
      responsable: 'Entrenador',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      statusIcon: AlertCircle
    },
    {
      nivel: 'Nivel 3 - Médico',
      descripcion: 'Escalamiento a equipo médico',
      estado: 'Pendiente',
      responsable: 'Médico Deportivo',
      icon: Stethoscope,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      statusIcon: Bell
    }
  ];

  const getEstadoColor = (estado: string) => {
    if (estado === 'Completado') return 'text-green-600 bg-green-100';
    if (estado === 'En Proceso') return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Sistema de Escalamiento</h3>
            <p className="text-xs text-gray-600">Cadena de notificaciones automática</p>
          </div>
        </div>

        {/* Timeline de Escalamiento */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-[21px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-300 via-blue-300 to-orange-300"></div>

          <div className="space-y-4">
            {niveles.map((nivel, index) => {
              const Icon = nivel.icon;
              const StatusIcon = nivel.statusIcon;
              return (
                <motion.div
                  key={nivel.nivel}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className={`relative ${nivel.bgColor} rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ml-12`}
                >
                  {/* Icono en la línea de tiempo */}
                  <div className={`absolute -left-12 top-4 p-2 bg-gradient-to-br ${nivel.color} rounded-xl shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{nivel.nivel}</h4>
                        <p className="text-xs text-gray-600 mt-1">{nivel.descripcion}</p>
                      </div>
                      <StatusIcon className={`w-5 h-5 flex-shrink-0 ml-2 ${nivel.estado === 'Completado' ? 'text-green-500' : nivel.estado === 'En Proceso' ? 'text-blue-500' : 'text-orange-500'}`} />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-gray-700">
                        👤 {nivel.responsable}
                      </span>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getEstadoColor(nivel.estado)}`}>
                        {nivel.estado}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
          <p className="text-xs text-red-700 font-medium">
            <span className="font-bold">⚡ Escalamiento automático:</span> El sistema notifica progresivamente según la severidad y tiempo de respuesta.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SistemaEscalamiento;
