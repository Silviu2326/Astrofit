
import React from 'react';

const MetricasCancelacion: React.FC = () => {
  const metricas = {
    nivelBasico: '5.2%',
    nivelPremium: '2.1%',
    // Más niveles...
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Métricas de Cancelación por Nivel</h2>
      <ul className="list-disc list-inside">
        {Object.entries(metricas).map(([nivel, tasa]) => (
          <li key={nivel} className="mb-1">
            {nivel.charAt(0).toUpperCase() + nivel.slice(1)}: <span className="font-bold">{tasa}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetricasCancelacion;
