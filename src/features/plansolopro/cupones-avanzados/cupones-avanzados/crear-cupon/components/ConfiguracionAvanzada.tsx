import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, ShoppingCart, Package, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface CuponData {
  minimoCompra?: number;
  productosAplicables?: string[];
  activo: boolean;
}

interface ConfiguracionAvanzadaProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const ConfiguracionAvanzada: React.FC<ConfiguracionAvanzadaProps> = ({ cuponData, onFormChange }) => {
  const [aplicaAProductos, setAplicaAProductos] = useState(false);
  const [tieneMinimo, setTieneMinimo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'productosAplicables') {
      onFormChange({ [name]: value.split(',').map(s => s.trim()).filter(s => s !== '') });
    } else {
      onFormChange({ [name]: value });
    }
  };

  const toggleProductos = () => {
    const newValue = !aplicaAProductos;
    setAplicaAProductos(newValue);
    if (!newValue) {
      onFormChange({ productosAplicables: [] });
    }
  };

  const toggleMinimo = () => {
    const newValue = !tieneMinimo;
    setTieneMinimo(newValue);
    if (!newValue) {
      onFormChange({ minimoCompra: undefined });
    }
  };

  const productosCount = cuponData.productosAplicables?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white">
            <Settings className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Configuración Avanzada</h2>
        </div>
        <p className="text-sm text-gray-600">Personaliza restricciones y condiciones especiales</p>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Estado del cupón */}
        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${cuponData.activo ? 'bg-green-100' : 'bg-gray-100'}`}>
                {cuponData.activo ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Estado del Cupón</p>
                <p className="text-xs text-gray-500">
                  {cuponData.activo ? 'Activo y listo para usar' : 'Desactivado temporalmente'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onFormChange({ activo: !cuponData.activo })}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                cuponData.activo ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: cuponData.activo ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
          </div>
        </div>

        {/* Mínimo de compra */}
        <div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-gray-700">Requiere mínimo de compra</span>
            </div>
            <button
              type="button"
              onClick={toggleMinimo}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                tieneMinimo ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: tieneMinimo ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
          </div>

          {tieneMinimo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label htmlFor="minimoCompra" className="block text-sm font-semibold text-gray-700 mb-2">
                Mínimo de Compra (€)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="minimoCompra"
                  name="minimoCompra"
                  value={cuponData.minimoCompra || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  €
                </div>
              </div>
              <div className="mt-2 flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  El cupón solo será válido para compras que superen este monto
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Productos aplicables */}
        <div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl mb-3">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">Aplicar solo a productos específicos</span>
            </div>
            <button
              type="button"
              onClick={toggleProductos}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                aplicaAProductos ? 'bg-gradient-to-r from-indigo-500 to-blue-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: aplicaAProductos ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
          </div>

          {aplicaAProductos && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label htmlFor="productosAplicables" className="block text-sm font-semibold text-gray-700 mb-2">
                IDs de Productos (separados por comas)
              </label>
              <textarea
                id="productosAplicables"
                name="productosAplicables"
                value={cuponData.productosAplicables?.join(', ') || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-mono text-sm resize-none"
                placeholder="ej. PROD001, PROD002, PROD003"
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-start gap-2 p-3 bg-indigo-50 rounded-xl flex-1 mr-2">
                  <AlertCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-indigo-700">
                    El descuento se aplicará únicamente a estos productos
                  </p>
                </div>
                {productosCount > 0 && (
                  <div className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl">
                    <p className="text-xs font-bold">{productosCount} producto{productosCount !== 1 ? 's' : ''}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Resumen de restricciones */}
        <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-gray-200">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-gray-600" />
            Resumen de Restricciones
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${cuponData.activo ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-gray-700">
                Estado: <span className="font-semibold">{cuponData.activo ? 'Activo' : 'Inactivo'}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${tieneMinimo ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
              <span className="text-gray-700">
                Mínimo: <span className="font-semibold">
                  {tieneMinimo && cuponData.minimoCompra ? `${cuponData.minimoCompra}€` : 'Sin restricción'}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${aplicaAProductos && productosCount > 0 ? 'bg-indigo-500' : 'bg-gray-400'}`}></div>
              <span className="text-gray-700">
                Productos: <span className="font-semibold">
                  {aplicaAProductos && productosCount > 0 ? `${productosCount} específicos` : 'Todos'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfiguracionAvanzada;
