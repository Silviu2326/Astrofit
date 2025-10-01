import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../../contenidos-video/contenidosVideoApi';

interface EtiquetasVideoProps {
  onSelectTag?: (tag: string | null) => void;
}

const EtiquetasVideo: React.FC<EtiquetasVideoProps> = ({ onSelectTag }) => {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTags = async () => {
      try {
        const videos = await fetchVideos();
        const tags = Array.from(new Set(videos.flatMap(video => video.tags)));
        setAllTags(tags);
      } catch (err) {
        setError('Failed to load tags.');
      } finally {
        setLoading(false);
      }
    };
    getTags();
  }, []);

  const handleTagClick = (tag: string) => {
    const newSelectedTag = tag === selectedTag ? null : tag;
    setSelectedTag(newSelectedTag);
    if (onSelectTag) {
      onSelectTag(newSelectedTag);
    }
  };

  if (loading) return <div className="text-center">Cargando etiquetas...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Buscar por Etiquetas</h2>
      <div className="flex flex-wrap gap-2">
        {allTags.length === 0 ? (
          <p>No hay etiquetas disponibles.</p>
        ) : (
          allTags.map(tag => (
            <span
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm ${selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-indigo-500 hover:text-white transition-colors`}
            >
              {tag}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default EtiquetasVideo;
