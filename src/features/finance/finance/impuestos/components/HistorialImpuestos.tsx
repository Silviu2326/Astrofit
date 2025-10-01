
import React from 'react';
import { useGetTaxHistoryQuery } from '../impuestosApi';

const HistorialImpuestos: React.FC = () => {
  const { data: taxHistory, isLoading, error } = useGetTaxHistoryQuery();

  if (isLoading) return <p>Cargando historial de impuestos...</p>;
  if (error) return <p className="text-red-500">Error al cargar historial de impuestos.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Historial de Impuestos Cobrados</h3>
      {taxHistory && taxHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Recaudado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pagado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taxHistory.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entry.totalTaxCollected.toFixed(2)} €</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entry.totalTaxPaid.toFixed(2)} €</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entry.balance.toFixed(2)} €</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.dateRecorded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No hay historial de impuestos disponible.</p>
      )}
    </div>
  );
};

export default HistorialImpuestos;
