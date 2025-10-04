import React from 'react';
import { ClienteRanking } from '../reportesAsistenciaApi';

interface RankingClientesProps {
  clientes: ClienteRanking[];
}

const RankingClientes: React.FC<RankingClientesProps> = ({ clientes }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Ranking de Clientes Frecuentes</h2>
      <ul className="divide-y divide-gray-200">
        {clientes.map((cliente, index) => (
          <li key={cliente.id} className="py-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg font-bold text-indigo-500 mr-3">#{index + 1}</span>
              <span className="text-gray-800">{cliente.nombre}</span>
            </div>
            <span className="text-gray-600">{cliente.asistencias} asistencias</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingClientes;
