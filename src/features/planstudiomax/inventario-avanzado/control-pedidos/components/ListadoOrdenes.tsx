import React from 'react';
import { Order } from '../controlPedidosApi';

interface ListadoOrdenesProps {
  orders: Order[];
  onConfirmReception: (id: string) => void;
}

export const ListadoOrdenes: React.FC<ListadoOrdenesProps> = ({ orders, onConfirmReception }) => {
  const getStatusColor = (estado: Order['estado']) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'recibido':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de Órdenes de Compra</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No hay órdenes de compra para mostrar.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Proveedor: {order.proveedor}</p>
                <p className="text-sm text-gray-500">Fecha: {order.fecha}</p>
                <p className="text-sm text-gray-500">Total: ${order.total.toFixed(2)}</p>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.estado
                  )}`}
                >
                  {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}
                </span>
              </div>
              {order.estado !== 'recibido' && (
                <button
                  onClick={() => onConfirmReception(order.id)}
                  className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Confirmar Recepción
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
