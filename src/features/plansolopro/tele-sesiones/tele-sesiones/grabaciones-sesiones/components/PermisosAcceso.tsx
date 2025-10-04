import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { updateVideoPermissions } from '../grabacionesSesionesApi';
import { X, Shield, User, Video, CheckCircle, AlertCircle, Lock, Unlock } from 'lucide-react';

interface PermisosAccesoProps {
  onClose: () => void;
}

const PermisosAcceso: React.FC<PermisosAccesoProps> = ({ onClose }) => {
  const [clientId, setClientId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | ''>('');

  const handleUpdatePermissions = async () => {
    if (!clientId || !videoId) {
      setMessage('Por favor, ingrese ID de cliente y ID de video.');
      setMessageType('error');
      return;
    }
    setMessage('Actualizando permisos...');
    setMessageType('info');
    const success = await updateVideoPermissions(videoId, clientId, hasAccess);
    if (success) {
      setMessage('Permisos actualizados exitosamente.');
      setMessageType('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setMessage('Error al actualizar permisos.');
      setMessageType('error');
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg border border-white/50 overflow-hidden">
      {/* Header con gradiente */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-6">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Gestionar Permisos</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* ID de Cliente */}
        <div>
          <label htmlFor="clientId" className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            ID de Cliente
          </label>
          <input
            type="text"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Ingrese el ID del cliente"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* ID de Video */}
        <div>
          <label htmlFor="videoId" className="block text-sm font-semibold text-gray-700 mb-2">
            <Video className="w-4 h-4 inline mr-2" />
            ID de Video
          </label>
          <input
            type="text"
            id="videoId"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="Ingrese el ID del video"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Toggle de acceso */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${hasAccess ? 'bg-green-100' : 'bg-gray-100'}`}>
                {hasAccess ? (
                  <Unlock className="w-5 h-5 text-green-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Estado de Acceso</p>
                <p className="text-sm text-gray-600">
                  {hasAccess ? 'Acceso concedido' : 'Acceso denegado'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="hasAccess"
                checked={hasAccess}
                onChange={(e) => setHasAccess(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
            </label>
          </div>
        </div>

        {/* Mensaje de estado */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl flex items-center gap-3 ${
              messageType === 'success'
                ? 'bg-green-50 border border-green-200'
                : messageType === 'error'
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            {messageType === 'success' && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
            {messageType === 'error' && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
            {messageType === 'info' && <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />}
            <p className={`text-sm font-medium ${
              messageType === 'success'
                ? 'text-green-700'
                : messageType === 'error'
                ? 'text-red-700'
                : 'text-blue-700'
            }`}>
              {message}
            </p>
          </motion.div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpdatePermissions}
            className="flex-1 px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Actualizar Permisos
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300"
          >
            Cancelar
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PermisosAcceso;
