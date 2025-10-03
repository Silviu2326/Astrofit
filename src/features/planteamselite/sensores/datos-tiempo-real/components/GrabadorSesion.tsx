import React, { useState } from 'react';
import { Video, Circle, Square, Play } from 'lucide-react';

const GrabadorSesion: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState('00:00:00');

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
          <Video className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Grabador de Sesión</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Grabación con marcadores de eventos críticos</p>

      <div className="space-y-4">
        {/* Estado de grabación */}
        <div className={`p-4 border-2 rounded-2xl transition-all duration-300 ${
          isRecording
            ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50'
            : 'border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isRecording ? (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              ) : (
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              )}
              <span className="text-sm font-semibold text-gray-700">
                {isRecording ? 'Grabando' : 'Detenido'}
              </span>
            </div>
            <span className="text-lg font-mono font-bold text-gray-800">{duration}</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isRecording
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg'
            }`}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4" />
                Detener
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                Grabar
              </>
            )}
          </button>
          <button className="px-4 py-3 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300">
            <Play className="w-4 h-4" />
          </button>
        </div>

        {/* Marcadores */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-xs font-semibold text-blue-700 mb-2">MARCADORES</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-blue-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>3 eventos críticos marcados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrabadorSesion;
