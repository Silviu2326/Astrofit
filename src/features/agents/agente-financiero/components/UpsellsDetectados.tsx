
import React, { useEffect, useState } from 'react';
import { fetchUpsellOpportunities, UpsellOpportunity } from '../agenteFinancieroApi';

const UpsellsDetectados: React.FC = () => {
  const [upsells, setUpsells] = useState<UpsellOpportunity[]>([]);

  useEffect(() => {
    fetchUpsellOpportunities().then(setUpsells);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upsells Detectados</h2>
      <div className="space-y-3">
        {upsells.length === 0 ? (
          <p className="text-gray-600">No se han detectado oportunidades de upsell.</p>
        ) : (
          upsells.map((upsell) => (
            <div key={upsell.id} className="p-3 border border-gray-200 rounded-md">
              <p className="font-medium text-gray-700">Cliente: {upsell.clientName}</p>
              <p className="text-sm text-gray-500">Plan Actual: {upsell.currentPlan}</p>
              <p className="text-sm text-gray-500">Plan Sugerido: <span className="font-medium text-purple-600">{upsell.suggestedPlan}</span></p>
              <p className="text-sm text-gray-500">Ingreso Potencial: {upsell.potentialRevenue} €</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpsellsDetectados;
