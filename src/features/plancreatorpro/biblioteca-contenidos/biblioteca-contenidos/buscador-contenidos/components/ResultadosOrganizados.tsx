import React from 'react';
import { FileText } from 'lucide-react';

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
  isLoading?: boolean;
  hasSearched?: boolean;
}

const ResultadosOrganizados: React.FC<ResultadosOrganizadosProps> = ({ results = [], isLoading = false, hasSearched = false }) => {
  const categorizedResults = results.reduce((acc, result) => {
    (acc[result.category] = acc[result.category] || []).push(result);
    return acc;
  }, {} as Record<string, Resultado[]>);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resultados de Búsqueda</h2>
            <p className="text-sm text-gray-600">
              {hasSearched ? `${results.length} resultados encontrados` : 'Todos los contenidos disponibles'}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="text-gray-600 font-medium">Buscando contenido...</span>
          </div>
        </div>
      ) : Object.keys(categorizedResults).length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
            <FileText className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {hasSearched 
              ? "Intenta ajustar tu búsqueda o filtros para encontrar el contenido que buscas."
              : "No hay contenido disponible en este momento."
            }
          </p>
        </div>
      ) : (
        Object.entries(categorizedResults).map(([category, items]) => (
          <div key={category} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{category.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{category}</h3>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {items.length} {items.length === 1 ? 'resultado' : 'resultados'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-blue-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">
                        {item.type === 'Video' ? '🎥' : item.type === 'Artículo' ? '📄' : item.type === 'Ebook' ? '📚' : '📋'}
                      </span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {item.title}
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Duración: <span className="font-medium text-gray-900">{item.duration}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Tema: <span className="font-medium text-gray-900">{item.topic}</span></span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm">
                    Ver Contenido
                  </button>
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
