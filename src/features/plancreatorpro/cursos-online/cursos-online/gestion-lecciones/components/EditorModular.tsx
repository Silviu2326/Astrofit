import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical, Trash2, Edit3, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { saveLessonContent, fetchLessonContent, LessonContent, ContentBlock } from '../gestionLeccionesApi';
import AddTextModal from './modals/AddTextModal';
import AddVideoModal from './modals/AddVideoModal';
import AddQuizModal from './modals/AddQuizModal';

const EditorModular: React.FC = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddQuizModal, setShowAddQuizModal] = useState(false);

  // Cargar contenido existente al montar el componente
  useEffect(() => {
    loadLessonContent();
  }, []);

  // Detectar cambios no guardados
  useEffect(() => {
    if (lessonContent) {
      const savedBlocks = lessonContent.blocks || [];
      setHasUnsavedChanges(JSON.stringify(blocks) !== JSON.stringify(savedBlocks));
    }
  }, [blocks, lessonContent]);

  const loadLessonContent = async () => {
    try {
      setLoading(true);
      const lesson = await fetchLessonContent('current-lesson');
      setLessonContent(lesson);
      setBlocks(lesson.blocks || []);
    } catch (error) {
      console.error('Error loading lesson content:', error);
      toast.error('Error al cargar el contenido de la lección');
    } finally {
      setLoading(false);
    }
  };

  const addBlock = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text':
        setShowAddTextModal(true);
        break;
      case 'video':
        setShowAddVideoModal(true);
        break;
      case 'quiz':
        setShowAddQuizModal(true);
        break;
      case 'image':
        // Por ahora, agregar imagen directamente (se puede crear modal después)
        const newImageBlock: ContentBlock = {
          id: `block_${Date.now()}`,
          type: 'image',
          content: 'Imagen de ejemplo',
          order: blocks.length
        };
        setBlocks([...blocks, newImageBlock]);
        toast.success('Bloque de imagen agregado');
        break;
    }
  };

  const handleSaveText = (content: string) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type: 'text',
      content,
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
    toast.success('Bloque de texto agregado');
  };

  const handleSaveVideo = (videoData: { type: 'file' | 'url'; content: string; title: string; description?: string }) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type: 'video',
      content: JSON.stringify(videoData),
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
    toast.success('Bloque de video agregado');
  };

  const handleSaveQuiz = (quizData: { title: string; description?: string; questions: any[] }) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type: 'quiz',
      content: JSON.stringify(quizData),
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
    toast.success('Bloque de quiz agregado');
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    toast.success('Bloque eliminado');
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedBlock || draggedBlock === targetId) {
      setDraggedBlock(null);
      return;
    }

    const draggedIndex = blocks.findIndex(block => block.id === draggedBlock);
    const targetIndex = blocks.findIndex(block => block.id === targetId);
    
    const newBlocks = [...blocks];
    const [draggedItem] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedItem);
    
    // Update order
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order: index
    }));
    
    setBlocks(updatedBlocks);
    setDraggedBlock(null);
    toast.success('Orden de bloques actualizado');
  };

  const handleSave = async () => {
    if (!lessonContent) {
      toast.error('Error: No se pudo cargar la lección');
      return;
    }

    setSaving(true);
    const saveToast = toast.loading('Guardando bloques...');
    
    try {
      const updatedLesson = {
        ...lessonContent,
        blocks: blocks,
        updatedAt: new Date().toISOString()
      };
      
      await saveLessonContent(updatedLesson);
      setLessonContent(updatedLesson);
      setHasUnsavedChanges(false);
      
      toast.success('Bloques guardados exitosamente', { id: saveToast });
    } catch (error) {
      toast.error('Error al guardar los bloques', { id: saveToast });
      console.error('Error saving blocks:', error);
    } finally {
      setSaving(false);
    }
  };

  const getBlockIcon = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text': return '📝';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      case 'quiz': return '❓';
      default: return '📄';
    }
  };

  const getBlockTitle = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text': return 'Bloque de Texto';
      case 'video': return 'Video';
      case 'image': return 'Imagen';
      case 'quiz': return 'Quiz';
      default: return 'Bloque';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Editor Modular</h3>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadLessonContent}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Cargando...' : 'Actualizar'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasUnsavedChanges 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Guardando...' : hasUnsavedChanges ? 'Guardar*' : 'Guardar'}
          </motion.button>
        </div>
      </div>

      {/* Add Block Buttons */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addBlock('text')}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Texto
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addBlock('video')}
          className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Video
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addBlock('image')}
          className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Imagen
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addBlock('quiz')}
          className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Quiz
        </motion.button>
      </div>

      {/* Blocks Container */}
      <div className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p>Cargando bloques...</p>
          </div>
        ) : (
          <AnimatePresence>
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <Edit3 className="w-8 h-8 mb-2" />
                <p>No hay bloques de contenido</p>
                <p className="text-sm">Agrega bloques usando los botones de arriba</p>
              </div>
            ) : (
            <div className="space-y-3">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, block.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e as unknown as React.DragEvent, block.id)}
                  className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <GripVertical className="w-5 h-5 text-gray-400" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getBlockIcon(block.type)}</span>
                      <span className="font-medium text-gray-700">
                        {getBlockTitle(block.type)}
                      </span>
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                    </div>
                    
                    {block.type === 'text' ? (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlockContent(block.id, e.target.value)}
                        placeholder="Escribe el contenido del bloque..."
                        className="w-full p-2 border rounded text-sm resize-none"
                        rows={3}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
                        {block.content || `Contenido de ${getBlockTitle(block.type).toLowerCase()}`}
                      </div>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeBlock(block.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="Eliminar bloque"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Status Bar */}
      {lessonContent && (
        <div className="flex justify-between items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-4">
            <span>{blocks.length} bloque(s)</span>
            {hasUnsavedChanges && (
              <span className="text-orange-500 font-medium">• Cambios sin guardar</span>
            )}
          </div>
          <span>Última actualización: {new Date(lessonContent.updatedAt).toLocaleString()}</span>
        </div>
      )}

      {/* Instructions */}
      <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
        💡 <strong>Tip:</strong> Arrastra los bloques para reordenarlos. Cada bloque puede contener diferentes tipos de contenido. No olvides guardar tus cambios.
      </div>

      {/* Modals */}
      <AddTextModal
        isOpen={showAddTextModal}
        onClose={() => setShowAddTextModal(false)}
        onSave={handleSaveText}
      />

      <AddVideoModal
        isOpen={showAddVideoModal}
        onClose={() => setShowAddVideoModal(false)}
        onSave={handleSaveVideo}
      />

      <AddQuizModal
        isOpen={showAddQuizModal}
        onClose={() => setShowAddQuizModal(false)}
        onSave={handleSaveQuiz}
      />
    </div>
  );
};

export default EditorModular;
