import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Percent, DollarSign, Truck, Calendar, Users, ShoppingCart, CheckCircle } from 'lucide-react';
import { createCoupon, type CouponType } from '../cuponesApi';

const CrearCupones: React.FC = () => {
  const [code, setCode] = useState('');
  const [type, setType] = useState<CouponType>('percentage');
  const [value, setValue] = useState<number>(0);
  const [expiresAt, setExpiresAt] = useState('');
  const [maxUses, setMaxUses] = useState<number | undefined>(undefined);
  const [minPurchase, setMinPurchase] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const newCoupon = {
        code: code.toUpperCase(),
        type,
        value,
        description,
        startDate: new Date().toISOString(),
        endDate: expiresAt || null,
        usageLimit: maxUses || null,
        usageCount: 0,
        totalDiscount: 0,
        revenue: 0,
        applicableTo: 'all' as const,
        minPurchase: minPurchase || 0,
        onePerCustomer: false,
        campaign: 'Manual',
        tags: [],
        uses: [],
        active: true
      };
      await createCoupon(newCoupon);
      setMessage('Cupón creado exitosamente!');
      // Clear form
      setCode('');
      setValue(0);
      setExpiresAt('');
      setMaxUses(undefined);
      setMinPurchase(0);
      setDescription('');
    } catch (error) {
      setMessage('Error al crear el cupón.');
      console.error('Error creating coupon:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Crear Nuevo Cupón</h3>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4 relative z-10">
        {/* Código del Cupón */}
        <div>
          <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
            Código del Cupón
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            placeholder="Ej: VERANO2024"
            required
          />
        </div>

        {/* Tipo de Descuento */}
        <div>
          <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Descuento
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setType('percentage')}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                type === 'percentage'
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50'
                  : 'border-gray-200 hover:border-indigo-300 bg-white/80'
              }`}
            >
              <Percent className={`w-6 h-6 mx-auto mb-2 ${type === 'percentage' ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-semibold ${type === 'percentage' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Porcentaje
              </span>
            </button>
            <button
              type="button"
              onClick={() => setType('fixed')}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                type === 'fixed'
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50'
                  : 'border-gray-200 hover:border-indigo-300 bg-white/80'
              }`}
            >
              <DollarSign className={`w-6 h-6 mx-auto mb-2 ${type === 'fixed' ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-semibold ${type === 'fixed' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Importe Fijo
              </span>
            </button>
            <button
              type="button"
              onClick={() => setType('free-shipping')}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                type === 'free-shipping'
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50'
                  : 'border-gray-200 hover:border-indigo-300 bg-white/80'
              }`}
            >
              <Truck className={`w-6 h-6 mx-auto mb-2 ${type === 'free-shipping' ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-semibold ${type === 'free-shipping' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Envío Gratis
              </span>
            </button>
          </div>
        </div>

        {/* Valor */}
        {type !== 'free-shipping' && type !== '2x1' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label htmlFor="value" className="block text-sm font-semibold text-gray-700 mb-2">
              Valor ({type === 'percentage' ? '%' : '€'})
            </label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              min="0"
              placeholder={type === 'percentage' ? '10' : '5.00'}
              required
            />
          </motion.div>
        )}

        {/* Grid de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha de Caducidad */}
          <div>
            <label htmlFor="expiresAt" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha de Caducidad
            </label>
            <input
              type="date"
              id="expiresAt"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Máximo de Usos */}
          <div>
            <label htmlFor="maxUses" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Máximo de Usos
            </label>
            <input
              type="number"
              id="maxUses"
              value={maxUses || ''}
              onChange={(e) => setMaxUses(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              min="0"
              placeholder="Ilimitado"
            />
          </div>
        </div>

        {/* Compra Mínima */}
        <div>
          <label htmlFor="minPurchase" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Compra Mínima (€)
          </label>
          <input
            type="number"
            id="minPurchase"
            value={minPurchase}
            onChange={(e) => setMinPurchase(parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            min="0"
            placeholder="0.00"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción (Opcional)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            placeholder="Descripción del cupón"
          />
        </div>

        {/* Botón de Envío */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Ticket className="w-5 h-5" />
          Crear Cupón
        </motion.button>

        {/* Mensaje de éxito/error */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl flex items-center gap-2 ${
              message.includes('Error')
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-semibold">{message}</p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default CrearCupones;
