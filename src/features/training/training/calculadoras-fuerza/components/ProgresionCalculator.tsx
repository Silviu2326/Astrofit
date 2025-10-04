import React, { useState } from 'react';
import { mockProgressionPlans } from '../calculadorasFuerzaApi';

interface ProgressionStep {
  week: number;
  percentage: number;
  sets: number;
  reps: number;
  weight: number;
}

const ProgresionCalculator: React.FC = () => {
  const [oneRM, setOneRM] = useState<number | ''>('');
  const [startPercentage, setStartPercentage] = useState<number | ''>('60');
  const [increment, setIncrement] = useState<number | ''>('2.5');
  const [weeks, setWeeks] = useState<number | ''>('4');
  const [progressionPlan, setProgressionPlan] = useState<ProgressionStep[]>([]);

  const generateProgression = () => {
    if (oneRM && startPercentage && increment && weeks) {
      const plan: ProgressionStep[] = [];
      for (let i = 0; i < weeks; i++) {
        const currentPercentage = startPercentage + (i * increment);
        const currentWeight = (oneRM * (currentPercentage / 100));
        plan.push({
          week: i + 1,
          percentage: parseFloat(currentPercentage.toFixed(1)),
          sets: 3, // Default sets
          reps: 5, // Default reps
          weight: parseFloat(currentWeight.toFixed(1)),
        });
      }
      setProgressionPlan(plan);
    } else {
      setProgressionPlan([]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="oneRM" className="block text-sm font-medium text-gray-700">Tu 1RM (kg)</label>
          <input
            type="number"
            id="oneRM"
            value={oneRM}
            onChange={(e) => setOneRM(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 120"
          />
        </div>
        <div>
          <label htmlFor="startPercentage" className="block text-sm font-medium text-gray-700">Inicio % de 1RM</label>
          <input
            type="number"
            id="startPercentage"
            value={startPercentage}
            onChange={(e) => setStartPercentage(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 60"
          />
        </div>
        <div>
          <label htmlFor="increment" className="block text-sm font-medium text-gray-700">Incremento Semanal (%)</label>
          <input
            type="number"
            id="increment"
            value={increment}
            onChange={(e) => setIncrement(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 2.5"
          />
        </div>
        <div>
          <label htmlFor="weeks" className="block text-sm font-medium text-gray-700">Número de Semanas</label>
          <input
            type="number"
            id="weeks"
            value={weeks}
            onChange={(e) => setWeeks(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 4"
          />
        </div>
      </div>
      <button
        onClick={generateProgression}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Generar Progresión
      </button>

      {progressionPlan.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Plan de Progresión Generado</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semana
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % de 1RM
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carga (kg)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Series
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Repeticiones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {progressionPlan.map((step) => (
                  <tr key={step.week}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{step.week}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{step.percentage}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{step.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{step.sets}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{step.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Planes de Progresión Guardados (Mock)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semana
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Series
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reps
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                %
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peso (kg)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockProgressionPlans.map((plan) => (
              <tr key={plan.week}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.week}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.sets}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.reps}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.percentage}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgresionCalculator;
