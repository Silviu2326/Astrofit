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

const GaleriaVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag); // Toggle tag selection
  };

  if (loading) return <div className="text-center">Cargando galer??a de videos...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const allTags = Array.from(new Set(videos.flatMap(video => video.tags)));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Galer??a de Videos</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar videos por t??tulo, descripci??n o etiqueta..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {allTags.map(tag => (
          <span
            key={tag}
            onClick={() => handleTagClick(tag)}
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
          <button onClick={() => setSelectedVideo(null)} className="mt-2 text-blue-500 hover:underline">Volver a la galer??a</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.length === 0 ? (
          <p className="col-span-full text-center">No se encontraron videos.</p>
        ) : (
          filteredVideos.map((video) => (
            <div key={video.id} className="border rounded-lg overflow-hidden shadow-sm">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              />
              <div className="p-3">
                <h3 className="font-medium text-lg truncate cursor-pointer" onClick={() => setSelectedVideo(video)}>{video.title}</h3>
                <p className="text-sm text-gray-500">{video.topic} - {video.difficulty}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {video.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{tag}</span>
                  ))}
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
