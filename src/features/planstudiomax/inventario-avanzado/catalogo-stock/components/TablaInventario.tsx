import React from 'react';
import { Product } from '../catalogoStockApi';

interface TablaInventarioProps {
  products: Product[];
  searchTerm: string;
}

const TablaInventario: React.FC<TablaInventarioProps> = ({ products, searchTerm }) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Producto</th>
            <th className="py-3 px-6 text-left">Categoría</th>
            <th className="py-3 px-6 text-left">Stock Actual</th>
            <th className="py-3 px-6 text-left">Estado</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
              <td className="py-3 px-6 text-left">{product.category}</td>
              <td className="py-3 px-6 text-left">{product.stock}</td>
              <td className="py-3 px-6 text-left">
                {product.stock < 10 ? (
                  <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Stock Bajo</span>
                ) : (
                  <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">En Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaInventario;
