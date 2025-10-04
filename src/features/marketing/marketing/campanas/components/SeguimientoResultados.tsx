import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Download, Zap } from 'lucide-react';
import { MOCK_CAMPANAS } from '../types';

const SeguimientoResultados: React.FC = () => {
  const campanasActivas = MOCK_CAMPANAS.filter(c => c.estado === 'Activa');

  const alertas = [
    {
      tipo: 'excelente',
      titulo: 'TikTok Challenge superando expectativas',
      descripcion: 'ROI de 380% - 26% por encima de objetivo',
      campana: campanasActivas.find(c => c.nombre === 'TikTok Challenge Viral'),
      icono: CheckCircle,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      tipo: 'advertencia',
      titulo: 'Presupuesto cerca del límite',
      descripcion: 'Black Friday ha usado 64% del presupuesto',
      campana: campanasActivas.find(c => c.nombre === 'Black Friday 2025'),
      icono: AlertTriangle,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50'
    },
    {
      tipo: 'info',
      titulo: 'Optimización recomendada',
      descripcion: 'Aumentar presupuesto en Google Ads para maximizar conversiones',
      campana: campanasActivas.find(c => c.nombre === 'Google Ads - Keywords Premium'),
      icono: Zap,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const timeline = [
    { fecha: '2025-10-01 10:30', evento: 'Campaña TikTok iniciada', tipo: 'inicio' },
    { fecha: '2025-10-01 14:15', evento: 'Alcanzadas 100K impresiones en Podcast', tipo: 'milestone' },
    { fecha: '2025-10-01 16:45', evento: 'ROI de App Download superó 250%', tipo: 'logro' },
    { fecha: '2025-10-01 18:20', evento: 'Alerta: Presupuesto Black Friday al 60%', tipo: 'alerta' }
  ];

  const recomendaciones = [
    {
      titulo: 'Aumentar inversión en TikTok',
      descripcion: 'El ROI de 380% indica oportunidad de escalar',
      impacto: 'Alto',
      accion: 'Incrementar presupuesto 30%'
    },
    {
      titulo: 'Pausar Facebook Ads temporalmente',
      descripcion: 'CTR bajo (4%) y CPC alto - optimizar creativos',
      impacto: 'Medio',
      accion: 'Revisar segmentación'
    },
    {
      titulo: 'Duplicar estrategia de Programa Referidos',
      descripcion: 'CPA más bajo ($4.67) y ROI excepcional (425%)',
      impacto: 'Alto',
      accion: 'Crear campaña similar'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header con exportar */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-violet-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl text-white shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Seguimiento en Tiempo Real
              </h2>
              <p className="text-sm text-gray-600">{campanasActivas.length} campañas activas monitoreándose</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Aquí se puede implementar la lógica para exportar el reporte
              alert('Exportando reporte de seguimiento...');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Exportar Reporte
          </motion.button>
        </div>
      </div>

      {/* Alertas y Notificaciones */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Alertas y Recomendaciones
          </h3>

          <div className="space-y-4">
            {alertas.map((alerta, idx) => {
              const Icon = alerta.icono;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  className={`${alerta.bgColor} rounded-2xl p-5 border-2 border-white shadow-md hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${alerta.color} rounded-xl text-white shadow-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{alerta.titulo}</h4>
                      <p className="text-sm text-gray-700 mb-2">{alerta.descripcion}</p>
                      {alerta.campana && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-2xl">{alerta.campana.imagen}</span>
                          <span className="font-semibold text-gray-600">{alerta.campana.nombre}</span>
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        // Aquí se puede implementar la lógica para mostrar más detalles
                        alert(`Ver detalles de: ${alerta.titulo}`);
                      }}
                      className="px-4 py-2 bg-white rounded-xl font-semibold text-sm shadow hover:shadow-md transition-all"
                    >
                      Ver más
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline de Eventos */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Timeline de Eventos
          </h3>

          <div className="space-y-4">
            {timeline.map((evento, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    evento.tipo === 'inicio' ? 'bg-blue-500' :
                    evento.tipo === 'milestone' ? 'bg-green-500' :
                    evento.tipo === 'logro' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}></div>
                  {idx < timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">{evento.fecha}</p>
                  <p className="text-sm font-semibold text-gray-900">{evento.evento}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recomendaciones de Optimización */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-violet-600" />
            Recomendaciones de Optimización
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recomendaciones.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-5 border-2 border-violet-200 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    rec.impacto === 'Alto' ? 'bg-red-500 text-white' :
                    rec.impacto === 'Medio' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    Impacto {rec.impacto}
                  </span>
                </div>

                <h4 className="font-bold text-gray-900 mb-2">{rec.titulo}</h4>
                <p className="text-sm text-gray-700 mb-3">{rec.descripcion}</p>

                <div className="pt-3 border-t border-violet-200">
                  <p className="text-xs text-gray-600 mb-2">Acción sugerida:</p>
                  <p className="text-sm font-bold text-violet-700">{rec.accion}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Aquí se puede implementar la lógica para aplicar la recomendación
                    alert(`Aplicando recomendación: ${rec.titulo}`);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-md transition-all"
                >
                  Aplicar
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoResultados;
