import React, { useState } from 'react';
import { Tarea } from '../clienteDetalleApi';

interface ClienteTareasProps {
  tareas: Tarea[];
}

const ClienteTareas: React.FC<ClienteTareasProps> = ({ tareas }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTareas = tareas.filter(tarea => {
    if (filter === 'pending') return tarea.estado === 'Pendiente' || tarea.estado === 'En Progreso';
    if (filter === 'completed') return tarea.estado === 'Completada';
    return true;
  });

  const getStatusColor = (estado: Tarea['estado']) => {
    switch (estado) {
      case 'Pendiente': return 'bg-red-100 text-red-800';
      case 'En Progreso': return 'bg-yellow-100 text-yellow-800';
      case 'Completada': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tareas Asignadas</h3>

      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completadas
        </button>
      </div>

      {filteredTareas.length === 0 ? (
        <p className="text-gray-500">No hay tareas {filter === 'all' ? '' : filter === 'pending' ? 'pendientes' : 'completadas'}.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredTareas.map((tarea) => (
            <li key={tarea.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{tarea.descripcion}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Vencimiento: {new Date(tarea.fechaVencimiento).toLocaleDateString()} | Asignado a: {tarea.asignadoA}
                </p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tarea.estado)}`}>
                {tarea.estado}
              </span>
            </li>
          ))}
        </ul>
      )}
      <button className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
        Añadir Nueva Tarea
      </button>
    </div>
  );
};

export default ClienteTareas;