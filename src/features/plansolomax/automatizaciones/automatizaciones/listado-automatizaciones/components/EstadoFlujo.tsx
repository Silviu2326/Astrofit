import React from 'react';

interface EstadoFlujoProps {
  estado: 'activo' | 'pausado';
}

export const EstadoFlujo: React.FC<EstadoFlujoProps> = ({ estado }) => {
  const colorClass = estado === 'activo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  const text = estado === 'activo' ? 'Activo' : 'Pausado';

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
      {text}
    </span>
  );
};
