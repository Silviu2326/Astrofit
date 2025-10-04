import React, { useEffect, useState } from 'react';
import { getTransformationStories, TransformationStory } from '../opinionesResenasApi';

const HistoriasTransformacion: React.FC = () => {
  const [stories, setStories] = useState<TransformationStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      const fetchedStories = await getTransformationStories();
      setStories(fetchedStories.filter(story => story.approved)); // Only show approved stories
      setLoading(false);
    };
    fetchStories();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando historias de transformación...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Historias de Transformación</h2>
      {stories.length === 0 ? (
        <p className="text-gray-600">No hay historias de transformación aprobadas disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-blue-50 p-4 rounded-md shadow-sm border border-blue-200">
              <h3 className="text-xl font-medium text-gray-800 mb-2">{story.clientName}</h3>
              <div className="flex justify-around items-center mb-3">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-1">Antes</p>
                  <img src={story.beforeImageUrl} alt="Antes" className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-blue-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-1">Después</p>
                  <img src={story.afterImageUrl} alt="Después" className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-blue-500" />
                </div>
              </div>
              <p className="text-gray-700 italic">"{story.story}"</p>
              <p className="text-sm text-gray-500 mt-2">Fecha: {story.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoriasTransformacion;
