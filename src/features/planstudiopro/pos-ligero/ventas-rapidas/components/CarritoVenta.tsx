import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemCarrito, Descuento } from '../../../types';
import { ShoppingCart, X, Plus, Minus, Trash2, Tag, User, Percent, DollarSign } from 'lucide-react';

interface CarritoVentaProps {
  carrito: ItemCarrito[];
  onEliminarProducto: (productoId: string) => void;
  onActualizarCantidad?: (productoId: string, cantidad: number) => void;
  onProcederPago: () => void;
  onLimpiarCarrito: () => void;
}

const CarritoVenta: React.FC<CarritoVentaProps> = ({
  carrito,
  onEliminarProducto,
  onActualizarCantidad,
  onProcederPago,
  onLimpiarCarrito
}) => {
  const [descuento, setDescuento] = useState<Descuento | null>(null);
  const [codigoCupon, setCodigoCupon] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState<string>('');

  const IMPUESTO_PORCENTAJE = 16; // 16% IVA

  const calcularSubtotal = () => {
    return carrito.reduce((acc, item) => {
      const precioFinal = item.enOferta
        ? item.precio * (1 - (item.descuento || 0) / 100)
        : item.precio;
      return acc + (precioFinal * item.cantidad);
    }, 0);
  };

  const calcularDescuento = () => {
    if (!descuento) return 0;
    const subtotal = calcularSubtotal();
    if (descuento.tipo === 'porcentaje') {
      return subtotal * (descuento.valor / 100);
    }
    return descuento.valor;
  };

  const calcularImpuestos = () => {
    const subtotal = calcularSubtotal();
    const descuentoTotal = calcularDescuento();
    return (subtotal - descuentoTotal) * (IMPUESTO_PORCENTAJE / 100);
  };

  const calcularTotal = () => {
    return calcularSubtotal() - calcularDescuento() + calcularImpuestos();
  };

  const aplicarCupon = () => {
    // Mock de cupones
    const cupones: { [key: string]: Descuento } = {
      'DESC10': { tipo: 'porcentaje', valor: 10, codigo: 'DESC10', descripcion: '10% de descuento' },
      'DESC20': { tipo: 'porcentaje', valor: 20, codigo: 'DESC20', descripcion: '20% de descuento' },
      'FIJO50': { tipo: 'monto', valor: 50, codigo: 'FIJO50', descripcion: '$50 de descuento' },
    };

    if (cupones[codigoCupon.toUpperCase()]) {
      setDescuento(cupones[codigoCupon.toUpperCase()]);
      setCodigoCupon('');
    } else {
      alert('Cupón inválido');
    }
  };

  const removerDescuento = () => {
    setDescuento(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden sticky top-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Carrito</h2>
              <p className="text-sm text-green-100">{carrito.length} items</p>
            </div>
          </div>
          {carrito.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLimpiarCarrito}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Items del carrito */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {carrito.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">Carrito vacío</p>
            <p className="text-gray-400 text-sm">Agrega productos para comenzar</p>
          </div>
        ) : (
          <AnimatePresence>
            {carrito.map((item) => {
              const precioFinal = item.enOferta
                ? item.precio * (1 - (item.descuento || 0) / 100)
                : item.precio;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.imagen}</span>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{item.nombre}</p>
                          {item.enOferta && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-semibold">
                              -{item.descuento}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEliminarProducto(item.id)}
                      className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Cantidad */}
                    <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onActualizarCantidad?.(item.id, item.cantidad - 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        disabled={item.cantidad <= 1}
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </motion.button>
                      <span className="text-sm font-bold text-gray-900 w-6 text-center">{item.cantidad}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onActualizarCantidad?.(item.id, item.cantidad + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Precio */}
                    <div className="text-right">
                      {item.enOferta && (
                        <p className="text-xs text-gray-400 line-through">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </p>
                      )}
                      <p className="text-lg font-bold text-green-600">
                        ${(precioFinal * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Cliente */}
      {carrito.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-semibold text-gray-700">Cliente</label>
          </div>
          <input
            type="text"
            placeholder="Buscar miembro o Cliente Genérico"
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 outline-none text-sm"
          />
        </div>
      )}

      {/* Aplicar cupón */}
      {carrito.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-semibold text-gray-700">Cupón de descuento</label>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Código de cupón"
              value={codigoCupon}
              onChange={(e) => setCodigoCupon(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 outline-none text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={aplicarCupon}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all text-sm"
            >
              Aplicar
            </motion.button>
          </div>
        </div>
      )}

      {/* Descuento aplicado */}
      {descuento && (
        <div className="px-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-xs font-semibold text-green-700">Cupón aplicado</p>
                <p className="text-xs text-green-600">{descuento.descripcion}</p>
              </div>
            </div>
            <button
              onClick={removerDescuento}
              className="p-1 hover:bg-green-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-green-600" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Totales */}
      {carrito.length > 0 && (
        <div className="px-6 pb-6">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">${calcularSubtotal().toFixed(2)}</span>
            </div>
            {descuento && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  Descuento
                </span>
                <span className="font-semibold text-green-600">-${calcularDescuento().toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Impuestos ({IMPUESTO_PORCENTAJE}%)</span>
              <span className="font-semibold text-gray-900">${calcularImpuestos().toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">TOTAL</span>
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                ${calcularTotal().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Botón proceder al pago */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onProcederPago}
            className="w-full py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <DollarSign className="w-6 h-6" />
            Proceder al Pago
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default CarritoVenta;
