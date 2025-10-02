import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save, FileText, Bold, Italic, List, Share2, Download,
  Paperclip, Tag, X, Upload
} from 'lucide-react';

interface Tag {
  id: string;
  label: string;
  color: string;
}

const EditorNotas: React.FC = () => {
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const predefinedTags = [
    { label: 'Progreso', color: 'from-green-500 to-emerald-600' },
    { label: 'Técnica', color: 'from-blue-500 to-indigo-600' },
    { label: 'Observación', color: 'from-purple-500 to-pink-600' },
    { label: 'Importante', color: 'from-orange-500 to-red-600' },
  ];

  const handleSaveNote = () => {
    console.log('Guardando nota:', { title: noteTitle, content: noteContent, category, tags, files: attachedFiles });
    setNoteContent('');
    setNoteTitle('');
    setCategory('');
    setTags([]);
    setAttachedFiles([]);
  };

  const handleAddTag = (label: string, color: string) => {
    if (!tags.find(t => t.label === label)) {
      setTags([...tags, { id: Date.now().toString(), label, color }]);
    }
  };

  const handleRemoveTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleShareNote = () => {
    console.log('Compartiendo nota con cliente...');
    alert('Función de compartir con cliente (próximamente)');
  };

  const handleExportPDF = () => {
    console.log('Exportando a PDF...');
    alert('Función de exportar a PDF (próximamente)');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Editor de Notas Profesional</h3>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareNote}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-all duration-300 group"
              title="Compartir con cliente"
            >
              <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleExportPDF}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-all duration-300 group"
              title="Exportar a PDF"
            >
              <Download className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Body del editor */}
      <div className="p-6">
        {/* Título de la nota */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
            placeholder="Título de la nota..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>

        {/* Barra de herramientas de formato */}
        <div className="mb-4 flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`p-2 rounded-lg transition-all duration-300 ${isBold ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
            title="Negrita"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`p-2 rounded-lg transition-all duration-300 ${isItalic ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
            title="Cursiva"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 transition-all duration-300"
            title="Lista"
          >
            <List className="w-4 h-4" />
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* Adjuntar archivo */}
          <label className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 transition-all duration-300 cursor-pointer">
            <Paperclip className="w-4 h-4" />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileAttach}
            />
          </label>
        </div>

        {/* Área de texto principal */}
        <div className="mb-4">
          <textarea
            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-y min-h-[300px]"
            placeholder="Escribe tus observaciones profesionales aquí..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            style={{
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal'
            }}
          ></textarea>
        </div>

        {/* Archivos adjuntos */}
        {attachedFiles.length > 0 && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Archivos adjuntos ({attachedFiles.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-blue-200"
                >
                  <span className="text-xs text-gray-700">{file.name}</span>
                  <button
                    onClick={() => setAttachedFiles(attachedFiles.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categoría */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
          <select
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            <option value="sesion">Sesión</option>
            <option value="progreso">Progreso</option>
            <option value="tecnica">Técnica</option>
            <option value="observacion">Observación General</option>
            <option value="objetivo">Objetivos</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Etiquetas
          </label>

          {/* Tags predefinidos */}
          <div className="flex flex-wrap gap-2 mb-3">
            {predefinedTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleAddTag(tag.label, tag.color)}
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${tag.color} hover:scale-105 transition-transform duration-300`}
              >
                + {tag.label}
              </button>
            ))}
          </div>

          {/* Tags seleccionados */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-white bg-gradient-to-r ${tag.color}`}
                >
                  <span className="text-xs font-semibold">{tag.label}</span>
                  <button
                    onClick={() => handleRemoveTag(tag.id)}
                    className="hover:scale-110 transition-transform"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón de guardar */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveNote}
          className="w-full relative overflow-hidden bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            <span className="font-bold text-lg">Guardar Nota</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EditorNotas;
