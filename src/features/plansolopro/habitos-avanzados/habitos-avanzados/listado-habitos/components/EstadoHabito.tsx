import React from 'react';

interface EstadoHabitoProps {
  estado: 'activo' | 'inactivo';
}

const EstadoHabito: React.FC<EstadoHabitoProps> = ({ estado }) => {
  const colorClass = estado === 'activo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  const text = estado === 'activo' ? 'Activo' : 'Inactivo';

  return (
    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${colorClass}`}>
      {text}
    </span>
  );
};

export default EstadoHabito;
