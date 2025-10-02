import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, User, TrendingDown, Bell } from 'lucide-react';

const AlertasEstancados: React.FC = () => {
  const alertas = [
    {
      id: '1',
      name: 'Ana García',
      stage: 'Lead',
      daysStuck: 25,
      severity: 'high',
    },
    {
      id: '2',
      name: 'Luis Fernández',
      stage: 'Cliente nuevo',
      daysStuck: 18,
      severity: 'medium',
    },
    {
      id: '3',
      name: 'Sofía Martín',
      stage: 'Lead',
      daysStuck: 30,
      severity: 'high',
    },
    {
      id: '4',
      name: 'Carlos Ruiz',
      stage: 'Activo',
      daysStuck: 12,
      severity: 'low',
    },
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          gradient: 'from-red-500 to-orange-600',
          bgGradient: 'from-red-50 to-orange-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-300',
          icon: AlertTriangle,
          label: 'Crítico',
        };
      case 'medium':
        return {
          gradient: 'from-orange-500 to-yellow-600',
          bgGradient: 'from-orange-50 to-yellow-50',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-300',
          icon: Clock,
          label: 'Moderado',
        };
      default:
        return {
          gradient: 'from-yellow-500 to-amber-600',
          bgGradient: 'from-yellow-50 to-amber-50',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-300',
          icon: TrendingDown,
          label: 'Bajo',
        };
    }
  };

  const highAlerts = alertas.filter(a => a.severity === 'high').length;
  const mediumAlerts = alertas.filter(a => a.severity === 'medium').length;
  const lowAlerts = alertas.filter(a => a.severity === 'low').length;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden h-full">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Bell className="w-6 h-6" />
            </div>
            Alertas de Clientes
          </h3>
          <p className="text-orange-100 text-sm">
            Clientes estancados que requieren atención
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3 border border-red-200"
          >
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mb-1" />
              <p className="text-2xl font-bold text-red-700">{highAlerts}</p>
              <p className="text-xs text-gray-600 font-semibold">Críticos</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-3 border border-orange-200"
          >
            <div className="flex flex-col items-center">
              <Clock className="w-5 h-5 text-orange-600 mb-1" />
              <p className="text-2xl font-bold text-orange-700">{mediumAlerts}</p>
              <p className="text-xs text-gray-600 font-semibold">Moderados</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 border border-yellow-200"
          >
            <div className="flex flex-col items-center">
              <TrendingDown className="w-5 h-5 text-yellow-600 mb-1" />
              <p className="text-2xl font-bold text-yellow-700">{lowAlerts}</p>
              <p className="text-xs text-gray-600 font-semibold">Bajos</p>
            </div>
          </motion.div>
        </div>

        {/* Alertas list */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {alertas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 opacity-20 flex items-center justify-center mb-3">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-500 font-medium">
                No hay clientes estancados
              </p>
              <p className="text-xs text-gray-400 mt-1">
                ¡Excelente trabajo!
              </p>
            </div>
          ) : (
            alertas.map((alerta, index) => {
              const config = getSeverityConfig(alerta.severity);
              const Icon = config.icon;

              return (
                <motion.div
                  key={alerta.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`bg-gradient-to-r ${config.bgGradient} rounded-2xl p-4 border-2 ${config.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Name & ID */}
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        <p className="font-bold text-gray-800 truncate">{alerta.name}</p>
                      </div>

                      {/* Stage */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-2 py-1 bg-white/80 rounded-lg border border-gray-200">
                          <span className="text-xs font-bold text-gray-700">{alerta.stage}</span>
                        </div>
                      </div>

                      {/* Time stuck */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-600">
                          Estancado {alerta.daysStuck} días
                        </span>
                      </div>
                    </div>

                    {/* Severity badge */}
                    <div className={`px-3 py-1 bg-gradient-to-r ${config.gradient} rounded-full shadow-md flex-shrink-0`}>
                      <span className="text-xs font-bold text-white">{config.label}</span>
                    </div>
                  </div>

                  {/* Progress bar showing how critical */}
                  <div className="mt-3 w-full bg-white/70 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((alerta.daysStuck / 30) * 100, 100)}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
                    ></motion.div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Footer con recomendación */}
        {alertas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-orange-800 mb-1">
                  Acción Requerida
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {highAlerts > 0 && (
                    <>Hay <span className="font-bold text-red-700">{highAlerts} cliente{highAlerts > 1 ? 's' : ''}</span> en situación crítica. </>
                  )}
                  Contacta a estos clientes para evitar la pérdida y mejorar las tasas de conversión.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlertasEstancados;
