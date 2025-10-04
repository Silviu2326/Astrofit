
// src/features/referidos/components/DescuentosBeneficios.tsx

import React, { useState, useEffect } from 'react';
import { getReferralBenefits, ReferralBenefit } from '../referidosApi';

const DescuentosBeneficios: React.FC = () => {
  const [benefits, setBenefits] = useState<ReferralBenefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const data = await getReferralBenefits();
        setBenefits(data);
      } catch (err) {
        setError('Error al cargar los descuentos y beneficios.');
      } finally {
        setLoading(false);
      }
    };
    fetchBenefits();
  }, []);

  if (loading) return <div className="text-center py-4">Cargando descuentos y beneficios...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descuentos y Beneficios</h2>
      <p className="text-gray-600 mb-4">Descubre los beneficios que obtienes al referir y los que reciben tus amigos.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="font-semibold text-lg text-blue-800 mb-2">{benefit.name}</h3>
            <p className="text-gray-700 mb-2">{benefit.description}</p>
            <div className="flex justify-between text-sm text-gray-600">
              {benefit.forReferrer && <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Para Referente</span>}
              {benefit.forReferee && <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Para Referido</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescuentosBeneficios;
