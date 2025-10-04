
import React from 'react';

interface PlantillasDescargablesProps {
  templates: any[]; // Definir una interfaz más específica para las plantillas
}

const PlantillasDescargables: React.FC<PlantillasDescargablesProps> = ({ templates }) => {
  const handleDownload = (templateId: string) => {
    console.log(`Descargando plantilla: ${templateId}`);
    // Lógica para iniciar la descarga y registrarla
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Plantillas Descargables</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="border p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-600">Tipo: {template.type.toUpperCase()}</p>
              <p className="text-sm text-gray-600">Descargas: {template.downloads}</p>
            </div>
            <button
              onClick={() => handleDownload(template.id)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Descargar Plantilla
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantillasDescargables;
