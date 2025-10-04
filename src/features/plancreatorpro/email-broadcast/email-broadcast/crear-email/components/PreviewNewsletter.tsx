import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Monitor, Smartphone, Tablet, RefreshCw, Maximize2 } from 'lucide-react';
import { PlaceholderImages } from '../../../../../../utils/placeholderImages';
import toast from 'react-hot-toast';

interface PreviewNewsletterProps {
  emailContent: string;
  emailSubject: string;
}

const PreviewNewsletter: React.FC<PreviewNewsletterProps> = ({ emailContent, emailSubject }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewModes = [
    { id: 'desktop', label: 'Escritorio', icon: Monitor, width: '100%' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'mobile', label: 'Móvil', icon: Smartphone, width: '375px' }
  ];

  const handleViewModeChange = (mode: 'desktop' | 'tablet' | 'mobile') => {
    setViewMode(mode);
    toast.success(`Vista cambiada a ${viewModes.find(v => v.id === mode)?.label}`);
  };

  const handleRefresh = () => {
    toast.success('Vista actualizada');
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    toast.success(isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa activada');
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50' : ''
      }`}
    >
      {/* Decoración de fondo */}
      <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="flex items-center justify-between relative z-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Eye className="w-6 h-6" />
            </div>
            Previsualización del Email
          </h2>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Actualizar vista"
            >
              <RefreshCw className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFullscreen}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Pantalla completa"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6">Así se verá tu email en diferentes dispositivos.</p>
        
        {/* View mode buttons */}
        <div className="flex justify-center gap-2 mb-6">
          {viewModes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewModeChange(mode.id as 'desktop' | 'tablet' | 'mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  viewMode === mode.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {mode.label}
              </motion.button>
            );
          })}
        </div>

        {/* Preview container */}
        <div className="flex justify-center">
          <div 
            className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
            style={{ 
              width: viewMode === 'desktop' ? '100%' : viewMode === 'tablet' ? '768px' : '375px',
              maxWidth: '100%'
            }}
          >
            {/* Email header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-500">Email Preview</span>
              </div>
            </div>

            {/* Email content */}
            <div className="p-6 min-h-[400px]">
              {emailSubject ? (
                <h1 className="text-2xl font-bold mb-4 text-gray-900">{emailSubject}</h1>
              ) : (
                <h1 className="text-2xl font-bold mb-4 text-gray-400">Título de tu Newsletter</h1>
              )}
              
              {emailContent ? (
                <div className="prose max-w-none">
                  {(() => {
                    try {
                      const blocks = JSON.parse(emailContent);
                      return blocks.map((block: any, index: number) => {
                        const config = block.config || {};
                        
                        switch (block.type) {
                          case 'text':
                            return (
                              <p key={index} className="text-gray-700 mb-4 whitespace-pre-wrap">
                                {config.content || block.content}
                              </p>
                            );
                          
                          case 'heading':
                            const HeadingTag = config.headingLevel || 'h2';
                            return (
                              <HeadingTag key={index} className="text-2xl font-bold text-gray-900 mb-4">
                                {config.content || block.content}
                              </HeadingTag>
                            );
                          
                          case 'image':
                            const imageSrc = config.content || config.url;
                            return imageSrc ? (
                              <div key={index} className="text-center mb-4">
                                <img
                                  src={imageSrc}
                                  alt={config.alt || 'Imagen'}
                                  className="max-w-full h-auto rounded-lg shadow-sm mx-auto"
                                />
                              </div>
                            ) : null;
                          
                          case 'button':
                            const buttonStyles = {
                              primary: 'bg-blue-500 hover:bg-blue-600 text-white',
                              secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
                              success: 'bg-green-500 hover:bg-green-600 text-white',
                              warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
                              danger: 'bg-red-500 hover:bg-red-600 text-white'
                            };
                            return (
                              <div key={index} className="text-center mb-4">
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
                              <div key={index} className="mb-4">
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
                              <ListTag key={index} className={`mb-4 ${config.listType === 'ol' ? 'list-decimal list-inside' : 'list-disc list-inside'}`}>
                                {config.listItems?.map((item: string, itemIndex: number) => (
                                  <li key={itemIndex} className="text-gray-700 mb-1">{item}</li>
                                ))}
                              </ListTag>
                            );
                          
                          case 'quote':
                            return (
                              <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4">
                                <p>"{config.content || block.content}"</p>
                                {config.quoteAuthor && (
                                  <footer className="text-sm text-gray-500 mt-2">— {config.quoteAuthor}</footer>
                                )}
                              </blockquote>
                            );
                          
                          default:
                            return (
                              <p key={index} className="text-gray-700 mb-4">
                                {block.content}
                              </p>
                            );
                        }
                      });
                    } catch (error) {
                      return <p className="text-gray-700 mb-4">Error al cargar el contenido del email</p>;
                    }
                  })()}
                </div>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">Este es un párrafo de ejemplo para la previsualización de tu newsletter. Aquí verás cómo se renderiza el contenido que has arrastrado y soltado en el editor.</p>
                  <img src={PlaceholderImages.generic(400, 150, 'Newsletter Image')} alt="Placeholder" className="max-w-full h-auto mb-4 rounded-md" />
                  <p className="text-gray-700 mb-4">Puedes ver cómo las imágenes y los textos se adaptan al diseño responsive.</p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors">
                    ¡Haz clic aquí!
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Device info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Vista: <span className="font-semibold">{viewModes.find(v => v.id === viewMode)?.label}</span> 
            {viewMode !== 'desktop' && (
              <span> • Ancho: {viewModes.find(v => v.id === viewMode)?.width}</span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewNewsletter;
