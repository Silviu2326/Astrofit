import React from 'react';
import { Tarea } from '../tareasApi';

interface TareaCardProps {
  tarea: Tarea;
  onToggleComplete: (tarea: Tarea) => void;
}

const TareaCard: React.FC<TareaCardProps> = ({ tarea, onToggleComplete }) => {
  const getPriorityColor = (prioridad: Tarea['prioridad']) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (estado: Tarea['estado']) => {
    switch (estado) {
      case 'completada':
        return 'bg-green-500';
      case 'vencida':
        return 'bg-red-500';
      case 'en progreso':
        return 'bg-blue-500';
      case 'pendiente':
      default:
        return 'bg-yellow-500';
    }
  };

  const isOverdue = tarea.estado !== 'completada' && new Date(tarea.fechaVencimiento) < new Date();

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${isOverdue ? 'border-red-500' : getStatusColor(tarea.estado)}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-semibold ${tarea.estado === 'completada' ? 'line-through text-gray-500' : ''}`}>{tarea.titulo}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tarea.prioridad)}`}>
          {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{tarea.descripcion}</p>
      <div className="text-xs text-gray-500 mb-2">
        <p><strong>Vencimiento:</strong> {new Date(tarea.fechaVencimiento).toLocaleDateString()}</p>
        <p><strong>Asignado a:</strong> {tarea.asignadoA}</p>
        {tarea.clienteRelacionado && <p><strong>Cliente:</strong> {tarea.clienteRelacionado}</p>}
      </div>
      <div className="flex items-center justify-between mt-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={tarea.estado === 'completada'}
            onChange={() => onToggleComplete(tarea)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <span className="text-sm text-gray-700">Completada</span>
        </label>
        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(tarea.estado)}`}>
          {tarea.estado.charAt(0).toUpperCase() + tarea.estado.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default TareaCard;