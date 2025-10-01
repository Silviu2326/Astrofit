
import React from 'react';
import { Nota } from '../notasApi';

interface NotaCardProps {
  nota: Nota;
  onEdit: (nota: Nota) => void;
  onDelete: (id: string) => void;
}

const NotaCard: React.FC<NotaCardProps> = ({ nota, onEdit, onDelete }) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  const getPriorityColor = (priority: Nota['priority']) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{nota.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(nota.priority)}`}>
          {nota.priority}
        </span>
      </div>
      {nota.clientName && (
        <p className="text-sm text-gray-600 mb-1">Cliente/Lead: <span className="font-medium">{nota.clientName}</span></p>
      )}
      <p className="text-gray-700 text-sm mb-3 line-clamp-3">{nota.content}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {nota.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-xs text-gray-500 mb-3">
        <p>Autor: {nota.author}</p>
        {nota.assignedTo && <p>Asignado a: {nota.assignedTo}</p>}
        <p>Última actualización: {formatDate(nota.timestamp)}</p>
        {nota.isPrivate && <p className="text-red-500">Nota privada</p>}
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onEdit(nota)}
          className="px-3 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(nota.id)}
          className="px-3 py-1 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NotaCard;
