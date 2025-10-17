import React, { useEffect, useState } from 'react';
import TarjetaArticulo from './TarjetaArticulo';
import { getArticulos, Articulo } from '../blogNoticiasApi';

const FeedArticulos: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      const data = await getArticulos();
      setArticulos(data);
    };
    fetchArticulos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articulos.map((articulo) => (
        <TarjetaArticulo key={articulo.id} articulo={articulo} />
      ))}
    </div>
  );
};

export default FeedArticulos;
