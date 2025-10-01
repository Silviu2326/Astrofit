import React, { useState } from 'react';
import { mockRMCalculations } from '../calculadorasFuerzaApi';

const RMCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [reps, setReps] = useState<number | ''>(5);
  const [estimated1RM, setEstimated1RM] = useState<number | null>(null);
  const [formula, setFormula] = useState<string>('Epley');

  const calculate1RM = () => {
    if (weight && reps) {
      let rm = 0;
      switch (formula) {
        case 'Epley':
          rm = weight * (1 + reps / 30);
          break;
        case 'Brzycki':
          rm = weight / (1.0278 - 0.0278 * reps);
          break;
        case 'Lombardi':
          rm = weight * reps ** 0.10; // Simplified for example
          break;
        default:
          rm = weight * (1 + reps / 30); // Default to Epley
      }
      setEstimated1RM(parseFloat(rm.toFixed(2)));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 100"
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-700">Repeticiones</label>
          <input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 5"
          />
        </div>
        <div>
          <label htmlFor="formula" className="block text-sm font-medium text-gray-700">Fórmula</label>
          <select
            id="formula"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Epley">Epley</option>
            <option value="Brzycki">Brzycki</option>
            <option value="Lombardi">Lombardi</option>
          </select>
        </div>
      </div>
      <button
        onClick={calculate1RM}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Calcular 1RM
      </button>

      {estimated1RM !== null && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800">
          <p className="font-semibold">1RM Estimado: <span className="text-xl">{estimated1RM} kg</span></p>
          <p className="text-sm">Fórmula utilizada: {formula}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Historial de Cálculos (Mock)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peso (kg)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reps
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                1RM Est. (kg)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fórmula
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockRMCalculations.map((calc) => (
              <tr key={calc.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.reps}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.estimated1RM}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.formula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RMCalculator;
