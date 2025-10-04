import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Eye, Upload, Image as ImageIcon, Tag, Calendar,
  FileText, Type, List, Bold, Italic, Link2, Code,
  Sparkles, X, Plus, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

interface EditorArticulosProps {
  article?: any;
  onSave?: () => void;
  onCancel?: () => void;
}

const EditorArticulos: React.FC<EditorArticulosProps> = ({ article, onSave, onCancel }) => {
  const [title, setTitle] = useState(article?.title || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(article?.content || '');
  const [imageUrl, setImageUrl] = useState(article?.imageUrl || '');
  const [category, setCategory] = useState(article?.category || 'Nutrición');
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [author, setAuthor] = useState(article?.author || '');
  const [readTime, setReadTime] = useState(article?.readTime || '');
  const [publishDate, setPublishDate] = useState('');
  const [status, setStatus] = useState<'draft' | 'scheduled' | 'published'>('draft');
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = [
    'Nutrición',
    'Entrenamiento',
    'Bienestar',
    'Motivación',
    'Ciencia y Estudios',
    'Negocio'
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulación de guardado
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onSave?.();
      }, 2000);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aquí iría la lógica real de upload
      const mockUrl = URL.createObjectURL(file);
      setImageUrl(mockUrl);
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Nutrición': 'from-emerald-500 to-teal-500',
      'Entrenamiento': 'from-orange-500 to-red-500',
      'Bienestar': 'from-purple-500 to-pink-500',
      'Motivación': 'from-blue-500 to-indigo-500',
      'Ciencia y Estudios': 'from-cyan-500 to-blue-500',
      'Negocio': 'from-amber-500 to-orange-500'
    };
    return colors[cat] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl text-white shadow-xl">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {article ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {article ? 'Actualiza tu artículo' : 'Comparte tu conocimiento con la comunidad'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-3 bg-white/80 backdrop-blur-xl border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Editar' : 'Vista Previa'}
              </button>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Panel Principal */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 space-y-6"
              >
                {/* Título */}
                <div>
                  <label htmlFor="title" className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    <Type className="w-4 h-4" />
                    Título del Artículo
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Escribe un título llamativo..."
                    className="w-full px-4 py-4 text-2xl font-bold rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4" />
                    Resumen (Excerpt)
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Un breve resumen que enganche al lector..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">{excerpt.length}/280 caracteres</p>
                </div>

                {/* Imagen destacada */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    <ImageIcon className="w-4 h-4" />
                    Imagen Destacada
                  </label>

                  {imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden group">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setImageUrl('')}
                          className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                        >
                          Eliminar imagen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click para subir</span> o arrastra una imagen
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG, WebP (MAX. 2MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  <div className="mt-3">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="O pega una URL de imagen..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 text-sm"
                    />
                  </div>
                </div>

                {/* Contenido */}
                <div>
                  <label htmlFor="content" className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    <FileText className="w-4 h-4" />
                    Contenido del Artículo
                  </label>

                  {/* Toolbar simple */}
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-t-2xl border-2 border-b-0 border-gray-200">
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Negrita">
                      <Bold className="w-4 h-4 text-gray-600" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Cursiva">
                      <Italic className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Enlace">
                      <Link2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Lista">
                      <List className="w-4 h-4 text-gray-600" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Código">
                      <Code className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="ml-auto text-xs text-gray-500">
                      Markdown soportado
                    </div>
                  </div>

                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe el contenido de tu artículo aquí... Puedes usar Markdown."
                    rows={20}
                    className="w-full px-4 py-4 rounded-b-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 resize-none font-mono text-sm leading-relaxed"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {content.split(' ').filter(w => w).length} palabras • {Math.ceil(content.split(' ').filter(w => w).length / 200)} min de lectura estimado
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Estado de Publicación */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    Publicación
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Estado
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 font-semibold cursor-pointer"
                      >
                        <option value="draft">Borrador</option>
                        <option value="scheduled">Programado</option>
                        <option value="published">Publicado</option>
                      </select>
                    </div>

                    {status === 'scheduled' && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Fecha de Publicación
                        </label>
                        <input
                          type="datetime-local"
                          value={publishDate}
                          onChange={(e) => setPublishDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Categoría y Metadata */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-emerald-600" />
                    Categoría y Metadata
                  </h3>

                  <div className="space-y-4">
                    {/* Categoría */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Categoría
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 font-semibold cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>

                      {category && (
                        <div className={`mt-3 px-4 py-2 bg-gradient-to-r ${getCategoryColor(category)} text-white text-sm font-bold rounded-xl text-center`}>
                          {category}
                        </div>
                      )}
                    </div>

                    {/* Autor */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Autor
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Nombre del autor"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900"
                      />
                    </div>

                    {/* Tiempo de lectura */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Tiempo de lectura
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={readTime}
                          onChange={(e) => setReadTime(e.target.value)}
                          placeholder="ej: 10 min"
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900"
                        />
                        <div className="p-3 bg-gray-100 rounded-xl">
                          <Clock className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-emerald-600" />
                    Etiquetas (Tags)
                  </h3>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        placeholder="Agregar etiqueta"
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-xl flex items-center gap-2"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Acciones */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Guardando...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        ¡Guardado!
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Guardar Artículo
                      </>
                    )}
                  </button>

                  {onCancel && (
                    <button
                      type="button"
                      onClick={onCancel}
                      className="w-full px-6 py-4 bg-white/80 backdrop-blur-xl border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancelar
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditorArticulos;
