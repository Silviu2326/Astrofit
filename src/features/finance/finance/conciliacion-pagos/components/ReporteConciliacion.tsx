import React from 'react';
import { useConciliacionPagosData } from '../conciliacionPagosApi';

const ReporteConciliacion: React.FC = () => {
  const { fitofficeCharges, stripePayouts, discrepancies, loading, error } = useConciliacionPagosData();

  if (loading) return <div className="text-center p-4">Cargando datos...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  // Calculate totals for the report
  const totalFitofficeCharges = fitofficeCharges.reduce((sum, charge) => sum + charge.amount, 0);
  const totalStripePayouts = stripePayouts.reduce((sum, payout) => sum + payout.amount, 0);
  const totalStripeFees = stripePayouts.reduce((sum, payout) => sum + payout.fees, 0);
  const resolvedDiscrepanciesCount = discrepancies.filter(d => d.resolved).length;
  const pendingDiscrepanciesCount = discrepancies.filter(d => !d.resolved).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reporte de Conciliación Mensual</h2>
      <p className="text-gray-600 mb-6">Genera un reporte detallado para el control financiero.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-lg font-medium text-blue-800">Total Cobros Fitoffice:</p>
            <p className="text-2xl font-bold text-blue-600">{totalFitofficeCharges / 100} EUR</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-lg font-medium text-green-800">Total Payouts Stripe:</p>
            <p className="text-2xl font-bold text-green-600">{totalStripePayouts / 100} EUR</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-lg font-medium text-yellow-800">Total Comisiones Stripe:</p>
            <p className="text-2xl font-bold text-yellow-600">{totalStripeFees / 100} EUR</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="text-lg font-medium text-purple-800">Discrepancias Resueltas:</p>
            <p className="text-2xl font-bold text-purple-600">{resolvedDiscrepanciesCount}</p>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-lg font-medium text-red-800">Discrepancias Pendientes:</p>
          <p className="text-2xl font-bold text-red-600">{pendingDiscrepanciesCount}</p>
        </div>
      </div>

      <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 text-lg font-semibold">
        Generar Reporte PDF
      </button>
    </div>
  );
};

export default ReporteConciliacion;