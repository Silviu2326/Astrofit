import React from 'react';

interface LectorArticuloProps {
  article: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    attachments?: { name: string; url: string }[];
    categories: string[];
    tags: string[];
    comments: any[];
    author: string;
    publishedAt: string;
    readTime: number;
    views: number;
  };
}

const LectorArticulo: React.FC<LectorArticuloProps> = ({ article }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover mb-4 rounded-md" />
      )}
      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: article.content }} />

      {article.attachments && article.attachments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Documentos Adjuntos</h3>
          <ul>
            {article.attachments.map((attachment, index) => (
              <li key={index}>
                <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {attachment.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <p className="text-gray-600 text-sm">Categorías: {article.categories.join(', ')}</p>
        <p className="text-gray-600 text-sm">Etiquetas: {article.tags.join(', ')}</p>
      </div>

      {/* Comments section would go here */}
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold mb-2">Comentarios</h3>
        {article.comments && article.comments.length > 0 ? (
          <ul>
            {article.comments.map((comment) => (
              <li key={comment.id} className="mb-2 p-2 bg-gray-100 rounded-md">
                <p className="font-semibold">{comment.memberName} <span className="text-gray-500 text-sm">({new Date(comment.createdAt).toLocaleDateString()})</span></p>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
        )}
        {/* Add comment form */}
      </div>
    </div>
  );
};

export default LectorArticulo;
