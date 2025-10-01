import React, { useState } from 'react';

interface UploaderLogoProps {
  onLogoUpload: (file: File) => void;
}

const UploaderLogo: React.FC<UploaderLogoProps> = ({ onLogoUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onLogoUpload(file);
      // Aquí se podría integrar la lógica de crop automático
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">Subir Logo</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {selectedFile.name}</p>
      )}
      {/* Aquí se podría añadir un componente para el crop automático */}
    </div>
  );
};

export default UploaderLogo;
