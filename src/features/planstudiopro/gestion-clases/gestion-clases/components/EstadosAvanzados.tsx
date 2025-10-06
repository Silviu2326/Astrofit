import React from 'react';
import './EstadosAvanzados.css'; // Assuming a CSS file for styling

interface ClassStatusProps {
  status: 'full' | 'available' | 'cancelled';
  className?: string;
}

const EstadosAvanzados: React.FC<ClassStatusProps> = ({ status, className }) => {
  const statusMap = {
    full: { text: 'Clase Llena', color: 'red' },
    available: { text: 'Disponible', color: 'green' },
    cancelled: { text: 'Cancelada', color: 'gray' },
  };

  const { text, color } = statusMap[status];

  return (
    <span className={`estado-clase ${status} ${className || ''}`} style={{ color }}>
      {text}
    </span>
  );
};

export default EstadosAvanzados;
