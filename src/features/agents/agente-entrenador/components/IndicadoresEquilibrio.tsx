import React, { useState, useEffect } from 'react';
import { agenteEntrenadorApi, BalanceIndicator } from '../agenteEntrenadorApi';

const IndicadoresEquilibrio: React.FC = () => {
  const [indicators, setIndicators] = useState<BalanceIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const data = agenteEntrenadorApi.getBalanceIndicators();
      setIndicators(data);
      setIsLoading(false);
    }, 300);
  }, []);

  if (isLoading) return <div className="text-gray-600">Cargando indicadores de equilibrio...</div>;
  if (!indicators.length) return <div className="text-red-600">Error al cargar indicadores.</div>;

  const getIndicatorColor = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio >= 0.95 && ratio <= 1.05) return 'bg-green-200 text-green-800'; // Balanced
    if (ratio > 1.05) return 'bg-yellow-200 text-yellow-800'; // Over
    return 'bg-red-200 text-red-800'; // Under
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Indicadores de Equilibrio Muscular</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indicators.map((indicator) => (
          <div key={indicator.name} className="border border-gray-200 rounded-md p-3">
            <p className="font-semibold text-gray-700">{indicator.name}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-full text-sm ${getIndicatorColor(indicator.value, indicator.target)}`}>
                {indicator.value} {indicator.unit}
              </span>
              <span className="text-sm text-gray-500">Objetivo: {indicator.target} {indicator.unit}</span>
            </div>
            {indicator.name === 'Tren Superior / Inferior' && indicator.value > indicator.target * 1.05 && (
              <p className="text-sm text-yellow-700 mt-2">Alerta: Desbalance, el tren superior está sobre-desarrollado.</p>
            )}
            {indicator.name === 'Tren Superior / Inferior' && indicator.value < indicator.target * 0.95 && (
              <p className="text-sm text-red-700 mt-2">Alerta: Desbalance, el tren inferior necesita más trabajo.</p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">* Análisis automático de balance muscular y alertas de desbalances.</p>
    </div>
  );
};

export default IndicadoresEquilibrio;
