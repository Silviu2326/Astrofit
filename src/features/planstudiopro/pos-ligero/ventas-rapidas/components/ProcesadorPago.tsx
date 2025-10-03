import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, DollarSign, Smartphone, Banknote, CheckCircle, Loader } from 'lucide-react';
import { ItemCarrito } from '../../../types';

interface ProcesadorPagoProps {
  total: number;
  carrito: ItemCarrito[];
  onPagoExitoso: () => void;
  onCancelar: () => void;
}

type MetodoPago = 'tarjeta' | 'efectivo' | 'transferencia' | 'credito';

const ProcesadorPago: React.FC<ProcesadorPagoProps> = ({ total, carrito, onPagoExitoso, onCancelar }) => {
  const [procesando, setProcesando] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [metodoPago, setMetodoPago] = useState<MetodoPago>('tarjeta');
  const [montoRecibido, setMontoRecibido] = useState<string>('');

  const calcularCambio = () => {
    const recibido = parseFloat(montoRecibido) || 0;
    return recibido - total;
  };

  const simularPago = () => {
    if (metodoPago === 'efectivo' && parseFloat(montoRecibido) < total) {
      alert('El monto recibido es menor que el total');
      return;
    }

    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      setPagoExitoso(true);
      setTimeout(() => {
        onPagoExitoso();
      }, 2000);
    }, 2000);
  };

  const metodosPago = [
    { id: 'tarjeta', nombre: 'Tarjeta', icono: CreditCard, color: 'from-blue-500 to-indigo-600' },
    { id: 'efectivo', nombre: 'Efectivo', icono: Banknote, color: 'from-green-500 to-emerald-600' },
    { id: 'transferencia', nombre: 'Transferencia', icono: Smartphone, color: 'from-purple-500 to-pink-600' },
    { id: 'credito', nombre: 'Crédito Cuenta', icono: DollarSign, color: 'from-orange-500 to-red-600' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onCancelar}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/50"
        >
          {pagoExitoso ? (
            // Confirmación de pago exitoso
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
              >
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
              <p className="text-gray-600 text-lg mb-6">La transacción se ha completado correctamente</p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                  ${total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-2">Total pagado</p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Procesar Pago</h2>
                    <p className="text-green-100">Selecciona el método de pago</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onCancelar}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Resumen de compra */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Resumen de Compra</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {carrito.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.nombre} x{item.cantidad}</span>
                        <span className="font-semibold text-gray-900">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">TOTAL</span>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Métodos de pago */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Método de Pago</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {metodosPago.map((metodo) => (
                      <motion.button
                        key={metodo.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMetodoPago(metodo.id as MetodoPago)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          metodoPago === metodo.id
                            ? 'border-green-500 bg-gradient-to-br ' + metodo.color
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <metodo.icono className={`w-8 h-8 mx-auto mb-2 ${
                          metodoPago === metodo.id ? 'text-white' : 'text-gray-600'
                        }`} />
                        <p className={`text-sm font-semibold ${
                          metodoPago === metodo.id ? 'text-white' : 'text-gray-900'
                        }`}>
                          {metodo.nombre}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Formulario según método de pago */}
                <div className="space-y-4">
                  {metodoPago === 'tarjeta' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <input
                        type="text"
                        placeholder="Número de tarjeta"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {metodoPago === 'efectivo' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Monto Recibido
                        </label>
                        <input
                          type="number"
                          value={montoRecibido}
                          onChange={(e) => setMontoRecibido(e.target.value)}
                          placeholder="0.00"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none text-2xl font-bold text-center"
                        />
                      </div>
                      {montoRecibido && parseFloat(montoRecibido) >= total && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center"
                        >
                          <p className="text-sm text-gray-600 mb-1">Cambio</p>
                          <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                            ${calcularCambio().toFixed(2)}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {metodoPago === 'transferencia' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 text-center"
                    >
                      <Smartphone className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                      <p className="text-gray-700 mb-2">Escanea el código QR o</p>
                      <p className="text-sm text-gray-600">ingresa el número de referencia</p>
                      <input
                        type="text"
                        placeholder="Número de referencia"
                        className="w-full mt-4 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
                      />
                    </motion.div>
                  )}

                  {metodoPago === 'credito' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200"
                    >
                      <p className="text-gray-700 font-semibold mb-2">Cargar a cuenta del miembro</p>
                      <p className="text-sm text-gray-600 mb-4">El monto será deducido del crédito disponible</p>
                      <div className="bg-white rounded-xl p-4 border border-orange-200">
                        <p className="text-xs text-gray-500">Crédito disponible</p>
                        <p className="text-2xl font-bold text-orange-600">$500.00</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCancelar}
                    disabled={procesando}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-300 transition-all duration-300 disabled:opacity-50"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={simularPago}
                    disabled={procesando}
                    className="flex-1 py-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {procesando ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Confirmar Pago
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProcesadorPago;
