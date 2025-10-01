import React from 'react';
import { Convocatoria, Atleta } from '../listaConvocatoriasApi';

interface TablaEventosProps {
  convocatorias: Convocatoria[];
}

const EstadoAtletaIcon: React.FC<{ estado: Atleta['estado'] }> = ({ estado }) => {
  let icon: string;
  let color: string;

  switch (estado) {
    case 'convocado':
      icon = '✅'; // Checkmark
      color = 'text-green-500';
      break;
    case 'suplente':
      icon = '🔄'; // Reload/Refresh icon
      color = 'text-yellow-500';
      break;
    case 'no disponible':
      icon = '❌'; // Cross mark
      color = 'text-red-500';
      break;
    case 'lesionado':
      icon = '🩹'; // Band-aid
      color = 'text-red-700';
      break;
    default:
      icon = '';
      color = '';
  }

  return <span className={`${color} text-lg`} title={estado}>{icon}</span>;
};

export const TablaEventos: React.FC<TablaEventosProps> = ({ convocatorias }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Fecha</th>
            <th className="py-3 px-4 text-left">Lugar</th>
            <th className="py-3 px-4 text-left">Rival / Tipo</th>
            <th className="py-3 px-4 text-left">Atletas Convocados</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {convocatorias.map((convocatoria) => (
            <tr key={convocatoria.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{convocatoria.evento.fecha}</td>
              <td className="py-3 px-4">{convocatoria.evento.lugar}</td>
              <td className="py-3 px-4">
                {convocatoria.evento.tipo === 'partido' ? convocatoria.evento.rival : convocatoria.evento.tipo}
              </td>
              <td className="py-3 px-4">
                <ul className="list-disc list-inside">
                  {convocatoria.atletas.map((atleta) => (
                    <li key={atleta.id} className="flex items-center space-x-2">
                      <EstadoAtletaIcon estado={atleta.estado} />
                      <span>{atleta.nombre}</span>
                      <span className="text-sm text-gray-500">({atleta.estado})</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
