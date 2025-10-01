
import React from 'react';

interface Alerta {
  id: string;
  cliente: string;
  tiempoInactivo: string;
  severidad: 'baja' | 'media' | 'alta';
  mensaje: string;
}

const TarjetasAlerta: React.FC = () => {
  const alertas: Alerta[] = [
    { id: '1', cliente: 'Cliente A', tiempoInactivo: '90 días', severidad: 'alta', mensaje: 'Cliente con alta probabilidad de abandono.' },
    { id: '2', cliente: 'Cliente B', tiempoInactivo: '60 días', severidad: 'media', mensaje: 'Considerar contacto para reactivación.' },
    { id: '3', cliente: 'Cliente C', tiempoInactivo: '120 días', severidad: 'alta', mensaje: 'Crítico: cliente inactivo por mucho tiempo.' },
  ];

  const getSeverityColor = (severidad: Alerta['severidad']) => {
    switch (severidad) {
      case 'alta': return 'bg-red-100 border-red-400 text-red-700';
      case 'media': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'baja': return 'bg-green-100 border-green-400 text-green-700';
      default: return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {alertas.map(alerta => (
        <div key={alerta.id} className={`p-4 border rounded-lg ${getSeverityColor(alerta.severidad)}`}>
          <h3 className="font-semibold">{alerta.cliente}</h3>
          <p className="text-sm">Inactivo por: {alerta.tiempoInactivo}</p>
          <p className="text-sm">{alerta.mensaje}</p>
        </div>
      ))}
    </div>
  );
};

export default TarjetasAlerta;
