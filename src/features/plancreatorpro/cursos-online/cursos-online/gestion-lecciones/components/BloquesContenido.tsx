import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, FileText, File, HelpCircle, Plus, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContentBlock {
  id: string;
  type: 'video' | 'text' | 'pdf' | 'quiz';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const BloquesContenido: React.FC = () => {
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  const availableBlocks: ContentBlock[] = [
    {
      id: 'video',
      type: 'video',
      title: 'Video',
      description: 'Contenido multimedia',
      icon: <Video className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 hover:bg-blue-200'
    },
    {
      id: 'text',
      type: 'text',
      title: 'Texto',
      description: 'Contenido escrito',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100 hover:bg-green-200'
    },
    {
      id: 'pdf',
      type: 'pdf',
      title: 'PDF',
      description: 'Documentos',
      icon: <File className="w-5 h-5" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 hover:bg-yellow-200'
    },
    {
      id: 'quiz',
      type: 'quiz',
      title: 'Quiz',
      description: 'Evaluaciones',
      icon: <HelpCircle className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-100 hover:bg-red-200'
    }
  ];

  const handleBlockSelect = (blockId: string) => {
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter(id => id !== blockId));
      toast.success('Bloque deseleccionado');
    } else {
      setSelectedBlocks([...selectedBlocks, blockId]);
      toast.success('Bloque seleccionado');
    }
  };

  const handleAddToEditor = () => {
    if (selectedBlocks.length === 0) {
      toast.error('Selecciona al menos un bloque');
      return;
    }
    toast.success(`${selectedBlocks.length} bloque(s) agregado(s) al editor`);
    setSelectedBlocks([]);
  };

  const handlePreview = (block: ContentBlock) => {
    toast.success(`Vista previa de ${block.title}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Bloques Disponibles</h3>
        <span className="text-sm text-gray-500">
          {selectedBlocks.length} seleccionado(s)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {availableBlocks.map((block) => (
          <motion.div
            key={block.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedBlocks.includes(block.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${block.bgColor}`}
            onClick={() => handleBlockSelect(block.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${block.bgColor} ${block.color}`}>
                {block.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{block.title}</h4>
                <p className="text-xs text-gray-600">{block.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(block);
                }}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-3 h-3" />
                Vista previa
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedBlocks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-800">
              {selectedBlocks.length} bloque(s) seleccionado(s)
            </p>
            <p className="text-xs text-blue-600">
              Haz clic en "Agregar al Editor" para incluirlos en tu lección
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToEditor}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar al Editor
          </motion.button>
        </motion.div>
      )}

      <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
        💡 <strong>Tip:</strong> Selecciona los bloques que quieres usar y luego agrégalos al editor modular para crear tu lección.
      </div>
    </div>
  );
};

export default BloquesContenido;
