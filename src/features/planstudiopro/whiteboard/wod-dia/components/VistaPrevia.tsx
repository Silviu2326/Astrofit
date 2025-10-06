import React from 'react';

interface VistaPreviaProps {
  wodContent: string;
}

const VistaPrevia: React.FC<VistaPreviaProps> = ({ wodContent }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-gray-700">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Vista Previa del WOD</h2>
      <div className="bg-gray-900 p-4 rounded-md min-h-[120px] text-white whitespace-pre-wrap font-mono">
        {wodContent ? wodContent : <span className="text-gray-500">El WOD se mostrar?? aqu??...</span>}
      </div>
    </div>
  );
};

export default VistaPrevia;
