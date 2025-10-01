import React from 'react';
import { FileItem } from '../archivosApi';

interface ArchivosGridProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

const ArchivosGrid: React.FC<ArchivosGridProps> = ({ files, onFileSelect }) => {
  const getThumbnail = (file: FileItem) => {
    if (file.thumbnail) {
      return <img src={file.thumbnail} alt={file.name} className="w-full h-32 object-cover mb-2" />;
    } else if (file.extension === 'pdf') {
      return <div className="w-full h-32 flex items-center justify-center bg-red-100 text-red-600 text-4xl font-bold mb-2">PDF</div>;
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(file.extension)) {
      return <div className="w-full h-32 flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold mb-2">IMG</div>;
    } else {
      return <div className="w-full h-32 flex items-center justify-center bg-gray-100 text-gray-600 text-4xl font-bold mb-2">FILE</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onFileSelect(file)}
        >
          {getThumbnail(file)}
          <h3 className="font-semibold text-sm truncate mb-1">{file.name}</h3>
          <p className="text-xs text-gray-600">Tamaño: {file.size}</p>
          <p className="text-xs text-gray-600">Subido: {file.uploadDate}</p>
          <div className="flex flex-wrap mt-2">
            {file.tags.map((tag) => (
              <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-1 mb-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchivosGrid;