
import React from 'react';
import { Producto } from '../catalogoProductosApi';

interface VariantesProductoProps {
  variantes: Producto['variantes'];
  onVariantesChange: (variantes: Producto['variantes']) => void;
}

const VariantesProducto: React.FC<VariantesProductoProps> = ({ variantes, onVariantesChange }) => {
  const handleAddVariant = () => {
    onVariantesChange([...variantes, { talla: '', color: '', stock: 0 }]);
  };

  const handleRemoveVariant = (index: number) => {
    onVariantesChange(variantes.filter((_, i) => i !== index));
  };

  const handleChangeVariant = (index: number, field: keyof Producto['variantes'][0], value: string | number) => {
    const newVariantes = [...variantes];
    // Ensure stock is a number
    if (field === 'stock') {
      newVariantes[index] = { ...newVariantes[index], [field]: Number(value) };
    } else {
      newVariantes[index] = { ...newVariantes[index], [field]: value };
    }
    onVariantesChange(newVariantes);
  };

  return (
    <div className="mb-6 p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">Variantes del Producto</h3>
      {variantes.map((variant, index) => (
        <div key={index} className="flex items-center space-x-3 mb-3">
          <input
            type="text"
            placeholder="Talla (ej: S, M, L)"
            value={variant.talla || ''}
            onChange={(e) => handleChangeVariant(index, 'talla', e.target.value)}
            className="shadow-sm border rounded py-2 px-3 text-gray-700 w-1/3"
          />
          <input
            type="text"
            placeholder="Color (ej: Rojo, Azul)"
            value={variant.color || ''}
            onChange={(e) => handleChangeVariant(index, 'color', e.target.value)}
            className="shadow-sm border rounded py-2 px-3 text-gray-700 w-1/3"
          />
          <input
            type="number"
            placeholder="Stock"
            value={variant.stock}
            onChange={(e) => handleChangeVariant(index, 'stock', e.target.value)}
            className="shadow-sm border rounded py-2 px-3 text-gray-700 w-1/6"
            min="0"
          />
          <button
            type="button"
            onClick={() => handleRemoveVariant(index)}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-sm"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddVariant}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm mt-3"
      >
        Añadir Variante
      </button>
    </div>
  );
};

export default VariantesProducto;
