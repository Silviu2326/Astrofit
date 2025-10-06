
import React, { useState } from 'react';

const ModoAccesibilidad: React.FC = () => {
  const [modoAltoContraste, setModoAltoContraste] = useState(false);
  const [tamanoFuente, setTamanoFuente] = useState(16); // en px

  const toggleAltoContraste = () => {
    setModoAltoContraste(!modoAltoContraste);
    // Aqu?? se aplicar??an clases CSS globales o temas para alto contraste
    document.documentElement.classList.toggle('high-contrast', !modoAltoContraste);
  };

  const handleTamanoFuenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTamanoFuente(parseInt(e.target.value));
    document.documentElement.style.fontSize = `${parseInt(e.target.value) / 16}em`; // Asumiendo 16px base
  };

  return (
    <div className={`p-4 border rounded-lg shadow-md ${modoAltoContraste ? 'bg-black text-yellow-300 border-yellow-500' : 'bg-gray-800 text-white'}`}>
      <h3 className="text-lg font-semibold mb-2">Modo de Accesibilidad (Adaptaci??n a Discapacidades)</h3>
      <p>Opciones para personalizar la interfaz y mejorar la usabilidad para todos los usuarios.</p>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="alto-contraste" className="text-gray-300">Alto Contraste</label>
          <input
            type="checkbox"
            id="alto-contraste"
            checked={modoAltoContraste}
            onChange={toggleAltoContraste}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <div>
          <label htmlFor="tamano-fuente" className="block text-gray-300 mb-1">Tama??o de Fuente: {tamanoFuente}px</label>
          <input
            type="range"
            id="tamano-fuente"
            min="12"
            max="24"
            value={tamanoFuente}
            onChange={handleTamanoFuenteChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ModoAccesibilidad;
