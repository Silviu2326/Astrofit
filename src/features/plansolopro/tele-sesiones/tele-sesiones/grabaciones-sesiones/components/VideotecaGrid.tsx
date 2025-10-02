import React from 'react';
import { motion } from 'framer-motion';
import TarjetaVideo from './TarjetaVideo';
import { VideoRecording } from '../grabacionesSesionesApi';
import { Video } from 'lucide-react';

interface VideotecaGridProps {
  videos: VideoRecording[];
  onVideoSelect: (video: VideoRecording) => void;
}

const VideotecaGrid: React.FC<VideotecaGridProps> = ({ videos, onVideoSelect }) => {
  if (videos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <Video className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">No se encontraron grabaciones</h3>
        <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <TarjetaVideo video={video} onSelect={onVideoSelect} />
        </motion.div>
      ))}
    </div>
  );
};

export default VideotecaGrid;
