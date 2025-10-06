import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, User, Activity, TrendingDown, CheckCircle } from 'lucide-react';
import { useAlertasFatigaApi } from '../alertasFatigaApi';

const PanelAlertas: React.FC = () => {
  const { atletas, alertas } = useAlertasFatigaApi();

  const getSeverityConfig = (severidad: string) => {
    if (severidad === 'rojo') {
      return {
        bg: 'bg-red-50/80',
        border: 'border-red-500',
        text: 'text-red-700',
        badge: 'bg-red-500',
        icon: AlertTriangle,
        label: 'Crítico',
        animate: 'animate-pulse'
      };
    }
    return {
      bg: 'bg-yellow-50/80',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      badge: 'bg-yellow-500',
      icon: AlertCircle,
      label: 'Moderado',
      animate: ''
    };
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-red-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-xl">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
            Panel de Alertas de Fatiga
          </h2>
        </div>

        {/* Alertas */}
        {alertas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold text-green-700">¡Todo en orden!</p>
            <p className="text-sm text-green-600 mt-2">No hay alertas de fatiga activas en este momento</p>
          </motion.div>
        ) : (
          <div className="space-y-4 mb-8">
            {alertas.map((alerta, index) => {
              const atleta = atletas.find(a => a.id === alerta.atletaId);
              const config = getSeverityConfig(alerta.severidad);
              const Icon = config.icon;

              return (
                <motion.div
                  key={alerta.atletaId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`relative ${config.bg} backdrop-blur-sm rounded-2xl p-6 border-l-4 ${config.border} shadow-lg ${config.animate}`}
                  role="alert"
                >
                  {/* Badge de severidad */}
                  <div className="absolute top-4 right-4">
                    <div className={`${config.badge} text-white text-xs font-bold rounded-full px-3 py-1 flex items-center gap-1`}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="space-y-3">
                    <h3 className={`text-lg font-bold ${config.text} flex items-center gap-2`}>
                      <Icon className="w-5 h-5" />
                      Alerta de Fatiga {config.label}
                    </h3>

                    <p className={`text-sm ${config.text} font-medium`}>
                      {alerta.mensaje}
                    </p>

                    {atleta && (
                      <div className={`flex items-center gap-4 p-3 bg-white/50 rounded-xl ${config.text}`}>
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold shadow-lg">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{atleta.nombre}</p>
                          <div className="flex gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              <span className="text-xs">Energía: {atleta.nivelEnergia}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingDown className="w-3 h-3" />
                              <span className="text-xs">Ánimo: {atleta.nivelAnimo}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={`p-3 bg-white/50 rounded-xl ${config.text}`}>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1">Recomendación</p>
                      <p className="text-sm font-medium">{alerta.recomendacion}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Lista de Atletas en Riesgo */}
        {alertas.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-4 mt-8">
              <div className="p-2 bg-orange-100 rounded-xl">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Atletas en Riesgo</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {alertas.map((alerta, index) => {
                const atleta = atletas.find(a => a.id === alerta.atletaId);
                const config = getSeverityConfig(alerta.severidad);

                return (
                  <motion.div
                    key={alerta.atletaId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 ${config.border} ${config.bg} backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.badge} flex items-center justify-center text-white font-bold shadow-lg`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${config.text}`}>{atleta?.nombre}</p>
                      <p className={`text-xs ${config.text} opacity-80`}>
                        Nivel: {alerta.severidad.charAt(0).toUpperCase() + alerta.severidad.slice(1)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PanelAlertas;