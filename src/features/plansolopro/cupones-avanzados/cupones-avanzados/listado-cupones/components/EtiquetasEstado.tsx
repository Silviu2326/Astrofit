import React from 'react';
import { CouponStatus } from '../listadoCuponesApi';

interface EtiquetasEstadoProps {
  estado: CouponStatus;
}

export const EtiquetasEstado: React.FC<EtiquetasEstadoProps> = ({ estado }) => {
  let colorClass = '';
  switch (estado) {
    case 'activo':
      colorClass = 'bg-green-200 text-green-800';
      break;
    case 'caducado':
      colorClass = 'bg-red-200 text-red-800';
      break;
    case 'agotado':
      colorClass = 'bg-yellow-200 text-yellow-800';
      break;
    default:
      colorClass = 'bg-gray-200 text-gray-800';
  }

  return (
    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${colorClass}`}>
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </span>
  );
};
