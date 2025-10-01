
import React, { useEffect, useState } from 'react';
import { fetchCoupons, createCoupon } from '../cuponesApi';
import { Coupon } from '../../../types'; // Adjust path as needed

const PremiosFidelidad: React.FC = () => {
  const [loyaltyCoupons, setLoyaltyCoupons] = useState<Coupon[]>([]);
  const [newLoyaltyCode, setNewLoyaltyCode] = useState('');
  const [newLoyaltyValue, setNewLoyaltyValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadLoyaltyCoupons = async () => {
      try {
        const allCoupons = await fetchCoupons();
        setLoyaltyCoupons(allCoupons.filter(c => c.campaign === 'Premios Fidelidad'));
      } catch (err) {
        setError('Error al cargar cupones de fidelidad.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadLoyaltyCoupons();
  }, []);

  const handleCreateLoyaltyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const newCoupon: Omit<Coupon, 'id' | 'currentUses' | 'status'> = {
        code: newLoyaltyCode,
        type: 'fixed', // Default for loyalty rewards
        value: newLoyaltyValue,
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0], // 6 months validity
        maxUses: 1, // Typically single use for loyalty rewards
        reusable: false,
        restrictions: { products: [], clients: ['loyal_customer_group'], minPurchase: 100 }, // Example restriction
        campaign: 'Premios Fidelidad',
      };
      const created = await createCoupon(newCoupon);
      setLoyaltyCoupons([...loyaltyCoupons, created]);
      setMessage('Cupón de fidelidad creado exitosamente!');
      setNewLoyaltyCode('');
      setNewLoyaltyValue(0);
    } catch (err) {
      setMessage('Error al crear cupón de fidelidad.');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando premios de fidelidad...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Cupones de Fidelidad Activos</h3>
        {loyaltyCoupons.length === 0 ? (
          <p className="text-gray-600">No hay cupones de fidelidad activos.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {loyaltyCoupons.map((coupon) => (
              <li key={coupon.id} className="py-3">
                <p className="font-medium text-gray-900">{coupon.code} - {coupon.value}{coupon.type === 'fixed' ? '€' : '%'} OFF</p>
                <p className="text-sm text-gray-500">Caduca: {coupon.expiresAt || 'N/A'} | Usos: {coupon.currentUses}/{coupon.maxUses || '∞'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Crear Nuevo Cupón de Fidelidad</h3>
        <form onSubmit={handleCreateLoyaltyCoupon} className="space-y-3">
          <div>
            <label htmlFor="newLoyaltyCode" className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              id="newLoyaltyCode"
              value={newLoyaltyCode}
              onChange={(e) => setNewLoyaltyCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="newLoyaltyValue" className="block text-sm font-medium text-gray-700">Valor (€)</label>
            <input
              type="number"
              id="newLoyaltyValue"
              value={newLoyaltyValue}
              onChange={(e) => setNewLoyaltyValue(parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              min="0"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Crear Cupón de Fidelidad
          </button>
          {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default PremiosFidelidad;
