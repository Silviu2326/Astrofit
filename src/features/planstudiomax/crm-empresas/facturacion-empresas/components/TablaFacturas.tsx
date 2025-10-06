import React from 'react';
import { Factura } from '../facturacionEmpresasApi';

interface TablaFacturasProps {
  facturas: Factura[];
}

export const TablaFacturas: React.FC<TablaFacturasProps> = ({ facturas }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Empresa</th>
            <th className="py-2 px-4 border-b text-left">Período</th>
            <th className="py-2 px-4 border-b text-left">Total</th>
            <th className="py-2 px-4 border-b text-left">Estado</th>
            <th className="py-2 px-4 border-b text-left">Recurrente</th>
          </tr>
        </thead>
        <tbody>
          {facturas.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                No hay facturas para mostrar.
              </td>
            </tr>
          ) : (
            facturas.map((factura) => (
              <tr key={factura.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{factura.id}</td>
                <td className="py-2 px-4 border-b">{factura.empresa}</td>
                <td className="py-2 px-4 border-b">{factura.periodo}</td>
                <td className="py-2 px-4 border-b">${factura.total.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      factura.estado === 'pagada' ? 'bg-green-100 text-green-800' :
                      factura.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{factura.recurrente ? 'Sí' : 'No'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
