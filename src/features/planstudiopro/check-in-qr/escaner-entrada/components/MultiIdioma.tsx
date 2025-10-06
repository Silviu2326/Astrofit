
import React, { useState } from 'react';

const MultiIdioma: React.FC = () => {
  const [idioma, setIdioma] = useState('es'); // 'es' para espa??ol, 'en' para ingl??s

  const textos = {
    es: {
      titulo: 'Detecci??n Autom??tica de Idioma',
      descripcion: 'El sistema se adapta al idioma preferido del usuario.',
      idiomaActual: 'Idioma Actual:',
      saludo: '??Hola! Bienvenido al sistema.',
    },
    en: {
      titulo: 'Automatic Language Detection',
      descripcion: 'The system adapts to the user's preferred language.',
      idiomaActual: 'Current Language:',
      saludo: 'Hello! Welcome to the system.',
    },
  };

  const handleIdiomaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdioma(e.target.value);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">{textos[idioma as keyof typeof textos].titulo}</h3>
      <p>{textos[idioma as keyof typeof textos].descripcion}</p>
      <div className="mt-4 flex items-center space-x-2">
        <label htmlFor="idioma-select" className="text-gray-300">{textos[idioma as keyof typeof textos].idiomaActual}</label>
        <select
          id="idioma-select"
          value={idioma}
          onChange={handleIdiomaChange}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        >
          <option value="es">Espa??ol</option>
          <option value="en">English</option>
        </select>
      </div>
      <p className="mt-4 text-xl font-bold text-center">{textos[idioma as keyof typeof textos].saludo}</p>
    </div>
  );
};

export default MultiIdioma;
