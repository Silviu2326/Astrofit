import React, { useEffect, useState } from 'react';
import TarjetaArticulo from './TarjetaArticulo';
import { getArticulos, Articulo } from '../blogNoticiasApi';

interface FeedArticulosProps {
  categoria: string;
  searchTerm: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

const FeedArticulos: React.FC<FeedArticulosProps> = ({ categoria, searchTerm, onCategoryChange, onSearchChange }) => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getArticulos(categoria, searchTerm, 1, 10);
        setArticulos(response.data);
        setTotal(response.total);
        setPage(1);
        setHasMore(response.data.length < response.total);
      } catch (err) {
        setError('Error al cargar artículos');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticulos();
  }, [categoria, searchTerm]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const response = await getArticulos(categoria, searchTerm, nextPage, 10);
      setArticulos(prev => [...prev, ...response.data]);
      setPage(nextPage);
      setHasMore(response.data.length === 10 && (page + 1) * 10 < response.total);
    } catch (err) {
      console.error('Error loading more articles:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const resetPagination = () => {
    setPage(1);
    setArticulos([]);
    setHasMore(true);
  };

  if (loading) {
    return <div className='text-center p-4'>Cargando artículos...</div>;
  }

  if (error) {
    return <div className='text-red-500 text-center p-4'>Error: {error}</div>;
  }

  if (articulos.length === 0) {
    return <div className='text-gray-500 text-center p-4'>No hay artículos disponibles</div>;
  }

  return (
    <div>
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Mostrando {articulos.length} de {total} artículos
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articulos.map((articulo) => (
          <TarjetaArticulo key={articulo.id} articulo={articulo} />
        ))}
      </div>
      
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-md transition-colors"
          >
            {loadingMore ? 'Cargando más...' : 'Cargar más'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedArticulos;
