import React, { useState } from 'react';

interface SelectorColoresAppProps {
  onColorChange: (color: string) => void;
}

const predefinedPalettes = {
  'default': ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107'],
  'modern': ['#6366f1', '#a855f7', '#ec4899', '#f97316', '#10b981'],
  'pastel': ['#fecaca', '#fed7aa', '#bfdbfe', '#c7d2fe', '#a7f3d0'],
};

const SelectorColoresApp: React.FC<SelectorColoresAppProps> = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState<string>('#007bff');
  const [selectedPalette, setSelectedPalette] = useState<keyof typeof predefinedPalettes>('default');

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  const handlePaletteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const paletteName = event.target.value as keyof typeof predefinedPalettes;
    setSelectedPalette(paletteName);
    // Opcional: seleccionar el primer color de la nueva paleta por defecto
    if (predefinedPalettes[paletteName] && predefinedPalettes[paletteName].length > 0) {
      handleColorClick(predefinedPalettes[paletteName][0]);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">Selector de Colores de la App</h3>
      <div className="mb-4">
        <label htmlFor="palette-select" className="block text-sm font-medium text-gray-700 mb-1">Paleta de colores:</label>
        <select
          id="palette-select"
          value={selectedPalette}
          onChange={handlePaletteChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {Object.keys(predefinedPalettes).map((paletteName) => (
            <option key={paletteName} value={paletteName}>
              {paletteName.charAt(0).toUpperCase() + paletteName.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {predefinedPalettes[selectedPalette].map((color) => (
          <div
            key={color}
            className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            title={color}
          ></div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700">Color seleccionado: <span style={{ color: selectedColor }}>{selectedColor}</span></p>
        {/* Aquí se podría integrar un color picker avanzado */}
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorClick(e.target.value)}
          className="mt-2 w-full h-10 rounded-md border-gray-300"
        />
      </div>
    </div>
  );
};

export default SelectorColoresApp;
