import React from 'react';
import { useGetArticlesQuery } from '../contenidosArticulosApi';
import LectorArticulo from './LectorArticulo';

const ListadoArticulos: React.FC = () => {
  const { data: articles, error, isLoading } = useGetArticlesQuery();

  if (isLoading) return <div>Cargando artículos...</div>;
  if (error) return <div>Error al cargar artículos: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles?.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.imageUrl && (
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-4">
              Categorías: {article.categories.join(', ')} | Etiquetas: {article.tags.join(', ')}
            </p>
            <LectorArticulo article={article} /> {/* Display a preview or link to full article */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListadoArticulos;
