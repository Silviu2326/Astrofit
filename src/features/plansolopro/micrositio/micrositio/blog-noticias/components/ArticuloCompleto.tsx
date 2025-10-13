import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticuloById, Articulo } from '../blogNoticiasApi';

const ArticuloCompleto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articulo, setArticulo] = useState<Articulo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticulo = async () => {
      if (id) {
        try {
          setLoading(true);
          setError(null);
          const response = await getArticuloById(id);
          setArticulo(response.data || null);
        } catch (err) {
          setError('Error al cargar el artículo');
          console.error('Error fetching article:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchArticulo();
  }, [id]);

  if (loading) {
    return <div className='text-center p-4'>Cargando artículo...</div>;
  }

  if (error) {
    return <div className='text-red-500 text-center p-4'>Error: {error}</div>;
  }

  if (!articulo) {
    return <div className='text-gray-500 text-center p-4'>Artículo no encontrado</div>;
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
