import React from 'react';

const SolicitudesEntrada: React.FC = () => {
  // Simulación de solicitudes de entrada pendientes
  const entryRequests = [
    { id: 'req1', user: 'NuevoUsuario1', date: '2025-09-27' },
    { id: 'req2', user: 'NuevoUsuario2', date: '2025-09-26' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Solicitudes de Entrada Pendientes</h2>
      <ul>
        {entryRequests.map(request => (
          <li key={request.id} className="border-b py-2">
            <p><strong>Usuario:</strong> {request.user}</p>
            <p><strong>Fecha:</strong> {request.date}</p>
            {/* Botones para aprobar o rechazar la solicitud */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolicitudesEntrada;
