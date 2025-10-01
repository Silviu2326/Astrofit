import React from 'react';
import { Ticket } from '../ticketsDiariosApi';

interface TablaTransaccionesProps {
  tickets: Ticket[];
}

const TablaTransacciones: React.FC<TablaTransaccionesProps> = ({ tickets }) => {
  const getEstadoClass = (estado: Ticket['estado']) => {
    switch (estado) {
      case 'pagado':
        return 'text-green-600';
      case 'pendiente':
        return 'text-yellow-600';
      case 'cancelado':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Hora</th>
            <th className="py-3 px-6 text-left">Producto</th>
            <th className="py-3 px-6 text-left">Cantidad</th>
            <th className="py-3 px-6 text-left">Total</th>
            <th className="py-3 px-6 text-left">Estado</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{ticket.hora}</td>
              <td className="py-3 px-6 text-left">{ticket.producto}</td>
              <td className="py-3 px-6 text-left">{ticket.cantidad}</td>
              <td className="py-3 px-6 text-left">{ticket.total.toFixed(2)} €</td>
              <td className="py-3 px-6 text-left">
                <span className={`font-bold ${getEstadoClass(ticket.estado)}`}>
                  {ticket.estado.charAt(0).toUpperCase() + ticket.estado.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaTransacciones;
