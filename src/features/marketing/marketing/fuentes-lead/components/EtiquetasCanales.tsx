import React, { useEffect, useState } from 'react';
import { getTags, addTag, updateTag, deleteTag, Tag } from '../fuentesLeadApi';

const EtiquetasCanales: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTagName, setNewTagName] = useState<string>('');
  const [newTagColor, setNewTagColor] = useState<string>('#000000');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    const data = await getTags();
    setTags(data);
    setLoading(false);
  };

  const handleAddTag = async () => {
    if (newTagName.trim()) {
      await addTag(newTagName, newTagColor);
      setNewTagName('');
      setNewTagColor('#000000');
      fetchTags();
    }
  };

  const handleUpdateTag = async () => {
    if (editingTag && editingTag.name.trim()) {
      await updateTag(editingTag.id, editingTag.name, editingTag.color);
      setEditingTag(null);
      fetchTags();
    }
  };

  const handleDeleteTag = async (id: string) => {
    await deleteTag(id);
    fetchTags();
  };

  if (loading) {
    return <div className="text-center py-4">Cargando etiquetas...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Gestión de Etiquetas de Canales</h3>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-600 mb-2">{editingTag ? 'Editar Etiqueta' : 'Añadir Nueva Etiqueta'}</h4>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre de la etiqueta"
            value={editingTag ? editingTag.name : newTagName}
            onChange={(e) => editingTag ? setEditingTag({ ...editingTag, name: e.target.value }) : setNewTagName(e.target.value)}
          />
          <input
            type="color"
            className="p-1 border border-gray-300 rounded-md"
            value={editingTag ? editingTag.color : newTagColor}
            onChange={(e) => editingTag ? setEditingTag({ ...editingTag, color: e.target.value }) : setNewTagColor(e.target.value)}
          />
          {editingTag ? (
            <button
              onClick={handleUpdateTag}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Añadir
            </button>
          )}
          {editingTag && (
            <button
              onClick={() => setEditingTag(null)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-600 mb-2">Etiquetas Existentes</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: tag.color, color: '#ffffff' }}
            >
              {tag.name}
              <button
                onClick={() => setEditingTag(tag)}
                className="ml-2 text-white hover:text-gray-200 focus:outline-none"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteTag(tag.id)}
                className="ml-1 text-white hover:text-gray-200 focus:outline-none"
              >
                ❌
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EtiquetasCanales;
