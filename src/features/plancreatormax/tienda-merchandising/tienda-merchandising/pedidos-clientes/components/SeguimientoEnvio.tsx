import React, { useState } from 'react';
import { getTrackingInfo } from '../pedidosClientesApi';

interface SeguimientoEnvioProps {
  onTrackingSuccess?: (trackingId: string) => void;
  onTrackingError?: (error: string) => void;
}

const SeguimientoEnvio: React.FC<SeguimientoEnvioProps> = ({ 
  onTrackingSuccess, 
  onTrackingError 
}) => {
  const [trackingId, setTrackingId] = useState<string>('');
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTracking = async () => {
    if (!trackingId.trim()) {
      const errorMsg = 'Por favor, introduce un ID de seguimiento válido.';
      setError(errorMsg);
      onTrackingError?.(errorMsg);
      return;
    }
    
    setLoading(true);
    setError(null);
    setTrackingData(null);
    
    try {
      const data = await getTrackingInfo(trackingId);
      setTrackingData(data);
      onTrackingSuccess?.(trackingId);
    } catch (err) {
      const errorMsg = 'Error al obtener la información de seguimiento.';
      setError(errorMsg);
      onTrackingError?.(errorMsg);
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
          className="border p-2 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Introduce ID de seguimiento"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleTracking()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handleTracking}
          disabled={loading || !trackingId.trim()}
        >
          {loading ? 'Buscando...' : 'Rastrear'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {trackingData && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-gray-800">Información de Seguimiento</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">ID de Seguimiento:</span>
                <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{trackingData.trackingId}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Estado:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  trackingData.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                  trackingData.status === 'En tránsito' ? 'bg-blue-100 text-blue-800' :
                  trackingData.status === 'En preparación' ? 'bg-yellow-100 text-yellow-800' :
                  trackingData.status === 'Devolución en proceso' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trackingData.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Ubicación:</span>
                <span className="text-sm text-gray-800">{trackingData.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Entrega Estimada:</span>
                <span className="text-sm text-gray-800">{trackingData.estimatedDelivery}</span>
              </div>
            </div>
          </div>
          
          {trackingData.lastUpdate && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-gray-500">
                Última actualización: {new Date(trackingData.lastUpdate).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeguimientoEnvio;
