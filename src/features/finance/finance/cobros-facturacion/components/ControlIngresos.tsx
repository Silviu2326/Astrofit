import React, { useEffect, useState } from 'react';
import { getIngresosPorMes } from '../cobrosFacturacionApi';

// This would typically be a more complex chart component, but for mock data, a simple list will suffice.
const ControlIngresos: React.FC = () => {
  const [ingresos, setIngresos] = useState<{ mes: string; ingresos: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const data = await getIngresosPorMes();
        setIngresos(data);
      } catch (err) {
        setError('Error al cargar el control de ingresos.');
      } finally {
        setLoading(false);
      }
    };
    fetchIngresos();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando control de ingresos...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Control de Ingresos (Mensual)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ingresos.map((item) => (
              <tr key={item.mes}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.mes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{item.ingresos.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-gray-600">Este es un resumen básico. En una aplicación real, aquí se integraría un gráfico de tendencias.</p>
    </div>
  );
};

export default ControlIngresos;
