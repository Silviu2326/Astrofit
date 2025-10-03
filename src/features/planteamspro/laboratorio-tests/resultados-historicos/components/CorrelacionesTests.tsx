// components/CorrelacionesTests.tsx - Correlaciones diferentes tests mismo atleta
import React from 'react';
import { Network, ArrowRight } from 'lucide-react';

const CorrelacionesTests: React.FC = () => {
  // Datos de ejemplo
  const correlaciones = [
    { test1: 'Salto Vertical', test2: 'Sprint 30m', correlacion: 0.85, tipo: 'alta' },
    { test1: 'Fuerza Piernas', test2: 'Salto Vertical', correlacion: 0.72, tipo: 'media' }
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
          <Network className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Correlaciones entre Tests</h3>
      </div>

      <div className="space-y-3">
        {correlaciones.map((corr, index) => (
          <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>{corr.test1}</span>
                <ArrowRight className="w-4 h-4 text-purple-500" />
                <span>{corr.test2}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-500"
                    style={{ width: `${corr.correlacion * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className={`ml-3 text-sm font-bold ${
                corr.tipo === 'alta' ? 'text-purple-600' : 'text-pink-600'
              }`}>
                {corr.correlacion.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-purple-600 mt-1 font-medium">
              Correlación {corr.tipo === 'alta' ? 'Alta' : 'Media'}
            </p>
          </div>
        ))}

        <p className="text-sm text-gray-600 leading-relaxed">
          Análisis de relaciones entre diferentes pruebas del atleta.
        </p>
      </div>
    </div>
  );
};

export default CorrelacionesTests;
