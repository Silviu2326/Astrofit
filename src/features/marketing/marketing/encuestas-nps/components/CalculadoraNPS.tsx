import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';
import { useGetFeedbackQuery } from '../encuestasNpsApi';

const CalculadoraNPS: React.FC = () => {
  const { data: feedback, isLoading } = useGetFeedbackQuery();

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!feedback || feedback.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculadora NPS</h2>
        <p className="text-gray-600">No hay datos de feedback para calcular el NPS.</p>
      </div>
    );
  }

  const totalResponses = feedback.length;
  const promoters = feedback.filter((f) => f.score >= 9).length;
  const passives = feedback.filter((f) => f.score >= 7 && f.score <= 8).length;
  const detractors = feedback.filter((f) => f.score >= 0 && f.score <= 6).length;

  const nps = ((promoters - detractors) / totalResponses) * 100;
  const promotersPerc = (promoters / totalResponses) * 100;
  const passivesPerc = (passives / totalResponses) * 100;
  const detractorsPerc = (detractors / totalResponses) * 100;

  // Comparativa con industria (mock)
  const industryAvg = 45;
  const diffIndustry = nps - industryAvg;

  // Gauge visual positioning
  const gaugePosition = Math.min(100, Math.max(0, (nps + 100) / 2));

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Gauge className="w-6 h-6" />
          </div>
          Calculadora NPS
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Gauge animado para score NPS */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                  nps >= 50 ? 'from-green-500 to-emerald-600' :
                  nps >= 0 ? 'from-yellow-500 to-orange-500' :
                  'from-red-500 to-pink-600'
                }`}
              >
                {nps.toFixed(0)}
              </motion.div>
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>

          {/* Gauge visual */}
          <div className="relative h-4 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full overflow-hidden shadow-inner mb-2">
            <motion.div
              initial={{ left: '50%' }}
              animate={{ left: `${gaugePosition}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 w-1 h-full bg-gray-900 shadow-lg"
              style={{ transform: 'translateX(-50%)' }}
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rounded-full shadow-xl"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rounded-full shadow-xl"></div>
            </motion.div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>-100</span>
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Desglose por categoría con colores */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-4 border border-red-200 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-200 rounded-full blur-2xl opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <p className="text-xs font-bold text-red-700 uppercase">Detractores</p>
              </div>
              <p className="text-2xl font-bold text-red-600">{detractors}</p>
              <p className="text-xs text-red-600 font-medium">{detractorsPerc.toFixed(1)}%</p>
              <p className="text-xs text-gray-600 mt-1">Score 0-6</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-200 rounded-full blur-2xl opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-2">
                <Minus className="w-4 h-4 text-yellow-600" />
                <p className="text-xs font-bold text-yellow-700 uppercase">Pasivos</p>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{passives}</p>
              <p className="text-xs text-yellow-600 font-medium">{passivesPerc.toFixed(1)}%</p>
              <p className="text-xs text-gray-600 mt-1">Score 7-8</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-200 rounded-full blur-2xl opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-xs font-bold text-green-700 uppercase">Promotores</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{promoters}</p>
              <p className="text-xs text-green-600 font-medium">{promotersPerc.toFixed(1)}%</p>
              <p className="text-xs text-gray-600 mt-1">Score 9-10</p>
            </div>
          </motion.div>
        </div>

        {/* Comparativa con industria */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500 rounded-xl">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-700 mb-1">Comparativa con Industria</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-600">{industryAvg}</span>
                <span className="text-xs text-gray-600">promedio del sector</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {diffIndustry >= 0 ? (
                  <>
                    <div className="p-1 bg-green-100 rounded">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-bold text-green-600">+{diffIndustry.toFixed(1)} puntos sobre la media</span>
                  </>
                ) : (
                  <>
                    <div className="p-1 bg-red-100 rounded">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-sm font-bold text-red-600">{diffIndustry.toFixed(1)} puntos bajo la media</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Basado en <span className="font-bold text-gray-700">{totalResponses}</span> respuestas totales
        </p>
      </div>
    </div>
  );
};

export default CalculadoraNPS;