import React, { useState } from 'react';

const EditorNotas: React.FC = () => {
  const [noteContent, setNoteContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSaveNote = () => {
    console.log('Guardando nota:', { content: noteContent, category });
    // Aquí iría la lógica para guardar la nota a través de la API
    setNoteContent('');
    setCategory('');
  };

  return (
    <div className="bg-yellow-100 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Editor de Notas</h2>
      <textarea
        className="w-full p-2 border rounded-md resize-y min-h-[150px]"
        placeholder="Escribe tus notas aquí..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      ></textarea>
      <div className="mt-2">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría:</label>
        <input
          type="text"
          id="category"
          className="w-full p-2 border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Ej: Técnica, Progreso"
        />
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveNote}
      >
        Guardar Nota
      </button>
    </div>
  );
};

export default EditorNotas;
