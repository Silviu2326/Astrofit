import React from 'react';
import { HistorialItem } from '../clienteDetalleApi';

interface ClienteHistorialProps {
  historial: HistorialItem[];
}

const ClienteHistorial: React.FC<ClienteHistorialProps> = ({ historial }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial Completo</h3>
      {historial.length === 0 ? (
        <p className="text-gray-500">No hay elementos en el historial.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {historial.map((item) => (
            <li key={item.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.descripcion}</p>
                <p className="text-xs text-gray-500">Tipo: {item.tipo}</p>
              </div>
              <span className="text-sm text-gray-500">{new Date(item.fecha).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteHistorial;