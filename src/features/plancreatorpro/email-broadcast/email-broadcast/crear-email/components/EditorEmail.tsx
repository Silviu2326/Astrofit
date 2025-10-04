import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Image, MousePointer, Trash2, Copy, Settings, Type, Link, List, Quote } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditorEmailProps {
  onContentChange: (content: string) => void;
  onBlockConfigure: (block: any) => void;
}

export interface EditorEmailRef {
  updateBlockConfig: (blockId: number, config: any) => void;
}

interface Block {
  id: number;
  type: 'text' | 'image' | 'button' | 'heading' | 'link' | 'list' | 'quote';
  content: string;
  config?: any;
}

const EditorEmail = forwardRef<EditorEmailRef, EditorEmailProps>(({ onContentChange, onBlockConfigure }, ref) => {
  const [blocks, setBlocks] = useState<Block[]>([
    { 
      id: 1, 
      type: 'text', 
      content: 'Este es un bloque de texto de ejemplo. Haz clic en configurar para editarlo.',
      config: { content: 'Este es un bloque de texto de ejemplo. Haz clic en configurar para editarlo.' }
    },
    { 
      id: 2, 
      type: 'image', 
      content: 'Imagen placeholder',
      config: { content: '', url: '', alt: '' }
    },
    { 
      id: 3, 
      type: 'button', 
      content: 'Botón de Ejemplo',
      config: { buttonText: 'Botón de Ejemplo', buttonUrl: '#', buttonStyle: 'primary' }
    }
  ]);


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData('text/plain') as 'text' | 'image' | 'button' | 'heading' | 'link' | 'list' | 'quote';
    
    if (blockType) {
      handleAddBlock(blockType);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    updateBlockConfig: (blockId: number, config: any) => {
      setBlocks(prevBlocks => {
        const updatedBlocks = prevBlocks.map(block => 
          block.id === blockId 
            ? { 
                ...block, 
                config: { ...block.config, ...config },
                content: getBlockDisplayContent(block.type, config)
              } 
            : block
        );
        onContentChange(JSON.stringify(updatedBlocks));
        return updatedBlocks;
      });
    }
  }), [onContentChange]);

  const handleBlockConfigure = (block: Block) => {
    onBlockConfigure(block);
  };

  const getBlockDisplayContent = (type: string, config: any) => {
    switch (type) {
      case 'text':
      case 'heading':
      case 'quote':
        return config.content || '';
      case 'image':
        return config.content || config.url || 'Imagen';
      case 'button':
        return config.buttonText || 'Botón';
      case 'link':
        return config.content || 'Enlace';
      case 'list':
        return config.listItems?.join(', ') || 'Lista';
      default:
        return '';
    }
  };

  const handleBlockDelete = (id: number) => {
    setBlocks(blocks.filter(block => block.id !== id));
    onContentChange(JSON.stringify(blocks.filter(block => block.id !== id)));
    toast.success('Bloque eliminado');
  };

  const handleBlockDuplicate = (id: number) => {
    const blockToDuplicate = blocks.find(block => block.id === id);
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: Math.max(...blocks.map(b => b.id)) + 1,
        content: `${blockToDuplicate.content} (copia)`
      };
      setBlocks([...blocks, newBlock]);
      onContentChange(JSON.stringify([...blocks, newBlock]));
      toast.success('Bloque duplicado');
    }
  };

  const handleAddBlock = (type: 'text' | 'image' | 'button' | 'heading' | 'link' | 'list' | 'quote') => {
    const defaultConfigs = {
      text: { content: '' },
      image: { content: '', url: '', alt: '' },
      button: { buttonText: '', buttonUrl: '', buttonStyle: 'primary' },
      heading: { content: '', headingLevel: 'h2' },
      link: { content: '', url: '' },
      list: { listType: 'ul', listItems: [''] },
      quote: { content: '', quoteAuthor: '' }
    };

    const newBlock: Block = {
      id: Math.max(...blocks.map(b => b.id)) + 1,
      type,
      content: `Nuevo ${type}`,
      config: defaultConfigs[type]
    };
    
    setBlocks([...blocks, newBlock]);
    onContentChange(JSON.stringify([...blocks, newBlock]));
    
    // Open config modal immediately for new blocks
    onBlockConfigure(newBlock);
  };

  const renderBlockContent = (block: Block) => {
    const config = block.config || {};
    
    switch (block.type) {
      case 'text':
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{config.content || block.content}</p>
          </div>
        );
      
      case 'heading':
        const HeadingTag = config.headingLevel || 'h2';
        return (
          <HeadingTag className="text-2xl font-bold text-gray-900 mb-2">
            {config.content || block.content}
          </HeadingTag>
        );
      
      case 'image':
        const imageSrc = config.content || config.url;
        return (
          <div className="text-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={config.alt || 'Imagen'}
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-gray-500">
                <Image className="w-12 h-12 mx-auto mb-2" />
                <p>Imagen no configurada</p>
              </div>
            )}
          </div>
        );
      
      case 'button':
        const buttonStyles = {
          primary: 'bg-blue-500 hover:bg-blue-600 text-white',
          secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
          success: 'bg-green-500 hover:bg-green-600 text-white',
          warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          danger: 'bg-red-500 hover:bg-red-600 text-white'
        };
        return (
          <div className="text-center">
            <a
              href={config.buttonUrl || '#'}
              className={`inline-block px-6 py-3 rounded-lg font-semibold transition-colors ${buttonStyles[config.buttonStyle as keyof typeof buttonStyles] || buttonStyles.primary}`}
            >
              {config.buttonText || block.content}
            </a>
          </div>
        );
      
      case 'link':
        return (
          <div>
            <a
              href={config.url || '#'}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {config.content || block.content}
            </a>
          </div>
        );
      
      case 'list':
        const ListTag = config.listType === 'ol' ? 'ol' : 'ul';
        return (
          <ListTag className={config.listType === 'ol' ? 'list-decimal list-inside' : 'list-disc list-inside'}>
            {config.listItems?.map((item: string, index: number) => (
              <li key={index} className="text-gray-700 mb-1">{item}</li>
            ))}
          </ListTag>
        );
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
            <p>"{config.content || block.content}"</p>
            {config.quoteAuthor && (
              <footer className="text-sm text-gray-500 mt-2">— {config.quoteAuthor}</footer>
            )}
          </blockquote>
        );
      
      default:
        return <p className="text-gray-700">{block.content}</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden h-[600px] flex flex-col"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Edit3 className="w-6 h-6" />
          </div>
          Editor de Email (Drag & Drop)
        </h2>
      </div>

      {/* Editor Area */}
      <div 
        className="flex-grow p-6 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-4">
          {blocks.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Arrastra y suelta bloques aquí para construir tu email</p>
          ) : (
            blocks.map((block) => (
          <motion.div
                key={block.id}
            whileHover={{ scale: 1.02 }}
                className="bg-white border-2 border-dashed border-indigo-300 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group relative"
              >
                {/* Block actions */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleBlockConfigure(block)}
                    className="p-1 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                    title="Configurar bloque"
                  >
                    <Settings className="w-4 h-4 text-green-600" />
                  </button>
                  <button
                    onClick={() => handleBlockDuplicate(block.id)}
                    className="p-1 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                    title="Duplicar bloque"
                  >
                    <Copy className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleBlockDelete(block.id)}
                    className="p-1 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                    title="Eliminar bloque"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
              </div>

                {/* Block header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    block.type === 'text' ? 'bg-indigo-100' :
                    block.type === 'image' ? 'bg-purple-100' :
                    block.type === 'button' ? 'bg-pink-100' :
                    block.type === 'heading' ? 'bg-blue-100' :
                    block.type === 'link' ? 'bg-orange-100' :
                    block.type === 'list' ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    {block.type === 'text' && <Edit3 className="w-5 h-5 text-indigo-600" />}
                    {block.type === 'image' && <Image className="w-5 h-5 text-purple-600" />}
                    {block.type === 'button' && <MousePointer className="w-5 h-5 text-pink-600" />}
                    {block.type === 'heading' && <Type className="w-5 h-5 text-blue-600" />}
                    {block.type === 'link' && <Link className="w-5 h-5 text-orange-600" />}
                    {block.type === 'list' && <List className="w-5 h-5 text-green-600" />}
                    {block.type === 'quote' && <Quote className="w-5 h-5 text-gray-600" />}
            </div>
                  <span className={`text-sm font-semibold ${
                    block.type === 'text' ? 'text-indigo-700' :
                    block.type === 'image' ? 'text-purple-700' :
                    block.type === 'button' ? 'text-pink-700' :
                    block.type === 'heading' ? 'text-blue-700' :
                    block.type === 'link' ? 'text-orange-700' :
                    block.type === 'list' ? 'text-green-700' :
                    'text-gray-700'
                  }`}>
                    {block.type === 'text' && 'Bloque de Texto'}
                    {block.type === 'image' && 'Bloque de Imagen'}
                    {block.type === 'button' && 'Bloque de Botón'}
                    {block.type === 'heading' && 'Título'}
                    {block.type === 'link' && 'Enlace'}
                    {block.type === 'list' && 'Lista'}
                    {block.type === 'quote' && 'Cita'}
                  </span>
              </div>

                {/* Block content */}
                <div className="min-h-[100px] border border-gray-200 rounded-lg p-4 bg-gray-50">
                  {renderBlockContent(block)}
            </div>
          </motion.div>
            ))
          )}

          {/* Add block buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddBlock('text')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Texto
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddBlock('image')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Image className="w-4 h-4" />
              Imagen
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddBlock('button')}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <MousePointer className="w-4 h-4" />
              Botón
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddBlock('heading')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Type className="w-4 h-4" />
              Título
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddBlock('link')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Link className="w-4 h-4" />
              Enlace
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddBlock('list')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <List className="w-4 h-4" />
              Lista
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddBlock('quote')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Quote className="w-4 h-4" />
              Cita
            </motion.button>
            </div>
        </div>
      </div>

    </motion.div>
  );
});

EditorEmail.displayName = 'EditorEmail';

export default EditorEmail;
