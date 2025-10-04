
import React from 'react';
import { CohorteData } from '../cohortesClientesApi';

interface ComparativaCohortesProps {
  data: CohorteData[];
}

const ComparativaCohortes: React.FC<ComparativaCohortesProps> = ({ data }) => {
  if (!data.length) {
    return <p className="text-gray-500">No hay datos de cohortes para comparar.</p>;
  }

  // Simple comparison: average retention at a specific period (e.g., month 3)
  const getAverageRetentionAtPeriod = (cohortes: CohorteData[], period: number) => {
    const totalRetention = cohortes.reduce((sum, cohorte) => {
      if (cohorte.retention.length > period - 1) {
        return sum + cohorte.retention[period - 1];
      }
      return sum;
    }, 0);
    const validCohortes = cohortes.filter(cohorte => cohorte.retention.length > period - 1);
    return validCohortes.length > 0 ? (totalRetention / validCohortes.length).toFixed(2) : 'N/A';
  };

  const latestPeriod = data[0]?.retention.length || 1;
  const avgRetentionMonth3 = getAverageRetentionAtPeriod(data, 3);
  const avgRetentionLatest = getAverageRetentionAtPeriod(data, latestPeriod);

  return (
    <div className="space-y-4">
      <p className="text-gray-700">
        Este panel ofrece una comparativa de las cohortes de clientes, permitiendo identificar tendencias y diferencias en el comportamiento de retención a lo largo del tiempo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800">Retención Promedio (Mes 3)</h3>
          <p className="text-2xl font-bold text-blue-600">{avgRetentionMonth3}%</p>
          <p className="text-sm text-blue-700">Promedio de retención de todas las cohortes en el tercer mes.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-800">Retención Promedio (Último Período)</h3>
          <p className="text-2xl font-bold text-green-600">{avgRetentionLatest}%</p>
          <p className="text-sm text-green-700">Promedio de retención de todas las cohortes en el último período disponible (Mes {latestPeriod}).</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mt-6">Detalle por Cohorte</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Cohorte</th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Tamaño Inicial</th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Retención Final (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cohorte) => (
              <tr key={cohorte.name} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm text-gray-700 font-medium">{cohorte.name}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{cohorte.size}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">
                  {cohorte.retention.length > 0 ? `${cohorte.retention[cohorte.retention.length - 1]}%` : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparativaCohortes;
