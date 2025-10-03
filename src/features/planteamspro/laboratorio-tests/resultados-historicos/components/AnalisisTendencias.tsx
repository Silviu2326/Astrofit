// components/AnalisisTendencias.tsx - Análisis automático tendencias mejora estancamiento declive
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const AnalisisTendencias: React.FC = () => {
  // Datos de ejemplo
  const tendencia = 'mejora'; // 'mejora', 'estancamiento', 'declive'
  const porcentaje = '+12.5';

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {tendencia === 'mejora' && (
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        )}
        {tendencia === 'estancamiento' && (
          <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl">
            <Minus className="w-5 h-5 text-white" />
          </div>
        )}
        {tendencia === 'declive' && (
          <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl">
            <TrendingDown className="w-5 h-5 text-white" />
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-900">Análisis de Tendencias</h3>
      </div>

      <div className="space-y-3">
        <div className={`px-4 py-3 rounded-xl ${
          tendencia === 'mejora' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' :
          tendencia === 'estancamiento' ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200' :
          'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200'
        }`}>
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Estado Actual</p>
          <p className={`text-2xl font-bold ${
            tendencia === 'mejora' ? 'text-green-600' :
            tendencia === 'estancamiento' ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {tendencia === 'mejora' ? 'En Mejora' : tendencia === 'estancamiento' ? 'Estancamiento' : 'En Declive'}
          </p>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-sm font-medium text-gray-700">Variación</span>
          <span className={`text-lg font-bold ${
            tendencia === 'mejora' ? 'text-green-600' :
            tendencia === 'estancamiento' ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {porcentaje}%
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          El análisis automático detecta patrones de {tendencia} en los últimos resultados registrados.
        </p>
      </div>
    </div>
  );
};

export default AnalisisTendencias;
