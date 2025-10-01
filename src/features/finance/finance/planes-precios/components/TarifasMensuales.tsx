
// C:/Users/usuario/Documents/project-bolt-sb1-qekdxfwt/project/src/features/planes-precios/components/TarifasMensuales.tsx

import React, { useEffect, useState } from 'react';
import { Plan, planesPreciosApi } from '../planesPreciosApi';

const TarifasMensuales: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await planesPreciosApi.getPlans();
      setPlans(data);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando tarifas...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tarifas Mensuales, Trimestrales y Anuales</h2>
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border border-gray-200 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-800">{plan.name} ({plan.type})</h3>
            <p className="text-gray-600">{plan.description}</p>
            <div className="mt-2">
              {plan.priceMonthly && (
                <p className="text-lg font-bold text-indigo-600">Mensual: {plan.priceMonthly}€</p>
              )}
              {plan.priceQuarterly && (
                <p className="text-md text-gray-700">Trimestral: {plan.priceQuarterly}€</p>
              )}
              {plan.priceAnnually && (
                <p className="text-md text-gray-700">Anual: {plan.priceAnnually}€</p>
              )}
            </div>
            <ul className="list-disc list-inside text-gray-500 mt-2">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarifasMensuales;
