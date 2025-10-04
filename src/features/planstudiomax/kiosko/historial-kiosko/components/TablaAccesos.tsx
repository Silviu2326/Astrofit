import React from 'react';
import { AccesoKiosko, ResultadoAcceso } from '../historialKioskoApi';

interface TablaAccesosProps {
  accesos: AccesoKiosko[];
}

const getResultadoClass = (resultado: ResultadoAcceso) => {
  switch (resultado) {
    case 'valido':
      return 'text-green-600 font-medium';
    case 'no_valido':
      return 'text-red-600 font-medium';
    case 'error':
      return 'text-yellow-600 font-medium';
    default:
      return '';
  }
};

export const TablaAccesos: React.FC<TablaAccesosProps> = ({ accesos }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Timestamp
            </th>
            <th scope="col" className="py-3 px-6">
              Cliente
            </th>
            <th scope="col" className="py-3 px-6">
              ID Cliente
            </th>
            <th scope="col" className="py-3 px-6">
              Resultado
            </th>
            <th scope="col" className="py-3 px-6">
              Detalle
            </th>
          </tr>
        </thead>
        <tbody>
          {accesos.length === 0 ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td colSpan={5} className="py-4 px-6 text-center">
                No hay registros de accesos para mostrar.
              </td>
            </tr>
          ) : (
            accesos.map((acceso) => (
              <tr
                key={acceso.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6">
                  {new Date(acceso.timestamp).toLocaleString()}
                </td>
                <td className="py-4 px-6">{acceso.cliente.nombre}</td>
                <td className="py-4 px-6">{acceso.cliente.id}</td>
                <td className={`py-4 px-6 ${getResultadoClass(acceso.resultado)}`}>
                  {acceso.resultado.replace('_', ' ')}
                </td>
                <td className="py-4 px-6">{acceso.detalle || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
