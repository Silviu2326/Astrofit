import React, { useState } from 'react';
import { renovarContrato } from '../renovacionesApi';

const ProcesoRenovacion: React.FC = () => {
  const [contratoId, setContratoId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRenovar = async () => {
    if (!contratoId) {
      setMensaje('Por favor, introduce un ID de contrato.');
      return;
    }
    setLoading(true);
    setMensaje('');
    const success = await renovarContrato(contratoId);
    if (success) {
      setMensaje(`Contrato ${contratoId} renovado con éxito.`);
      setContratoId('');
    } else {
      setMensaje(`Error: No se pudo renovar el contrato ${contratoId}.`);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Proceso de Renovación</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="contratoId" className="block text-sm font-medium text-gray-700">ID del Contrato</label>
          <input
            type="text"
            id="contratoId"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={contratoId}
            onChange={(e) => setContratoId(e.target.value)}
            placeholder="Ej: C001"
          />
        </div>
        <button
          onClick={handleRenovar}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Renovando...' : 'Renovar Contrato'}
        </button>
        {mensaje && (
          <p className={`text-sm ${mensaje.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProcesoRenovacion;
