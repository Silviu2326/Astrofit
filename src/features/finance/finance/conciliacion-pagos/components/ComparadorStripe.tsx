import React from 'react';
import { useConciliacionPagosData } from '../conciliacionPagosApi';

const ComparadorStripe: React.FC = () => {
  const { fitofficeCharges, stripePayouts, loading, error } = useConciliacionPagosData();

  if (loading) return <div className="text-center p-4">Cargando datos...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comparador Fitoffice vs. Stripe</h2>
      <p className="text-gray-600 mb-6">Comparar cobros registrados en Fitoffice con payouts reales de Stripe.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-medium text-gray-700 mb-3">Cobros en Fitoffice</h3>
          <ul className="space-y-2">
            {fitofficeCharges.map(charge => (
              <li key={charge.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{charge.description}</p>
                  <p className="text-sm text-gray-500">{charge.date}</p>
                </div>
                <span className="font-bold text-green-600">{charge.amount / 100} {charge.currency}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium text-gray-700 mb-3">Payouts de Stripe</h3>
          <ul className="space-y-2">
            {stripePayouts.map(payout => (
              <li key={payout.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Payout ID: {payout.id}</p>
                  <p className="text-sm text-gray-500">Fecha: {payout.date} | Estado: {payout.status}</p>
                  <p className="text-sm text-gray-500">Comisiones: {payout.fees / 100} {payout.currency}</p>
                </div>
                <span className="font-bold text-blue-600">{payout.amount / 100} {payout.currency}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparadorStripe;