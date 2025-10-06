import React from 'react';
import { Nota } from '../notasApi';
import { Pin, Archive, Trash2, Edit2 } from 'lucide-react';

interface NotaCardProps {
  nota: Nota;
  onEdit: (nota: Nota) => void;
  onDelete: (id: string) => void;
  onToggleFijar?: (id: string) => void;
  onToggleArchivar?: (id: string) => void;
}

const NotaCard: React.FC<NotaCardProps> = ({ nota, onEdit, onDelete, onToggleFijar, onToggleArchivar }) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoriaColor = (categoria: Nota['categoria']) => {
    switch (categoria) {
      case 'importante': return 'bg-red-100 text-red-800';
      case 'seguimiento': return 'bg-yellow-100 text-yellow-800';
      case 'recordatorio': return 'bg-blue-100 text-blue-800';
      case 'observacion': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 border-l-4"
      style={{ borderLeftColor: nota.color || '#f59e0b' }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {nota.fijada && (
              <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
            )}
            <h3 className="text-lg font-semibold text-gray-900">{nota.titulo}</h3>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(nota.categoria)}`}>
            {nota.categoria}
          </span>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">{nota.contenido}</p>

      {nota.etiquetas && nota.etiquetas.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {nota.etiquetas.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 mb-3">
        <p>Actualizado: {formatDate(nota.updatedAt)}</p>
        {nota.archivada && <p className="text-amber-600 font-medium">📦 Archivada</p>}
      </div>

      <div className="flex justify-end gap-2">
        {onToggleFijar && (
          <button
            onClick={() => onToggleFijar(nota._id)}
            className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              nota.fijada
                ? 'text-amber-600 hover:bg-amber-50 focus:ring-amber-500'
                : 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500'
            }`}
            title={nota.fijada ? 'Desfijar' : 'Fijar'}
          >
            <Pin className={`w-4 h-4 ${nota.fijada ? 'fill-current' : ''}`} />
          </button>
        )}
        {onToggleArchivar && !nota.archivada && (
          <button
            onClick={() => onToggleArchivar(nota._id)}
            className="px-3 py-1 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            title="Archivar"
          >
            <Archive className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onEdit(nota)}
          className="px-3 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          title="Editar"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(nota._id)}
          className="px-3 py-1 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotaCard;
