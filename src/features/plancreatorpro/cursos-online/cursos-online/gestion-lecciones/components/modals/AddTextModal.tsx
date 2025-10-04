import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bold, Italic, Underline, List } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../../../../../../components/ui/modal';

interface AddTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  initialContent?: string;
}

const AddTextModal: React.FC<AddTextModalProps> = ({ isOpen, onClose, onSave, initialContent = '' }) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Por favor ingresa algún contenido');
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading('Guardando contenido...');
    
    try {
      // Simular delay de guardado
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onSave(content);
      toast.success('Contenido guardado exitosamente', { id: saveToast });
      onClose();
    } catch (error) {
      toast.error('Error al guardar el contenido', { id: saveToast });
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

  const handleClose = () => {
    if (content.trim() && content !== initialContent) {
      const confirmLeave = window.confirm('¿Estás seguro de que quieres cerrar sin guardar?');
      if (!confirmLeave) return;
    }
    setContent(initialContent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Contenido de Texto" size="lg">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
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
          
          <div className="text-sm text-gray-500">
            {content.length} caracteres
          </div>
        </div>

        {/* Text Editor */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Contenido del Texto
          </label>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe el contenido de texto aquí...

Puedes usar:
- **texto en negrita**
- *texto en cursiva*
- <u>texto subrayado</u>
- - listas con viñetas

¡Usa la barra de herramientas para formatear tu texto!"
          />
        </div>

        {/* Preview */}
        {content.trim() && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Vista Previa
            </label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-20">
              <div className="prose prose-sm max-w-none">
                {content.split('\n').map((line, index) => {
                  if (line.startsWith('- ')) {
                    return <div key={index} className="flex items-start gap-2"><span className="text-gray-500">•</span><span>{line.substring(2)}</span></div>;
                  }
                  if (line.includes('**') && line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <div key={index}>
                        {parts.map((part, i) => 
                          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )}
                      </div>
                    );
                  }
                  if (line.includes('*') && line.includes('*')) {
                    const parts = line.split('*');
                    return (
                      <div key={index}>
                        {parts.map((part, i) => 
                          i % 2 === 1 ? <em key={i}>{part}</em> : part
                        )}
                      </div>
                    );
                  }
                  if (line.includes('<u>') && line.includes('</u>')) {
                    const parts = line.split(/<u>|<\/u>/);
                    return (
                      <div key={index}>
                        {parts.map((part, i) => 
                          i % 2 === 1 ? <u key={i}>{part}</u> : part
                        )}
                      </div>
                    );
                  }
                  return <div key={index}>{line || '\u00A0'}</div>;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving || !content.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Guardando...' : 'Guardar Contenido'}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTextModal;
