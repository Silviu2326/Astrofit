
import React, { useEffect, useState } from 'react';
import { VariableExpense, gastosApi } from '../gastosApi';

const GastosVariables: React.FC = () => {
  const [variableExpenses, setVariableExpenses] = useState<VariableExpense[]>([]);

  useEffect(() => {
    const fetchVariableExpenses = async () => {
      const data = await gastosApi.getVariableExpenses();
      setVariableExpenses(data);
    };
    fetchVariableExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Gastos Variables</h2>
      <ul className="space-y-2">
        {variableExpenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <span>{expense.name} ({expense.category})</span>
            <span className="font-medium">{expense.amount} €</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">Añadir Gasto Variable</button>
    </div>
  );
};

export default GastosVariables;
