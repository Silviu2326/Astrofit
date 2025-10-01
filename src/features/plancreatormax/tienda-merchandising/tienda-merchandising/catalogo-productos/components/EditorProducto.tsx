
import React, { useState, useEffect } from 'react';
import { Producto, createProducto, updateProducto } from '../catalogoProductosApi';
import VariantesProducto from './VariantesProducto';

interface EditorProductoProps {
  producto: Producto | null;
  onSave: (producto: Producto) => void;
  onClose: () => void;
}

const EditorProducto: React.FC<EditorProductoProps> = ({ producto, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Producto, 'id'>>({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagenes: [],
    stock: 0,
    estado: 'disponible',
    variantes: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagenes: producto.imagenes,
        stock: producto.stock,
        estado: producto.estado,
        variantes: producto.variantes,
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: 0,
        imagenes: [],
        stock: 0,
        estado: 'disponible',
        variantes: [],
      });
    }
  }, [producto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...filesArray]);
      // In a real application, you would upload these files to a server
      // and get back URLs to store in formData.imagenes
      const newImageUrls = filesArray.map(file => URL.createObjectURL(file)); // Placeholder URLs
      setFormData((prev) => ({ ...prev, imagenes: [...prev.imagenes, ...newImageUrls] }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (updatedVariantes: Producto['variantes']) => {
    setFormData((prev) => ({ ...prev, variantes: updatedVariantes }));
    // Recalculate total stock based on variants
    const totalStock = updatedVariantes.reduce((sum, variant) => sum + variant.stock, 0);
    setFormData((prev) => ({ ...prev, stock: totalStock }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (producto) {
        await updateProducto(producto.id, formData);
        onSave({ ...formData, id: producto.id });
      } else {
        const newProduct = await createProducto(formData);
        onSave(newProduct);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{producto ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estado" className="block text-gray-700 text-sm font-bold mb-2">Estado:</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="disponible">Disponible</option>
              <option value="agotado">Agotado</option>
              <option value="preventa">Preventa</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Imágenes:</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {formData.imagenes.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Product image ${index + 1}`} className="w-full h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <VariantesProducto
            variantes={formData.variantes}
            onVariantesChange={handleVariantChange}
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditorProducto;
