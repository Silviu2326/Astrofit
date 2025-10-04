import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle, CheckCircle, Utensils, Dumbbell, Moon, Droplets, Brain } from 'lucide-react';
import { fetchAdherenceData, AdherenceData } from '../agenteBienestarApi';

const SemaforoAdherencia: React.FC = () => {
  const [adherence, setAdherence] = useState<AdherenceData | null>(null);

  useEffect(() => {
    const getAdherenceData = async () => {
      const data = await fetchAdherenceData();
      setAdherence(data);
    };
    getAdherenceData();
  }, []);

  // Datos mock para áreas de bienestar
  const areas = [
    { icon: Utensils, name: 'Nutrición', value: 85, color: 'from-green-500 to-emerald-500', status: 'verde' },
    { icon: Dumbbell, name: 'Ejercicio', value: 72, color: 'from-blue-500 to-cyan-500', status: 'amarillo' },
    { icon: Moon, name: 'Sueño', value: 55, color: 'from-indigo-500 to-purple-500', status: 'rojo' },
    { icon: Droplets, name: 'Hidratación', value: 90, color: 'from-cyan-500 to-teal-500', status: 'verde' },
    { icon: Brain, name: 'Estrés', value: 35, color: 'from-orange-500 to-red-500', status: 'verde', inverted: true },
  ];

  const getColorClass = (status: 'verde' | 'amarillo' | 'rojo') => {
    switch (status) {
      case 'verde':
        return 'from-green-500 to-emerald-500';
      case 'amarillo':
        return 'from-yellow-500 to-orange-500';
      case 'rojo':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: 'verde' | 'amarillo' | 'rojo') => {
    switch (status) {
      case 'verde':
        return <CheckCircle className="w-6 h-6" />;
      case 'amarillo':
        return <TrendingUp className="w-6 h-6" />;
      case 'rojo':
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <Activity className="w-6 h-6" />;
    }
  };

  const getStatusText = (status: 'verde' | 'amarillo' | 'rojo') => {
    switch (status) {
      case 'verde':
        return { text: 'Excelente', message: '¡Sigue así! Tu adherencia es sobresaliente.' };
      case 'amarillo':
        return { text: 'Moderada', message: 'Vas bien, pero hay espacio para mejorar.' };
      case 'rojo':
        return { text: 'Necesita Atención', message: 'Enfoquémonos en mejorar tus hábitos.' };
      default:
        return { text: 'Cargando', message: '' };
    }
  };

  if (!adherence) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 text-center">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusText(adherence.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${getColorClass(adherence.status)} rounded-full blur-3xl opacity-20`}></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getColorClass(adherence.status)} flex items-center justify-center text-white shadow-xl`}>
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Semáforo de Adherencia</h3>
            <p className="text-sm text-gray-600">Estado general de bienestar</p>
          </div>
        </div>

        {/* Semáforo Principal */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
            className="relative inline-block"
          >
            {/* Círculo exterior con efecto de pulso */}
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${getColorClass(adherence.status)} p-2 shadow-2xl`}>
              <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-white mb-1">
                    {getStatusIcon(adherence.status)}
                  </div>
                  <p className="text-4xl md:text-5xl font-bold text-white">{adherence.percentage}%</p>
                </div>
                {/* Efecto de pulso animado */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getColorClass(adherence.status)} opacity-30 animate-pulse`}></div>
              </div>
            </div>

            {/* Anillo animado alrededor */}
            <svg className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray={`${adherence.percentage * 2.5} 250`}
                className="opacity-50"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <p className="text-xl font-bold text-gray-900 mb-2">
              Adherencia: <span className={`bg-gradient-to-r ${getColorClass(adherence.status)} bg-clip-text text-transparent`}>
                {statusInfo.text}
              </span>
            </p>
            <p className="text-sm text-gray-600">{statusInfo.message}</p>
          </motion.div>
        </div>

        {/* Métricas por Área */}
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Desglose por Área</h4>
          {areas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center text-white`}>
                    <area.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{area.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{area.value}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${area.inverted ? 100 - area.value : area.value}%` }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                  className={`h-full bg-gradient-to-r ${area.color} rounded-full relative`}
                >
                  <div className="absolute inset-0 bg-white/30"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alertas y Recomendaciones */}
        {adherence.status === 'rojo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-red-900 mb-1">Recomendación</p>
                <p className="text-xs text-red-700">
                  Concéntrate en mejorar tu rutina de sueño. Considera establecer un horario fijo para dormir.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {adherence.status === 'amarillo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-yellow-900 mb-1">Consejo</p>
                <p className="text-xs text-yellow-700">
                  Estás en el camino correcto. Mantén la constancia en tu ejercicio y nutrición.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {adherence.status === 'verde' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-900 mb-1">¡Excelente!</p>
                <p className="text-xs text-green-700">
                  Tu adherencia es sobresaliente. Sigue manteniendo estos hábitos saludables.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SemaforoAdherencia;
