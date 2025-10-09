
import React, { useEffect, useState } from 'react';
import TarjetaProducto from './TarjetaProducto';
import { getProductos, Producto } from '../catalogoProductosApi';

interface GridProductosProps {
  onViewDetails: (productoId: string) => void;
  onDeleteProduct: (producto: Producto) => void;
}

const GridProductos: React.FC<GridProductosProps> = ({ onViewDetails, onDeleteProduct }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar los productos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) return <div className="text-center">Cargando productos...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.isArray(productos) && productos.length > 0 ? (
        productos.map((producto) => (
          <TarjetaProducto 
            key={producto.id} 
            producto={producto} 
            onViewDetails={onViewDetails}
            onDeleteProduct={onDeleteProduct}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-8">
          No hay productos disponibles
        </div>
      )}
    </div>
  );
};

export default GridProductos;
