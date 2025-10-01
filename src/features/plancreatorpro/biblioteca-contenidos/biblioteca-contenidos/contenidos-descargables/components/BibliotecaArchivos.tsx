
import React from 'react';

interface BibliotecaArchivosProps {
  files: any[]; // Definir una interfaz más específica para los archivos
}

const BibliotecaArchivos: React.FC<BibliotecaArchivosProps> = ({ files }) => {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄'; // Icono de PDF
      case 'xlsx':
        return '📊'; // Icono de hoja de cálculo
      case 'docx':
        return '📝'; // Icono de documento
      default:
        return '📁'; // Icono genérico
    }
  };

  const handleDownload = (fileId: string) => {
    // Lógica para iniciar la descarga y registrarla
    console.log(`Descargando archivo: ${fileId}`);
    // Aquí se integraría la función recordDownload de contenidosDescargablesApi.ts
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file) => (
        <div key={file.id} className="border p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-2">{getFileIcon(file.type)}</span>
            <h3 className="font-semibold">{file.name}</h3>
          </div>
          <p className="text-sm text-gray-600">Tipo: {file.type.toUpperCase()}</p>
          <p className="text-sm text-gray-600">Tamaño: {file.size}</p>
          <p className="text-sm text-gray-600">Descargas: {file.downloads}</p>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handleDownload(file.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Descargar
            </button>
            {file.previewUrl && (
              <a
                href={file.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Preview
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BibliotecaArchivos;
