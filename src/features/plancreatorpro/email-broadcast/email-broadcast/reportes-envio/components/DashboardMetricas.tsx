import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, MousePointer, UserMinus, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import { fetchMetricasEmail, MetricasEmail } from '../reportesEnvioApi';

const DashboardMetricas: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricasEmail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetricasEmail();
      setMetrics(data);
      setLoading(false);
    };
    getMetrics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando métricas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="text-center text-red-500">
          <p>No se pudieron cargar las métricas.</p>
        </div>
      </div>
    );
  }

  const metricCards = [
    { 
      title: 'Tasa de Apertura', 
      value: `${metrics.tasaApertura}%`, 
      description: 'Porcentaje de emails abiertos',
      change: '+3.2%',
      progress: 75,
      icon: Eye,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      title: 'Tasa de Clics', 
      value: `${metrics.tasaClics}%`, 
      description: 'Porcentaje de clics en enlaces',
      change: '+1.1%',
      progress: 60,
      icon: MousePointer,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      title: 'Tasa de Bajas', 
      value: `${metrics.tasaBajas}%`, 
      description: 'Porcentaje de usuarios que se dieron de baja',
      change: '-0.5%',
      progress: 25,
      icon: UserMinus,
      color: 'from-orange-500 to-red-600'
    },
    { 
      title: 'Emails Enviados', 
      value: metrics.emailsEnviados.toLocaleString(), 
      description: 'Total de emails enviados',
      change: '+12.5%',
      progress: 85,
      icon: Send,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      title: 'Emails Entregados', 
      value: metrics.emailsEntregados.toLocaleString(), 
      description: 'Total de emails entregados con éxito',
      change: '+2.1%',
      progress: 95,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {metricCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${card.color} opacity-5 rounded-full blur-2xl`}></div>

          <div className="relative z-10 text-center">
            {/* Icono */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300 mx-auto`}>
              <card.icon className="w-8 h-8" />
            </div>

            {/* Título */}
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              {card.title}
            </p>

            {/* Valor */}
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {card.value}
            </p>

            {/* Cambio */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">{card.change}</span>
              <span className="text-xs text-gray-500 font-medium">vs anterior</span>
            </div>

            {/* Descripción */}
            <p className="text-xs text-gray-500 mb-4">{card.description}</p>

            {/* Barra decorativa */}
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${card.progress}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardMetricas;