import React from 'react';
import { useGetFeedbackQuery } from '../encuestasNpsApi';

const AccionesMejora: React.FC = () => {
  const { data: feedback, isLoading } = useGetFeedbackQuery();

  if (isLoading) return <div className="p-4 bg-white rounded-lg shadow">Cargando sugerencias...</div>;

  const improvementSuggestions = [
    {
      id: '1',
      category: 'Clases',
      suggestion: 'Introducir nuevas clases de alta intensidad y yoga para aumentar la variedad.',
      relatedFeedback: feedback?.filter(f => f.comment.includes('clases')) || [],
    },
    {
      id: '2',
      category: 'Atención al Cliente',
      suggestion: 'Capacitar al personal en resolución de conflictos y mejorar los tiempos de respuesta.',
      relatedFeedback: feedback?.filter(f => f.comment.includes('atención al cliente')) || [],
    },
    {
      id: '3',
      category: 'Instalaciones',
      suggestion: 'Modernizar el equipo de cardio y revisar la limpieza de los vestuarios.',
      relatedFeedback: feedback?.filter(f => f.comment.includes('instalaciones') || f.comment.includes('gimnasio')) || [],
    },
    {
      id: '4',
      category: 'Horarios',
      suggestion: 'Extender el horario de apertura los fines de semana y ofrecer clases temprano por la mañana.',
      relatedFeedback: feedback?.filter(f => f.comment.includes('horario')) || [],
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acciones de Mejora</h2>
      <p className="text-gray-600 mb-4">
        Sugerencias de acciones basadas en el feedback recibido para mejorar la satisfacción del cliente.
      </p>

      <div className="space-y-6">
        {improvementSuggestions.map((action) => (
          <div key={action.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="text-xl font-medium text-gray-800 mb-2">{action.category}</h3>
            <p className="text-gray-700 mb-3">{action.suggestion}</p>
            {action.relatedFeedback.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-600 mb-1">Feedback relacionado:</p>
                <ul className="list-disc list-inside text-sm text-gray-500">
                  {action.relatedFeedback.map((f) => (
                    <li key={f.id} className="mb-1">
                      "{f.comment}" (Puntuación: {f.score})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccionesMejora;