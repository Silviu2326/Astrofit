import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, AlertOctagon, ThermometerSun, Activity } from 'lucide-react';

const AlertasBurnout: React.FC = () => {
  const [alerts] = useState([
    { id: 1, person: 'Juan Pérez', level: 'critical', roles: 5, score: 92, message: 'Carga extremadamente alta' },
    { id: 2, person: 'María García', level: 'warning', roles: 3, score: 75, message: 'Carga elevada, monitorear' },
    { id: 3, person: 'Carlos Ruiz', level: 'normal', roles: 2, score: 45, message: 'Carga saludable' },
  ]);

  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          bg: 'from-red-500 to-orange-500',
          light: 'from-red-50 to-orange-50',
          border: 'border-red-300',
          text: 'text-red-700',
          icon: AlertOctagon,
          pulse: 'animate-pulse',
        };
      case 'warning':
        return {
          bg: 'from-yellow-500 to-orange-500',
          light: 'from-yellow-50 to-orange-50',
          border: 'border-yellow-300',
          text: 'text-yellow-700',
          icon: ThermometerSun,
          pulse: '',
        };
      default:
        return {
          bg: 'from-green-500 to-emerald-500',
          light: 'from-green-50 to-emerald-50',
          border: 'border-green-300',
          text: 'text-green-700',
          icon: Activity,
          pulse: '',
        };
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-500 to-orange-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* Icono y título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Flame className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Prevención</p>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
              Alertas Burnout
            </h3>
          </div>
        </div>

        {/* Lista de alertas */}
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const config = getLevelConfig(alert.level);
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl bg-gradient-to-r ${config.light} border-2 ${config.border} transition-all duration-300 ${config.pulse}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${config.bg} shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{alert.person}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${config.bg} text-white`}>
                        {alert.roles} roles
                      </span>
                      <span className={`text-xs font-semibold ${config.text}`}>
                        Score: {alert.score}
                      </span>
                    </div>
                  </div>
                </div>

                <p className={`text-xs font-medium ${config.text} mb-2`}>
                  {alert.message}
                </p>

                {/* Barra de riesgo */}
                <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alert.score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${config.bg} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer con estadísticas */}
        <div className="mt-6 p-3 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold text-red-700">1 alerta crítica</span>
            </div>
            <span className="text-xs font-medium text-gray-600">Acción requerida</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertasBurnout;
