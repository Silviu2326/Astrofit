import React from 'react';

const ListaReportes: React.FC = () => {
  // Simulación de datos de reportes
  const reports = [
    { id: '1', user: 'UsuarioA', content: 'Contenido inapropiado 1', status: 'pendiente' },
    { id: '2', user: 'UsuarioB', content: 'Contenido inapropiado 2', status: 'revisado' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Lista de Reportes de Usuarios</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id} className="border-b py-2">
            <p><strong>Usuario:</strong> {report.user}</p>
            <p><strong>Contenido:</strong> {report.content}</p>
            <p><strong>Estado:</strong> {report.status}</p>
            {/* Botones de acción para moderar el reporte */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReportes;
