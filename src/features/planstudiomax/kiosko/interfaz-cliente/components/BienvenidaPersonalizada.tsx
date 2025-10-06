import React from 'react';

interface BienvenidaPersonalizadaProps {
  nombre: string;
  mensaje: string;
}

const BienvenidaPersonalizada: React.FC<BienvenidaPersonalizadaProps> = ({ nombre, mensaje }) => {
  return (
    <div className="bienvenida-personalizada">
      <h2>¡Bienvenido, {nombre}!</h2>
      <p>{mensaje}</p>
    </div>
  );
};

export default BienvenidaPersonalizada;
