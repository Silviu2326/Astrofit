import React, { useState } from 'react';
// Asumiendo que tienes un componente de color picker o usas una librería externa
// import ColorPicker from 'your-color-picker-library';

const paletasPredefinidas = [
  { name: 'Primaria', colors: ['#4A90E2', '#50E3C2', '#F5A623', '#BD10E0'] },
  { name: 'Neutros', colors: ['#F8F8F8', '#E0E0E0', '#BDBDBD', '#424242'] },
];

const SelectorColores: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#4A90E2');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Selector de Colores</h2>
      <div className="mb-4">
        <label htmlFor="mainColor" className="block text-sm font-medium text-gray-700 mb-2">Color Principal</label>
        <input
          type="color"
          id="mainColor"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <p className="mt-2 text-sm text-gray-500">Color seleccionado: {selectedColor}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Paletas Predefinidas</h3>
        {paletasPredefinidas.map((paleta) => (
          <div key={paleta.name} className="mb-3">
            <p className="text-sm font-medium text-gray-600 mb-2">{paleta.name}</p>
            <div className="flex space-x-2">
              {paleta.colors.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Aquí iría la integración de un color picker más avanzado si fuera necesario */}
      {/* <ColorPicker value={selectedColor} onChange={setSelectedColor} /> */}
    </div>
  );
};

export default SelectorColores;
