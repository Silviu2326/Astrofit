import React from 'react';
import { Bono } from '../pasesVirtualesApi';

interface AlertasBonosProps {
  bonos: Bono[];
}

const AlertasBonos: React.FC<AlertasBonosProps> = ({ bonos }) => {
  const alertas = bonos.filter(bono =>
    bono.estado === 'por vencer' || (bono.estado === 'activo' && bono.sesionesRestantes <= 3)
  );

  if (alertas.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {alertas.map(bono => (
        <div
          key={bono.id}
          className={`p-4 rounded-lg shadow-md ${bono.estado === 'por vencer' ? 'bg-yellow-50 border-yellow-300 text-yellow-800' : 'bg-blue-50 border-blue-300 text-blue-800'} border`}
        >
          {bono.estado === 'por vencer' && (
            <p className="font-medium">¡Atención! Tu bono de {bono.tipo} está por vencer el {bono.fechaVencimiento}.</p>
          )}
          {bono.estado === 'activo' && bono.sesionesRestantes <= 3 && (
            <p className="font-medium">¡Quedan pocas sesiones! Solo te quedan {bono.sesionesRestantes} sesiones de tu bono de {bono.tipo}.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AlertasBonos;
