import React from 'react';
import TarjetaGrupo from './TarjetaGrupo';

const ListadoGrupos: React.FC = () => {
  // TODO: Fetch list of groups from API
  const grupos = [
    { id: '1', nombre: 'Reto 30 días', miembrosActivos: 120, imagenPortada: '🏃‍♂️' },
    { id: '2', nombre: 'Fuerza Avanzada', miembrosActivos: 85, imagenPortada: '💪' },
    // Add more dummy data or fetch from API
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {grupos.map(grupo => (
        <TarjetaGrupo key={grupo.id} grupo={grupo} />
      ))}
    </div>
  );
};

export default ListadoGrupos;
