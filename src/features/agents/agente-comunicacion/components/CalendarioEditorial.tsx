
import React, { useState, useEffect } from 'react';
import { agenteComunicacionApi } from '../agenteComunicacionApi';

interface EditorialSuggestion {
  date: string;
  time: string;
  reason: string;
}

const CalendarioEditorial: React.FC = () => {
  const [suggestions, setSuggestions] = useState<EditorialSuggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await agenteComunicacionApi.getEditorialCalendarSuggestions();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching editorial suggestions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calendario Editorial</h2>
      <p className="text-gray-600 mb-4">Sugerencias de días y horas ideales para enviar tus mensajes.</p>

      {loading ? (
        <p>Cargando sugerencias...</p>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <p className="font-semibold text-gray-800">Fecha: {suggestion.date} - Hora: {suggestion.time}</p>
              <p className="text-sm text-gray-600">Razón: {suggestion.reason}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && suggestions.length === 0 && (
        <p className="text-gray-600">No hay sugerencias de calendario editorial disponibles en este momento.</p>
      )}
    </div>
  );
};

export default CalendarioEditorial;
