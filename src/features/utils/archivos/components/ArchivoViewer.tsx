import React from 'react';
import { FileItem } from '../archivosApi';

interface ArchivoViewerProps {
  file: FileItem;
  onClose: () => void;
}

const ArchivoViewer: React.FC<ArchivoViewerProps> = ({ file, onClose }) => {
  const renderFilePreview = () => {
    if (file.extension === 'pdf') {
      return (
        <iframe
          src={file.url}
          title={file.name}
          className="w-full h-full"
          style={{ border: 'none' }}
        ></iframe>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(file.extension)) {
      return <img src={file.url} alt={file.name} className="max-w-full max-h-full object-contain" />;
    } else {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-700">
          <p>No hay vista previa disponible para este tipo de archivo.</p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Vista Previa: {file.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="flex-grow p-4 overflow-auto flex items-center justify-center">
          {renderFilePreview()}
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            onClick={() => window.open(file.url, '_blank')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Descargar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchivoViewer;