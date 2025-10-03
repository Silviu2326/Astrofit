import React, { useState } from 'react';

const tipografiasWeb = [
  'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Georgia', 'Times New Roman',
  'Courier New', 'Lucida Console', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald'
];

const SelectorTipografias: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState<string>('Roboto');
  const [fontSize, setFontSize] = useState<number>(16);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Selector de Tipografías</h2>

      <div className="mb-4">
        <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">Fuente Principal</label>
        <select
          id="fontFamily"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {tipografiasWeb.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-2">Tamaño de Fuente (px)</label>
        <input
          type="number"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          min="10"
          max="32"
          className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>

      <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-gray-700" style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}>
          Ejemplo de texto con la tipografía seleccionada.
        </p>
      </div>
    </div>
  );
};

export default SelectorTipografias;
