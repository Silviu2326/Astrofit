
import React from 'react';

const ExportadorVisual: React.FC = () => {
  const handleExport = (format: 'pdf' | 'printable') => {
    alert(`Exportando menú como ${format.toUpperCase()}... (Funcionalidad no implementada)`)
    // In a real application, this would trigger PDF generation or a printable view
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Exportador Visual</h2>
      <p className="text-gray-600 mb-4">Genera un menú imprimible o PDF para tu cliente.</p>
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => handleExport('printable')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Generar Versión Imprimible
        </button>
        <button
          onClick={() => handleExport('pdf')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};

export default ExportadorVisual;
