import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit3, Image as ImageIcon, FileText, Clock, Users, ChefHat, Tag
} from 'lucide-react';

interface RecetaEditorProps {
  receta: any;
  onRecetaUpdate?: (updatedData: any) => void;
}

const RecetaEditor: React.FC<RecetaEditorProps> = ({ receta, onRecetaUpdate }) => {
  const [editedReceta, setEditedReceta] = useState(receta || {});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    const updated = { ...editedReceta, [field]: value };
    setEditedReceta(updated);
    onRecetaUpdate?.(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-fuchsia-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Editor de Receta</h3>
            <p className="text-sm text-gray-600">Edita todos los campos de forma inline</p>
          </div>
        </div>

        {/* Campos editables */}
        <div className="space-y-4">
          {/* Nombre */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <ChefHat className="w-4 h-4" />
              Nombre de la Receta
            </label>
            <input
              type="text"
              value={editedReceta.nombre || ''}
              onChange={(e) => handleChange('nombre', e.target.value)}
              onFocus={() => setFocusedField('nombre')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm ${
                focusedField === 'nombre'
                  ? 'border-fuchsia-500 ring-4 ring-fuchsia-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Nombre de la receta..."
            />
          </div>

          {/* Descripción */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Descripción
            </label>
            <textarea
              value={editedReceta.descripcion || ''}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              onFocus={() => setFocusedField('descripcion')}
              onBlur={() => setFocusedField(null)}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none ${
                focusedField === 'descripcion'
                  ? 'border-fuchsia-500 ring-4 ring-fuchsia-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Describe tu receta..."
            />
          </div>

          {/* Grid de campos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Categoría */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4" />
                Categoría
              </label>
              <select
                value={editedReceta.categoria || ''}
                onChange={(e) => handleChange('categoria', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option>Ensaladas</option>
                <option>Sopas</option>
                <option>Plato Principal</option>
                <option>Postres</option>
                <option>Desayunos</option>
                <option>Snacks</option>
              </select>
            </div>

            {/* Dificultad */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <ChefHat className="w-4 h-4" />
                Dificultad
              </label>
              <select
                value={editedReceta.dificultad || ''}
                onChange={(e) => handleChange('dificultad', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option>Fácil</option>
                <option>Media</option>
                <option>Difícil</option>
              </select>
            </div>

            {/* Tiempo Preparación */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4" />
                Tiempo Preparación (min)
              </label>
              <input
                type="number"
                value={editedReceta.tiempoPreparacion || 0}
                onChange={(e) => handleChange('tiempoPreparacion', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                min="0"
              />
            </div>

            {/* Tiempo Cocción */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4" />
                Tiempo Cocción (min)
              </label>
              <input
                type="number"
                value={editedReceta.tiempoCoccion || 0}
                onChange={(e) => handleChange('tiempoCoccion', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                min="0"
              />
            </div>

            {/* Porciones */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Users className="w-4 h-4" />
                Porciones
              </label>
              <input
                type="number"
                value={editedReceta.porciones || 1}
                onChange={(e) => handleChange('porciones', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                min="1"
              />
            </div>
          </div>

          {/* Foto URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4" />
              URL de la Foto
            </label>
            <input
              type="text"
              value={editedReceta.fotoUrl || ''}
              onChange={(e) => handleChange('fotoUrl', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="https://..."
            />
            {editedReceta.fotoUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border-2 border-gray-200">
                <img
                  src={editedReceta.fotoUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Notas Personales */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Notas Personales
            </label>
            <textarea
              value={editedReceta.notasPersonales || ''}
              onChange={(e) => handleChange('notasPersonales', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              placeholder="Notas, tips o variaciones..."
            />
          </div>

          {/* Info de cambios guardados */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <p className="text-sm text-green-700">
              <span className="font-semibold">✓</span> Los cambios se guardan automáticamente
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecetaEditor;
