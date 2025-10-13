import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Gift, Ticket, Calendar, Activity, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { fetchCoupons, createCoupon } from '../cuponesApi';
import { Coupon } from '../../../types'; // Adjust path as needed

const PremiosFidelidad: React.FC = () => {
  const [loyaltyCoupons, setLoyaltyCoupons] = useState<Coupon[]>([]);
  const [newLoyaltyCode, setNewLoyaltyCode] = useState('');
  const [newLoyaltyValue, setNewLoyaltyValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadLoyaltyCoupons = async () => {
      try {
        const allCoupons = await fetchCoupons();
        setLoyaltyCoupons(allCoupons.filter(c => c.campaign === 'Premios Fidelidad'));
      } catch (err) {
        setError('Error al cargar cupones de fidelidad.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadLoyaltyCoupons();
  }, []);

  const handleCreateLoyaltyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const newCoupon: Omit<Coupon, 'id' | 'currentUses' | 'status'> = {
        code: newLoyaltyCode,
        type: 'fixed', // Default for loyalty rewards
        value: newLoyaltyValue,
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0], // 6 months validity
        maxUses: 1, // Typically single use for loyalty rewards
        reusable: false,
        restrictions: { products: [], clients: ['loyal_customer_group'], minPurchase: 100 }, // Example restriction
        campaign: 'Premios Fidelidad',
      };
      const created = await createCoupon(newCoupon);
      setLoyaltyCoupons([...loyaltyCoupons, created]);
      setMessage('Cupón de fidelidad creado exitosamente!');
      setNewLoyaltyCode('');
      setNewLoyaltyValue(0);
    } catch (err) {
      setMessage('Error al crear cupón de fidelidad.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex items-center gap-3">
        <XCircle className="w-6 h-6 text-red-600" />
        <p className="text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lista de Cupones de Fidelidad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Cupones de Fidelidad Activos</h3>
          </div>
        </div>

        <div className="p-6 relative z-10">
          {loyaltyCoupons.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Gift className="w-10 h-10 text-purple-600" />
              </div>
              <p className="text-gray-600 font-medium">No hay cupones de fidelidad activos.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {loyaltyCoupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Ticket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {coupon.code}
                          <span className="ml-2 px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                            {coupon.value}{coupon.type === 'fixed' ? '€' : '%'} OFF
                          </span>
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>Caduca: {coupon.expiresAt || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Activity className="w-3 h-3" />
                            <span>Usos: {coupon.currentUses}/{coupon.maxUses || '∞'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Formulario Crear Cupón de Fidelidad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Crear Nuevo Cupón de Fidelidad</h3>
          </div>
        </div>

        <form onSubmit={handleCreateLoyaltyCoupon} className="p-6 space-y-4 relative z-10">
          {/* Código */}
          <div>
            <label htmlFor="newLoyaltyCode" className="block text-sm font-semibold text-gray-700 mb-2">
              Código del Cupón
            </label>
            <input
              type="text"
              id="newLoyaltyCode"
              value={newLoyaltyCode}
              onChange={(e) => setNewLoyaltyCode(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="Ej: PREMIO2024"
              required
            />
          </div>

          {/* Valor */}
          <div>
            <label htmlFor="newLoyaltyValue" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Valor del Descuento (€)
            </label>
            <input
              type="number"
              id="newLoyaltyValue"
              value={newLoyaltyValue}
              onChange={(e) => setNewLoyaltyValue(parseFloat(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              min="0"
              placeholder="10"
              required
            />
          </div>

          {/* Info adicional */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Nota:</span> Los cupones de fidelidad tienen una validez de 6 meses, son de un solo uso y requieren una compra mínima de 100€.
            </p>
          </div>

          {/* Botón Crear */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Star className="w-5 h-5" />
            Crear Cupón de Fidelidad
          </motion.button>

          {/* Mensaje */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl flex items-center gap-2 ${
                message.includes('Error')
                  ? 'bg-red-50 border border-red-200 text-red-700'
                  : 'bg-purple-50 border border-purple-200 text-purple-700'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-semibold">{message}</p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default PremiosFidelidad;
