import React, { useState } from 'react';
import { Edit, Trash2, Package, Tag, AlertTriangle, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import type { Producto } from '../types';

interface ProductCardProps {
  producto: Producto;
  vistaGrid: boolean;
  onEditar: (producto: Producto) => void;
  onEliminar: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto, vistaGrid, onEditar, onEliminar }) => {
  const [expandido, setExpandido] = useState(false);

  const variantesStockBajo = producto.variantes.filter(v => v.stock <= v.stockMinimo);
  const tieneStockBajo = variantesStockBajo.length > 0;

  const estadoBadgeColor = {
    activo: 'bg-green-100 text-green-800',
    borrador: 'bg-gray-100 text-gray-800',
    archivado: 'bg-red-100 text-red-800'
  };

  if (!vistaGrid) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-4 p-4">
          {/* Imagen */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {producto.imagenes[0] ? (
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-12 h-12 text-blue-300" />
            )}
          </div>

          {/* Info principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{producto.nombre}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{producto.descripcion}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${estadoBadgeColor[producto.estado]} ml-2`}>
                {producto.estado}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">{producto.categoria}</span>
              {producto.subcategoria && (
                <span className="text-gray-500">/ {producto.subcategoria}</span>
              )}
              <span className="text-gray-400">•</span>
              <span className="font-medium text-blue-600">${producto.precioBase.toFixed(2)}</span>
              {producto.precioComparacion && (
                <span className="text-gray-400 line-through text-xs">
                  ${producto.precioComparacion.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 px-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Variantes</p>
              <p className="text-lg font-semibold text-gray-900">{producto.variantes.length}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Stock Total</p>
              <p className={`text-lg font-semibold ${tieneStockBajo ? 'text-orange-600' : 'text-gray-900'}`}>
                {producto.stockTotal}
              </p>
            </div>
          </div>

          {/* Alertas y acciones */}
          <div className="flex items-center gap-2">
            {tieneStockBajo && (
              <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-xs font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Stock bajo
              </div>
            )}

            <button
              onClick={() => setExpandido(!expandido)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {expandido ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onEditar(producto)}
              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>

            <button
              onClick={() => onEliminar(producto.id)}
              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Variantes expandidas */}
        {expandido && (
          <div className="border-t border-gray-100 bg-gray-50 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Variantes y SKUs</h4>
            <div className="space-y-2">
              {producto.variantes.map(variante => (
                <div
                  key={variante.id}
                  className="bg-white rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{variante.nombre}</span>
                      <span className="text-xs text-gray-500 font-mono">{variante.sku}</span>
                      {!variante.activo && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          Inactivo
                        </span>
                      )}
                    </div>
                    {Object.keys(variante.atributos).length > 0 && (
                      <div className="flex gap-2">
                        {Object.entries(variante.atributos).map(([key, value]) => (
                          <span key={key} className="text-xs text-gray-600">
                            {key}: <span className="font-medium">{value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${variante.precio.toFixed(2)}</p>
                      {variante.precioComparacion && (
                        <p className="text-xs text-gray-400 line-through">
                          ${variante.precioComparacion.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className={`text-center px-3 py-1 rounded-lg ${
                      variante.stock <= variante.stockMinimo
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      <p className="text-xs font-medium">Stock: {variante.stock}</p>
                      <p className="text-xs opacity-75">Mín: {variante.stockMinimo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vista Grid
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
      {/* Imagen */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
        {producto.imagenes[0] ? (
          <img
            src={producto.imagenes[0]}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-blue-300" />
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          {tieneStockBajo && (
            <span className="px-2 py-1 bg-orange-500 text-white rounded-lg text-xs font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Stock bajo
            </span>
          )}
          {producto.etiquetas.slice(0, 2).map(etiqueta => (
            <span
              key={etiqueta}
              className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg text-xs font-medium"
            >
              {etiqueta}
            </span>
          ))}
        </div>

        <span className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium ${estadoBadgeColor[producto.estado]}`}>
          {producto.estado}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
            {producto.nombre}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{producto.descripcion}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Tag className="w-3 h-3" />
            <span>{producto.categoria}</span>
            {producto.subcategoria && <span>/ {producto.subcategoria}</span>}
          </div>
        </div>

        {/* Precio */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-blue-600">
            ${producto.precioBase.toFixed(2)}
          </span>
          {producto.precioComparacion && (
            <span className="text-sm text-gray-400 line-through">
              ${producto.precioComparacion.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500">Variantes</p>
            <p className="text-lg font-semibold text-gray-900">{producto.variantes.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Stock Total</p>
            <p className={`text-lg font-semibold ${tieneStockBajo ? 'text-orange-600' : 'text-green-600'}`}>
              {producto.stockTotal}
            </p>
          </div>
        </div>

        {/* Variantes preview */}
        {producto.tieneVariantes && (
          <div className="mb-4">
            <button
              onClick={() => setExpandido(!expandido)}
              className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span className="font-medium">Ver variantes ({producto.variantes.length})</span>
              {expandido ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expandido && (
              <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                {producto.variantes.map(variante => (
                  <div
                    key={variante.id}
                    className="bg-gray-50 rounded-lg p-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{variante.nombre}</span>
                      <span className={`px-2 py-0.5 rounded ${
                        variante.stock <= variante.stockMinimo
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {variante.stock}
                      </span>
                    </div>
                    <span className="text-gray-500 font-mono">{variante.sku}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          <button
            onClick={() => onEditar(producto)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={() => onEliminar(producto.id)}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
