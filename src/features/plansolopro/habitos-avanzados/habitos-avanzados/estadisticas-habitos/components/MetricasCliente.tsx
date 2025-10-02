import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getClientMetrics, MetricasClienteData } from '../estadisticasHabitosApi';
import { Users, Loader, TrendingUp, CheckCircle2, Target } from 'lucide-react';

const MetricasCliente: React.FC = () => {
  const [clientMetrics, setClientMetrics] = useState<MetricasClienteData[] | null>(null);

  useEffect(() => {
    getClientMetrics().then(data => setClientMetrics(data));
  }, []);

  if (!clientMetrics) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-orange-500 animate-spin" />
          <span className="ml-3 text-gray-600">Cargando métricas...</span>
        </div>
      </div>
    );
  }

  // Calcular estadísticas generales
  const totalClients = clientMetrics.length;
  const avgAdherence = Math.round(
    clientMetrics.reduce((sum, client) => sum + client.adherenceRate, 0) / totalClients
  );
  const topPerformer = clientMetrics.reduce((max, client) =>
    client.adherenceRate > max.adherenceRate ? client : max
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border border-white/50 relative overflow-hidden group">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Métricas por Cliente</h2>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full">
            <span className="text-sm font-bold text-orange-700">{totalClients} clientes</span>
          </div>
        </div>

        {/* Resumen de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-white rounded-lg">
                <Target className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-xs font-semibold text-gray-600">Adherencia Promedio</p>
            </div>
            <p className="text-2xl font-bold text-orange-600">{avgAdherence}%</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-white rounded-lg">
                <TrendingUp className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-xs font-semibold text-gray-600">Mejor Desempeño</p>
            </div>
            <p className="text-lg font-bold text-red-600 truncate">{topPerformer.clientName}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-white rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-pink-600" />
              </div>
              <p className="text-xs font-semibold text-gray-600">Mejor Tasa</p>
            </div>
            <p className="text-2xl font-bold text-pink-600">{topPerformer.adherenceRate}%</p>
          </div>
        </div>

        {/* Tabla de clientes */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header de tabla */}
            <div className="grid grid-cols-5 gap-4 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl mb-3">
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">Cliente</div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider text-center">Total Hábitos</div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider text-center">Cumplidos</div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider text-center">Adherencia</div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider text-center">Prom. Diario</div>
            </div>

            {/* Filas de clientes */}
            <div className="space-y-2">
              {clientMetrics.map((client, index) => (
                <motion.div
                  key={client.clientId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="grid grid-cols-5 gap-4 p-4 rounded-2xl border border-transparent hover:border-orange-200 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-pink-50/50 transition-all duration-300 group"
                >
                  {/* Nombre del cliente */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {client.clientName.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm font-bold text-gray-900">{client.clientName}</p>
                  </div>

                  {/* Total hábitos */}
                  <div className="flex items-center justify-center">
                    <div className="px-3 py-1 bg-orange-100 rounded-full">
                      <p className="text-sm font-bold text-orange-700">{client.totalHabits}</p>
                    </div>
                  </div>

                  {/* Hábitos cumplidos */}
                  <div className="flex items-center justify-center">
                    <div className="px-3 py-1 bg-green-100 rounded-full">
                      <p className="text-sm font-bold text-green-700">{client.completedHabits}</p>
                    </div>
                  </div>

                  {/* Tasa de adherencia con barra */}
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-[100px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-gray-900">{client.adherenceRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${client.adherenceRate}%` }}
                          transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                          className={`h-full rounded-full ${
                            client.adherenceRate >= 80
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                              : client.adherenceRate >= 60
                              ? 'bg-gradient-to-r from-orange-500 to-yellow-600'
                              : 'bg-gradient-to-r from-red-500 to-orange-600'
                          }`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Promedio diario */}
                  <div className="flex items-center justify-center">
                    <div className="px-3 py-1 bg-pink-100 rounded-full">
                      <p className="text-sm font-bold text-pink-700">{client.dailyAverage.toFixed(1)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer con nota */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200">
          <p className="text-xs text-gray-700 leading-relaxed">
            💡 <span className="font-bold">Tip:</span> Los clientes con adherencia superior al 80% están destacados en verde.
            Considera reconocer su esfuerzo y compartir sus estrategias con el resto del grupo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricasCliente;
