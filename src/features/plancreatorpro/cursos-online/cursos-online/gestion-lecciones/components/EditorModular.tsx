import React from 'react';

const EditorModular: React.FC = () => {
  return (
    <div className="border p-4 rounded-md min-h-[200px] bg-gray-50">
      <h3 className="font-semibold mb-2">Editor Modular (Arrastrable)</h3>
      <p className="text-gray-600">Arrastra y suelta bloques de contenido aqu??.</p>
      {/* TODO: Implementar l??gica de drag & drop para bloques */}
    </div>
  );
};

export default EditorModular;
