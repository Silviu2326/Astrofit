
import React from 'react';
import { Affiliate } from '../listadoAfiliadosApi';

interface TarjetaAfiliadoProps {
  affiliate: Affiliate;
}

export const TarjetaAfiliado: React.FC<TarjetaAfiliadoProps> = ({ affiliate }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center mb-4">
        <img src={affiliate.photo} alt={affiliate.name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{affiliate.name}</h3>
          <p className="text-gray-600">C??digo: {affiliate.referralCode}</p>
        </div>
      </div>
      <div className="text-sm">
        <p>Ventas Generadas: <span className="font-medium">{affiliate.salesGenerated} ??</span></p>
        <p>Comisi??n Pendiente: <span className="font-medium">{affiliate.pendingCommission} ??</span></p>
        <p>Estado: <span className={`font-medium ${affiliate.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{affiliate.status}</span></p>
        <p>Rendimiento: <span className={`font-medium ${
          affiliate.performance === 'high' ? 'text-green-600' :
          affiliate.performance === 'medium' ? 'text-yellow-600' :
          'text-red-600'
        }`}>{affiliate.performance}</span></p>
      </div>
    </div>
  );
};
