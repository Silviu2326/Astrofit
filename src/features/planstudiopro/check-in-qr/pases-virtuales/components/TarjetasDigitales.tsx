import React from 'react';
import { Bono } from '../pasesVirtualesApi';

interface TarjetasDigitalesProps {
  bono: Bono;
}

const TarjetasDigitales: React.FC<TarjetasDigitalesProps> = ({ bono }) => {
  const getEstadoClass = (estado: Bono['estado']) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'por vencer':
        return 'bg-yellow-100 text-yellow-800';
      case 'vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-2 text-gray-700">{bono.tipo}</h3>
      <div className="text-sm text-gray-600 mb-1">
        Sesiones restantes: <span className="font-medium">{bono.sesionesRestantes} / {bono.totalSesiones}</span>
      </div>
      <div className="text-sm text-gray-600 mb-3">
        Vencimiento: <span className="font-medium">{bono.fechaVencimiento}</span>
      </div>
      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getEstadoClass(bono.estado)}`}>
        {bono.estado.charAt(0).toUpperCase() + bono.estado.slice(1)}
      </span>
    </div>
  );
};

export default TarjetasDigitales;
