import React, { useState } from 'react';

interface EditorSplashScreenProps {
  onSplashScreenConfigChange: (config: any) => void; // Define una interfaz más específica para config si es necesario
}

const EditorSplashScreen: React.FC<EditorSplashScreenProps> = ({ onSplashScreenConfigChange }) => {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [displayText, setDisplayText] = useState<string>('Cargando...');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setBackgroundImage(file);
      onSplashScreenConfigChange({ backgroundImage: file, backgroundColor, textColor, displayText });
    }
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setBackgroundColor(color);
    onSplashScreenConfigChange({ backgroundImage, backgroundColor: color, textColor, displayText });
  };

  const handleTextColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setTextColor(color);
    onSplashScreenConfigChange({ backgroundImage, backgroundColor, textColor: color, displayText });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setDisplayText(text);
    onSplashScreenConfigChange({ backgroundImage, backgroundColor, textColor, displayText: text });
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">Editor de Splash Screen</h3>
      <div className="mb-4">
        <label htmlFor="splash-bg-image" className="block text-sm font-medium text-gray-700 mb-1">Imagen de Fondo:</label>
        <input
          id="splash-bg-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="splash-bg-color" className="block text-sm font-medium text-gray-700 mb-1">Color de Fondo:</label>
        <input
          id="splash-bg-color"
          type="color"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          className="w-full h-10 rounded-md border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="splash-text-color" className="block text-sm font-medium text-gray-700 mb-1">Color del Texto:</label>
        <input
          id="splash-text-color"
          type="color"
          value={textColor}
          onChange={handleTextColorChange}
          className="w-full h-10 rounded-md border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="splash-text" className="block text-sm font-medium text-gray-700 mb-1">Texto a Mostrar:</label>
        <input
          id="splash-text"
          type="text"
          value={displayText}
          onChange={handleTextChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Ej. Cargando..."
        />
      </div>
      {/* Previsualización del Splash Screen */}
      <div
        className="w-full h-48 flex items-center justify-center rounded-lg border border-gray-300 mt-4 relative"
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: backgroundImage ? `url(${URL.createObjectURL(backgroundImage)})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span className="text-lg font-bold" style={{ color: textColor }}>
          {displayText}
        </span>
      </div>
    </div>
  );
};

export default EditorSplashScreen;
