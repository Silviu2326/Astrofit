import React, { useState } from 'react';
import { Plus, Trash2, Copy, Eye, Settings } from 'lucide-react';
import { ABTestVariant } from '../types';

interface ABTestBuilderProps {
  variants: ABTestVariant[];
  onVariantsChange: (variants: ABTestVariant[]) => void;
}

export const ABTestBuilder: React.FC<ABTestBuilderProps> = ({ variants, onVariantsChange }) => {
  const [previewVariant, setPreviewVariant] = useState<string | null>(null);

  const addVariant = () => {
    const newVariant: ABTestVariant = {
      id: `variant-${Date.now()}`,
      name: `Variante ${variants.length + 1}`,
      description: '',
      traffic: variants.length === 0 ? 50 : Math.floor(50 / (variants.length + 1)),
      content: {
        headline: '',
        description: '',
        buttonText: 'Comenzar',
        buttonColor: '#ef4444',
      },
      isControl: variants.length === 0,
    };

    // Reajustar tráfico
    const adjustedVariants = variants.map(v => ({
      ...v,
      traffic: Math.floor(100 / (variants.length + 1)),
    }));

    onVariantsChange([...adjustedVariants, newVariant]);
  };

  const removeVariant = (id: string) => {
    const filtered = variants.filter(v => v.id !== id);
    // Reajustar tráfico
    const adjusted = filtered.map(v => ({
      ...v,
      traffic: Math.floor(100 / filtered.length),
    }));
    onVariantsChange(adjusted);
  };

  const duplicateVariant = (variant: ABTestVariant) => {
    const newVariant: ABTestVariant = {
      ...variant,
      id: `variant-${Date.now()}`,
      name: `${variant.name} (Copia)`,
      isControl: false,
    };

    const withNew = [...variants, newVariant];
    const adjusted = withNew.map(v => ({
      ...v,
      traffic: Math.floor(100 / withNew.length),
    }));
    onVariantsChange(adjusted);
  };

  const updateVariant = (id: string, updates: Partial<ABTestVariant>) => {
    onVariantsChange(
      variants.map(v => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const updateVariantContent = (id: string, contentUpdates: Partial<ABTestVariant['content']>) => {
    onVariantsChange(
      variants.map(v =>
        v.id === id ? { ...v, content: { ...v.content, ...contentUpdates } } : v
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Constructor de Variantes
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Crea y personaliza diferentes versiones de tu contenido
          </p>
        </div>
        <button
          onClick={addVariant}
          className="px-4 py-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva Variante
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {variants.map((variant, index) => (
          <div
            key={variant.id}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4 hover:border-orange-500/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
                <div>
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(e) => updateVariant(variant.id, { name: e.target.value })}
                    className="bg-transparent border-none text-white font-semibold focus:outline-none focus:ring-0 p-0"
                  />
                  {variant.isControl && (
                    <span className="text-xs text-yellow-500 ml-2">(Control)</span>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    Tráfico: {variant.traffic}%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewVariant(previewVariant === variant.id ? null : variant.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Vista previa"
                >
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => duplicateVariant(variant)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Duplicar"
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
                {!variant.isControl && (
                  <button
                    onClick={() => removeVariant(variant.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Título</label>
                <input
                  type="text"
                  value={variant.content.headline || ''}
                  onChange={(e) => updateVariantContent(variant.id, { headline: e.target.value })}
                  placeholder="Escribe un título llamativo..."
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Descripción</label>
                <textarea
                  value={variant.content.description || ''}
                  onChange={(e) => updateVariantContent(variant.id, { description: e.target.value })}
                  placeholder="Describe los beneficios..."
                  rows={3}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Texto del botón</label>
                  <input
                    type="text"
                    value={variant.content.buttonText || ''}
                    onChange={(e) => updateVariantContent(variant.id, { buttonText: e.target.value })}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Color del botón</label>
                  <input
                    type="color"
                    value={variant.content.buttonColor || '#ef4444'}
                    onChange={(e) => updateVariantContent(variant.id, { buttonColor: e.target.value })}
                    className="w-full h-10 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">URL de imagen (opcional)</label>
                <input
                  type="text"
                  value={variant.content.image || ''}
                  onChange={(e) => updateVariantContent(variant.id, { image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Preview */}
            {previewVariant === variant.id && (
              <div className="mt-4 p-4 bg-gray-900/80 rounded-lg border border-orange-500/30">
                <div className="text-xs text-gray-400 mb-3">Vista previa:</div>
                <div className="space-y-3">
                  {variant.content.image && (
                    <img
                      src={variant.content.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  {variant.content.headline && (
                    <h4 className="text-white font-bold text-lg">{variant.content.headline}</h4>
                  )}
                  {variant.content.description && (
                    <p className="text-gray-300 text-sm">{variant.content.description}</p>
                  )}
                  {variant.content.buttonText && (
                    <button
                      style={{ backgroundColor: variant.content.buttonColor }}
                      className="px-6 py-2 rounded-lg text-white font-semibold"
                    >
                      {variant.content.buttonText}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {variants.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
          <Settings className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">No hay variantes creadas</p>
          <button
            onClick={addVariant}
            className="px-6 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
          >
            Crear Primera Variante
          </button>
        </div>
      )}
    </div>
  );
};
