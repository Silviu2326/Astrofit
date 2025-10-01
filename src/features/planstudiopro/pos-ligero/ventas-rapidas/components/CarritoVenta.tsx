import React from 'react';
import { Producto } from '../../../types'; // Assuming types.ts is in src/

interface CarritoVentaProps {
  carrito: Producto[];
  total: number;
  onEliminarProducto: (productoId: string) => void;
}

const CarritoVenta: React.FC<CarritoVentaProps> = ({ carrito, total, onEliminarProducto }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Venta</h2>
      {carrito.length === 0 ? (
        <p className="text-gray-500">El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium">{item.nombre} x {item.cantidad}</p>
                <p className="text-gray-600">${(item.precio * (item.cantidad || 1)).toFixed(2)}</p>
              </div>
              <button
                onClick={() => onEliminarProducto(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="border-t pt-4 mt-4 flex justify-between items-center">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CarritoVenta;
