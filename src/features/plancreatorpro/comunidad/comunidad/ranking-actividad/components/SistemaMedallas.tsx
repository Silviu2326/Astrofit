import React from 'react';

interface Medal {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface SistemaMedallasProps {
  medals: Medal[];
}

const SistemaMedallas: React.FC<SistemaMedallasProps> = ({ medals }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sistema de Medallas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medals.map((medal) => (
          <div key={medal.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
            <span className="text-4xl">{medal.icon}</span>
            <div>
              <h3 className="text-xl font-medium">{medal.name}</h3>
              <p className="text-gray-600 text-sm">{medal.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SistemaMedallas;
