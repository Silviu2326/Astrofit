
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface IconosEstadoProps {
  estado: 'exito' | 'error';
  className?: string;
}

const IconosEstado: React.FC<IconosEstadoProps> = ({ estado, className }) => {
  return (
    <span className={`flex items-center ${className}`}>
      {estado === 'exito' ? (
        <FaCheckCircle className="text-green-500 mr-1" />
      ) : (
        <FaTimesCircle className="text-red-500 mr-1" />
      )}
      {estado === 'exito' ? 'Éxito' : 'Error'}
    </span>
  );
};

export default IconosEstado;
