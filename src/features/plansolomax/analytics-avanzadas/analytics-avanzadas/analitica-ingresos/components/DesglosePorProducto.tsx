import React from 'react';

const DesglosePorProducto: React.FC = () => {
  // Placeholder data
  const productData = [
    { name: 'Plan Básico', revenue: 50000, percentage: '40%' },
    { name: 'Plan Premium', revenue: 30000, percentage: '25%' },
    { name: 'Consultoría', revenue: 25000, percentage: '20%' },
    { name: 'Talleres', revenue: 15000, percentage: '15%' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Desglose de Ingresos por Producto/Servicio</h2>
      <ul className="space-y-2">
        {productData.map((product, index) => (
          <li key={index} className="flex justify-between text-gray-600">
            <span>{product.name}</span>
            <span>${product.revenue.toLocaleString()} ({product.percentage})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesglosePorProducto;
