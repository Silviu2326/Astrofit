
import React, { useEffect, useState } from 'react';
import { fetchCoupons, updateCoupon, getExpiringCoupons } from '../cuponesApi';
import { Coupon } from '../../../types'; // Adjust path as needed

const GestionCaducidad: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [expiringCoupons, setExpiringCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const allCoupons = await fetchCoupons();
        setCoupons(allCoupons);
        const expiring = await getExpiringCoupons();
        setExpiringCoupons(expiring);
      } catch (err) {
        setError('Error al cargar los cupones.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCoupons();
  }, []);

  const handleUpdateExpiry = async (couponId: string, newExpiresAt: string | undefined, newMaxUses: number | undefined) => {
    try {
      const couponToUpdate = coupons.find(c => c.id === couponId);
      if (couponToUpdate) {
        const updated = { ...couponToUpdate, expiresAt: newExpiresAt, maxUses: newMaxUses };
        await updateCoupon(updated);
        setCoupons(coupons.map(c => (c.id === couponId ? updated : c)));
        // Re-fetch expiring coupons to update the list
        const expiring = await getExpiringCoupons();
        setExpiringCoupons(expiring);
      }
    } catch (err) {
      setError('Error al actualizar la caducidad.');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando gestión de caducidad...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Cupones Próximos a Caducar</h3>
        {expiringCoupons.length === 0 ? (
          <p className="text-gray-600">No hay cupones próximos a caducar en los próximos 7 días.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {expiringCoupons.map((coupon) => (
              <li key={coupon.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{coupon.code}</p>
                  <p className="text-sm text-gray-500">Caduca: {coupon.expiresAt || 'N/A'} | Usos restantes: {coupon.maxUses !== undefined ? (coupon.maxUses - coupon.currentUses) : 'Ilimitados'}</p>
                </div>
                <button
                  onClick={() => alert(`Implementar acción para renovar/desactivar cupón ${coupon.code}`)}
                  className="ml-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Gestionar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Todos los Cupones (Gestión Manual)</h3>
        <ul className="divide-y divide-gray-200">
          {coupons.map((coupon) => (
            <li key={coupon.id} className="py-3">
              <p className="font-medium text-gray-900">{coupon.code}</p>
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <label htmlFor={`expiry-${coupon.id}`}>Nueva Fecha:</label>
                <input
                  type="date"
                  id={`expiry-${coupon.id}`}
                  defaultValue={coupon.expiresAt || ''}
                  onChange={(e) => handleUpdateExpiry(coupon.id, e.target.value || undefined, coupon.maxUses)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <label htmlFor={`maxuses-${coupon.id}`}>Max Usos:</label>
                <input
                  type="number"
                  id={`maxuses-${coupon.id}`}
                  defaultValue={coupon.maxUses || ''}
                  onChange={(e) => handleUpdateExpiry(coupon.id, coupon.expiresAt, e.target.value ? parseInt(e.target.value) : undefined)}
                  className="border border-gray-300 rounded-md p-1 w-20"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GestionCaducidad;
