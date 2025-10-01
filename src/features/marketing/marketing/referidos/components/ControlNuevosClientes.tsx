
// src/features/referidos/components/ControlNuevosClientes.tsx

import React, { useState, useEffect } from 'react';
import { getNewClientReferrals, NewClientReferral } from '../referidosApi';

interface ControlNuevosClientesProps {
  currentUserId: string;
}

const ControlNuevosClientes: React.FC<ControlNuevosClientesProps> = ({ currentUserId }) => {
  const [referrals, setReferrals] = useState<NewClientReferral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const data = await getNewClientReferrals();
        setReferrals(data.filter(ref => ref.referrerId === currentUserId));
      } catch (err) {
        setError('Error al cargar el control de nuevos clientes.');
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, [currentUserId]);

  if (loading) return <div className="text-center py-4">Cargando control de nuevos clientes...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Control de Nuevos Clientes Referidos</h2>
      <p className="text-gray-600 mb-4">Aquí puedes ver el estado de los clientes que has referido.</p>
      
      {referrals.length === 0 ? (
        <p className="text-gray-500">Aún no has referido a ningún cliente.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Usado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referido En</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referrals.map((ref) => (
                <tr key={ref.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ref.referralCodeUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ref.referredAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ref.status === 'converted' ? 'bg-green-100 text-green-800' :
                      ref.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ControlNuevosClientes;
