import React, { useState } from 'react';

interface BloqueEntrenamientoProps {
  id: string;
  nombre: string;
  initialVolumen: number;
  initialIntensidad: number;
  onVolumenChange: (id: string, value: number) => void;
  onIntensidadChange: (id: string, value: number) => void;
}

const BloqueEntrenamiento: React.FC<BloqueEntrenamientoProps> = ({
  id,
  nombre,
  initialVolumen,
  initialIntensidad,
  onVolumenChange,
  onIntensidadChange,
}) => {
  const [volumen, setVolumen] = useState<number>(initialVolumen);
  const [intensidad, setIntensidad] = useState<number>(initialIntensidad);

  const handleVolumenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolumen(value);
    onVolumenChange(id, value);
  };

  const handleIntensidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setIntensidad(value);
    onIntensidadChange(id, value);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
      <h3 className="text-lg font-semibold mb-2">{nombre}</h3>
      <div className="mb-2">
        <label htmlFor={`volumen-${id}`} className="block text-gray-700 text-sm font-bold mb-1">
          Volumen: {volumen}%
        </label>
        <input
          type="range"
          id={`volumen-${id}`}
          min="0"
          max="100"
          value={volumen}
          onChange={handleVolumenChange}
          className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div>
        <label htmlFor={`intensidad-${id}`} className="block text-gray-700 text-sm font-bold mb-1">
          Intensidad: {intensidad}%
        </label>
        <input
          type="range"
          id={`intensidad-${id}`}
          min="0"
          max="100"
          value={intensidad}
          onChange={handleIntensidadChange}
          className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

const EditorModular: React.FC = () => {
  const [bloques, setBloques] = useState([
    { id: 'b1', nombre: 'Bloque de Fuerza', volumen: 50, intensidad: 70 },
    { id: 'b2', nombre: 'Bloque de Resistencia', volumen: 60, intensidad: 50 },
  ]);

  const handleVolumenChange = (id: string, value: number) => {
    setBloques((prev) =>
      prev.map((bloque) => (bloque.id === id ? { ...bloque, volumen: value } : bloque))
    );
  };

  const handleIntensidadChange = (id: string, value: number) => {
    setBloques((prev) =>
      prev.map((bloque) => (bloque.id === id ? { ...bloque, intensidad: value } : bloque))
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Editor Modular de Bloques de Entrenamiento</h2>
      {bloques.map((bloque) => (
        <BloqueEntrenamiento
          key={bloque.id}
          {...bloque}
          initialVolumen={bloque.volumen}
          initialIntensidad={bloque.intensidad}
          onVolumenChange={handleVolumenChange}
          onIntensidadChange={handleIntensidadChange}
        />
      ))}
    </div>
  );
};

export default EditorModular;
