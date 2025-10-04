import React from 'react';
import { FlujoAutomatizacion } from '../listadoAutomatizacionesApi';
import { EstadoFlujo } from './EstadoFlujo';
import { ContadorEjecuciones } from './ContadorEjecuciones';

interface TablaFlujosProps {
  flujos: FlujoAutomatizacion[];
}

export const TablaFlujos: React.FC<TablaFlujosProps> = ({ flujos }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nombre del Flujo
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ejecuciones
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {flujos.map((flujo) => (
            <tr key={flujo.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{flujo.nombre}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{flujo.tipo}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <EstadoFlujo estado={flujo.estado} />
              </td>
              <td className="px-5 py-5 border-b border-200 bg-white text-sm">
                <ContadorEjecuciones count={flujo.ejecuciones} />
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                <button className="text-yellow-600 hover:text-yellow-900 mr-3">{flujo.estado === 'activo' ? 'Pausar' : 'Activar'}</button>
                {/* Más acciones como eliminar, ver detalles, etc. */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
