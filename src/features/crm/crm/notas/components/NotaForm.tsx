
import React, { useState, useEffect } from 'react';
import { Nota, getClients, getTeamMembers } from '../notasApi';

interface NotaFormProps {
  nota?: Nota; // Optional: if provided, it's an edit form
  onSubmit: (nota: Omit<Nota, 'id' | 'timestamp'> | Nota) => void;
  onClose: () => void;
  preselectedClientId?: string; // For quick note creation
}

interface Client {
  id: string;
  name: string;
}

interface TeamMember {
  id: string;
  name: string;
}

const NotaForm: React.FC<NotaFormProps> = ({ nota, onSubmit, onClose, preselectedClientId }) => {
  const [title, setTitle] = useState(nota?.title || '');
  const [content, setContent] = useState(nota?.content || '');
  const [clientId, setClientId] = useState(nota?.clientId || preselectedClientId || '');
  const [tags, setTags] = useState(nota?.tags.join(', ') || '');
  const [assignedTo, setAssignedTo] = useState(nota?.assignedTo || '');
  const [priority, setPriority] = useState<Nota['priority']>(nota?.priority || 'media');
  const [isPrivate, setIsPrivate] = useState(nota?.isPrivate || false);
  const [comments, setComments] = useState(nota?.comments || '');
  const [clients, setClients] = useState<Client[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      const fetchedClients = await getClients();
      const fetchedTeamMembers = await getTeamMembers();
      setClients(fetchedClients);
      setTeamMembers(fetchedTeamMembers);
    };
    fetchDropdownData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNota: Omit<Nota, 'id' | 'timestamp'> = {
      title,
      content,
      clientId: clientId || undefined,
      clientName: clients.find(c => c.id === clientId)?.name || undefined,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      author: nota?.author || 'Current User', // Placeholder for current user
      assignedTo: assignedTo || undefined,
      priority,
      isPrivate,
      comments: comments || undefined,
    };

    if (nota) {
      // Editing existing note
      onSubmit({ ...newNota, id: nota.id, timestamp: nota.timestamp });
    } else {
      // Creating new note
      onSubmit(newNota);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{nota ? 'Editar Nota' : 'Crear Nueva Nota'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenido</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente/Lead Asociado (Opcional)</label>
            <select
              id="clientId"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Seleccionar Cliente/Lead --</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Etiquetas (separadas por comas)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ej: seguimiento, importante, reunión"
            />
          </div>
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Asignar a miembro del equipo (Opcional)</label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Seleccionar Miembro --</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Nota['priority'])}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="isPrivate"
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-900">Nota privada</label>
          </div>
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comentarios adicionales (Opcional)</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {nota ? 'Guardar Cambios' : 'Crear Nota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotaForm;
