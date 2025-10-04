import React from 'react';
import { Sede } from '../listadoSedesApi';

interface TarjetasSedesProps {
  sede: Sede;
}

export const TarjetasSedes: React.FC<TarjetasSedesProps> = ({ sede }) => {
  const getEstadoClass = (estado: Sede['estado']) => {
    switch (estado) {
      case 'abierto':
        return 'bg-green-100 text-green-800';
      case 'cerrado':
        return 'bg-red-100 text-red-800';
      case 'mantenimiento':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">{sede.nombre}</h2>
        <p className="text-gray-600 mb-1">{sede.direccion}</p>
        <p className="text-gray-700 mb-4">Responsable: {sede.responsable}</p>
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getEstadoClass(
            sede.estado
          )}`}
        >
          {sede.estado.charAt(0).toUpperCase() + sede.estado.slice(1)}
        </span>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <p>Tel??fono: {sede.contacto.telefono}</p>
        <p>Email: {sede.contacto.email}</p>
      </div>
    </div>
  );
};
