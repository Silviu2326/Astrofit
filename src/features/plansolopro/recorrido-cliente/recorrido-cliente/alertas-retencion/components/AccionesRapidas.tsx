import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  Calendar,
  Gift,
  Mail,
  Target,
  Zap,
  Settings
} from 'lucide-react';
import { sendAccionRapida } from '../alertasRetencionApi';

interface AccionRapida {
  id: string;
  titulo: string;
  descripcion: string;
  icon: React.ElementType;
  gradient: string;
  accion: string;
}

const AccionesRapidas: React.FC = () => {
  const handleAccion = (clienteId: string, accion: string) => {
    sendAccionRapida(clienteId, accion);
    // En producción, aquí iría una notificación moderna en lugar de alert
    alert(`Acción '${accion}' ejecutada exitosamente`);
  };

  const acciones: AccionRapida[] = [
    {
      id: '1',
      titulo: 'Mensaje Motivacional',
      descripcion: 'Envía un mensaje personalizado de apoyo',
      icon: MessageCircle,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      accion: 'Enviar mensaje motivacional'
    },
    {
      id: '2',
      titulo: 'Programar Llamada',
      descripcion: 'Agenda una llamada de seguimiento',
      icon: Phone,
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      accion: 'Programar llamada'
    },
    {
      id: '3',
      titulo: 'Sesión Extra Gratis',
      descripcion: 'Ofrece una sesión de cortesía',
      icon: Gift,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      accion: 'Ofrecer sesión gratuita'
    },
    {
      id: '4',
      titulo: 'Email de Check-in',
      descripcion: 'Envía email personalizado de seguimiento',
      icon: Mail,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      accion: 'Enviar email de check-in'
    },
    {
      id: '5',
      titulo: 'Ajustar Objetivos',
      descripcion: 'Revisa y modifica metas del cliente',
      icon: Target,
      gradient: 'from-red-500 via-rose-500 to-pink-500',
      accion: 'Ajustar objetivos'
    },
    {
      id: '6',
      titulo: 'Reagendar Sesión',
      descripcion: 'Facilita el cambio de horario',
      icon: Calendar,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      accion: 'Reagendar sesión'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-br from-orange-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-2">
              Acciones Rápidas Sugeridas
            </h2>
            <p className="text-gray-600">Intervenciones efectivas para prevenir el churn</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>

        {/* Grid de acciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {acciones.map((accion, index) => {
            const Icon = accion.icon;

            return (
              <motion.button
                key={accion.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAccion('cliente-ejemplo', accion.accion)}
                className="relative overflow-hidden bg-gradient-to-br text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-left group border border-white/20"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`
                }}
              >
                {/* Gradiente de fondo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${accion.gradient} opacity-100`}></div>

                {/* Efecto hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* Decoración de blur */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '15px 15px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  {/* Icono con badge de acción rápida */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
                      <Zap className="w-3 h-3" />
                      <span className="text-xs font-bold">RÁPIDA</span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-lg font-bold mb-2 leading-tight">
                    {accion.titulo}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {accion.descripcion}
                  </p>

                  {/* Indicador de click */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <span>Click para ejecutar</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer informativo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Automatización Inteligente</p>
              <p className="text-xs text-gray-600">Las acciones se personalizan según el perfil y comportamiento de cada cliente</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccionesRapidas;
