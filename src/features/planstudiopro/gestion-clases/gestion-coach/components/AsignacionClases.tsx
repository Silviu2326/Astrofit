import React from 'react';
import { Coach } from '../gestionCoachApi';

interface AsignacionClasesProps {
  coach: Coach | null;
}

const AsignacionClases: React.FC<AsignacionClasesProps> = ({ coach }) => {
  if (!coach) {
    return <div className="bg-white p-4 rounded shadow">Selecciona un coach para ver sus asignaciones.</div>;
  }

  const mockAssignments = [
    { id: 'a1', className: 'Clase de Fuerza', time: 'Lunes 10:00', status: 'confirmada' },
    { id: 'a2', className: 'Clase de Cardio', time: 'Martes 11:00', status: 'pendiente' },
    { id: 'a3', className: 'Clase de Yoga', time: 'Miércoles 09:00', status: 'confirmada' },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Clases Asignadas a {coach.name}</h2>
      {mockAssignments.length === 0 ? (
        <p>No hay clases asignadas para este coach.</p>
      ) : (
        <ul>
          {mockAssignments.map((assignment) => (
            <li key={assignment.id} className="mb-2 p-2 border rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{assignment.className}</p>
                <p className="text-sm text-gray-600">{assignment.time}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${assignment.status === 'confirmada' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
              >
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AsignacionClases;
