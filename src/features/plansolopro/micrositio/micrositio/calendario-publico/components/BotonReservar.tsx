import React from 'react';
import { reserveSession } from '../calendarioPublicoApi';

interface BotonReservarProps {
  slotId: string;
}

const BotonReservar: React.FC<BotonReservarProps> = ({ slotId }) => {
  const handleReserve = async () => {
    const success = await reserveSession(slotId);
    if (success) {
      alert('¡Sesión reservada con éxito!');
      // Optionally, refresh the slots or update UI
    } else {
      alert('Error al reservar la sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <button
      onClick={handleReserve}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
    >
      Reservar sesión
    </button>
  );
};

export default BotonReservar;
