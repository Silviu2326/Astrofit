import React from 'react';

interface FeedbackVisualSonoroProps {
  exito: boolean;
  mensaje: string;
}

const FeedbackVisualSonoro: React.FC<FeedbackVisualSonoroProps> = ({ exito, mensaje }) => {
  // Lógica para reproducir sonido y mostrar feedback visual
  return (
    <div className={`feedback ${exito ? 'exito' : 'error'}`}>
      <h3>{mensaje}</h3>
      {/* Icono de éxito o error */}
    </div>
  );
};

export default FeedbackVisualSonoro;
