import React from 'react';
import { useConciliacionPagosData, StripePayout } from '../conciliacionPagosApi';

const VerificacionTransferencias: React.FC = () => {
  const { stripePayouts, loading, error } = useConciliacionPagosData();

  if (loading) return <div className="text-center p-4">Cargando datos...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  // Mock function to simulate checking against a bank account
  const verifyTransfer = (payout: StripePayout): boolean => {
    // In a real application, this would involve an actual API call to a bank or accounting system
    // For now, let's assume payouts with an even amount are "verified" for demonstration
    return payout.amount % 200 === 0;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verificación de Transferencias</h2>
      <p className="text-gray-600 mb-6">Asegura que los payouts de Stripe coinciden con los registros de la cuenta bancaria.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID Payout
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Monto
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado Stripe
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Verificación Cuenta
              </th>
            </tr>
          </thead>
          <tbody>
            {stripePayouts.map(payout => (
              <tr key={payout.id}>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">{payout.id}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">{payout.date}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">{payout.amount / 100} {payout.currency}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">{payout.status}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm">
                  {verifyTransfer(payout) ? (
                    <span className="text-green-500 font-semibold">Coincide</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Pendiente/No Coincide</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificacionTransferencias;