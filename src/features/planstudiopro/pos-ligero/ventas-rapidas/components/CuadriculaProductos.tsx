import React, { useEffect, useState } from 'react';
import { fetchProductos } from '../ventasRapidasApi';
import { Producto } from '../../../types'; // Assuming types.ts is in src/

interface CuadriculaProductosProps {
  onProductoClick: (producto: Producto) => void;
}

const CuadriculaProductos: React.FC<CuadriculaProductosProps> = ({ onProductoClick }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetchProductos().then(setProductos);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition duration-200"
          onClick={() => onProductoClick(producto)}
        >
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-32 object-cover mb-2 rounded" />
          <h3 className="font-semibold text-lg">{producto.nombre}</h3>
          <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default CuadriculaProductos;
