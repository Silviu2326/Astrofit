import React from 'react';

interface AthleteConfirmation {
  id: string;
  name: string;
  status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso';
}

interface ListaConfirmacionesProps {
  confirmations: AthleteConfirmation[];
  onUpdateAvailability: (athleteId: string, status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso') => void;
}

const statusColors: Record<AthleteConfirmation['status'], string> = {
  confirmado: 'bg-green-100 text-green-800',
  rechazado: 'bg-red-100 text-red-800',
  pendiente: 'bg-yellow-100 text-yellow-800',
  dudoso: 'bg-blue-100 text-blue-800',
};

const statusLabels: Record<AthleteConfirmation['status'], string> = {
  confirmado: 'Confirmado',
  rechazado: 'Rechazado',
  pendiente: 'Pendiente',
  dudoso: 'Dudoso',
};

export const ListaConfirmaciones: React.FC<ListaConfirmacionesProps> = ({ confirmations, onUpdateAvailability }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Confirmaciones de Atletas</h2>
      {
        confirmations.length === 0 ? (
          <p className="text-gray-500">No hay confirmaciones para mostrar.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {confirmations.map(athlete => (
              <li key={athlete.id} className="py-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-900">{athlete.name}</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[athlete.status]}`}>
                    {statusLabels[athlete.status]}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={athlete.status}
                    onChange={(e) => onUpdateAvailability(athlete.id, e.target.value as AthleteConfirmation['status'])}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="confirmado">Confirmado</option>
                    <option value="rechazado">Rechazado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="dudoso">Dudoso</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};
