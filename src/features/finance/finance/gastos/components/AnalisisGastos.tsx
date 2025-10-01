
import React, { useEffect, useState } from 'react';
import { FixedExpense, VariableExpense, gastosApi } from '../gastosApi';

interface CategorySummary {
  category: string;
  totalAmount: number;
}

const AnalisisGastos: React.FC = () => {
  const [categorySummaries, setCategorySummaries] = useState<CategorySummary[]>([]);

  useEffect(() => {
    const fetchAndAnalyzeExpenses = async () => {
      const fixed = await gastosApi.getFixedExpenses();
      const variable = await gastosApi.getVariableExpenses();

      const allExpenses = [...fixed, ...variable];

      const summaryMap = new Map<string, number>();
      allExpenses.forEach(expense => {
        const currentTotal = summaryMap.get(expense.category) || 0;
        summaryMap.set(expense.category, currentTotal + expense.amount);
      });

      const summaries: CategorySummary[] = Array.from(summaryMap.entries()).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
      setCategorySummaries(summaries);
    };
    fetchAndAnalyzeExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Análisis de Gastos</h2>
      <ul className="space-y-2">
        {categorySummaries.map((summary) => (
          <li key={summary.category} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <span>{summary.category}</span>
            <span className="font-medium">{summary.totalAmount} €</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200">Ver Informe Detallado</button>
    </div>
  );
};

export default AnalisisGastos;
