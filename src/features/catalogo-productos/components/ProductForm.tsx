import React, { useState } from 'react';
import { X, Save, Package, Tag, DollarSign, Image as ImageIcon } from 'lucide-react';
import type { Product, ProductCategory } from '../types/product.types';
import { VariantManager } from './VariantManager';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      description: '',
      category: 'apparel',
      tags: [],
      basePrice: 0,
      variants: [],
      images: [],
      status: 'draft',
      brand: '',
      vendor: '',
    }
  );

  const [newTag, setNewTag] = useState('');

  const categories: { value: ProductCategory; label: string }[] = [
    { value: 'apparel', label: 'Ropa' },
    { value: 'accessories', label: 'Accesorios' },
    { value: 'supplements', label: 'Suplementos' },
    { value: 'equipment', label: 'Equipamiento' },
    { value: 'digital', label: 'Digital' },
    { value: 'other', label: 'Otros' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productToSave: Product = {
      id: product?.id || `prod-${Date.now()}`,
      name: formData.name || '',
      description: formData.description || '',
      category: formData.category || 'apparel',
      tags: formData.tags || [],
      basePrice: formData.basePrice || 0,
      variants: formData.variants || [],
      images: formData.images || [],
      status: formData.status || 'draft',
      createdAt: product?.createdAt || new Date(),
      updatedAt: new Date(),
      brand: formData.brand,
      vendor: formData.vendor,
      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
    };

    onSave(productToSave);
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6" />
            <h2 className="text-xl font-bold">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Información Básica
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Camiseta Premium Fitness"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Product['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Borrador</option>
                    <option value="active">Activo</option>
                    <option value="archived">Archivado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: FitPro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proveedor
                  </label>
                  <input
                    type="text"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nombre del proveedor"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Precio Base
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Base *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                Etiquetas
              </h3>

              <div>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Agregar etiqueta..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700"
                  >
                    Agregar
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full border border-blue-200"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                Variantes y SKUs
              </h3>
              <VariantManager
                variants={formData.variants || []}
                onVariantsChange={(variants) => setFormData({ ...formData, variants })}
              />
            </div>

            {/* SEO */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900">SEO (Opcional)</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título SEO
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Título optimizado para motores de búsqueda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción SEO
                  </label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descripción meta para motores de búsqueda"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all"
          >
            <Save className="w-4 h-4" />
            Guardar Producto
          </button>
        </div>
      </div>
    </div>
  );
}
