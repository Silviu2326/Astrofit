import React, { useState } from 'react';
import { updateVideoPermissions } from '../grabacionesSesionesApi';

interface PermisosAccesoProps {
  onClose: () => void;
}

const PermisosAcceso: React.FC<PermisosAccesoProps> = ({ onClose }) => {
  const [clientId, setClientId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdatePermissions = async () => {
    if (!clientId || !videoId) {
      setMessage('Por favor, ingrese ID de cliente y ID de video.');
      return;
    }
    setMessage('Actualizando permisos...');
    const success = await updateVideoPermissions(videoId, clientId, hasAccess);
    if (success) {
      setMessage('Permisos actualizados exitosamente.');
    } else {
      setMessage('Error al actualizar permisos.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestionar Permisos de Acceso</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>

      <div className="mb-4">
        <label htmlFor="clientId" className="block text-gray-700 text-sm font-bold mb-2">ID de Cliente:</label>
        <input
          type="text"
          id="clientId"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="videoId" className="block text-gray-700 text-sm font-bold mb-2">ID de Video:</label>
        <input
          type="text"
          id="videoId"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="hasAccess"
          className="mr-2 leading-tight"
          checked={hasAccess}
          onChange={(e) => setHasAccess(e.target.checked)}
        />
        <label htmlFor="hasAccess" className="text-gray-700 text-sm font-bold">Conceder Acceso</label>
      </div>

      <button
        onClick={handleUpdatePermissions}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Actualizar Permisos
      </button>

      {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default PermisosAcceso;
