import React from 'react';
import { Clase } from '../calendarioClasesApi';

interface TarjetaClaseProps {
  clase: Clase;
}

const categoriaColores = {
  fuerza: 'bg-red-500',
  cardio: 'bg-blue-500',
  yoga: 'bg-green-500',
  funcional: 'bg-orange-500',
};

const TarjetaClase: React.FC<TarjetaClaseProps> = ({ clase }) => {
  const colorClass = categoriaColores[clase.categoria] || 'bg-gray-500';

  return (
    <div className={`p-3 rounded-lg text-white shadow-md ${colorClass}`}>
      <h4 className="font-bold">{clase.nombre}</h4>
      <p className="text-sm">Hora: {clase.hora}</p>
      <p className="text-sm">Instructor: {clase.instructor}</p>
      <p className="text-sm">Capacidad: {clase.capacidad}</p>
    </div>
  );
};

export default TarjetaClase;
