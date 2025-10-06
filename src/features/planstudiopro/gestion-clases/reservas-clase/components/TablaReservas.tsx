import React from 'react';
import { Reserva } from '../reservasClaseApi';

interface TablaReservasProps {
  reservas: Reserva[];
}

const TablaReservas: React.FC<TablaReservasProps> = ({ reservas }) => {
  const getEstadoColor = (estado: Reserva['estado']) => {
    switch (estado) {
      case 'confirmado':
        return 'bg-green-200 text-green-800';
      case 'espera':
        return 'bg-yellow-200 text-yellow-800';
      case 'cancelado':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Reservas Confirmadas</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clase
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {reserva.cliente}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {reserva.clase}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(reserva.estado)}`}>
                  {reserva.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaReservas;
