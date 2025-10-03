import React from 'react';
import { Evaluation, PlayerEvent } from '../historialScoutingApi';

interface TimelineEvaluacionesProps {
  evaluations: Evaluation[];
  events: PlayerEvent[];
}

export const TimelineEvaluaciones: React.FC<TimelineEvaluacionesProps> = ({ evaluations, events }) => {
  // Combine and sort all timeline items by date
  const timelineItems = [...evaluations, ...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="relative border-l-4 border-gray-200 ml-4 pl-4">
      {timelineItems.map((item, index) => (
        <div key={item.id} className="mb-8 flex items-start">
          <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full -ml-6 mt-1"></div>
          <div className="ml-8">
            <p className="text-sm text-gray-500">{item.date}</p>
            {'scout' in item ? (
              // This is an evaluation
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-blue-800">Evaluación por {item.scout}</h3>
                <p className="text-gray-700">Rating: {item.rating}/10</p>
                <p className="text-gray-600 text-sm mt-1">Notas: {item.notes}</p>
              </div>
            ) : (
              // This is an event
              <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-green-800">Evento: {item.type}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
