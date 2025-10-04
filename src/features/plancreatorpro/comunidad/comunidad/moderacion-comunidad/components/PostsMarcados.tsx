import React from 'react';

const PostsMarcados: React.FC = () => {
  // Simulación de posts marcados
  const markedPosts = [
    { id: 'p1', author: 'UsuarioC', content: 'Este post fue marcado por spam.', status: 'inapropiado' },
    { id: 'p2', author: 'UsuarioD', content: 'Contenido ofensivo detectado.', status: 'inapropiado' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Posts Marcados como Inapropiados</h2>
      <ul>
        {markedPosts.map(post => (
          <li key={post.id} className="border-b py-2">
            <p><strong>Autor:</strong> {post.author}</p>
            <p><strong>Contenido:</strong> {post.content}</p>
            <p><strong>Estado:</strong> {post.status}</p>
            {/* Botones de acción para moderar el post */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsMarcados;
