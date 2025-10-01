import React, { useEffect, useState } from 'react';
import { fetchAnalisisIngresos, IngresosCampana } from '../reportesEnvioApi';

const AnalisisIngresos: React.FC = () => {
  const [revenueData, setRevenueData] = useState<IngresosCampana[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRevenueData = async () => {
      const data = await fetchAnalisisIngresos();
      setRevenueData(data);
      setLoading(false);
    };
    getRevenueData();
  }, []);

  if (loading) {
    return <div className="p-4 bg-white rounded-lg shadow">Cargando análisis de ingresos...</div>;
  }

  if (!revenueData || revenueData.length === 0) {
    return <div className="p-4 bg-white rounded-lg shadow">No hay datos de ingresos disponibles.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Análisis de Ingresos por Campaña</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaña
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ingresos
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROI (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {revenueData.map((campana, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {campana.nombreCampana}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${campana.ingresos.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campana.roi}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        (El ROI es un valor de ejemplo. Se calcularía con datos reales.)
      </p>
    </div>
  );
};

export default AnalisisIngresos;