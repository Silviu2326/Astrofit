import React from 'react';
import { useConciliacionPagosData, Discrepancy } from '../conciliacionPagosApi';

const DiscrepanciasDetectadas: React.FC = () => {
  const { discrepancies, loading, error, resolveDiscrepancy } = useConciliacionPagosData();

  if (loading) return <div className="text-center p-4">Cargando datos...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  const getDiscrepancyMessage = (discrepancy: Discrepancy) => {
    switch (discrepancy.type) {
      case 'missing_fitoffice':
        return `Falta registro en Fitoffice para Stripe Payout ID: ${discrepancy.stripeId || 'N/A'}. Monto: ${discrepancy.actualAmount / 100} EUR.`;
      case 'missing_stripe':
        return `Falta registro en Stripe para Fitoffice Charge ID: ${discrepancy.fitofficeId || 'N/A'}. Monto: ${discrepancy.expectedAmount / 100} EUR.`;
      case 'amount_mismatch':
        return `Discrepancia de monto: Fitoffice ID ${discrepancy.fitofficeId || 'N/A'} (${discrepancy.expectedAmount / 100} EUR) vs. Stripe ID ${discrepancy.stripeId || 'N/A'} (${discrepancy.actualAmount / 100} EUR).`;
      case 'date_mismatch':
        return `Discrepancia de fecha: Fitoffice ID ${discrepancy.fitofficeId || 'N/A'} (${discrepancy.expectedDate}) vs. Stripe ID ${discrepancy.stripeId || 'N/A'} (${discrepancy.actualDate}).`;
      default:
        return 'Discrepancia no especificada.';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Discrepancias Detectadas</h2>
      <p className="text-gray-600 mb-6">Detección automática de discrepancias entre Fitoffice y Stripe.</p>

      {discrepancies.length === 0 ? (
        <p className="text-gray-500">No se detectaron discrepancias.</p>
      ) : (
        <ul className="space-y-4">
          {discrepancies.map(discrepancy => (
            <li key={discrepancy.id} className={`p-4 rounded-md ${discrepancy.resolved ? 'bg-green-50' : 'bg-red-50'} flex justify-between items-center`}>
              <div>
                <p className={`font-medium ${discrepancy.resolved ? 'text-green-800' : 'text-red-800'}`}>
                  {getDiscrepancyMessage(discrepancy)}
                </p>
                <p className="text-sm text-gray-500">ID Discrepancia: {discrepancy.id}</p>
              </div>
              {!discrepancy.resolved && (
                <button
                  onClick={() => resolveDiscrepancy(discrepancy.id)}
                  className="ml-4 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                >
                  Marcar como Resuelta
                </button>
              )}
              {discrepancy.resolved && (
                <span className="text-green-600 font-semibold text-sm">Resuelta</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiscrepanciasDetectadas;