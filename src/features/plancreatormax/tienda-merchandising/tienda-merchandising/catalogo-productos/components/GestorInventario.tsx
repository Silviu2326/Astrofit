
import React, { useState, useEffect } from 'react';
import { getProductos, updateProducto, Producto } from '../catalogoProductosApi';
import EditorProducto from './EditorProducto';

const GestorInventario: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (producto: Producto) => {
    setSelectedProducto(producto);
    setIsEditorOpen(true);
  };

  const handleSave = async (updatedProducto: Producto) => {
    try {
      await updateProducto(updatedProducto.id, updatedProducto);
      fetchProductos(); // Refresh the list
      setIsEditorOpen(false);
      setSelectedProducto(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedProducto(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Inventario</h2>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4"
        onClick={() => {
          setSelectedProducto(null); // For creating a new product
          setIsEditorOpen(true);
        }}
      >
        Añadir Nuevo Producto
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="px-6 py-4 whitespace-nowrap">{producto.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{producto.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">€{producto.precio.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    producto.estado === 'disponible' ? 'bg-green-100 text-green-800' :
                    producto.estado === 'agotado' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {producto.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => handleEdit(producto)}
                  >
                    Editar
                  </button>
                  {/* Add delete functionality if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditorOpen && (
        <EditorProducto
          producto={selectedProducto}
          onSave={handleSave}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default GestorInventario;
