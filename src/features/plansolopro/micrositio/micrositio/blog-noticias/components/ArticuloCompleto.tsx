import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticuloById, Articulo } from '../blogNoticiasApi';

const ArticuloCompleto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articulo, setArticulo] = useState<Articulo | null>(null);

  useEffect(() => {
    const fetchArticulo = async () => {
      if (id) {
        const data = await getArticuloById(id);
        setArticulo(data || null);
      }
    };
    fetchArticulo();
  }, [id]);

  if (!articulo) {
    return <div className="text-center text-gray-500">Cargando artículo o artículo no encontrado...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={articulo.imagen} alt={articulo.titulo} className="w-full h-64 object-cover mb-6 rounded-md" />
      <h1 className="text-4xl font-bold mb-4">{articulo.titulo}</h1>
      <p className="text-gray-600 text-sm mb-4">Publicado el: {articulo.fechaPublicacion} | Categoría: {articulo.categoria}</p>
      <div className="prose max-w-none">
        <p>{articulo.contenido}</p>
      </div>
    </div>
  );
};

export default ArticuloCompleto;
