import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Tags,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Link as LinkIcon,
  Settings
} from 'lucide-react';
import { getTags, addTag, updateTag, deleteTag, Tag } from '../fuentesLeadApi';

const EtiquetasCanales: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTagName, setNewTagName] = useState<string>('');
  const [newTagColor, setNewTagColor] = useState<string>('#8B5CF6');
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
      setNewTagColor('#8B5CF6');
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
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full"></div>
            <p className="text-gray-600 font-semibold">Cargando etiquetas...</p>
          </div>
        </div>
      </div>
    );
  }

  const colorPresets = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#06B6D4', '#6366F1'
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Tags className="w-6 h-6" />
            </div>
            Etiquetas y Canales
          </h3>
          <p className="text-indigo-100 mt-2">Organiza y personaliza tus fuentes de leads</p>
        </div>
      </div>

      <div className="p-6">
        {/* Formulario de creación/edición */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 border border-gray-200"
        >
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            {editingTag ? (
              <>
                <Edit2 className="w-5 h-5" />
                Editar Etiqueta
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Añadir Nueva Etiqueta
              </>
            )}
          </h4>

          <div className="space-y-4">
            {/* Input de nombre */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Nombre de la etiqueta
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-semibold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                placeholder="Ej: Premium, Orgánico, Campaña..."
                value={editingTag ? editingTag.name : newTagName}
                onChange={(e) => editingTag ? setEditingTag({ ...editingTag, name: e.target.value }) : setNewTagName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    editingTag ? handleUpdateTag() : handleAddTag();
                  }
                }}
              />
            </div>

            {/* Selector de color */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Color
              </label>
              <div className="flex items-center gap-3">
                <div className="flex gap-2 flex-wrap flex-1">
                  {colorPresets.map(color => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => editingTag ? setEditingTag({ ...editingTag, color }) : setNewTagColor(color)}
                      className={`w-10 h-10 rounded-xl shadow-lg transition-all ${
                        (editingTag ? editingTag.color : newTagColor) === color
                          ? 'ring-4 ring-offset-2 ring-gray-400 scale-110'
                          : 'hover:shadow-xl'
                      }`}
                      style={{ backgroundColor: color }}
                    ></motion.button>
                  ))}
                </div>
                <input
                  type="color"
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 cursor-pointer"
                  value={editingTag ? editingTag.color : newTagColor}
                  onChange={(e) => editingTag ? setEditingTag({ ...editingTag, color: e.target.value }) : setNewTagColor(e.target.value)}
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-2">
              {editingTag ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdateTag}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Guardar Cambios
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditingTag(null)}
                    className="px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancelar
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddTag}
                  disabled={!newTagName.trim()}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Añadir Etiqueta
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Lista de etiquetas existentes */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Etiquetas Existentes ({tags.length})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: tag.color }}
                  >
                    <Tags className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingTag(tag)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteTag(tag.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <h5 className="text-lg font-bold text-gray-900 mb-2">{tag.name}</h5>

                <div className="flex items-center gap-2">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.color}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {tags.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Tags className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">No hay etiquetas creadas</p>
              <p className="text-sm text-gray-500">Añade tu primera etiqueta para empezar</p>
            </div>
          )}
        </div>

        {/* Sección de configuración UTM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
        >
          <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuración Avanzada
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-xl">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">UTM Tracking</p>
                <p className="text-sm text-blue-700">
                  Configura parámetros UTM personalizados para rastrear el origen de tus campañas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-500 rounded-xl">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-900 mb-1">Integraciones</p>
                <p className="text-sm text-indigo-700">
                  Conecta con Google Analytics, Facebook Pixel y otras herramientas de seguimiento
                </p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Configurar Integraciones
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default EtiquetasCanales;
