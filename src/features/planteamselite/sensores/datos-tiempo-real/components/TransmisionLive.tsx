import React, { useState } from 'react';
import { Radio, Users, Eye } from 'lucide-react';

const TransmisionLive: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [viewers, setViewers] = useState(12);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
          <Radio className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Transmisión Live</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Análisis remoto por especialistas externos</p>

      <div className="space-y-4">
        {/* Estado de transmisión */}
        <div className={`p-4 border-2 rounded-2xl transition-all duration-300 relative overflow-hidden ${
          isStreaming
            ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50'
            : 'border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50'
        }`}>
          {isStreaming && (
            <div className="absolute inset-0 bg-emerald-500 opacity-5 animate-pulse"></div>
          )}

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              {isStreaming ? (
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full blur-md opacity-50"></div>
                </div>
              ) : (
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              )}
              <span className="text-sm font-semibold text-gray-700">
                {isStreaming ? 'En Vivo' : 'Desconectado'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-gray-800">{viewers}</span>
            </div>
          </div>
        </div>

        {/* Botón de control */}
        <button
          onClick={() => setIsStreaming(!isStreaming)}
          className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isStreaming
              ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg'
          }`}
        >
          <Radio className="w-4 h-4" />
          {isStreaming ? 'Detener Transmisión' : 'Iniciar Transmisión'}
        </button>

        {/* Espectadores */}
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-600" />
            <p className="text-xs font-semibold text-purple-700">ESPECTADORES ACTIVOS</p>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                {i}
              </div>
            ))}
            {viewers > 4 && (
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-700 text-xs font-bold">
                +{viewers - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmisionLive;
