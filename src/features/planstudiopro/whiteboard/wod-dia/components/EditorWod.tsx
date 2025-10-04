import React, { useState } from 'react';
import { WodType, getWodTemplate } from '../wodDiaApi';

interface EditorWodProps {
  onSave: (content: string) => void;
}

const EditorWod: React.FC<EditorWodProps> = ({ onSave }) => {
  const [editorContent, setEditorContent] = useState<string>('');

  const handleTemplateClick = (type: WodType) => {
    setEditorContent(getWodTemplate(type));
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-gray-700">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Editor de WOD</h2>
      <textarea
        className="w-full h-48 p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
        value={editorContent}
        onChange={(e) => setEditorContent(e.target.value)}
        placeholder="Escribe aqu?? el WOD del d??a..."
      ></textarea>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleTemplateClick('AMRAP')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Plantilla AMRAP
        </button>
        <button
          onClick={() => handleTemplateClick('For Time')}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-200"
        >
          Plantilla For Time
        </button>
        <button
          onClick={() => handleTemplateClick('EMOM')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-200"
        >
          Plantilla EMOM
        </button>
        <button
          onClick={() => onSave(editorContent)}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold rounded-md transition duration-200 ml-auto"
        >
          Guardar WOD
        </button>
      </div>
    </div>
  );
};

export default EditorWod;
