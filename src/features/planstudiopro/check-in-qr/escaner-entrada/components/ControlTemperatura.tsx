
import React, { useState } from 'react';

const ControlTemperatura: React.FC = () => {
  const [temperatura, setTemperatura] = useState(36.5); // Simulaci??n de temperatura
  const [alertaTemperatura, setAlertaTemperatura] = useState(false);

  // Simulaci??n de detecci??n de temperatura alta
  React.useEffect(() => {
    const interval = setInterval(() => {
      const nuevaTemperatura = 36.0 + Math.random() * 2; // Entre 36.0 y 38.0
      setTemperatura(parseFloat(nuevaTemperatura.toFixed(1)));
      if (nuevaTemperatura > 37.5) {
        setAlertaTemperatura(true);
      } else {
        setAlertaTemperatura(false);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Control de Temperatura (Integraci??n Term??metros)</h3>
      <p>Medici??n autom??tica de temperatura corporal para control sanitario.</p>
      <div className="mt-4 text-center">
        <p className="text-5xl font-bold">{temperatura} ??C</p>
        {alertaTemperatura ? (
          <p className="text-red-500 font-semibold mt-2">??ALERTA! Temperatura Elevada Detectada</p>
        ) : (
          <p className="text-green-500 font-semibold mt-2">Temperatura Normal</p>
        )}
      </div>
    </div>
  );
};

export default ControlTemperatura;
