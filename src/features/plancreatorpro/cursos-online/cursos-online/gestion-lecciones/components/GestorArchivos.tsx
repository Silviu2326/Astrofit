import React, { useState } from 'react';

const GestorArchivos: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="border p-4 rounded-md bg-white">
      <h3 className="font-semibold mb-2">Gesti??n de Archivos Descargables</h3>
      <input type="file" multiple onChange={handleFileChange} className="mb-2" />
      {files.length > 0 && (
        <ul className="list-disc pl-5">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center">
              {file.name}
              <button onClick={() => handleRemoveFile(index)} className="text-red-500 ml-4">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      {files.length === 0 && <p className="text-gray-600">No hay archivos subidos.</p>}
      {/* TODO: Implementar subida real de archivos y gesti??n en el backend */}
    </div>
  );
};

export default GestorArchivos;
