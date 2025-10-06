import React from 'react';
import { TrendingUp, Clock, BarChart3 } from 'lucide-react';

const ComparacionHistorica: React.FC = () => {
  const comparisons = [
    { metric: 'Velocidad Promedio', current: 24.5, historical: 22.8, unit: 'km/h', trend: 'up' },
    { metric: 'FC Máxima', current: 178, historical: 182, unit: 'bpm', trend: 'down' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Comparación Histórica</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Comparación con sesiones similares</p>

      <div className="space-y-3">
        {comparisons.map((item, index) => (
          <div key={index} className="p-3 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <p className="text-xs font-semibold text-blue-700 mb-2">{item.metric}</p>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Actual</p>
                <p className="text-lg font-bold text-blue-600">{item.current} {item.unit}</p>
              </div>
              <div className="flex items-center justify-center">
                {item.trend === 'up' ? (
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                ) : (
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600 rotate-180" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Histórico</p>
                <p className="text-lg font-bold text-gray-600">{item.historical} {item.unit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promedio */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <p className="text-xs font-semibold text-purple-700">SESIONES COMPARADAS</p>
        </div>
        <p className="text-lg font-bold text-purple-800 mt-1">15 sesiones</p>
      </div>
    </div>
  );
};

export default ComparacionHistorica;
