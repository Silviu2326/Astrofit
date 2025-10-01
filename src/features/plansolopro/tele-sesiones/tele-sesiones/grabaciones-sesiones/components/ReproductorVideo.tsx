import React from 'react';
import { VideoRecording } from '../grabacionesSesionesApi';

interface ReproductorVideoProps {
  video: VideoRecording;
  onClose: () => void;
}

const ReproductorVideo: React.FC<ReproductorVideoProps> = ({ video, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{video.title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>
      <video controls src={video.url} className="w-full h-auto max-h-96"></video>
      <div className="mt-4">
        <p><strong>Fecha:</strong> {video.date}</p>
        <p><strong>Tipo:</strong> {video.type}</p>
        <p><strong>Duración:</strong> {video.duration}</p>
        <p><strong>Tamaño:</strong> {video.size}</p>
        <a
          href={video.url}
          download
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Descargar Video
        </a>
      </div>
    </div>
  );
};

export default ReproductorVideo;
