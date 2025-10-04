
import React, { useEffect, useState } from 'react';
import { FixedExpense, gastosApi } from '../gastosApi';

const GastosFijos: React.FC = () => {
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);

  useEffect(() => {
    const fetchFixedExpenses = async () => {
      const data = await gastosApi.getFixedExpenses();
      setFixedExpenses(data);
    };
    fetchFixedExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Gastos Fijos</h2>
      <ul className="space-y-2">
        {fixedExpenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <span>{expense.name} ({expense.category})</span>
            <span className="font-medium">{expense.amount} €</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Añadir Gasto Fijo</button>
    </div>
  );
};

export default GastosFijos;
