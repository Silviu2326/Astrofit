import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Target } from 'lucide-react';

const BarrasConversion: React.FC = () => {
  const conversionData = [
    {
      from: 'Lead',
      to: 'Cliente nuevo',
      rate: 71,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
    },
    {
      from: 'Cliente nuevo',
      to: 'Activo',
      rate: 82,
      gradient: 'from-green-500 to-lime-600',
      bgGradient: 'from-green-50 to-lime-50',
    },
    {
      from: 'Activo',
      to: 'Fiel',
      rate: 70,
      gradient: 'from-lime-500 to-emerald-600',
      bgGradient: 'from-lime-50 to-emerald-50',
    },
  ];

  // Calcular tasa promedio
  const avgRate = Math.round(
    conversionData.reduce((sum, item) => sum + item.rate, 0) / conversionData.length
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 p-6 relative overflow-hidden">
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
              <TrendingUp className="w-6 h-6" />
            </div>
            Tasas de Conversión entre Etapas
          </h3>
          <p className="text-green-100 text-sm">
            Análisis de conversión en cada transición del customer journey
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Stats destacados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Conversión Promedio
                </p>
                <p className="text-2xl font-bold text-emerald-700">{avgRate}%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-4 border border-green-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-lime-600 flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Mejor Conversión
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {Math.max(...conversionData.map(d => d.rate))}%
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-lime-50 to-emerald-50 rounded-2xl p-4 border border-lime-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center text-white">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Transiciones
                </p>
                <p className="text-2xl font-bold text-lime-700">{conversionData.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Barras de conversión */}
        <div className="space-y-6">
          {conversionData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              className="group"
            >
              <div className={`bg-gradient-to-r ${data.bgGradient} rounded-2xl p-6 border-2 border-white hover:shadow-xl transition-all duration-300`}>
                {/* Labels */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${data.gradient} flex items-center justify-center text-white shadow-lg`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-700">{data.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-gray-700">{data.to}</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium mt-1">
                        Transición {index + 1}
                      </p>
                    </div>
                  </div>

                  {/* Percentage Badge */}
                  <div className={`px-4 py-2 bg-gradient-to-r ${data.gradient} rounded-xl shadow-lg`}>
                    <span className="text-xl font-bold text-white">{data.rate}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-white/70 rounded-full h-6 overflow-hidden shadow-inner border border-white">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.rate}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1.2, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${data.gradient} rounded-full relative overflow-hidden`}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </motion.div>
                  </div>

                  {/* Scale markers */}
                  <div className="flex justify-between mt-2 px-1">
                    {[0, 25, 50, 75, 100].map((mark) => (
                      <span key={mark} className="text-xs font-semibold text-gray-500">
                        {mark}%
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div className={`p-1 rounded-lg ${
                    data.rate >= 75 ? 'bg-green-100' : data.rate >= 50 ? 'bg-yellow-100' : 'bg-orange-100'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${
                      data.rate >= 75 ? 'text-green-600' : data.rate >= 50 ? 'text-yellow-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <span className={`text-sm font-bold ${
                    data.rate >= 75 ? 'text-green-600' : data.rate >= 50 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {data.rate >= 75 ? 'Excelente' : data.rate >= 50 ? 'Bueno' : 'Mejorable'}
                  </span>
                  <span className="text-xs text-gray-500 font-medium ml-auto">
                    {data.rate >= avgRate ? '+' : ''}{data.rate - avgRate}% vs promedio
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 bg-gradient-to-r from-emerald-50 via-green-50 to-lime-50 rounded-2xl p-6 border-2 border-emerald-200"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-md">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-emerald-800 mb-2">
                Análisis de Conversión Global
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                La tasa de conversión promedio es de <span className="font-bold text-emerald-700">{avgRate}%</span>.
                {' '}La mejor conversión se produce en la transición{' '}
                <span className="font-bold text-emerald-700">
                  {conversionData.find(d => d.rate === Math.max(...conversionData.map(x => x.rate)))?.from}
                  {' → '}
                  {conversionData.find(d => d.rate === Math.max(...conversionData.map(x => x.rate)))?.to}
                </span>
                {' '}con un <span className="font-bold text-emerald-700">{Math.max(...conversionData.map(d => d.rate))}%</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BarrasConversion;
