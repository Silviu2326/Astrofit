import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, TrendingUp, Zap } from 'lucide-react';

const AlertasOportunidades: React.FC = () => {
  const alerts = [
    {
      type: 'high',
      title: 'Valor Alto Detectado',
      description: 'La cuota para "Más de 2.5 Goles" tiene un 15% de valor esperado positivo.',
      icon: Zap,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-300'
    },
    {
      type: 'medium',
      title: 'Oportunidad de Trading',
      description: 'Las cuotas de "Victoria Local" están aumentando en múltiples casas.',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-300'
    },
    {
      type: 'info',
      title: 'Discrepancia de Mercado',
      description: 'Diferencia de 8% entre las mejores y peores cuotas disponibles.',
      icon: AlertCircle,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-300'
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Bell className="w-6 h-6 text-red-500" />
        Alertas de Oportunidades
      </h3>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Notificaciones sobre <span className="font-bold text-red-600">oportunidades de valor</span> y discrepancias en los mercados.
      </p>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`bg-gradient-to-r ${alert.bgColor} p-5 rounded-2xl border-2 ${alert.borderColor} hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 bg-gradient-to-br ${alert.color} rounded-xl shadow-lg flex-shrink-0`}>
                <alert.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  {alert.title}
                  {alert.type === 'high' && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                      NUEVO
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {alert.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertasOportunidades;
