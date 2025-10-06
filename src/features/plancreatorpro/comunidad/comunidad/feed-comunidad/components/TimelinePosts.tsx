import React, { useEffect, useState } from 'react';
import { Post } from '../../feed-comunidad/types';
import { feedComunidadApi } from '../../feed-comunidad/feedComunidadApi';
import PostCard from './PostCard';

interface TimelinePostsProps {
  filter: string;
}

const TimelinePosts: React.FC<TimelinePostsProps> = ({ filter }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPosts = await feedComunidadApi.getPosts(filter);
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Error al cargar los posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filter]);

  if (loading) {
    return <div className="text-center py-8">Cargando posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 mt-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No hay posts disponibles para este filtro.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default TimelinePosts;
