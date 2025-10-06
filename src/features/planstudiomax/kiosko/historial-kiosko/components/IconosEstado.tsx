
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

interface IconosEstadoProps {
  estado: 'valido' | 'no-valido' | 'incidencia';
}

const IconosEstado: React.FC<IconosEstadoProps> = ({ estado }) => {
  switch (estado) {
    case 'valido':
      return <FaCheckCircle className="text-green-500" title="Válido" />;
    case 'no-valido':
      return <FaTimesCircle className="text-red-500" title="No Válido" />;
    case 'incidencia':
      return <FaExclamationTriangle className="text-yellow-500" title="Incidencia" />;
    default:
      return null;
  }
};

export default IconosEstado;
