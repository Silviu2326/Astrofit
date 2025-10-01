
import React, { useState } from 'react';
import { createCoupon } from '../cuponesApi';
import { Coupon } from '../../../types'; // Adjust path as needed

const CrearCupones: React.FC = () => {
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed' | 'shipping'>('percentage');
  const [value, setValue] = useState<number>(0);
  const [expiresAt, setExpiresAt] = useState('');
  const [maxUses, setMaxUses] = useState<number | undefined>(undefined);
  const [reusable, setReusable] = useState(true);
  const [minPurchase, setMinPurchase] = useState<number>(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const newCoupon: Omit<Coupon, 'id' | 'currentUses' | 'status'> = {
        code,
        type,
        value,
        expiresAt: expiresAt || undefined,
        maxUses: maxUses || undefined,
        reusable,
        restrictions: { products: [], clients: [], minPurchase },
        campaign: 'Manual',
      };
      await createCoupon(newCoupon);
      setMessage('Cupón creado exitosamente!');
      // Clear form
      setCode('');
      setValue(0);
      setExpiresAt('');
      setMaxUses(undefined);
      setReusable(true);
      setMinPurchase(0);
    } catch (error) {
      setMessage('Error al crear el cupón.');
      console.error('Error creating coupon:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código del Cupón</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Descuento</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'percentage' | 'fixed' | 'shipping')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="percentage">Porcentaje</option>
          <option value="fixed">Importe Fijo</option>
          <option value="shipping">Envío Gratuito</option>
        </select>
      </div>

      {type !== 'shipping' && (
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">Valor ({type === 'percentage' ? '%' : '€'})</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            min="0"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">Fecha de Caducidad</label>
        <input
          type="date"
          id="expiresAt"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="maxUses" className="block text-sm font-medium text-gray-700">Número Máximo de Usos</label>
        <input
          type="number"
          id="maxUses"
          value={maxUses || ''}
          onChange={(e) => setMaxUses(e.target.value ? parseInt(e.target.value) : undefined)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          min="0"
        />
      </div>

      <div className="flex items-center">
        <input
          id="reusable"
          type="checkbox"
          checked={reusable}
          onChange={(e) => setReusable(e.target.checked)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="reusable" className="ml-2 block text-sm text-gray-900">Cupón Reutilizable</label>
      </div>

      <div>
        <label htmlFor="minPurchase" className="block text-sm font-medium text-gray-700">Compra Mínima (€)</label>
        <input
          type="number"
          id="minPurchase"
          value={minPurchase}
          onChange={(e) => setMinPurchase(parseFloat(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          min="0"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Crear Cupón
      </button>

      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default CrearCupones;
