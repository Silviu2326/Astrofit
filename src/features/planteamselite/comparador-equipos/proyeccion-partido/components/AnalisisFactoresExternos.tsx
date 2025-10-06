import React from 'react';
import { Cloud, Users, Flag, TrendingUp, Wind, Thermometer } from 'lucide-react';

const AnalisisFactoresExternos: React.FC = () => {
  const factors = [
    { icon: Cloud, label: 'Clima', value: 'Soleado', impact: 'Neutral', color: 'from-blue-500 to-cyan-500' },
    { icon: Thermometer, label: 'Temperatura', value: '22°C', impact: 'Favorable', color: 'from-orange-500 to-red-500' },
    { icon: Wind, label: 'Viento', value: 'Moderado', impact: 'Leve', color: 'from-teal-500 to-green-500' },
    { icon: Users, label: 'Público', value: '45,000', impact: 'Alto', color: 'from-purple-500 to-pink-500' },
    { icon: Flag, label: 'Árbitro', value: 'Experiencia', impact: 'Positivo', color: 'from-yellow-500 to-orange-500' },
    { icon: TrendingUp, label: 'Presión', value: 'Alta', impact: 'Significativo', color: 'from-red-500 to-pink-500' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
          <Cloud className="w-6 h-6 text-white" />
        </div>
        Análisis de Factores Externos
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Análisis automático de <span className="font-bold text-blue-600">factores externos</span> que pueden influir en el resultado del partido.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {factors.map((factor, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2.5 bg-gradient-to-br ${factor.color} rounded-xl shadow-md`}>
                <factor.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{factor.label}</p>
                <p className="text-lg font-bold text-gray-800 mb-1">{factor.value}</p>
                <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {factor.impact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalisisFactoresExternos;
