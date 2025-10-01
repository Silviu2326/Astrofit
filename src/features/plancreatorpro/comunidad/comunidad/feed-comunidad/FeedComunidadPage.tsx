import React, { useState } from 'react';
import CrearPost from './components/CrearPost';
import TimelinePosts from './components/TimelinePosts';
import PostsFijados from './components/PostsFijados';

const FeedComunidadPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all'); // 'all', 'text', 'image', 'video', 'poll'

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Feed de la Comunidad</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna izquierda para posts fijados y filtros */}
        <div className="md:col-span-1">
          <PostsFijados />
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="font-semibold text-lg mb-3">Filtros de Contenido</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos los Posts</option>
              <option value="text">Texto</option>
              <option value="image">Imágenes</option>
              <option value="video">Videos</option>
              <option value="poll">Encuestas</option>
            </select>
          </div>
        </div>

        {/* Columna central para crear post y timeline */}
        <div className="md:col-span-2">
          <CrearPost />
          <TimelinePosts filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default FeedComunidadPage;
