import React, { useState } from 'react';

interface SelectorTipografiaProps {
  onFontChange: (fontFamily: string) => void;
}

const mobileFonts = [
  'Arial, sans-serif',
  'Verdana, sans-serif',
  'Helvetica, sans-serif',
  'Roboto, sans-serif', // Comúnmente usado en Android
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Montserrat, sans-serif',
  'Source Sans Pro, sans-serif',
  'Inter, sans-serif', // Popular en diseños modernos
  'System-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Fuentes del sistema
];

const SelectorTipografia: React.FC<SelectorTipografiaProps> = ({ onFontChange }) => {
  const [selectedFont, setSelectedFont] = useState<string>(mobileFonts[0]);

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = event.target.value;
    setSelectedFont(newFont);
    onFontChange(newFont);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">Selector de Tipografía Móvil</h3>
      <div className="mb-4">
        <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Tipografía:</label>
        <select
          id="font-select"
          value={selectedFont}
          onChange={handleFontChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          style={{ fontFamily: selectedFont }} // Aplica la fuente seleccionada al selector
        >
          {mobileFonts.map((font, index) => (
            <option key={index} value={font} style={{ fontFamily: font }}>
              {font.split(',')[0].replace(/['"]/g, '')} {/* Muestra solo el primer nombre de la fuente */}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 p-4 border border-gray-200 rounded-md">
        <p className="text-sm text-gray-600 mb-2">Previsualización:</p>
        <p style={{ fontFamily: selectedFont, fontSize: '1.2rem' }}>
          El rápido zorro marrón salta sobre el perro perezoso.
        </p>
        <p style={{ fontFamily: selectedFont, fontSize: '1rem' }}>
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>
  );
};

export default SelectorTipografia;
