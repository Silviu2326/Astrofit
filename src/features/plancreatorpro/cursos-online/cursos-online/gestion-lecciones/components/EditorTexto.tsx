import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Bold, Italic, Underline, List, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { saveLessonContent, fetchLessonContent, LessonContent } from '../gestionLeccionesApi';

const EditorTexto: React.FC = () => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Cargar contenido existente al montar el componente
  useEffect(() => {
    loadLessonContent();
  }, []);

  // Detectar cambios no guardados
  useEffect(() => {
    if (lessonContent) {
      const textBlock = lessonContent.blocks.find(block => block.type === 'text');
      const savedContent = textBlock?.content || '';
      setHasUnsavedChanges(content !== savedContent);
    }
  }, [content, lessonContent]);

  const loadLessonContent = async () => {
    try {
      setLoading(true);
      const lesson = await fetchLessonContent('current-lesson');
      setLessonContent(lesson);
      
      // Buscar bloque de texto existente
      const textBlock = lesson.blocks.find(block => block.type === 'text');
      if (textBlock) {
        setContent(textBlock.content);
      }
    } catch (error) {
      console.error('Error loading lesson content:', error);
      toast.error('Error al cargar el contenido de la lección');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('No hay contenido para guardar');
      return;
    }

    if (!lessonContent) {
      toast.error('Error: No se pudo cargar la lección');
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading('Guardando contenido...');
    
    try {
      // Crear o actualizar el bloque de texto
      const updatedLesson = { ...lessonContent };
      const existingTextBlockIndex = updatedLesson.blocks.findIndex(block => block.type === 'text');
      
      const textBlock = {
        id: existingTextBlockIndex >= 0 ? updatedLesson.blocks[existingTextBlockIndex].id : `text_${Date.now()}`,
        type: 'text' as const,
        content: content,
        order: existingTextBlockIndex >= 0 ? updatedLesson.blocks[existingTextBlockIndex].order : updatedLesson.blocks.length,
      };

      if (existingTextBlockIndex >= 0) {
        updatedLesson.blocks[existingTextBlockIndex] = textBlock;
      } else {
        updatedLesson.blocks.push(textBlock);
      }

      updatedLesson.updatedAt = new Date().toISOString();
      
      await saveLessonContent(updatedLesson);
      setLessonContent(updatedLesson);
      setHasUnsavedChanges(false);
      
      toast.success('Contenido guardado exitosamente', { id: saveToast });
    } catch (error) {
      toast.error('Error al guardar el contenido', { id: saveToast });
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormat = (format: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    toast.success(`Formato ${format} aplicado`);
  };

  const handleExport = () => {
    if (!content.trim()) {
      toast.error('No hay contenido para exportar');
      return;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leccion-texto-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Contenido exportado exitosamente');
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleFormat('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Negrita"
        >
          <Bold className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleFormat('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Cursiva"
        >
          <Italic className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleFormat('underline')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Subrayado"
        >
          <Underline className="w-4 h-4" />
        </motion.button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleFormat('list')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Lista"
        >
          <List className="w-4 h-4" />
        </motion.button>
        
        <div className="flex-1" />
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          disabled={!content.trim()}
          className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving || !content.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            hasUnsavedChanges 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Guardando...' : hasUnsavedChanges ? 'Guardar*' : 'Guardar'}
        </motion.button>
      </div>

      {/* Text Editor */}
      {loading ? (
        <div className="border rounded-lg p-8 text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando editor...</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <textarea
            className="w-full h-48 p-4 focus:outline-none resize-none"
            value={content}
            onChange={handleChange}
            placeholder="Escribe el contenido de la lección aquí...

Puedes usar:
- **texto en negrita**
- *texto en cursiva*
- <u>texto subrayado</u>
- - listas con viñetas

¡Usa la barra de herramientas para formatear tu texto!"
          />
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-4 text-gray-500">
          <span>{content.length} caracteres</span>
          <span>{content.split('\n').length} líneas</span>
          {hasUnsavedChanges && (
            <span className="text-orange-500 font-medium">• Cambios sin guardar</span>
          )}
        </div>
        
        {lessonContent && (
          <div className="flex items-center gap-2 text-gray-500">
            <FileText className="w-4 h-4" />
            <span>Última actualización: {new Date(lessonContent.updatedAt).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorTexto;
