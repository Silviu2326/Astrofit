import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Tag, AlertCircle, Palette } from 'lucide-react';
import { Nota, NotaCreateDTO } from '../notasApi';

interface NotaFormProps {
  nota?: Nota;
  onSubmit: (nota: NotaCreateDTO & { _id?: string }) => void;
  onClose: () => void;
  preselectedClientId?: string;
}

const NotaForm: React.FC<NotaFormProps> = ({ nota, onSubmit, onClose, preselectedClientId }) => {
  const [titulo, setTitulo] = useState(nota?.titulo || '');
  const [contenido, setContenido] = useState(nota?.contenido || '');
  const [categoria, setCategoria] = useState<NotaCreateDTO['categoria']>(nota?.categoria || 'general');
  const [etiquetas, setEtiquetas] = useState(nota?.etiquetas.join(', ') || '');
  const [color, setColor] = useState(nota?.color || '#f59e0b');

  const colores = [
    { name: 'Ámbar', value: '#f59e0b' },
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Verde', value: '#10b981' },
    { name: 'Rojo', value: '#ef4444' },
    { name: 'Púrpura', value: '#8b5cf6' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Gris', value: '#6b7280' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const etiquetasArray = etiquetas
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const notaData: NotaCreateDTO & { _id?: string } = {
      titulo,
      contenido,
      categoria,
      etiquetas: etiquetasArray,
      color,
    };

    if (nota) {
      notaData._id = nota._id;
    }

    onSubmit(notaData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {nota ? 'Editar Nota' : 'Nueva Nota'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Título de la nota"
              required
            />
          </div>

          {/* Contenido */}
          <div>
            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
              Contenido *
            </label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Escribe el contenido de tu nota..."
              required
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Categoría
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as NotaCreateDTO['categoria'])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="general">General</option>
              <option value="seguimiento">Seguimiento</option>
              <option value="observacion">Observación</option>
              <option value="recordatorio">Recordatorio</option>
              <option value="importante">Importante</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Etiquetas */}
          <div>
            <label htmlFor="etiquetas" className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Etiquetas (separadas por comas)
            </label>
            <input
              type="text"
              id="etiquetas"
              value={etiquetas}
              onChange={(e) => setEtiquetas(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="ej: seguimiento, importante, cliente"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4 inline mr-2" />
              Color
            </label>
            <div className="flex flex-wrap gap-3">
              {colores.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    color === c.value ? 'border-gray-800 scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              {nota ? 'Guardar Cambios' : 'Crear Nota'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NotaForm;
