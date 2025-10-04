import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Shield,
  Lock,
  Star,
  Calendar,
  AlertCircle,
  Smartphone,
  Building,
  DollarSign,
  X
} from 'lucide-react';

interface MetodoPago {
  id: string;
  tipo: 'tarjeta' | 'paypal' | 'transferencia' | 'wallet';
  nombre: string;
  ultimos4: string;
  expiracion?: string;
  marca?: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  esPredeterminado: boolean;
  email?: string;
  banco?: string;
}

export const MetodosPago = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [metodoPagoEditando, setMetodoPagoEditando] = useState<MetodoPago | null>(null);

  // Datos mockeados
  const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([
    {
      id: '1',
      tipo: 'tarjeta',
      nombre: 'Tarjeta Personal',
      ultimos4: '4242',
      expiracion: '12/2026',
      marca: 'Visa',
      esPredeterminado: true
    },
    {
      id: '2',
      tipo: 'tarjeta',
      nombre: 'Tarjeta Empresarial',
      ultimos4: '5555',
      expiracion: '08/2025',
      marca: 'Mastercard',
      esPredeterminado: false
    },
    {
      id: '3',
      tipo: 'paypal',
      nombre: 'PayPal Principal',
      ultimos4: '',
      email: 'usuario@email.com',
      esPredeterminado: false
    },
    {
      id: '4',
      tipo: 'transferencia',
      nombre: 'Transferencia Bancaria',
      ultimos4: '7890',
      banco: 'Banco BBVA',
      esPredeterminado: false
    }
  ]);

  const marcaConfig = {
    Visa: { color: 'from-blue-600 to-blue-700', logo: '💳' },
    Mastercard: { color: 'from-red-600 to-orange-600', logo: '💳' },
    Amex: { color: 'from-green-600 to-teal-600', logo: '💳' },
    Discover: { color: 'from-orange-600 to-yellow-600', logo: '💳' }
  };

  const tipoIconos = {
    tarjeta: CreditCard,
    paypal: DollarSign,
    transferencia: Building,
    wallet: Smartphone
  };

  const handleEliminar = (id: string) => {
    setMetodosPago(metodosPago.filter(m => m.id !== id));
  };

  const handleEstablecerPredeterminado = (id: string) => {
    setMetodosPago(metodosPago.map(m => ({
      ...m,
      esPredeterminado: m.id === id
    })));
  };

  return (
    <div className="space-y-8">
      {/* Header con botón agregar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Métodos de Pago</h3>
            </div>
            <p className="text-gray-600">Administra tus métodos de pago para suscripciones</p>
          </div>

          <button
            onClick={() => setMostrarFormulario(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Agregar Método
          </button>
        </div>

        {/* Indicadores de seguridad */}
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Encriptación SSL</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Datos Protegidos</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200">
            <CheckCircle className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">PCI Compliant</span>
          </div>
        </div>
      </motion.div>

      {/* Lista de Métodos de Pago */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metodosPago.map((metodo, index) => {
          const TipoIcon = tipoIconos[metodo.tipo];

          return (
            <motion.div
              key={metodo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-2 ${
                metodo.esPredeterminado ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50' : 'border-white/50 bg-white/80 backdrop-blur-xl'
              }`}
            >
              {/* Badge de predeterminado */}
              {metodo.esPredeterminado && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold">Predeterminado</span>
                  </div>
                </div>
              )}

              {/* Contenido de la tarjeta */}
              <div className="relative z-10">
                {/* Tipo de método */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${
                    metodo.tipo === 'tarjeta' && metodo.marca
                      ? `bg-gradient-to-br ${marcaConfig[metodo.marca].color}`
                      : 'bg-gradient-to-br from-gray-600 to-gray-700'
                  } flex items-center justify-center text-white shadow-lg`}>
                    <TipoIcon className="w-7 h-7" />
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900">{metodo.nombre}</p>
                    <p className="text-sm text-gray-600">
                      {metodo.tipo === 'tarjeta' && metodo.marca && `${metodo.marca}`}
                      {metodo.tipo === 'paypal' && 'PayPal'}
                      {metodo.tipo === 'transferencia' && metodo.banco}
                      {metodo.tipo === 'wallet' && 'Digital Wallet'}
                    </p>
                  </div>
                </div>

                {/* Detalles */}
                <div className="space-y-3 mb-4">
                  {metodo.tipo === 'tarjeta' && (
                    <>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">•••• •••• •••• {metodo.ultimos4}</span>
                      </div>
                      {metodo.expiracion && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Expira {metodo.expiracion}</span>
                        </div>
                      )}
                    </>
                  )}

                  {metodo.tipo === 'paypal' && metodo.email && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{metodo.email}</span>
                    </div>
                  )}

                  {metodo.tipo === 'transferencia' && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Cuenta ****{metodo.ultimos4}</span>
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  {!metodo.esPredeterminado && (
                    <button
                      onClick={() => handleEstablecerPredeterminado(metodo.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <Star className="w-4 h-4" />
                      Predeterminado
                    </button>
                  )}
                  <button
                    onClick={() => setMetodoPagoEditando(metodo)}
                    className="px-4 py-2 bg-blue-100 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-200 transition-all duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEliminar(metodo.id)}
                    disabled={metodo.esPredeterminado}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      metodo.esPredeterminado
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mensaje si no hay métodos */}
      {metodosPago.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">No hay métodos de pago</p>
          <p className="text-gray-500 mb-6">Agrega tu primer método de pago para comenzar</p>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Agregar Método de Pago
          </button>
        </motion.div>
      )}

      {/* Modal de Agregar/Editar */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setMostrarFormulario(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Agregar Método de Pago</h3>
                  </div>
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 space-y-6">
                {/* Tipo de método */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Tipo de Método</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { tipo: 'tarjeta', icon: CreditCard, label: 'Tarjeta' },
                      { tipo: 'paypal', icon: DollarSign, label: 'PayPal' },
                      { tipo: 'transferencia', icon: Building, label: 'Transferencia' },
                      { tipo: 'wallet', icon: Smartphone, label: 'Wallet' }
                    ].map((opcion) => (
                      <button
                        key={opcion.tipo}
                        className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                      >
                        <opcion.icon className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-700">{opcion.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Método</label>
                  <input
                    type="text"
                    placeholder="Ej: Tarjeta Personal"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                  />
                </div>

                {/* Número de tarjeta */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Tarjeta</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiración */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiración</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                    />
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                {/* Checkbox predeterminado */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <input
                    type="checkbox"
                    id="predeterminado"
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <label htmlFor="predeterminado" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Establecer como método predeterminado
                  </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                    Guardar Método
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
