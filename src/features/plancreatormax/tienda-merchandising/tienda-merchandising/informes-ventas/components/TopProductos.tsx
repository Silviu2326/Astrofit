import React from 'react';

const TopProductos: React.FC = () => {
  // Placeholder for top selling products data
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Productos Vendidos</h2>
      <p className="text-gray-600">Ranking de productos más vendidos.</p>
      {/* List of top products will go here */}
      <ul className="list-disc list-inside mt-4 text-gray-600">
        <li>Producto A (1200 unidades)</li>
        <li>Producto B (950 unidades)</li>
        <li>Producto C (800 unidades)</li>
      </ul>
    </div>
  );
};

export default TopProductos;
