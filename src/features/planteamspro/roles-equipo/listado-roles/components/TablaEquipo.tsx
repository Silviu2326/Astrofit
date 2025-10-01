import React from 'react';
import { MiembroEquipo } from '../listadoRolesApi';

interface TablaEquipoProps {
  equipo: MiembroEquipo[];
}

export const TablaEquipo: React.FC<TablaEquipoProps> = ({ equipo }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol Principal</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipo.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img className="h-10 w-10 rounded-full" src={member.fotoPerfil} alt={member.nombre} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.posicion}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.rolPrincipal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
