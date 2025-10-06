
import React, { useEffect, useState } from 'react';
import { fetchCoupons, createCoupon } from '../cuponesApi';
import { Coupon } from '../../../types'; // Adjust path as needed

const CampanasCaptacion: React.FC = () => {
  const [captureCoupons, setCaptureCoupons] = useState<Coupon[]>([]);
  const [newCampaignCode, setNewCampaignCode] = useState('');
  const [newCampaignValue, setNewCampaignValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCaptureCoupons = async () => {
      try {
        const allCoupons = await fetchCoupons();
        setCaptureCoupons(allCoupons.filter(c => c.campaign === 'Captación Nuevos Clientes'));
      } catch (err) {
        setError('Error al cargar cupones de captación.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCaptureCoupons();
  }, []);

  const handleCreateCaptureCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const newCoupon: Omit<Coupon, 'id' | 'currentUses' | 'status'> = {
        code: newCampaignCode,
        type: 'percentage', // Default for capture campaigns
        value: newCampaignValue,
        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // 1 year validity
        maxUses: undefined, // Unlimited uses for capture
        reusable: true,
        restrictions: { products: [], clients: [], minPurchase: 20 }, // Example restriction
        campaign: 'Captación Nuevos Clientes',
      };
      const created = await createCoupon(newCoupon);
      setCaptureCoupons([...captureCoupons, created]);
      setMessage('Cupón de captación creado exitosamente!');
      setNewCampaignCode('');
      setNewCampaignValue(0);
    } catch (err) {
      setMessage('Error al crear cupón de captación.');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando campañas de captación...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Cupones de Captación Activos</h3>
        {captureCoupons.length === 0 ? (
          <p className="text-gray-600">No hay cupones de captación activos.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {captureCoupons.map((coupon) => (
              <li key={coupon.id} className="py-3">
                <p className="font-medium text-gray-900">{coupon.code} - {coupon.value}{coupon.type === 'percentage' ? '%' : '€'} OFF</p>
                <p className="text-sm text-gray-500">Caduca: {coupon.expiresAt || 'N/A'} | Usos: {coupon.currentUses}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Crear Nuevo Cupón de Captación</h3>
        <form onSubmit={handleCreateCaptureCoupon} className="space-y-3">
          <div>
            <label htmlFor="newCampaignCode" className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              id="newCampaignCode"
              value={newCampaignCode}
              onChange={(e) => setNewCampaignCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="newCampaignValue" className="block text-sm font-medium text-gray-700">Valor (%)</label>
            <input
              type="number"
              id="newCampaignValue"
              value={newCampaignValue}
              onChange={(e) => setNewCampaignValue(parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              min="0"
              max="100"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Crear Cupón de Captación
          </button>
          {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CampanasCaptacion;
