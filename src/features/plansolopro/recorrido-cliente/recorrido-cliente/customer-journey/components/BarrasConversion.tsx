
import React from 'react';

const BarrasConversion: React.FC = () => {
  const conversionData = [
    { from: 'Lead', to: 'Cliente nuevo', rate: 40 },
    { from: 'Cliente nuevo', to: 'Activo', rate: 70 },
    { from: 'Activo', to: 'Fiel', rate: 60 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="font-bold text-lg mb-4">Barras de Conversi??n entre Etapas</h3>
      <div className="space-y-4">
        {conversionData.map((data, index) => (
          <div key={index} className="flex items-center">
            <span className="w-40 text-sm font-medium">{data.from} ?? {data.to}:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4 ml-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${data.rate}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium">{data.rate}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarrasConversion;
