
import React, { useState } from 'react';
import { mockEjercicios } from '../../nuevoEntrenamientoApi';

interface EjerciciosSelectorProps {
  onSelectEjercicio: (ejercicio: any) => void;
}

const EjerciciosSelector: React.FC<EjerciciosSelectorProps> = ({ onSelectEjercicio }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEjercicios = mockEjercicios.filter((ejercicio) =>
    ejercicio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Biblioteca de Ejercicios</h3>
      <input
        type="text"
        placeholder="Buscar ejercicio..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {filteredEjercicios.map((ejercicio) => (
          <div
            key={ejercicio.id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectEjercicio(ejercicio)}
          >
            {ejercicio.nombre} ({ejercicio.categoria})
          </div>
        ))}
      </div>
    </div>
  );
};

export default EjerciciosSelector;
