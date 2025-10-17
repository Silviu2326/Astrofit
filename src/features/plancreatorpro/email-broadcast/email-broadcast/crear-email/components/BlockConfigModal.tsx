import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Link, Type, MousePointer, Image as ImageIcon, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../../../../../components/ui/modal';

interface BlockConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockType: 'text' | 'image' | 'button' | 'heading' | 'link' | 'list' | 'quote';
  onSave: (config: any) => void;
  initialConfig?: any;
}

const BlockConfigModal: React.FC<BlockConfigModalProps> = ({
  isOpen,
  onClose,
  blockType,
  onSave,
  initialConfig = {}
}) => {
  const [config, setConfig] = useState<any>({
    content: initialConfig.content || '',
    url: initialConfig.url || '',
    alt: initialConfig.alt || '',
    buttonText: initialConfig.buttonText || '',
    buttonUrl: initialConfig.buttonUrl || '',
    buttonStyle: initialConfig.buttonStyle || 'primary',
    headingLevel: initialConfig.headingLevel || 'h2',
    listType: initialConfig.listType || 'ul',
    listItems: initialConfig.listItems || [''],
    quoteAuthor: initialConfig.quoteAuthor || '',
    ...initialConfig
  });

  const [, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('La imagen debe ser menor a 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona un archivo de imagen válido');
        return;
      }

      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setConfig((prev: any) => ({ ...prev, content: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
      toast.success('Imagen cargada exitosamente');
    }
  };

  const handleSave = () => {
    if (blockType === 'text' && !config.content.trim()) {
      toast.error('Por favor ingresa el contenido del texto');
      return;
    }
    if (blockType === 'image' && !config.content && !config.url) {
      toast.error('Por favor sube una imagen o ingresa una URL');
      return;
    }
    if (blockType === 'button' && (!config.buttonText.trim() || !config.buttonUrl.trim())) {
      toast.error('Por favor completa el texto y URL del botón');
      return;
    }
    if (blockType === 'heading' && !config.content.trim()) {
      toast.error('Por favor ingresa el texto del título');
      return;
    }
    if (blockType === 'link' && (!config.content.trim() || !config.url.trim())) {
      toast.error('Por favor completa el texto y URL del enlace');
      return;
    }
    if (blockType === 'list' && config.listItems.every((item: string) => !item.trim())) {
      toast.error('Por favor ingresa al menos un elemento de la lista');
      return;
    }
    if (blockType === 'quote' && !config.content.trim()) {
      toast.error('Por favor ingresa el contenido de la cita');
      return;
    }

    onSave(config);
    toast.success('Bloque configurado exitosamente');
    onClose();
  };

  const addListItem = () => {
    setConfig((prev: any) => ({
      ...prev,
      listItems: [...prev.listItems, '']
    }));
  };

  const removeListItem = (index: number) => {
    setConfig((prev: any) => ({
      ...prev,
      listItems: prev.listItems.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateListItem = (index: number, value: string) => {
    setConfig((prev: any) => ({
      ...prev,
      listItems: prev.listItems.map((item: string, i: number) => i === index ? value : item)
    }));
  };

  const getModalTitle = () => {
    const titles = {
      text: 'Configurar Bloque de Texto',
      image: 'Configurar Bloque de Imagen',
      button: 'Configurar Bloque de Botón',
      heading: 'Configurar Título',
      link: 'Configurar Enlace',
      list: 'Configurar Lista',
      quote: 'Configurar Cita'
    };
    return titles[blockType];
  };

  const getModalIcon = () => {
    const icons = {
      text: Type,
      image: ImageIcon,
      button: MousePointer,
      heading: Type,
      link: Link,
      list: Type,
      quote: Type
    };
    return icons[blockType];
  };

  const IconComponent = getModalIcon();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size="lg"
    >
      <div className="space-y-6">
        {/* Header with icon */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="p-3 bg-blue-100 rounded-xl">
            <IconComponent className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{getModalTitle()}</h3>
            <p className="text-sm text-gray-600">Configura el contenido y propiedades de este bloque</p>
          </div>
        </div>

        {/* Text content for most block types */}
        {(blockType === 'text' || blockType === 'heading' || blockType === 'quote') && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {blockType === 'heading' ? 'Texto del Título' : 
               blockType === 'quote' ? 'Contenido de la Cita' : 'Contenido del Texto'}
            </label>
            <textarea
              value={config.content}
              onChange={(e) => setConfig((prev: any) => ({ ...prev, content: e.target.value }))}
              placeholder={
                blockType === 'heading' ? 'Ingresa el texto del título...' :
                blockType === 'quote' ? 'Ingresa el contenido de la cita...' :
                'Ingresa el contenido del texto...'
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none"
              rows={blockType === 'quote' ? 4 : 3}
            />
          </div>
        )}

        {/* Heading level selector */}
        {blockType === 'heading' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nivel del Título
            </label>
            <select
              value={config.headingLevel}
              onChange={(e) => setConfig((prev: any) => ({ ...prev, headingLevel: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
            >
              <option value="h1">H1 - Título Principal</option>
              <option value="h2">H2 - Subtítulo</option>
              <option value="h3">H3 - Título Secundario</option>
              <option value="h4">H4 - Título Terciario</option>
            </select>
          </div>
        )}

        {/* Image configuration */}
        {blockType === 'image' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subir Imagen
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Upload className="w-8 h-8" />
                  <span className="font-medium">Haz clic para subir una imagen</span>
                  <span className="text-sm">PNG, JPG, GIF hasta 5MB</span>
                </button>
              </div>
            </div>

            {imagePreview && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vista Previa
                </label>
                <div className="border border-gray-200 rounded-xl p-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 mx-auto rounded-lg"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                O ingresa una URL de imagen
              </label>
              <input
                type="url"
                value={config.url}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, url: e.target.value }))}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Texto Alternativo (Alt)
              </label>
              <input
                type="text"
                value={config.alt}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, alt: e.target.value }))}
                placeholder="Descripción de la imagen para accesibilidad"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              />
            </div>
          </div>
        )}

        {/* Button configuration */}
        {blockType === 'button' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Texto del Botón
              </label>
              <input
                type="text"
                value={config.buttonText}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, buttonText: e.target.value }))}
                placeholder="Ej: Comprar Ahora, Leer Más, Suscribirse"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL de Destino
              </label>
              <input
                type="url"
                value={config.buttonUrl}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, buttonUrl: e.target.value }))}
                placeholder="https://ejemplo.com/destino"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estilo del Botón
              </label>
              <select
                value={config.buttonStyle}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, buttonStyle: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              >
                <option value="primary">Primario (Azul)</option>
                <option value="secondary">Secundario (Gris)</option>
                <option value="success">Éxito (Verde)</option>
                <option value="warning">Advertencia (Amarillo)</option>
                <option value="danger">Peligro (Rojo)</option>
              </select>
            </div>
          </div>
        )}

        {/* Link configuration */}
        {blockType === 'link' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Texto del Enlace
              </label>
              <input
                type="text"
                value={config.content}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, content: e.target.value }))}
                placeholder="Texto que se mostrará como enlace"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL de Destino
              </label>
              <input
                type="url"
                value={config.url}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, url: e.target.value }))}
                placeholder="https://ejemplo.com/destino"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              />
            </div>
          </div>
        )}

        {/* List configuration */}
        {blockType === 'list' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Lista
              </label>
              <select
                value={config.listType}
                onChange={(e) => setConfig((prev: any) => ({ ...prev, listType: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
              >
                <option value="ul">Lista con viñetas</option>
                <option value="ol">Lista numerada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Elementos de la Lista
              </label>
              <div className="space-y-2">
                {config.listItems.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateListItem(index, e.target.value)}
                      placeholder={`Elemento ${index + 1}`}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                    {config.listItems.length > 1 && (
                      <button
                        onClick={() => removeListItem(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addListItem}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <span>+</span>
                  Añadir elemento
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quote author */}
        {blockType === 'quote' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Autor de la Cita (Opcional)
            </label>
            <input
              type="text"
              value={config.quoteAuthor}
              onChange={(e) => setConfig((prev: any) => ({ ...prev, quoteAuthor: e.target.value }))}
              placeholder="Nombre del autor de la cita"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            Cancelar
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <Save className="w-4 h-4" />
            Guardar Bloque
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default BlockConfigModal;
