
import React, { useState } from 'react';

interface BloquesBuilderProps {
  onAddBloque: (bloque: any) => void;
}

const BloquesBuilder: React.FC<BloquesBuilderProps> = ({ onAddBloque }) => {
  const [bloqueName, setBloqueName] = useState('');
  const [bloqueType, setBloqueType] = useState('Fuerza');

  const handleAddBloque = () => {
    if (bloqueName.trim()) {
      onAddBloque({ id: Date.now().toString(), name: bloqueName, type: bloqueType, ejercicios: [] });
      setBloqueName('');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Constructor de Bloques</h3>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Nombre del bloque (ej. Calentamiento)"
          className="flex-grow p-2 border rounded"
          value={bloqueName}
          onChange={(e) => setBloqueName(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={bloqueType}
          onChange={(e) => setBloqueType(e.target.value)}
        >
          <option value="Fuerza">Fuerza</option>
          <option value="Cardio">Cardio</option>
          <option value="Movilidad">Movilidad</option>
          <option value="Calentamiento">Calentamiento</option>
        </select>
        <button onClick={handleAddBloque} className="bg-blue-500 text-white px-4 py-2 rounded">
          A??adir Bloque
        </button>
      </div>
      {/* Aqu?? se mostrar??n los bloques a??adidos y se podr??n arrastrar ejercicios */}
      <p className="text-gray-500">Arrastra y suelta ejercicios aqu?? para construir tus bloques.</p>
    </div>
  );
};

export default BloquesBuilder;
