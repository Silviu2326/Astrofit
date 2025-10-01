import React, { useEffect, useState } from 'react';
import { fetchLtvClientes, ClienteLTV } from '../ltvClientesApi';

const RankingValor: React.FC = () => {
  const [clientesRanked, setClientesRanked] = useState<ClienteLTV[]>([]);

  useEffect(() => {
    const getRankedClients = async () => {
      const data = await fetchLtvClientes();
      // Ordenar clientes por LTV de mayor a menor
      const sortedData = [...data].sort((a, b) => b.ltv - a.ltv);
      setClientesRanked(sortedData);
    };
    getRankedClients();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Ranking de Clientes más Valiosos</h2>
      <ul className="divide-y divide-gray-200">
        {clientesRanked.map((cliente, index) => (
          <li key={cliente.id} className="py-3 flex justify-between items-center">
            <span className="font-medium">{index + 1}. {cliente.nombre}</span>
            <span className="text-gray-700">${cliente.ltv.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingValor;
