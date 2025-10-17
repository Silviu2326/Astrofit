import React, { useState, useEffect } from 'react';
import { getVideos, toggleFavorite } from '../../contenidos-video/contenidosVideoApi';
import ReproductorIntegrado from './ReproductorIntegrado';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  isFavorite: boolean;
}

const VideotecaPrivada: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data.filter(video => video.isFavorite)); // Example: show favorites in private library
      } catch (err) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  const handleToggleFavorite = async (videoId: string, currentStatus: boolean) => {
    try {
      await toggleFavorite(videoId, !currentStatus);
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === videoId ? { ...video, isFavorite: !currentStatus } : video
        )
      );
    } catch (err) {
      console.error('Failed to update favorite status', err);
    }
  };

  if (loading) return <div className="text-center">Cargando videoteca privada...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Mi Videoteca Privada</h2>
      {selectedVideo && (
        <div className="mb-6">
          <ReproductorIntegrado videoUrl={selectedVideo.url} title={selectedVideo.title} />
          <h3 className="text-xl font-bold mt-4">{selectedVideo.title}</h3>
          <p className="text-gray-600">{selectedVideo.description}</p>
        </div>
      )}
      <div className="space-y-4">
        {videos.length === 0 ? (
          <p>No tienes videos favoritos en tu videoteca privada.</p>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="flex items-center space-x-4 p-2 border rounded-md">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-24 h-16 object-cover rounded cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              />
              <div className="flex-grow">
                <h4 className="font-medium text-lg cursor-pointer" onClick={() => setSelectedVideo(video)}>{video.title}</h4>
                <p className="text-sm text-gray-500">{video.topic} - {video.difficulty}</p>
              </div>
              <button
                onClick={() => handleToggleFavorite(video.id, video.isFavorite)}
                className={`p-2 rounded-full ${video.isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
              >
                {video.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideotecaPrivada;
