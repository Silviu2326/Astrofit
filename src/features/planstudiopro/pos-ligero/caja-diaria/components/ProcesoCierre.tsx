import React, { useState } from 'react';
import { closeCajaDiaria, getCajaDiariaData, CajaDiariaData } from '../cajaDiariaApi';

const ProcesoCierre: React.FC = () => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleCierre = async () => {
    setIsClosing(true);
    setMessage(null);
    setMessageType(null);
    try {
      // En una aplicación real, aquí se obtendrían los datos finales del día
      // para enviarlos al proceso de cierre.
      const currentData: CajaDiariaData = await getCajaDiariaData(); // Usamos mock data para simular
      const success = await closeCajaDiaria(currentData);
      if (success) {
        setMessage('Caja diaria cerrada con éxito.');
        setMessageType('success');
      } else {
        setMessage('El cierre de caja no se pudo completar.');
        setMessageType('error');
      }
    } catch (err: any) {
      setMessage(`Error al cerrar la caja: ${err.message}`);
      setMessageType('error');
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Proceso de Cierre de Caja</h2>
      <p className="text-gray-600 mb-4">Realice el cierre de la caja diaria al finalizar la jornada.</p>

      <button
        onClick={handleCierre}
        disabled={isClosing}
        className={`px-6 py-3 rounded-md text-white font-semibold transition-colors duration-300
          ${isClosing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isClosing ? 'Cerrando...' : 'Cerrar Caja Diaria'}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ProcesoCierre;
