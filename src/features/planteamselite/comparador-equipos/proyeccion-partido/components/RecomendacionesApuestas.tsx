import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, AlertCircle, CheckCircle } from 'lucide-react';

const RecomendacionesApuestas: React.FC = () => {
  const recommendations = [
    {
      market: 'Victoria Local',
      odds: 1.85,
      confidence: 'Alta',
      value: 'Excelente',
      rating: 4.5,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      market: 'Más de 2.5 Goles',
      odds: 2.10,
      confidence: 'Media',
      value: 'Bueno',
      rating: 3.8,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      market: 'Ambos Anotan',
      odds: 1.75,
      confidence: 'Media-Alta',
      value: 'Bueno',
      rating: 4.0,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Star className="w-6 h-6 text-orange-500" />
        Recomendaciones Principales
      </h3>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Sugerencias basadas en <span className="font-bold text-orange-600">análisis de valor</span> y probabilidades calculadas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${rec.bgColor} p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
          >
            {/* Badge de confianza */}
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200">
                <span className="text-xs font-bold text-gray-700">{rec.confidence}</span>
              </div>
            </div>

            {/* Mercado */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-1">Mercado</p>
              <p className="text-xl font-bold text-gray-800">{rec.market}</p>
            </div>

            {/* Odds */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-1">Cuota</p>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                {rec.odds}
              </p>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(rec.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>

            {/* Valor */}
            <div className={`p-3 bg-gradient-to-r ${rec.color} rounded-xl`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Valor</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{rec.value}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecomendacionesApuestas;
