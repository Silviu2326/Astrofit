
import React from 'react';
import { CohorteData } from '../cohortesClientesApi';

interface TablaCohortesProps {
  data: CohorteData[];
}

const TablaCohortes: React.FC<TablaCohortesProps> = ({ data }) => {
  const periods = Array.from({ length: data[0]?.retention.length || 0 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Cohorte</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Tamaño</th>
            {periods.map((period) => (
              <th key={period} className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Mes {period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((cohorte) => (
            <tr key={cohorte.name} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-sm text-gray-700 font-medium">{cohorte.name}</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">{cohorte.size}</td>
              {cohorte.retention.map((retencion, index) => (
                <td key={index} className="py-2 px-4 border-b text-sm text-gray-700">{retencion}%</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCohortes;
