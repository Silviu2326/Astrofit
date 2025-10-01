import React from 'react';
import { Reserva } from '../reservasClaseApi';

interface ListaEsperaProps {
  reservas: Reserva[];
}

const ListaEspera: React.FC<ListaEsperaProps> = ({ reservas }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Espera</h2>
      {reservas.length === 0 ? (
        <p className="text-gray-600">No hay reservas en lista de espera.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="py-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">{reserva.cliente}</span>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">
                {reserva.clase}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaEspera;
