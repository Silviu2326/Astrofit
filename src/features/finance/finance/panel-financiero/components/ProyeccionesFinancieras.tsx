import React, { useEffect, useState } from 'react';
import { getProjections, Projection } from '../panelFinancieroApi';

const ProyeccionesFinancieras: React.FC = () => {
  const [projections, setProjections] = useState<Projection[]>([]);

  useEffect(() => {
    const fetchProjections = async () => {
      const data = await getProjections();
      setProjections(data);
    };
    fetchProjections();
  }, []);

  if (projections.length === 0) {
    return <div className="bg-white p-4 rounded-lg shadow animate-pulse h-32"></div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Proyecciones Financieras</h2>
      <div className="space-y-2">
        {projections.map((proj, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{proj.month}:</span>
            <span className="font-bold text-green-600">Ingresos: ${proj.projectedRevenue.toLocaleString()}</span>
            <span className="font-bold text-red-600">Gastos: ${proj.projectedExpenses.toLocaleString()}</span>
            <span className={`font-bold ${proj.projectedProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>Beneficio: ${proj.projectedProfit.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <p className="text-gray-600 text-sm mt-4">Proyecciones financieras basadas en tendencias actuales.</p>
    </div>
  );
};

export default ProyeccionesFinancieras;
