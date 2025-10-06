
import React from 'react';

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DailyMeals {
  day: string;
  meals: Meal[];
}

interface CalendarioSemanalProps {
  weeklyMeals: DailyMeals[];
}

const CalendarioSemanal: React.FC<CalendarioSemanalProps> = ({ weeklyMeals }) => {
  const calculateDailyTotals = (meals: Meal[]) => {
    return meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const calculateWeeklyTotals = () => {
    return weeklyMeals.reduce((acc, daily) => {
      const dailyTotals = calculateDailyTotals(daily.meals);
      return {
        calories: acc.calories + dailyTotals.calories,
        protein: acc.protein + dailyTotals.protein,
        carbs: acc.carbs + dailyTotals.carbs,
        fat: acc.fat + dailyTotals.fat,
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const weeklyTotals = calculateWeeklyTotals();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Calendario Semanal de Comidas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Día</th>
              <th className="py-3 px-6 text-left">Comidas</th>
              <th className="py-3 px-6 text-left">Calorías</th>
              <th className="py-3 px-6 text-left">Proteínas (g)</th>
              <th className="py-3 px-6 text-left">Carbohidratos (g)</th>
              <th className="py-3 px-6 text-left">Grasas (g)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {weeklyMeals.map((daily, index) => {
              const dailyTotals = calculateDailyTotals(daily.meals);
              return (
                <React.Fragment key={daily.day}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{daily.day}</td>
                    <td className="py-3 px-6 text-left">
                      <ul className="list-disc list-inside">
                        {daily.meals.map(meal => (
                          <li key={meal.id} className="py-1">{meal.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-6 text-left">{dailyTotals.calories}</td>
                    <td className="py-3 px-6 text-left">{dailyTotals.protein}</td>
                    <td className="py-3 px-6 text-left">{dailyTotals.carbs}</td>
                    <td className="py-3 px-6 text-left">{dailyTotals.fat}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-6 text-left font-semibold" colSpan={2}>Totales del Día</td>
                    <td className="py-2 px-6 text-left font-semibold">{dailyTotals.calories}</td>
                    <td className="py-2 px-6 text-left font-semibold">{dailyTotals.protein}</td>
                    <td className="py-2 px-6 text-left font-semibold">{dailyTotals.carbs}</td>
                    <td className="py-2 px-6 text-left font-semibold">{dailyTotals.fat}</td>
                  </tr>
                </React.Fragment>
              );
            })}
            <tr className="bg-gray-300 text-gray-800 font-bold text-base">
              <td className="py-3 px-6 text-left" colSpan={2}>Totales Semanales</td>
              <td className="py-3 px-6 text-left">{weeklyTotals.calories}</td>
              <td className="py-3 px-6 text-left">{weeklyTotals.protein}</td>
              <td className="py-3 px-6 text-left">{weeklyTotals.carbs}</td>
              <td className="py-3 px-6 text-left">{weeklyTotals.fat}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarioSemanal;
