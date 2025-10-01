import React from 'react';
import jsPDF from 'jspdf'; // O 'react-pdf' si se prefiere

interface ExportadorPDFProps {
  reportContent: string; // Contenido HTML o JSX a exportar
  fileName: string;
}

const ExportadorPDF: React.FC<ExportadorPDFProps> = ({ reportContent, fileName }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Rendimiento", 10, 10);
    // Aquí se debería procesar reportContent para añadirlo al PDF.
    // Para un contenido más complejo (HTML/JSX), se necesitaría una librería como html2canvas junto con jspdf.
    doc.save(`${fileName}.pdf`);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Exportar a PDF
    </button>
  );
};

export default ExportadorPDF;
