
import React from 'react';

interface PreviewCursoProps {
  initialData: any;
  onSubmit: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const PreviewCurso: React.FC<PreviewCursoProps> = ({ initialData, onSubmit, onBack, isLastStep }) => {
  const { titulo, descripcion, portadaUrl, modulos, precio, esPublico } = initialData;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Previsualización del Curso</h2>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">{titulo || '[Sin Título]'}</h3>
        {portadaUrl && (
          <img src={portadaUrl} alt="Portada del curso" className="w-full h-48 object-cover rounded-md mb-4" />
        )}
        <p className="text-gray-700 mb-4">{descripcion || '[Sin Descripción]'}</p>

        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Precio: {precio ? `${precio}€` : 'Gratis'}</span>
          <span className={`inline-block text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${esPublico ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {esPublico ? 'Público' : 'Privado'}
          </span>
        </div>

        {modulos && modulos.length > 0 && (
          <div>
            <h4 className="text-md font-semibold mb-2">Contenido del Curso:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {modulos.map((modulo: any, index: number) => (
                <li key={index}>
                  <span className="font-medium">Módulo {index + 1}: {modulo.nombre || '[Sin Nombre]'}</span>
                  {modulo.lecciones && modulo.lecciones.length > 0 && (
                    <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
                      {modulo.lecciones.map((leccion: any, lecIndex: number) => (
                        <li key={lecIndex}>Lección {lecIndex + 1}: {leccion.titulo || '[Sin Título]'}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* El botón de publicar se maneja en WizardCurso */}
    </div>
  );
};

export default PreviewCurso;
