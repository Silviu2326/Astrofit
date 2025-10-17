
import React from 'react';
import { Producto } from '../catalogoProductosApi';
import { PlaceholderImages } from '../../../../../../utils/placeholderImages';
import { Eye, Trash2 } from 'lucide-react';

interface TarjetaProductoProps {
  producto: Producto;
  onViewDetails: (productoId: string) => void;
  onDeleteProduct: (producto: Producto) => void;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto, onViewDetails, onDeleteProduct }) => {
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
      <img src={producto.imagenes[0] || PlaceholderImages.generic(300, 300)} alt={producto.nombre} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{producto.descripcion}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-gray-800">€{producto.precio.toFixed(2)}</span>
          {getStockLabel(producto.stock, producto.estado)}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onViewDetails(producto.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <Eye className="w-4 h-4" />
            Ver Detalles
          </button>
          <button 
            onClick={() => onDeleteProduct(producto)}
            className="p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            title="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;
