
import React from 'react';

interface GestorPDFsProps {
  pdfs: any[]; // Definir una interfaz más específica para los PDFs
}

const GestorPDFs: React.FC<GestorPDFsProps> = ({ pdfs }) => {
  const handleDownload = (pdfId: string) => {
    console.log(`Descargando PDF: ${pdfId}`);
    // Lógica para iniciar la descarga y registrarla
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Gestor de PDFs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdfs.map((pdf) => (
          <div key={pdf.id} className="border p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-medium">{pdf.name}</h3>
              <p className="text-sm text-gray-600">Tamaño: {pdf.size}</p>
              <p className="text-sm text-gray-600">Descargas: {pdf.downloads}</p>
            </div>
            <button
              onClick={() => handleDownload(pdf.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Descargar PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestorPDFs;
