import React, { useState } from 'react';
import SwitchBeneficios from './SwitchBeneficios';

interface BeneficioItem {
  id: string;
  nombre: string;
  activo: boolean;
}

interface ListaEditableProps {
  beneficios: BeneficioItem[];
  onToggleBeneficio: (id: string, activo: boolean) => void;
  onRemoveBeneficio: (id: string) => void;
  onAddBeneficio: (nombre: string) => void;
}

const ListaEditable: React.FC<ListaEditableProps> = ({
  beneficios,
  onToggleBeneficio,
  onRemoveBeneficio,
  onAddBeneficio,
}) => {
  const [nuevoBeneficio, setNuevoBeneficio] = useState('');

  const handleAdd = () => {
    if (nuevoBeneficio.trim()) {
      onAddBeneficio(nuevoBeneficio.trim());
      setNuevoBeneficio('');
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-3">Lista de Beneficios Editables</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full mr-2"
          placeholder="Añadir nuevo beneficio"
          value={nuevoBeneficio}
          onChange={(e) => setNuevoBeneficio(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAdd}
        >
          Añadir
        </button>
      </div>
      <ul>
        {beneficios.map((beneficio) => (
          <li key={beneficio.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
            <span>{beneficio.nombre}</span>
            <div className="flex items-center">
              <SwitchBeneficios
                isOn={beneficio.activo}
                handleToggle={() => onToggleBeneficio(beneficio.id, !beneficio.activo)}
              />
              <button
                className="ml-3 text-red-500 hover:text-red-700"
                onClick={() => onRemoveBeneficio(beneficio.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEditable;
