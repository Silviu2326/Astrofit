// src/features/cuestionario-diario/components/SistemaGamificacion.tsx
import React from 'react';
import { Trophy, Star, Award, Zap } from 'lucide-react';

const SistemaGamificacion: React.FC = () => {
  const logros = [
    { titulo: '7 días seguidos', icono: Trophy, color: 'from-yellow-500 to-orange-500', completado: true },
    { titulo: '30 días seguidos', icono: Star, color: 'from-purple-500 to-pink-500', completado: false },
    { titulo: 'Racha actual', icono: Zap, color: 'from-blue-500 to-cyan-500', completado: true }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Sistema de Gamificación</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Sistema de gamificación para aumentar la adherencia y el reporte
        </p>

        {/* Grid de logros */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {logros.map((logro, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                logro.completado
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  logro.completado
                    ? `bg-gradient-to-br ${logro.color} shadow-lg`
                    : 'bg-gray-300'
                }`}>
                  <logro.icono className="w-6 h-6 text-white" />
                </div>
                <p className={`text-sm font-semibold ${
                  logro.completado ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {logro.titulo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar de puntos */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Puntos totales</span>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              750 / 1000
            </span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full relative transition-all duration-500"
              style={{ width: '75%' }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Badge de nivel */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg">
          <Star className="w-4 h-4" />
          <span className="text-sm font-bold">Nivel 5 - Experto</span>
        </div>
      </div>
    </div>
  );
};

export default SistemaGamificacion;
