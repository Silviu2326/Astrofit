import React, { useState } from 'react';

interface PercentageRow {
  percentage: number;
  repsStrength: string;
  repsHypertrophy: string;
  repsEndurance: string;
}

const percentageTable: PercentageRow[] = [
  { percentage: 100, repsStrength: '1', repsHypertrophy: '-', repsEndurance: '-' },
  { percentage: 95, repsStrength: '2-3', repsHypertrophy: '-', repsEndurance: '-' },
  { percentage: 90, repsStrength: '3-4', repsHypertrophy: '-', repsEndurance: '-' },
  { percentage: 85, repsStrength: '4-6', repsHypertrophy: '4-6', repsEndurance: '-' },
  { percentage: 80, repsStrength: '6-8', repsHypertrophy: '6-8', repsEndurance: '-' },
  { percentage: 75, repsStrength: '8-10', repsHypertrophy: '8-10', repsEndurance: '-' },
  { percentage: 70, repsStrength: '10-12', repsHypertrophy: '10-12', repsEndurance: '10-12' },
  { percentage: 65, repsStrength: '12-15', repsHypertrophy: '12-15', repsEndurance: '12-15' },
  { percentage: 60, repsStrength: '15+', repsHypertrophy: '15+', repsEndurance: '15+' },
];

const PorcentajesCalculator: React.FC = () => {
  const [oneRM, setOneRM] = useState<number | ''>('');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
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

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Tabla de Porcentajes y Rangos de Repeticiones</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % de 1RM
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Carga (kg)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reps Fuerza
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reps Hipertrofia
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reps Resistencia
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {percentageTable.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.percentage}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {oneRM ? (oneRM * (row.percentage / 100)).toFixed(1) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.repsStrength}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.repsHypertrophy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.repsEndurance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PorcentajesCalculator;
