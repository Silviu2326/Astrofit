import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ArchivoUploadProps {
  onUpload: (files: File[]) => void;
}

const ArchivoUpload: React.FC<ArchivoUploadProps> = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true, // Prevent opening file dialog on click, only drag and drop
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
      `}
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        Arrastra y suelta archivos aquí, o haz click para seleccionar
      </p>
      <button
        type="button"
        onClick={() => document.querySelector('.dropzone-input')?.click()}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Seleccionar Archivos
      </button>
    </div>
  );
};

export default ArchivoUpload;