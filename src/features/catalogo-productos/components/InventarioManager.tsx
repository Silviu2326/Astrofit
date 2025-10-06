import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Package, AlertTriangle, Download, Search } from 'lucide-react';
import type { Producto, MovimientoInventario } from '../types';

interface InventarioManagerProps {
  productos: Producto[];
  onActualizar: (productos: Producto[]) => void;
  onCerrar: () => void;
}

const InventarioManager: React.FC<InventarioManagerProps> = ({ productos, onActualizar, onCerrar }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroStockBajo, setFiltroStockBajo] = useState(false);
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [productoExpandido, setProductoExpandido] = useState<string | null>(null);

  const productosFiltrados = productos.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             producto.variantes.some(v => v.sku.toLowerCase().includes(busqueda.toLowerCase()));

    if (filtroStockBajo) {
      return coincideBusqueda && producto.variantes.some(v => v.stock <= v.stockMinimo);
    }

    return coincideBusqueda;
  });

  const handleAjusteStock = (productoId: string, varianteId: string, nuevoStock: number, motivo: string) => {
    const productosActualizados = productos.map(producto => {
      if (producto.id === productoId) {
        const variantesActualizadas = producto.variantes.map(variante => {
          if (variante.id === varianteId) {
            const stockAnterior = variante.stock;
            const stockNuevo = Math.max(0, nuevoStock);

            // Registrar movimiento
            const movimiento: MovimientoInventario = {
              id: Date.now().toString(),
              productoId,
              varianteId,
              tipo: stockNuevo > stockAnterior ? 'entrada' : stockNuevo < stockAnterior ? 'salida' : 'ajuste',
              cantidad: Math.abs(stockNuevo - stockAnterior),
              stockAnterior,
              stockNuevo,
              motivo,
              usuario: 'Admin',
              fecha: new Date()
            };

            setMovimientos([movimiento, ...movimientos]);

            return { ...variante, stock: stockNuevo };
          }
          return variante;
        });

        return {
          ...producto,
          variantes: variantesActualizadas,
          stockTotal: variantesActualizadas.reduce((sum, v) => sum + v.stock, 0)
        };
      }
      return producto;
    });

    onActualizar(productosActualizados);
  };

  const estadisticasInventario = {
    totalUnidades: productos.reduce((sum, p) => sum + p.stockTotal, 0),
    valorTotal: productos.reduce((sum, p) =>
      sum + p.variantes.reduce((vSum, v) => vSum + (v.precio * v.stock), 0), 0
    ),
    variantesStockBajo: productos.reduce((count, p) =>
      count + p.variantes.filter(v => v.stock > 0 && v.stock <= v.stockMinimo).length, 0
    ),
    variantesSinStock: productos.reduce((count, p) =>
      count + p.variantes.filter(v => v.stock === 0).length, 0
    )
  };

  const exportarInventario = () => {
    const data = productos.flatMap(producto =>
      producto.variantes.map(variante => ({
        Producto: producto.nombre,
        SKU: variante.sku,
        Variante: variante.nombre,
        Stock: variante.stock,
        'Stock Mínimo': variante.stockMinimo,
        Precio: variante.precio,
        'Valor Total': variante.precio * variante.stock,
        Estado: variante.stock <= variante.stockMinimo ? 'Stock Bajo' : 'Normal',
        Activo: variante.activo ? 'Sí' : 'No'
      }))
    );

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Gestión de Inventario</h2>
                <p className="text-blue-100 text-sm">Control de stock y movimientos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportarInventario}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button
                onClick={onCerrar}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-blue-100 text-sm">Total Unidades</p>
              <p className="text-2xl font-bold">{estadisticasInventario.totalUnidades.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-blue-100 text-sm">Valor Total</p>
              <p className="text-2xl font-bold">${estadisticasInventario.valorTotal.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-orange-300" />
                <p className="text-blue-100 text-sm">Stock Bajo</p>
              </div>
              <p className="text-2xl font-bold text-orange-200">{estadisticasInventario.variantesStockBajo}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-blue-100 text-sm">Sin Stock</p>
              <p className="text-2xl font-bold text-red-200">{estadisticasInventario.variantesSinStock}</p>
            </div>
          </div>
        </div>

        {/* Búsqueda y filtros */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={filtroStockBajo}
                onChange={(e) => setFiltroStockBajo(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Solo stock bajo</span>
            </label>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {productosFiltrados.map(producto => (
              <div key={producto.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Header del producto */}
                <div
                  className="p-4 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setProductoExpandido(productoExpandido === producto.id ? null : producto.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      {producto.imagenes[0] ? (
                        <img src={producto.imagenes[0]} alt={producto.nombre} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Package className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{producto.nombre}</h3>
                      <p className="text-sm text-gray-500">{producto.categoria}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Variantes</p>
                      <p className="text-lg font-semibold text-gray-900">{producto.variantes.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Stock Total</p>
                      <p className={`text-lg font-semibold ${
                        producto.variantes.some(v => v.stock <= v.stockMinimo)
                          ? 'text-orange-600'
                          : 'text-green-600'
                      }`}>
                        {producto.stockTotal}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Variantes expandidas */}
                {productoExpandido === producto.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-3">
                      {producto.variantes.map(variante => (
                        <VarianteStockItem
                          key={variante.id}
                          producto={producto}
                          variante={variante}
                          onAjusteStock={handleAjusteStock}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron productos</p>
            </div>
          )}
        </div>

        {/* Historial de movimientos recientes */}
        {movimientos.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50 max-h-48 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Movimientos Recientes</h3>
            <div className="space-y-2">
              {movimientos.slice(0, 10).map(mov => (
                <div key={mov.id} className="flex items-center justify-between bg-white p-2 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    {mov.tipo === 'entrada' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-gray-600">{mov.motivo}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">
                      {mov.stockAnterior} → {mov.stockNuevo}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(mov.fecha).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface VarianteStockItemProps {
  producto: Producto;
  variante: any;
  onAjusteStock: (productoId: string, varianteId: string, nuevoStock: number, motivo: string) => void;
}

const VarianteStockItem: React.FC<VarianteStockItemProps> = ({ producto, variante, onAjusteStock }) => {
  const [editando, setEditando] = useState(false);
  const [nuevoStock, setNuevoStock] = useState(variante.stock);
  const [motivo, setMotivo] = useState('');

  const handleGuardar = () => {
    if (motivo.trim()) {
      onAjusteStock(producto.id, variante.id, nuevoStock, motivo);
      setEditando(false);
      setMotivo('');
    }
  };

  const esStockBajo = variante.stock <= variante.stockMinimo;

  return (
    <div className={`bg-white rounded-lg p-4 border ${
      esStockBajo ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">{variante.nombre}</span>
            <span className="text-xs text-gray-500 font-mono px-2 py-0.5 bg-gray-100 rounded">
              {variante.sku}
            </span>
            {!variante.activo && (
              <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-200 rounded">
                Inactivo
              </span>
            )}
          </div>
          {Object.keys(variante.atributos).length > 0 && (
            <div className="flex gap-2 text-xs text-gray-600">
              {Object.entries(variante.atributos).map(([key, value]) => (
                <span key={key}>
                  {key}: <span className="font-medium">{value as string}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Precio</p>
            <p className="font-semibold text-gray-900">${variante.precio.toFixed(2)}</p>
          </div>
          <div className={`text-center px-4 py-2 rounded-lg ${
            esStockBajo ? 'bg-orange-100 border-orange-300' : 'bg-green-100 border-green-300'
          } border`}>
            <p className="text-xs text-gray-600">Stock Actual</p>
            <p className={`text-2xl font-bold ${esStockBajo ? 'text-orange-700' : 'text-green-700'}`}>
              {variante.stock}
            </p>
            <p className="text-xs text-gray-500">Mín: {variante.stockMinimo}</p>
          </div>
        </div>
      </div>

      {editando ? (
        <div className="space-y-2 pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Nuevo Stock</label>
              <input
                type="number"
                min="0"
                value={nuevoStock}
                onChange={(e) => setNuevoStock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Motivo</label>
              <select
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar...</option>
                <option value="Compra">Compra</option>
                <option value="Venta">Venta</option>
                <option value="Devolución">Devolución</option>
                <option value="Ajuste de inventario">Ajuste de inventario</option>
                <option value="Producto dañado">Producto dañado</option>
                <option value="Recuento">Recuento</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleGuardar}
              disabled={!motivo.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setEditando(false);
                setNuevoStock(variante.stock);
                setMotivo('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditando(true)}
          className="w-full mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Ajustar Stock
        </button>
      )}

      {esStockBajo && (
        <div className="mt-2 flex items-center gap-2 text-xs text-orange-700 bg-orange-100 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4" />
          <span>Stock por debajo del mínimo - Considera reabastecer</span>
        </div>
      )}
    </div>
  );
};

export default InventarioManager;
