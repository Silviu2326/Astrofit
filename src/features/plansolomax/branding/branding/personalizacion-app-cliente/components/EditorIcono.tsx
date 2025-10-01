import React, { useState } from 'react';

const EditorIcono: React.FC = () => {
  const [iconImage, setIconImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Editor de Icono de App</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      {iconImage && (
        <div className="mt-4 flex items-center">
          <p className="text-sm text-gray-600 mr-3">Vista previa:</p>
          <img src={iconImage} alt="App Icon Preview" className="w-16 h-16 rounded-lg shadow-sm" />
        </div>
      )}
      <p className="text-sm text-gray-500 mt-2">Sube una imagen para el icono de la app.</p>
    </div>
  );
};

export default EditorIcono;
