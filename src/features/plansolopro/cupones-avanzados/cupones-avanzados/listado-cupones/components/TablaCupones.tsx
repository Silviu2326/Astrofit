import React from 'react';
import { Coupon } from '../listadoCuponesApi';
import { EtiquetasEstado } from './EtiquetasEstado';

interface TablaCuponesProps {
  cupones: Coupon[];
}

export const TablaCupones: React.FC<TablaCuponesProps> = ({ cupones }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Código</th>
            <th className="py-3 px-6 text-left">Tipo</th>
            <th className="py-3 px-6 text-left">Valor</th>
            <th className="py-3 px-6 text-left">Fechas</th>
            <th className="py-3 px-6 text-left">Usos</th>
            <th className="py-3 px-6 text-left">Estado</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {cupones.map((cupon) => (
            <tr key={cupon.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{cupon.codigo}</td>
              <td className="py-3 px-6 text-left">
                {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `${cupon.valor}€`}
              </td>
              <td className="py-3 px-6 text-left">{cupon.valor}</td>
              <td className="py-3 px-6 text-left">{cupon.fechaInicio} - {cupon.fechaFin}</td>
              <td className="py-3 px-6 text-left">{cupon.usosActuales} / {cupon.limiteUsos}</td>
              <td className="py-3 px-6 text-left">
                <EtiquetasEstado estado={cupon.estado} />
              </td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                  {cupon.estado === 'activo' ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
