import React from 'react';
import { useConciliacionPagosData, Discrepancy } from '../conciliacionPagosApi';

const AlertasInconsistencias: React.FC = () => {
  const { discrepancies, loading, error, resolveDiscrepancy } = useConciliacionPagosData();

  if (loading) return <div className="text-center p-4">Cargando alertas...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  const pendingAlerts = discrepancies.filter(d => !d.resolved);

  const getAlertMessage = (discrepancy: Discrepancy) => {
    switch (discrepancy.type) {
      case 'missing_fitoffice':
        return `ALERTA: Cobro en Stripe (${discrepancy.actualAmount / 100} EUR) sin registro en Fitoffice. ID Payout: ${discrepancy.stripeId || 'N/A'}.`;
      case 'missing_stripe':
        return `ALERTA: Cobro en Fitoffice (${discrepancy.expectedAmount / 100} EUR) sin payout en Stripe. ID Fitoffice: ${discrepancy.fitofficeId || 'N/A'}.`;
      case 'amount_mismatch':
        return `ALERTA: Monto diferente. Fitoffice: ${discrepancy.expectedAmount / 100} EUR, Stripe: ${discrepancy.actualAmount / 100} EUR. IDs: FO-${discrepancy.fitofficeId || 'N/A'}, SP-${discrepancy.stripeId || 'N/A'}.`;
      case 'date_mismatch':
        return `ALERTA: Fechas no coinciden. Fitoffice: ${discrepancy.expectedDate}, Stripe: ${discrepancy.actualDate}. IDs: FO-${discrepancy.fitofficeId || 'N/A'}, SP-${discrepancy.stripeId || 'N/A'}.`;
      default:
        return 'ALERTA: Inconsistencia detectada.';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Alertas de Inconsistencias</h2>
      <p className="text-gray-600 mb-6">Alertas para resolución inmediata de discrepancias.</p>

      {pendingAlerts.length === 0 ? (
        <p className="text-green-600 font-medium">No hay inconsistencias pendientes. ¡Todo en orden!</p>
      ) : (
        <ul className="space-y-4">
          {pendingAlerts.map(alert => (
            <li key={alert.id} className="bg-red-100 p-4 rounded-md border border-red-300 flex justify-between items-center">
              <div>
                <p className="font-medium text-red-800">{getAlertMessage(alert)}</p>
                <p className="text-sm text-red-600">ID Alerta: {alert.id}</p>
              </div>
              <button
                onClick={() => resolveDiscrepancy(alert.id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Resolver
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertasInconsistencias;