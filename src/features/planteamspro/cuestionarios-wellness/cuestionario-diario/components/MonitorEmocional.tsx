// src/features/cuestionario-diario/components/MonitorEmocional.tsx
import React from 'react';
import { Brain, TrendingUp, Activity } from 'lucide-react';

const MonitorEmocional: React.FC = () => {
  const metricas = [
    { label: 'Estrés', valor: '42%', color: 'from-orange-500 to-red-500', icon: Activity },
    { label: 'Motivación', valor: '78%', color: 'from-emerald-500 to-teal-500', icon: TrendingUp }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden h-full">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Monitor Emocional</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Tracking de estrés y motivación en tiempo real
        </p>

        {/* Métricas */}
        <div className="space-y-4">
          {metricas.map((metrica, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <metrica.icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">{metrica.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{metrica.valor}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${metrica.color} rounded-full transition-all duration-500 group-hover:scale-x-105`}
                  style={{ width: metrica.valor }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Badge de estado */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-emerald-700">Monitoreando</span>
        </div>
      </div>
    </div>
  );
};

export default MonitorEmocional;
