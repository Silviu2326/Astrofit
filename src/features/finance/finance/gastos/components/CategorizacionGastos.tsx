
import React, { useEffect, useState } from 'react';
import { ExpenseCategory, gastosApi } from '../gastosApi';

const CategorizacionGastos: React.FC = () => {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await gastosApi.getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Categorización de Gastos</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="bg-gray-50 p-3 rounded-md">
            {category.name} ({category.type === 'fixed' ? 'Fijo' : 'Variable'})
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-200">Gestionar Categorías</button>
    </div>
  );
};

export default CategorizacionGastos;
