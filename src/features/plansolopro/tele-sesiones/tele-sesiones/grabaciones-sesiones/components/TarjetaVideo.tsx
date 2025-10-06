import React from 'react';
import { VideoRecording } from '../grabacionesSesionesApi';

interface TarjetaVideoProps {
  video: VideoRecording;
  onSelect: (video: VideoRecording) => void;
}

const TarjetaVideo: React.FC<TarjetaVideoProps> = ({ video, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => onSelect(video)}
    >
      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
        <p className="text-gray-600 text-sm">Fecha: {video.date}</p>
        <p className="text-gray-600 text-sm">Tipo: {video.type}</p>
        <p className="text-gray-600 text-sm">Duración: {video.duration}</p>
        <p className="text-gray-600 text-sm">Tamaño: {video.size}</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening video when clicking download
            window.open(video.url, '_blank');
          }}
          className="mt-3 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        >
          Descargar
        </button>
      </div>
    </div>
  );
};

export default TarjetaVideo;
