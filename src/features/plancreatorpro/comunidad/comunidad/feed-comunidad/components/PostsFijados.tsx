import React, { useEffect, useState } from 'react';
import { Post } from '../../feed-comunidad/types';
import { feedComunidadApi } from '../../feed-comunidad/feedComunidadApi';

const PostsFijados: React.FC = () => {
  const [pinnedPosts, setPinnedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinnedPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPosts = await feedComunidadApi.getFixedPosts();
        setPinnedPosts(fetchedPosts);
      } catch (err) {
        setError('Error al cargar los posts fijados.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedPosts();
  }, []);

  if (loading) {
    return <div className="bg-white p-4 rounded-lg shadow-md">Cargando posts fijados...</div>;
  }

  if (error) {
    return <div className="bg-white p-4 rounded-lg shadow-md text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts Fijados</h2>
      {pinnedPosts.length === 0 ? (
        <p className="text-gray-500">No hay posts fijados.</p>
      ) : (
        <div className="space-y-4">
          {pinnedPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-3 last:border-b-0">
              <div className="flex items-center mb-2">
                <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full mr-2" />
                <p className="font-semibold text-gray-700 text-sm">{post.author.name}</p>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>
              <p className="text-xs text-gray-400 mt-1">{post.timestamp.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsFijados;
