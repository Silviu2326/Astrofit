import React, { useRef, useState } from 'react';
import { Archivo } from '../clienteDetalleApi';

interface ClienteArchivosProps {
  archivos: Archivo[];
}

const ClienteArchivos: React.FC<ClienteArchivosProps> = ({ archivos }) => {
  const [files, setFiles] = useState<Archivo[]>([...archivos]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileTypeFromName = (name: string, mime: string) => {
    if (mime) return mime.toUpperCase();
    const dot = name.lastIndexOf('.')
    return dot !== -1 ? name.substring(dot + 1).toUpperCase() : 'FILE';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newArchivo: Archivo = {
      id: `file-${Date.now()}`,
      nombre: file.name,
      url: URL.createObjectURL(file),
      fechaSubida: new Date().toISOString(),
      tipo: getFileTypeFromName(file.name, file.type),
    };

    setFiles((prev) => [newArchivo, ...prev]);
    // Reset input to allow the same file to be selected again if needed
    e.currentTarget.value = '';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Archivos del Cliente</h3>
      {files.length === 0 ? (
        <p className="text-gray-500">No hay archivos adjuntos.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {files.map((archivo) => (
            <li key={archivo.id} className="py-4 flex justify-between items-center">
              <div>
                <a href={archivo.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  {archivo.nombre}
                </a>
                <p className="text-xs text-gray-500">Tipo: {archivo.tipo} | Subido: {new Date(archivo.fechaSubida).toLocaleDateString()}</p>
              </div>
              {/* Aquí se podrían añadir iconos para descargar o previsualizar */}
            </li>
          ))}
        </ul>
      )}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
      <button onClick={handleUploadClick} className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
        Subir Nuevo Archivo
      </button>
    </div>
  );
};

export default ClienteArchivos;