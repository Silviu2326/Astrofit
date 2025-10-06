import React from 'react';

interface Resultado {
  id: number;
  title: string;
  type: string;
  duration: string;
  topic: string;
  category: string;
}

interface ResultadosOrganizadosProps {
  results?: Resultado[];
}

const ResultadosOrganizados: React.FC<ResultadosOrganizadosProps> = ({ results = [] }) => {
  const categorizedResults = results.reduce((acc, result) => {
    (acc[result.category] = acc[result.category] || []).push(result);
    return acc;
  }, {} as Record<string, Resultado[]>);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Resultados Organizados</h2>
      {Object.keys(categorizedResults).length === 0 ? (
        <p className="text-gray-600">No se encontraron resultados. Intenta ajustar tu búsqueda o filtros.</p>
      ) : (
        Object.entries(categorizedResults).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-bold text-blue-700 mb-3 border-b pb-2">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h4 className="text-md font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">Tipo: <span className="font-medium">{item.type}</span></p>
                  <p className="text-sm text-gray-600">Duración: <span className="font-medium">{item.duration}</span></p>
                  <p className="text-sm text-gray-600">Tema: <span className="font-medium">{item.topic}</span></p>
                  {/* Add more details or a link to the content */}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ResultadosOrganizados;
