import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../../contenidos-video/contenidosVideoApi';
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

interface GaleriaVideosProps {
  selectedTag?: string | null;
}

const GaleriaVideos: React.FC<GaleriaVideosProps> = ({ selectedTag }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  useEffect(() => {
    let currentVideos = videos;

    if (selectedTag) {
      currentVideos = currentVideos.filter(video => video.tags.includes(selectedTag));
    }

    if (searchTerm) {
      currentVideos = currentVideos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredVideos(currentVideos);
  }, [searchTerm, selectedTag, videos]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  if (loading) return <div className="text-center">Cargando galería de videos...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  // Verificar que videos sea un array antes de usar flatMap
  const allTags = Array.from(new Set(Array.isArray(videos) ? videos.flatMap(video => video.tags) : []));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Galería de Videos</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar videos por título, descripción o etiqueta..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {allTags.map(tag => (
          <span
            key={tag}
            className={`cursor-pointer px-3 py-1 rounded-full text-sm ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white`}
          >
            {tag}
          </span>
        ))}
      </div>

      {selectedVideo && (
        <div className="mb-6">
          <ReproductorIntegrado videoUrl={selectedVideo.url} title={selectedVideo.title} />
          <h3 className="text-xl font-bold mt-4">{selectedVideo.title}</h3>
          <p className="text-gray-600">{selectedVideo.description}</p>
          <button onClick={() => setSelectedVideo(null)} className="mt-2 text-blue-500 hover:underline">Volver a la galería</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No se encontraron videos.</p>
            <p className="text-gray-400 text-sm mt-2">Intenta ajustar los filtros o términos de búsqueda.</p>
          </div>
        ) : (
          filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100" onClick={() => handleVideoClick(video)}>
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="300" height="200" fill="#f3f4f6"/>
                        <rect x="50" y="50" width="200" height="100" fill="#e5e7eb" rx="8"/>
                        <circle cx="100" cy="100" r="20" fill="#d1d5db"/>
                        <polygon points="90,90 90,110 130,100" fill="#9ca3af"/>
                        <text x="150" y="105" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">Video</text>
                      </svg>
                    `)}`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8 text-gray-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                {video.isFavorite && (
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                    {video.topic}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    video.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    video.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {video.difficulty === 'easy' ? 'Fácil' : video.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {video.tags.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{video.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GaleriaVideos;
