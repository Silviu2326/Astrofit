import React, { useState } from 'react';

interface ConfiguradorIconoProps {
  onIconConfigChange: (config: any) => void; // Define una interfaz más específica para config si es necesario
}

const ConfiguradorIcono: React.FC<ConfiguradorIconoProps> = ({ onIconConfigChange }) => {
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [padding, setPadding] = useState<number>(10);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setIconFile(file);
      // Aquí se podría generar una previsualización del icono
      onIconConfigChange({ file, backgroundColor, padding });
    }
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setBackgroundColor(color);
    onIconConfigChange({ iconFile, backgroundColor: color, padding });
  };

  const handlePaddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPadding = parseInt(event.target.value, 10);
    setPadding(newPadding);
    onIconConfigChange({ iconFile, backgroundColor, padding: newPadding });
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">Configuración de Icono de la App</h3>
      <div className="mb-4">
        <label htmlFor="icon-upload" className="block text-sm font-medium text-gray-700 mb-1">Subir Icono:</label>
        <input
          id="icon-upload"
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
      </div>
      <div className="mb-4">
        <label htmlFor="bg-color" className="block text-sm font-medium text-gray-700 mb-1">Color de Fondo:</label>
        <input
          id="bg-color"
          type="color"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          className="w-full h-10 rounded-md border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="padding" className="block text-sm font-medium text-gray-700 mb-1">Relleno (Padding):</label>
        <input
          id="padding"
          type="range"
          min="0"
          max="50"
          value={padding}
          onChange={handlePaddingChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
        />
        <span className="text-sm text-gray-500">{padding}px</span>
      </div>
      {/* Aquí se mostraría una previsualización del icono con la configuración actual */}
      <div
        className="w-24 h-24 flex items-center justify-center rounded-lg border border-gray-300 mt-4"
        style={{ backgroundColor: backgroundColor, padding: `${padding}px` }}
      >
        {iconFile ? (
          <img src={URL.createObjectURL(iconFile)} alt="App Icon Preview" className="max-w-full max-h-full object-contain" />
        ) : (
          <span className="text-gray-400 text-xs">Previsualización Icono</span>
        )}
      </div>
    </div>
  );
};

export default ConfiguradorIcono;
