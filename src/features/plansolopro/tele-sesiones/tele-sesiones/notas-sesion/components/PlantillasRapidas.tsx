import React from 'react';

const plantillas = [
  "Ana mejoró en técnica de sentadilla",
  "Juan mostró buena progresión en peso muerto",
  "María necesita trabajar la movilidad de hombros",
  "Pedro mantuvo una excelente actitud durante la sesión",
];

const PlantillasRapidas: React.FC = () => {
  const handleSelectTemplate = (template: string) => {
    // Aquí se podría integrar con el EditorNotas para auto-rellenar el contenido
    console.log('Plantilla seleccionada:', template);
    alert(`Plantilla seleccionada: "${template}". (Integrar con el editor de notas)`);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Plantillas Rápidas</h2>
      <div className="space-y-2">
        {plantillas.map((template, index) => (
          <button
            key={index}
            className="w-full text-left p-2 bg-white hover:bg-gray-50 rounded-md border border-gray-200"
            onClick={() => handleSelectTemplate(template)}
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlantillasRapidas;
