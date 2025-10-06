
// C:/Users/usuario/Documents/project-bolt-sb1-qekdxfwt/project/src/features/planes-precios/components/ModalidadesPrecios.tsx

import React, { useEffect, useState } from 'react';
import { Plan, planesPreciosApi } from '../planesPreciosApi';

const ModalidadesPrecios: React.FC = () => {
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
    return <div className="text-center py-4">Cargando modalidades...</div>;
  }

  const modalities = Array.from(new Set(plans.map(plan => plan.type)));

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Modalidades de Precios (Online, Presencial, Mixto)</h2>
      <div className="space-y-4">
        {modalities.map((modality) => (
          <div key={modality} className="border border-blue-200 bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-blue-800 capitalize">{modality}</h3>
            <p className="text-gray-600">Planes disponibles en esta modalidad:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {plans.filter(plan => plan.type === modality).map(plan => (
                <li key={plan.id}>{plan.name} - {plan.priceMonthly}€/mes</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalidadesPrecios;
