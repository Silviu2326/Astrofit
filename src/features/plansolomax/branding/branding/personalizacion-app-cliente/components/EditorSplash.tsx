import React, { useState } from 'react';

const EditorSplash: React.FC = () => {
  const [splashImage, setSplashImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSplashImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Editor de Splash Screen</h3>
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
      {splashImage && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
          <img src={splashImage} alt="Splash Screen Preview" className="max-w-full h-auto rounded-md shadow-sm" style={{ maxHeight: '200px' }} />
        </div>
      )}
      <p className="text-sm text-gray-500 mt-2">Sube una imagen para la pantalla de carga de la app.</p>
    </div>
  );
};

export default EditorSplash;
