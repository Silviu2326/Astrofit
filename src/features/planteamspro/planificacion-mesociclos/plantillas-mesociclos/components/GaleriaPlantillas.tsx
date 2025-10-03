import React, { useState } from 'react';
import { MesocicloTemplate, predefinedMesocicloTemplates } from '../plantillasMesociclosApi';

const GaleriaPlantillas: React.FC = () => {
  const [templates, setTemplates] = useState<MesocicloTemplate[]>(predefinedMesocicloTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<MesocicloTemplate | null>(null);

  const toggleFavorite = (id: string) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === id ? { ...template, isFavorite: !template.isFavorite } : template
      )
    );
  };

  const openPreview = (template: MesocicloTemplate) => {
    setSelectedTemplate(template);
  };

  const closePreview = () => {
    setSelectedTemplate(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{template.title}</h2>
              <p className="text-gray-600 mb-1">Duración: {template.duration}</p>
              <p className="text-gray-600 mb-4">Deporte: {template.sport}</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => openPreview(template)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Ver Previa
                </button>
                <button
                  onClick={() => toggleFavorite(template.id)}
                  className={`text-2xl ${template.isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600 focus:outline-none`}
                >
                  {template.isFavorite ? '★' : '☆'}
                </button>
                <button
                  onClick={() => alert(`Aplicando plantilla: ${template.title}`)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Previa: {selectedTemplate.title}</h3>
            <p className="text-gray-700 mb-4">{selectedTemplate.description}</p>
            <p className="text-gray-700 mb-4">{selectedTemplate.previewContent}</p>
            <button
              onClick={closePreview}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cerrar Previa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaPlantillas;
