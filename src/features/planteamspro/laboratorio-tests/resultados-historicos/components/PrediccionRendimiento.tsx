// components/PrediccionRendimiento.tsx - Predicción rendimiento futuro curvas progresión
import React from 'react';
import { Target, Clock } from 'lucide-react';

const PrediccionRendimiento: React.FC = () => {
  // Datos de ejemplo
  const prediccionActual = 78.5;
  const prediccion30dias = 82.3;
  const confianza = 85;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
          <Target className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Predicción de Rendimiento</h3>
      </div>

      <div className="space-y-3">
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Valor Actual</p>
          <p className="text-3xl font-bold text-blue-600">{prediccionActual} cm</p>
        </div>

        <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <p className="text-sm font-bold uppercase tracking-wide text-gray-600">Predicción 30 días</p>
          </div>
          <p className="text-3xl font-bold text-purple-600">{prediccion30dias} cm</p>
          <p className="text-xs text-purple-600 mt-1">+{(prediccion30dias - prediccionActual).toFixed(1)} cm esperado</p>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Confianza</span>
            <span className="text-sm font-bold text-indigo-600">{confianza}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${confianza}%` }}
            ></div>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Basado en curvas de progresión histórica y tendencias detectadas.
        </p>
      </div>
    </div>
  );
};

export default PrediccionRendimiento;
