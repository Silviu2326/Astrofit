
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Code, Palette, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { EmailTemplate, updateEmailTemplate } from '../plantillasEmailApi';

interface EditorPlantillasProps {
  selectedTemplate?: EmailTemplate | null;
}

const EditorPlantillas: React.FC<EditorPlantillasProps> = ({ selectedTemplate }) => {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [content, setContent] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Update template when selectedTemplate changes
  useEffect(() => {
    if (selectedTemplate) {
      setTemplate(selectedTemplate);
      setContent(selectedTemplate.content);
      setName(selectedTemplate.name);
      setCategory(selectedTemplate.category);
    } else {
      setTemplate(null);
      setContent('');
      setName('');
      setCategory('');
    }
  }, [selectedTemplate]);

  const handleSave = async () => {
    if (template) {
      setLoading(true);
      try {
        const updatedTemplate = { ...template, content, name, category };
        await updateEmailTemplate(updatedTemplate);
        setTemplate(updatedTemplate);
        toast.success('Plantilla guardada exitosamente!');
      } catch (err) {
        toast.error('Error al guardar la plantilla');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Palette className="w-8 h-8 text-yellow-300" />
            <div className="absolute inset-0 w-8 h-8 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
          </div>
          <h2 className="text-2xl font-bold text-white">Editor de Plantillas</h2>
        </div>
        
        {template && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white hover:bg-white/30 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {template ? (
          <div className="space-y-6">
            {/* Template Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Plantilla
                </label>
                <input
                  type="text"
                  id="templateName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingresa el nombre de la plantilla"
                />
              </div>
              <div>
                <label htmlFor="templateCategory" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <input
                  type="text"
                  id="templateCategory"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ej: Bienvenida, Promoción, etc."
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'edit'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Code className="w-4 h-4 inline mr-2" />
                  Editar Código
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'preview'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  Vista Previa
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'edit' ? (
                <div>
                  <label htmlFor="templateContent" className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido HTML
                  </label>
                  <textarea
                    id="templateContent"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors font-mono text-sm h-96 resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tu código HTML aquí..."
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
                  <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 min-h-96">
                    {content ? (
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-64 text-gray-500">
                        <div className="text-center">
                          <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No hay contenido para mostrar</p>
                          <p className="text-sm">Edita el código HTML para ver la vista previa</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">Selecciona una plantilla</p>
            <p className="text-gray-400 text-sm">Elige una plantilla de la galería para comenzar a editarla</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPlantillas;
