
import React, { useState } from 'react';

const ControlAforo: React.FC = () => {
  const [aforoActual, setAforoActual] = useState(75); // Simulaci??n de aforo
  const aforoMaximo = 100;
  const porcentajeAforo = (aforoActual / aforoMaximo) * 100;

  const semaforoColor =
    porcentajeAforo < 50 ? 'bg-green-500' :
    porcentajeAforo < 80 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Control de Aforo (Sem??foros Autom??ticos)</h3>
      <p>Gesti??n autom??tica de la capacidad del espacio en tiempo real.</p>
      <div className="mt-4 flex items-center justify-between">
        <div className={`w-16 h-16 rounded-full ${semaforoColor} flex items-center justify-center text-white font-bold text-xl`}>
          {aforoActual}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{porcentajeAforo.toFixed(0)}%</p>
          <p className="text-sm text-gray-400">Aforo Actual / M??ximo: {aforoActual}/{aforoMaximo}</p>
        </div>
      </div>
    </div>
  );
};

export default ControlAforo;
