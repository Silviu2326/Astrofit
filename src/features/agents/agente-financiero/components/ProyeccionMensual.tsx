
import React, { useEffect, useState } from 'react';
import { fetchMonthlyProjection, MonthlyProjection } from '../agenteFinancieroApi';

const ProyeccionMensual: React.FC = () => {
  const [projections, setProjections] = useState<MonthlyProjection[]>([]);

  useEffect(() => {
    fetchMonthlyProjection().then(setProjections);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Proyección Mensual</h2>
      <div className="space-y-3">
        {projections.length === 0 ? (
          <p className="text-gray-600">No hay datos de proyección mensual.</p>
        ) : (
          projections.map((projection) => (
            <div key={projection.month} className="p-3 border border-gray-200 rounded-md">
              <p className="font-medium text-gray-700">Mes: {projection.month}</p>
              <p className="text-sm text-gray-500">Ingreso Proyectado: <span className="font-medium text-green-600">{projection.projectedRevenue} €</span></p>
              {projection.actualRevenue > 0 && <p className="text-sm text-gray-500">Ingreso Actual: {projection.actualRevenue} €</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProyeccionMensual;
