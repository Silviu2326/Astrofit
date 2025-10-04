import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Image, MousePointer, Type, Link, List, Quote } from 'lucide-react';
import toast from 'react-hot-toast';

const BloquesArrastrables: React.FC = () => {
  const blockTypes = [
    { type: 'text', icon: Edit3, label: 'Texto', color: 'blue', description: 'Bloque de texto editable' },
    { type: 'image', icon: Image, label: 'Imagen', color: 'green', description: 'Imagen con URL o upload' },
    { type: 'button', icon: MousePointer, label: 'Botón', color: 'purple', description: 'Botón de llamada a la acción' },
    { type: 'heading', icon: Type, label: 'Título', color: 'indigo', description: 'Título o encabezado' },
    { type: 'link', icon: Link, label: 'Enlace', color: 'orange', description: 'Enlace externo o interno' },
    { type: 'list', icon: List, label: 'Lista', color: 'pink', description: 'Lista con viñetas o numerada' },
    { type: 'quote', icon: Quote, label: 'Cita', color: 'gray', description: 'Bloque de cita destacada' }
  ];

  const handleDragStart = (e: React.DragEvent, blockType: string) => {
    e.dataTransfer.setData('text/plain', blockType);
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: blockType,
      timestamp: Date.now()
    }));
    toast.success(`Bloque ${blockType} listo para arrastrar`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden h-[600px] flex flex-col"
    >
      {/* Decoración de fondo */}
      <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
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
          Bloques Arrastrables
        </h2>
      </div>

      {/* Blocks Area */}
      <div className="flex-grow p-4 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="space-y-3">
          {blockTypes.map((block, index) => {
            const IconComponent = block.icon;
            const colorClasses = {
              blue: 'bg-blue-100 border-blue-300 text-blue-700',
              green: 'bg-green-100 border-green-300 text-green-700',
              purple: 'bg-purple-100 border-purple-300 text-purple-700',
              indigo: 'bg-indigo-100 border-indigo-300 text-indigo-700',
              orange: 'bg-orange-100 border-orange-300 text-orange-700',
              pink: 'bg-pink-100 border-pink-300 text-pink-700',
              gray: 'bg-gray-100 border-gray-300 text-gray-700'
            };

            return (
              <motion.div
                key={block.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                draggable
                onDragStart={(e) => {
                  const dragEvent = e as unknown as React.DragEvent;
                  handleDragStart(dragEvent, block.type);
                }}
                className={`p-3 border-2 border-dashed rounded-xl cursor-grab hover:cursor-grabbing transition-all duration-300 hover:shadow-md hover:scale-105 ${colorClasses[block.color as keyof typeof colorClasses]}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/50 rounded-lg">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{block.label}</p>
                    <p className="text-xs opacity-75">{block.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-white/50 rounded-xl border border-white/50">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">💡 Tip:</span> Arrastra cualquier bloque al editor para añadirlo a tu email
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BloquesArrastrables;
