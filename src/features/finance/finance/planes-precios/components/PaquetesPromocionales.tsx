
// C:/Users/usuario/Documents/project-bolt-sb1-qekdxfwt/project/src/features/planes-precios/components/PaquetesPromocionales.tsx

import React, { useEffect, useState } from 'react';
import { PackagePromotion, planesPreciosApi } from '../planesPreciosApi';

const PaquetesPromocionales: React.FC = () => {
  const [promotions, setPromotions] = useState<PackagePromotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      const data = await planesPreciosApi.getPackagePromotions();
      setPromotions(data);
      setLoading(false);
    };
    fetchPromotions();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando promociones...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Paquetes y Promociones Especiales</h2>
      <div className="space-y-4">
        {promotions.map((promo) => (
          <div key={promo.id} className="border border-purple-200 bg-purple-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-purple-800">{promo.name}</h3>
            <p className="text-purple-700">{promo.description}</p>
            <div className="mt-2">
              <p className="text-lg font-bold text-gray-500 line-through">Precio Original: {promo.originalPrice}€</p>
              <p className="text-xl font-bold text-red-600">Precio Promocional: {promo.discountedPrice}€</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">Válido hasta: {promo.validUntil}</p>
            <p className="text-sm text-gray-600 mt-2">Planes incluidos: {promo.plansIncluded.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaquetesPromocionales;
