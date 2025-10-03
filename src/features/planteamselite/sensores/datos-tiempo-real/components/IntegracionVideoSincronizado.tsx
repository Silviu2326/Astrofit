import React, { useState } from 'react';
import { Video, Play, Pause, SkipForward } from 'lucide-react';

const IntegracionVideoSincronizado: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
          <Video className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Video Sincronizado</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Análisis técnico-táctico en tiempo real</p>

      <div className="space-y-4">
        {/* Video Preview */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
          <div className="relative z-10 text-center">
            <Play className="w-12 h-12 text-white/80 mx-auto mb-2" />
            <p className="text-sm text-white/60">Vista previa de video</p>
          </div>
        </div>

        {/* Controles */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </button>
          <button className="px-4 py-3 border-2 border-cyan-500 text-cyan-600 rounded-xl font-semibold hover:bg-cyan-50 transition-colors duration-300">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Sincronización */}
        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-semibold text-emerald-700">SINCRONIZADO</p>
          </div>
          <p className="text-xs text-emerald-600">Datos biométricos sincronizados con video</p>
        </div>
      </div>
    </div>
  );
};

export default IntegracionVideoSincronizado;
