import React, { useState } from 'react';
import { Nota } from '../clienteDetalleApi';

interface ClienteNotasProps {
  notas: Nota[];
}

const ClienteNotas: React.FC<ClienteNotasProps> = ({ notas }) => {
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      // En un caso real, aquí se haría una llamada a la API para añadir la nota
      const newNote: Nota = {
        id: `note-${Date.now()}`,
        contenido: newNoteContent,
        timestamp: new Date().toISOString(),
        autor: 'Usuario Actual', // Esto debería venir del contexto de usuario
      };
      notas.unshift(newNote); // Añadir al principio para que la más reciente se vea primero (mock)
      setNewNoteContent('');
      // Forzar re-render si las notas no son parte de un estado global gestionado por un hook
      // En un entorno real, el hook de la API se encargaría de esto.
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas Privadas</h3>
      <div className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          placeholder="Añadir nueva nota..."
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        ></textarea>
        <button
          onClick={handleAddNote}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
        >
          Guardar Nota
        </button>
      </div>

      {notas.length === 0 ? (
        <p className="text-gray-500">No hay notas para este cliente.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notas.map((nota) => (
            <li key={nota.id} className="py-4">
              <p className="text-sm text-gray-800">{nota.contenido}</p>
              <p className="text-xs text-gray-500 mt-1">
                {nota.autor} - {new Date(nota.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteNotas;