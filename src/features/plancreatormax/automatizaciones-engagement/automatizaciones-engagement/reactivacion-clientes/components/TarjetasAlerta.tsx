import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, User } from 'lucide-react';

interface Alerta {
  id: string;
  cliente: string;
  tiempoInactivo: string;
  severidad: 'baja' | 'media' | 'alta';
  mensaje: string;
  avatar: string;
}

const TarjetasAlerta: React.FC = () => {
  const alertas: Alerta[] = [
    {
      id: '1',
      cliente: 'Cliente A',
      avatar: '👤',
      tiempoInactivo: '90 días',
      severidad: 'alta',
      mensaje: 'Cliente con alta probabilidad de abandono.'
    },
    {
      id: '2',
      cliente: 'Cliente B',
      avatar: '👥',
      tiempoInactivo: '60 días',
      severidad: 'media',
      mensaje: 'Considerar contacto para reactivación.'
    },
    {
      id: '3',
      cliente: 'Cliente C',
      avatar: '🧑',
      tiempoInactivo: '120 días',
      severidad: 'alta',
      mensaje: 'Crítico: cliente inactivo por mucho tiempo.'
    },
  ];

  const getSeverityStyles = (severidad: Alerta['severidad']) => {
    switch (severidad) {
      case 'alta':
        return {
          bg: 'from-red-50 to-red-100',
          border: 'border-red-400',
          text: 'text-red-700',
          badge: 'bg-red-500',
          icon: 'text-red-600'
        };
      case 'media':
        return {
          bg: 'from-yellow-50 to-amber-50',
          border: 'border-yellow-400',
          text: 'text-yellow-700',
          badge: 'bg-yellow-500',
          icon: 'text-yellow-600'
        };
      case 'baja':
        return {
          bg: 'from-green-50 to-emerald-50',
          border: 'border-green-400',
          text: 'text-green-700',
          badge: 'bg-green-500',
          icon: 'text-green-600'
        };
      default:
        return {
          bg: 'from-gray-50 to-gray-100',
          border: 'border-gray-400',
          text: 'text-gray-700',
          badge: 'bg-gray-500',
          icon: 'text-gray-600'
        };
    }
  };

  return (
    <div className="space-y-4">
      {alertas.map((alerta, index) => {
        const styles = getSeverityStyles(alerta.severidad);

        return (
          <motion.div
            key={alerta.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`bg-gradient-to-r ${styles.bg} backdrop-blur-xl rounded-2xl p-4 border-2 ${styles.border} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                {alerta.avatar}
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={`text-lg font-bold ${styles.text}`}>{alerta.cliente}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className={`w-4 h-4 ${styles.icon}`} />
                      <span className={`text-sm font-semibold ${styles.text}`}>
                        Inactivo por: {alerta.tiempoInactivo}
                      </span>
                    </div>
                  </div>

                  {/* Badge de severidad */}
                  <div className={`px-3 py-1 ${styles.badge} text-white text-xs font-bold rounded-full uppercase`}>
                    {alerta.severidad}
                  </div>
                </div>

                {/* Mensaje */}
                <div className={`flex items-start gap-2 p-3 bg-white/50 rounded-xl border border-white/50 ${styles.text}`}>
                  <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.icon}`} />
                  <p className="text-sm font-medium">{alerta.mensaje}</p>
                </div>

                {/* Acciones */}
                <div className="mt-3 flex gap-2">
                  <button className={`flex-1 py-2 ${styles.badge} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm`}>
                    Contactar
                  </button>
                  <button className={`px-4 py-2 bg-white/80 ${styles.text} rounded-xl font-semibold hover:bg-white transition-colors duration-300 text-sm`}>
                    Ver Perfil
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TarjetasAlerta;
