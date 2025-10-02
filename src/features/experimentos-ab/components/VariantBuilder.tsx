import React, { useState } from 'react';
import {
  Type, Image, Palette, Layout, Eye, Code, Smartphone,
  Monitor, Tablet, Sliders, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';
import { ABVariant } from '../types';

interface VariantBuilderProps {
  variant: ABVariant;
  onChange: (variant: ABVariant) => void;
}

export function VariantBuilder({ variant, onChange }: VariantBuilderProps) {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const [showCode, setShowCode] = useState(false);

  const updateConfig = (key: string, value: any) => {
    onChange({
      ...variant,
      config: {
        ...variant.config,
        [key]: value,
      },
    });
  };

  const presetColors = [
    { name: 'Rojo', value: '#EF4444' },
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Naranja', value: '#F97316' },
    { name: 'Púrpura', value: '#8B5CF6' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Gris', value: '#6B7280' },
    { name: 'Negro', value: '#1F2937' },
  ];

  const presetLayouts = [
    { id: 'single', name: 'Single Column', icon: AlignLeft },
    { id: 'split', name: 'Split', icon: AlignCenter },
    { id: 'grid', name: 'Grid', icon: AlignRight },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Editor Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-orange-600" />
            Configuración Visual
          </h3>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Type className="w-4 h-4 inline mr-1" />
              Título
            </label>
            <input
              type="text"
              value={variant.config.title || ''}
              onChange={(e) => updateConfig('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Título de la variante"
            />
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={variant.config.subtitle || ''}
              onChange={(e) => updateConfig('subtitle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Subtítulo de la variante"
            />
          </div>

          {/* Button Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texto del Botón
            </label>
            <input
              type="text"
              value={variant.config.buttonText || ''}
              onChange={(e) => updateConfig('buttonText', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: Comprar Ahora"
            />
          </div>

          {/* Button Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4 inline mr-1" />
              Color del Botón
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {presetColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateConfig('buttonColor', color.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    variant.config.buttonColor === color.value
                      ? 'border-orange-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <input
              type="color"
              value={variant.config.buttonColor || '#3B82F6'}
              onChange={(e) => updateConfig('buttonColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>

          {/* Layout */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Layout className="w-4 h-4 inline mr-1" />
              Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {presetLayouts.map((layout) => {
                const LayoutIcon = layout.icon;
                return (
                  <button
                    key={layout.id}
                    onClick={() => updateConfig('layout', layout.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      variant.config.layout === layout.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <LayoutIcon className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs">{layout.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Background Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color de Fondo
            </label>
            <input
              type="color"
              value={variant.config.backgroundColor || '#FFFFFF'}
              onChange={(e) => updateConfig('backgroundColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>

          {/* Text Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color de Texto
            </label>
            <input
              type="color"
              value={variant.config.textColor || '#1F2937'}
              onChange={(e) => updateConfig('textColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Image className="w-4 h-4 inline mr-1" />
              URL de Imagen
            </label>
            <input
              type="text"
              value={variant.config.image || ''}
              onChange={(e) => updateConfig('image', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Code Toggle */}
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            <Code className="w-4 h-4" />
            {showCode ? 'Ocultar' : 'Ver'} Código HTML/CSS
          </button>

          {showCode && (
            <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-green-400">
                {JSON.stringify(variant.config, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              Vista Previa
            </h3>

            {/* Device Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded ${
                  previewDevice === 'desktop'
                    ? 'bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded ${
                  previewDevice === 'tablet'
                    ? 'bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded ${
                  previewDevice === 'mobile'
                    ? 'bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Container */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
            <div
              className={`bg-white rounded-lg shadow-xl transition-all ${
                previewDevice === 'mobile'
                  ? 'w-80'
                  : previewDevice === 'tablet'
                  ? 'w-96'
                  : 'w-full'
              }`}
              style={{
                backgroundColor: variant.config.backgroundColor,
                color: variant.config.textColor,
              }}
            >
              <div className={`p-8 ${variant.config.layout === 'grid' ? 'grid grid-cols-2 gap-4' : ''}`}>
                {variant.config.image && (
                  <div className="mb-6">
                    <img
                      src={variant.config.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Preview';
                      }}
                    />
                  </div>
                )}

                <div className={variant.config.layout === 'split' ? 'flex-1' : ''}>
                  {variant.config.title && (
                    <h2 className="text-3xl font-bold mb-3">
                      {variant.config.title}
                    </h2>
                  )}

                  {variant.config.subtitle && (
                    <p className="text-lg opacity-80 mb-6">
                      {variant.config.subtitle}
                    </p>
                  )}

                  {variant.config.buttonText && (
                    <button
                      className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundColor: variant.config.buttonColor }}
                    >
                      {variant.config.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Info */}
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800">
              <Eye className="w-4 h-4 inline mr-1" />
              Esta es una vista previa aproximada. El resultado final puede variar según el contexto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
