import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, Tag, FolderOpen } from 'lucide-react';
import { useCreateArticleMutation } from '../contenidosArticulosApi';
import toast from 'react-hot-toast';

interface CrearArticuloModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrearArticuloModal: React.FC<CrearArticuloModalProps> = ({ isOpen, onClose }) => {
  const [createArticle, { isLoading }] = useCreateArticleMutation();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categories: [] as string[],
    tags: [] as string[],
    imageUrl: ''
  });
  
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  
  const availableCategories = ['Nutrición', 'Entrenamiento', 'Bienestar', 'Motivación', 'Tecnología'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Por favor, completa el título y contenido del artículo');
      return;
    }

    try {
      await createArticle({
        ...formData,
        imageUrl: formData.imageUrl || '/placeholder-product.svg'
      }).unwrap();
      
      toast.success('Artículo creado exitosamente');
      handleClose();
    } catch (error) {
      toast.error('Error al crear el artículo');
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      categories: [],
      tags: [],
      imageUrl: ''
    });
    setNewCategory('');
    setNewTag('');
    onClose();
  };

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl my-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Crear Nuevo Artículo</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título del Artículo *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Ingresa el título del artículo"
                    required
                  />
                </div>

                {/* URL de imagen */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL de Imagen
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Categorías */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categorías
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar categoría</option>
                        {availableCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={addCategory}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        <FolderOpen className="w-4 h-4" />
                        Agregar
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.categories.map(category => (
                        <span
                          key={category}
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => removeCategory(category)}
                            className="hover:text-indigo-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Etiquetas
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Ingresa una etiqueta y presiona Enter"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                      >
                        <Tag className="w-4 h-4" />
                        Agregar
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-purple-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contenido del Artículo *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={12}
                    placeholder="Escribe el contenido de tu artículo aquí. Puedes usar HTML básico para formatear el texto."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Puedes usar HTML básico para formatear el texto (p, h1, h2, h3, ul, ol, li, strong, em, etc.)
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isLoading ? 'Creando...' : 'Crear Artículo'}
                </button>
              </div>
            </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CrearArticuloModal;
