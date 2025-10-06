
import React, { useState } from 'react';

interface VistaPreviaEnvioProps {
  messageContent?: string;
  messageTitle?: string;
}

const VistaPreviaEnvio: React.FC<VistaPreviaEnvioProps> = ({ messageContent = 'Contenido de ejemplo para la vista previa.', messageTitle = 'Asunto del Mensaje' }) => {
  const [previewType, setPreviewType] = useState<'email' | 'mobile'>('email');

  const emailPreview = (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-200 p-3 border-b border-gray-300 text-sm text-gray-700">
        De: El Copy Fitness &lt;no-reply@copyfitness.com&gt;<br/>
        Para: [CLIENT_EMAIL]<br/>
        Asunto: {messageTitle}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{messageTitle}</h3>
        <p className="text-gray-800 whitespace-pre-wrap">{messageContent}</p>
        <p className="mt-4 text-sm text-gray-500">Este es un mensaje de prueba. Los enlaces no son funcionales.</p>
      </div>
    </div>
  );

  const mobilePreview = (
    <div className="w-64 h-96 bg-gray-800 rounded-xl shadow-xl mx-auto flex flex-col items-center p-2">
      <div className="w-16 h-1 bg-gray-700 rounded-full mt-1"></div> {/* Notch */}
      <div className="flex-grow w-full bg-white rounded-lg mt-2 overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">Notificaciones</div>
        <div className="p-3 border-b border-gray-200">
          <p className="text-xs text-gray-500">Ahora</p>
          <p className="font-semibold text-gray-800">El Copy Fitness</p>
          <p className="text-sm text-gray-700 line-clamp-2">{messageTitle}: {messageContent}</p>
        </div>
        <div className="p-3 border-b border-gray-200">
          <p className="text-xs text-gray-500">Hace 5 min</p>
          <p className="font-semibold text-gray-800">Recordatorio de Sesión</p>
          <p className="text-sm text-gray-700 line-clamp-2">¡Hola! Tu sesión de entrenamiento está a punto de comenzar.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vista Previa de Envío</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Vista Previa:</label>
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded ${previewType === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setPreviewType('email')}
          >
            Email
          </button>
          <button
            className={`py-2 px-4 rounded ${previewType === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setPreviewType('mobile')}
          >
            Notificación Móvil
          </button>
        </div>
      </div>

      <div className="mt-6">
        {previewType === 'email' ? emailPreview : mobilePreview}
      </div>
    </div>
  );
};

export default VistaPreviaEnvio;
