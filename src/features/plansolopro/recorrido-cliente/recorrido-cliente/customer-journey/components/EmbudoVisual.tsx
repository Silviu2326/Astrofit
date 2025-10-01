
import React from 'react';

const EmbudoVisual: React.FC = () => {
  const stages = ['Lead', 'Cliente nuevo', 'Activo', 'Fiel'];
  const stageColors = {
    'Lead': 'bg-blue-200',
    'Cliente nuevo': 'bg-green-200',
    'Activo': 'bg-yellow-200',
    'Fiel': 'bg-purple-200',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Embudo Visual del Cliente</h3>
      <div className="flex flex-col items-center space-y-4">
        {stages.map((stage, index) => (
          <div key={stage} className={`w-full p-4 rounded-lg text-center ${stageColors[stage as keyof typeof stageColors]}`}>
            <p className="font-semibold">{stage}</p>
            {/* Placeholder for customer count or other metrics */}
            <p className="text-sm text-gray-600">({index * 10 + 20} clientes)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmbudoVisual;
