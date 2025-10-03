import React from 'react';
import TarjetaVideo from './TarjetaVideo';
import { VideoRecording } from '../grabacionesSesionesApi';

interface VideotecaGridProps {
  videos: VideoRecording[];
  onVideoSelect: (video: VideoRecording) => void;
}

const VideotecaGrid: React.FC<VideotecaGridProps> = ({ videos, onVideoSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <TarjetaVideo key={video.id} video={video} onSelect={onVideoSelect} />
      ))}
    </div>
  );
};

export default VideotecaGrid;
