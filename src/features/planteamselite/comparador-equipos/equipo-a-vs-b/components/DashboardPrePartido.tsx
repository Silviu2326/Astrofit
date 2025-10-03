import React from 'react';
import { ClipboardList, CheckCircle, AlertCircle, TrendingUp, Target } from 'lucide-react';

const DashboardPrePartido: React.FC = () => {
  const metricas = [
    { label: 'Preparación Táctica', valor: 85, color: 'green' },
    { label: 'Estado Físico', valor: 90, color: 'blue' },
    { label: 'Análisis Rival', valor: 78, color: 'purple' },
  ];

  const checklist = [
    { item: 'Análisis de video completado', completado: true },
    { item: 'Estrategia definida', completado: true },
    { item: 'Jugadas preparadas', completado: false },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl text-white shadow-lg">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
          Dashboard Pre-Partido
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        {metricas.map((metrica, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{metrica.label}</span>
              <span className="text-sm font-bold text-gray-800">{metrica.valor}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${
                  metrica.color === 'green'
                    ? 'from-green-500 to-emerald-600'
                    : metrica.color === 'blue'
                    ? 'from-blue-500 to-indigo-600'
                    : 'from-purple-500 to-pink-600'
                } rounded-full transition-all duration-1000`}
                style={{ width: `${metrica.valor}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-600" />
          Checklist Pre-Partido
        </h4>
        <div className="space-y-2">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {item.completado ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
              <span className={`text-sm ${item.completado ? 'text-gray-700' : 'text-gray-600'}`}>
                {item.item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPrePartido;
