import React, { useState } from 'react';

const EditorTexto: React.FC = () => {
  const [content, setContent] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="border p-4 rounded-md bg-white">
      <h3 className="font-semibold mb-2">Editor de Texto Enriquecido</h3>
      {/* TODO: Integrar un editor de texto enriquecido real (ej. Quill, TinyMCE) */}
      <textarea
        className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={handleChange}
        placeholder="Escribe el contenido de la lecci??n aqu??..."
      ></textarea>
    </div>
  );
};

export default EditorTexto;
