import React from 'react';

const RegistroEntrada: React.FC = () => {
  const horaEntrada = new Date().toLocaleTimeString();
  return (
    <div className="registro-entrada">
      <h3>Registro de Entrada</h3>
      <p>Hora de entrada: {horaEntrada}</p>
      {/* Lógica adicional para registrar la entrada */}
    </div>
  );
};

export default RegistroEntrada;
