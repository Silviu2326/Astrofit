import React, { useState } from 'react';
import { getTrackingInfo } from '../pedidosClientesApi';

const SeguimientoEnvio: React.FC = () => {
  const [trackingId, setTrackingId] = useState<string>('');
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTracking = async () => {
    if (!trackingId) {
      setError('Por favor, introduce un ID de seguimiento.');
      return;
    }
    setLoading(true);
    setError(null);
    setTrackingData(null);
    try {
      const data = await getTrackingInfo(trackingId);
      setTrackingData(data);
    } catch (err) {
      setError('Error al obtener la información de seguimiento.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Seguimiento de Envío</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 rounded-l w-full"
          placeholder="Introduce ID de seguimiento"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          onClick={handleTracking}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Rastrear'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {trackingData && (
        <div className="bg-gray-50 p-4 rounded-md">
          <p><strong>ID de Seguimiento:</strong> {trackingData.trackingId}</p>
          <p><strong>Estado:</strong> {trackingData.status}</p>
          <p><strong>Ubicación:</strong> {trackingData.location}</p>
          <p><strong>Entrega Estimada:</strong> {trackingData.estimatedDelivery}</p>
          {/* Aquí se podría integrar un mapa o una línea de tiempo visual del seguimiento */}
        </div>
      )}
    </div>
  );
};

export default SeguimientoEnvio;
