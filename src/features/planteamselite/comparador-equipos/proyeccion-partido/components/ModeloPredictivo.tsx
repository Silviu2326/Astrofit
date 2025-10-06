import React from 'react';
import { Brain, Database, TrendingUp, Home, CheckCircle } from 'lucide-react';

const ModeloPredictivo: React.FC = () => {
  const features = [
    { icon: Database, text: 'Datos históricos de victorias, empates y derrotas de ambos equipos' },
    { icon: TrendingUp, text: 'Diferencia de goles a favor y en contra' },
    { icon: CheckCircle, text: 'Forma reciente de los equipos (ej. resultados de los últimos 5 partidos)' },
    { icon: Home, text: 'Consideración de la localía' }
  ];

  return (
    <div className="relative">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <Brain className="w-6 h-6 text-white" />
        </div>
        Detalles del Modelo Predictivo
      </h3>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Este modelo utiliza una combinación de <span className="font-semibold text-purple-600">datos históricos</span> para generar las probabilidades de resultado.
      </p>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-300 transition-all duration-300"
          >
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <feature.icon className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-700 flex-1 pt-1">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-bold text-orange-600">Nota:</span> Este es un modelo simplificado para demostración. Un modelo real
          incorporaría algoritmos de <span className="font-semibold text-orange-600">Machine Learning</span> más avanzados y una mayor cantidad de variables.
        </p>
      </div>
    </div>
  );
};

export default ModeloPredictivo;
