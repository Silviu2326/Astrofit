import React from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, Activity, Zap, AlertCircle, BarChart3, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPostSesion: React.FC = () => {
  // Datos de ejemplo para las gráficas
  const cargaTotalData = {
    labels: ['Sesión 1', 'Sesión 2', 'Sesión 3', 'Sesión Actual'],
    datasets: [
      {
        label: 'Carga Total (UA)',
        data: [120, 135, 110, 145],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const aceleracionesData = {
    labels: ['0-10m', '10-20m', '20-30m'],
    datasets: [
      {
        label: 'Aceleraciones (m/s²)',
        data: [3.5, 2.8, 2.1],
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(99, 102, 241, 0.8)',
        ],
        borderRadius: 12,
        borderWidth: 0,
      },
    ],
  };

  const metricas = [
    { label: 'Carga Total', value: '145 UA', status: 'Alto', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { label: 'Distancia Recorrida', value: '5.2 km', status: 'Óptimo', icon: Activity, color: 'from-blue-500 to-indigo-500' },
    { label: 'Aceleraciones Máx', value: '3.5 m/s²', status: 'Bueno', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { label: 'Fatiga Acumulada', value: 'Moderada', status: 'Normal', icon: AlertCircle, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          Dashboard de Análisis Post-Sesión
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Cards de métricas clave */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricas.map((metrica, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${metrica.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metrica.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  <metrica.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">{metrica.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metrica.value}</p>
                <div className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg inline-block">
                  <span className="text-xs font-bold text-purple-700">{metrica.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumen Ejecutivo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              Resumen Ejecutivo de la Sesión
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Esta sesión mostró una <span className="font-bold text-purple-700">carga total elevada</span>, con picos de intensidad en los primeros 30 minutos.
              El atleta mantuvo un buen rendimiento en las zonas de alta intensidad, pero se observa un incremento
              en los indicadores de fatiga hacia el final.
            </p>
          </div>
        </motion.div>

        {/* Gráficos comparativos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-md relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Carga Total y Comparativa
              </h3>
              <div className="h-64">
                <Line
                  data={cargaTotalData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(139, 92, 246, 0.1)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-md relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-pink-600" />
                Aceleraciones
              </h3>
              <div className="h-64">
                <Bar
                  data={aceleracionesData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(236, 72, 153, 0.1)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Datos por Atleta con progress bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Tiempo en Zonas de Intensidad
            </h3>
            <div className="space-y-4">
              {[
                { zona: 'Zona 1 (Baja)', tiempo: '30 min', porcentaje: 32, color: 'from-green-500 to-emerald-600' },
                { zona: 'Zona 2 (Moderada)', tiempo: '45 min', porcentaje: 47, color: 'from-yellow-500 to-orange-600' },
                { zona: 'Zona 3 (Alta)', tiempo: '20 min', porcentaje: 21, color: 'from-red-500 to-pink-600' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.zona}</span>
                    <span className="text-sm font-bold text-gray-900">{item.tiempo}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.porcentaje}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Picos de Intensidad
            </h3>
            <div className="space-y-3">
              {[
                { pico: 'Pico 1', bpm: '180 bpm', tiempo: 'min 15', color: 'from-red-500 to-pink-500' },
                { pico: 'Pico 2', bpm: '175 bpm', tiempo: 'min 40', color: 'from-orange-500 to-red-500' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{item.bpm}</p>
                    <p className="text-sm text-gray-600">{item.tiempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparativa con sesiones anteriores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Comparativa con Sesiones Anteriores
          </h3>
          <p className="text-gray-700 leading-relaxed">
            La carga total de esta sesión es un <span className="font-bold text-emerald-700 px-2 py-1 bg-emerald-100 rounded-lg">10% superior</span> al promedio de las últimas 5 sesiones de este tipo.
            Se observa una mejora en la capacidad de mantener la intensidad en periodos prolongados.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPostSesion;
