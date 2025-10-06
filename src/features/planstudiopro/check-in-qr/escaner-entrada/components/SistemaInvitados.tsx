
import React, { useState } from 'react';

const SistemaInvitados: React.FC = () => {
  const [invitados, setInvitados] = useState([
    { id: 1, nombre: 'Juan P??rez', accesoHasta: '2025-09-28 18:00', estado: 'Activo' },
    { id: 2, nombre: 'Ana Garc??a', accesoHasta: '2025-09-29 12:00', estado: 'Pendiente' },
  ]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Sistema de Gesti??n de Invitados</h3>
      <p>Control de acceso temporal para visitantes con permisos configurables.</p>
      <div className="mt-4 space-y-2">
        {invitados.map(invitado => (
          <div key={invitado.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
            <div>
              <p className="font-semibold">{invitado.nombre}</p>
              <p className="text-sm text-gray-300">Acceso hasta: {invitado.accesoHasta}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${invitado.estado === 'Activo' ? 'bg-green-500' : 'bg-yellow-500'}`}>
              {invitado.estado}
            </span>
          </div>
        ))}
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Registrar Nuevo Invitado
        </button>
      </div>
    </div>
  );
};

export default SistemaInvitados;
