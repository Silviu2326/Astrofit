import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import type { ProductVariant } from '../types/product.types';
import { VariantForm } from './VariantForm';

interface VariantManagerProps {
  variants: ProductVariant[];
  onVariantsChange: (variants: ProductVariant[]) => void;
}

export function VariantManager({ variants, onVariantsChange }: VariantManagerProps) {
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | undefined>();

  const handleAddVariant = () => {
    setEditingVariant(undefined);
    setShowVariantForm(true);
  };

  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setShowVariantForm(true);
  };

  const handleDeleteVariant = (variantId: string) => {
    if (confirm('¿Estás seguro de eliminar esta variante?')) {
      onVariantsChange(variants.filter((v) => v.id !== variantId));
    }
  };

  const handleSaveVariant = (variant: ProductVariant) => {
    if (editingVariant) {
      onVariantsChange(
        variants.map((v) => (v.id === editingVariant.id ? variant : v))
      );
    } else {
      onVariantsChange([...variants, variant]);
    }
    setShowVariantForm(false);
    setEditingVariant(undefined);
  };

  const getStockStatus = (variant: ProductVariant) => {
    if (variant.stock === 0) {
      return { color: 'text-red-600', icon: AlertTriangle, label: 'Sin stock' };
    }
    if (variant.stock <= variant.lowStockThreshold) {
      return { color: 'text-orange-600', icon: AlertTriangle, label: 'Stock bajo' };
    }
    return { color: 'text-green-600', icon: CheckCircle, label: 'En stock' };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {variants.length} variante{variants.length !== 1 ? 's' : ''} configurada{variants.length !== 1 ? 's' : ''}
        </p>
        <button
          type="button"
          onClick={handleAddVariant}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Agregar Variante
        </button>
      </div>

      {variants.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No hay variantes configuradas</p>
          <p className="text-sm text-gray-500 mb-4">
            Agrega variantes para gestionar diferentes versiones del producto
          </p>
          <button
            type="button"
            onClick={handleAddVariant}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700"
          >
            Crear Primera Variante
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {variants.map((variant) => {
            const stockStatus = getStockStatus(variant);
            const StatusIcon = stockStatus.icon;

            return (
              <div
                key={variant.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{variant.name}</h4>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded border border-gray-200">
                        {variant.sku}
                      </span>
                      {!variant.isActive && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded border border-red-200">
                          Inactiva
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Precio</p>
                        <p className="font-semibold text-gray-900">
                          ${variant.price.toFixed(2)}
                        </p>
                        {variant.compareAtPrice && (
                          <p className="text-xs text-gray-500 line-through">
                            ${variant.compareAtPrice.toFixed(2)}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Stock</p>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`w-4 h-4 ${stockStatus.color}`} />
                          <span className="font-semibold text-gray-900">
                            {variant.stock}
                          </span>
                        </div>
                        <p className={`text-xs ${stockStatus.color}`}>
                          {stockStatus.label}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Atributos</p>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(variant.attributes).map(([key, value]) => (
                            value && (
                              <span
                                key={key}
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200"
                              >
                                {value}
                              </span>
                            )
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Umbral bajo</p>
                        <p className="font-semibold text-gray-900">
                          {variant.lowStockThreshold}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      type="button"
                      onClick={() => handleEditVariant(variant)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteVariant(variant.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showVariantForm && (
        <VariantForm
          variant={editingVariant}
          onClose={() => {
            setShowVariantForm(false);
            setEditingVariant(undefined);
          }}
          onSave={handleSaveVariant}
        />
      )}
    </div>
  );
}
