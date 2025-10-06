
// C:/Users/usuario/Documents/project-bolt-sb1-qekdxfwt/project/src/features/planes-precios/components/ComparadorPlanes.tsx

import React, { useEffect, useState } from 'react';
import { Plan, planesPreciosApi } from '../planesPreciosApi';

const ComparadorPlanes: React.FC = () => {
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
    return <div className="text-center py-4">Cargando planes para comparar...</div>;
  }

  // For simplicity, let's assume we compare all available plans
  // In a real app, you might have checkboxes to select plans for comparison

  const allFeatures = Array.from(new Set(plans.flatMap(plan => plan.features)));

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Comparador de Planes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Característica</th>
              {plans.map(plan => (
                <th key={plan.id} className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">{plan.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 font-medium text-gray-800">Precio Mensual</td>
              {plans.map(plan => (
                <td key={plan.id} className="py-3 px-4 text-center text-indigo-600 font-bold">{plan.priceMonthly}€</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 font-medium text-gray-800">Tipo</td>
              {plans.map(plan => (
                <td key={plan.id} className="py-3 px-4 text-center text-gray-700 capitalize">{plan.type}</td>
              ))}
            </tr>
            {allFeatures.map((feature, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-3 px-4 text-gray-600">{feature}</td>
                {plans.map(plan => (
                  <td key={plan.id} className="py-3 px-4 text-center">
                    {plan.features.includes(feature) ? (
                      <span className="text-green-500">&#10003;</span> // Checkmark
                    ) : (
                      <span className="text-red-500">&#10006;</span> // X mark
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparadorPlanes;
