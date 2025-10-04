import React, { useEffect, useState } from 'react';
import { fetchExperiments, Experiment } from '../experimentosApi';

const MonitorTiempoReal: React.FC = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchExperiments();
      // Simulate real-time updates for conversion rates and significance
      const updatedData = data.map(exp => ({
        ...exp,
        conversionRateA: parseFloat((exp.conversionRateA + (Math.random() * 0.001 - 0.0005)).toFixed(4)),
        conversionRateB: parseFloat((exp.conversionRateB + (Math.random() * 0.001 - 0.0005)).toFixed(4)),
        significance: parseFloat((exp.significance + (Math.random() * 0.01 - 0.005)).toFixed(2)),
      }));
      setExperiments(updatedData);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Monitor de Resultados en Tiempo Real</h2>
      {experiments.length === 0 ? (
        <p className="text-gray-500">Esperando datos de experimentos...</p>
      ) : (
        <div className="space-y-4">
          {experiments.map((exp) => (
            <div key={exp.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-medium text-gray-800">{exp.name}</h3>
              <p className="text-sm text-gray-600">Tasa de Conversión A: <span className="font-semibold">{(exp.conversionRateA * 100).toFixed(2)}%</span></p>
              <p className="text-sm text-gray-600">Tasa de Conversión B: <span className="font-semibold">{(exp.conversionRateB * 100).toFixed(2)}%</span></p>
              <p className="text-sm text-gray-600">Significancia Estadística: <span className="font-semibold">{(exp.significance * 100).toFixed(2)}%</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonitorTiempoReal;
