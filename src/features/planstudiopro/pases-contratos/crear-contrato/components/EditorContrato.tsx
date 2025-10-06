import React from 'react';

interface EditorContratoProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

const EditorContrato: React.FC<EditorContratoProps> = ({ content, onContentChange }) => {
  return (
    <textarea
      className="w-full h-96 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      placeholder="Escribe o edita el contenido del contrato aquí..."
    />
  );
};

export default EditorContrato;
