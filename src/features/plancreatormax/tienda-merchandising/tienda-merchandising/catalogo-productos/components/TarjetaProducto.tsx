
import React from 'react';
import { Producto } from '../catalogoProductosApi';

interface TarjetaProductoProps {
  producto: Producto;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto }) => {
  const getStockLabel = (stock: number, estado: Producto['estado']) => {
    if (estado === 'agotado') {
      return <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Agotado</span>;
    }
    if (estado === 'preventa') {
      return <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Preventa</span>;
    }
    if (stock <= 5) {
      return <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Últimas unidades ({stock})</span>;
    }
    return <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Disponible ({stock})</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={producto.imagenes[0] || 'https://via.placeholder.com/300'} alt={producto.nombre} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{producto.descripcion}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-gray-800">€{producto.precio.toFixed(2)}</span>
          {getStockLabel(producto.stock, producto.estado)}
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default TarjetaProducto;
