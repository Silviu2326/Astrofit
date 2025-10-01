
import React, { useEffect, useState } from 'react';
import { MonthlyBudget, gastosApi } from '../gastosApi';

const PresupuestoMensual: React.FC = () => {
  const [monthlyBudgets, setMonthlyBudgets] = useState<MonthlyBudget[]>([]);

  useEffect(() => {
    const fetchMonthlyBudgets = async () => {
      const data = await gastosApi.getMonthlyBudgets();
      setMonthlyBudgets(data);
    };
    fetchMonthlyBudgets();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Presupuesto Mensual</h2>
      <ul className="space-y-2">
        {monthlyBudgets.map((budget) => (
          <li key={budget.id} className={`flex justify-between items-center p-3 rounded-md ${budget.currentSpent > budget.limit ? 'bg-red-100 text-red-800' : 'bg-gray-50'}`}>
            <span>{budget.category}: {budget.currentSpent}€ / {budget.limit}€</span>
            {budget.currentSpent > budget.limit && (
              <span className="font-bold">¡Límite Excedido!</span>
            )}
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-200">Configurar Presupuestos</button>
    </div>
  );
};

export default PresupuestoMensual;
