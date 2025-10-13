import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Ticket, Calendar, Activity, CheckCircle, XCircle, Percent } from 'lucide-react';
import { fetchCoupons, createCoupon } from '../cuponesApi';
import { Coupon } from '../../../types'; // Adjust path as needed

const CampanasCaptacion: React.FC = () => {
  const [captureCoupons, setCaptureCoupons] = useState<Coupon[]>([]);
  const [newCampaignCode, setNewCampaignCode] = useState('');
  const [newCampaignValue, setNewCampaignValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCaptureCoupons = async () => {
      try {
        const allCoupons = await fetchCoupons();
        setCaptureCoupons(allCoupons.filter(c => c.campaign === 'Captación Nuevos Clientes'));
      } catch (err) {
        setError('Error al cargar cupones de captación.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCaptureCoupons();
  }, []);

  const handleCreateCaptureCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const newCoupon: Omit<Coupon, 'id' | 'currentUses' | 'status'> = {
        code: newCampaignCode,
        type: 'percentage', // Default for capture campaigns
        value: newCampaignValue,
        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // 1 year validity
        maxUses: undefined, // Unlimited uses for capture
        reusable: true,
        restrictions: { products: [], clients: [], minPurchase: 20 }, // Example restriction
        campaign: 'Captación Nuevos Clientes',
      };
      const created = await createCoupon(newCoupon);
      setCaptureCoupons([...captureCoupons, created]);
      setMessage('Cupón de captación creado exitosamente!');
      setNewCampaignCode('');
      setNewCampaignValue(0);
    } catch (err) {
      setMessage('Error al crear cupón de captación.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
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
      {/* Lista de Cupones Activos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Cupones de Captación Activos</h3>
          </div>
        </div>

        <div className="p-6 relative z-10">
          {captureCoupons.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                <Ticket className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="text-gray-600 font-medium">No hay cupones de captación activos.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {captureCoupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Ticket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {coupon.code}
                          <span className="ml-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                            {coupon.value}{coupon.type === 'percentage' ? '%' : '€'} OFF
                          </span>
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>Caduca: {coupon.expiresAt || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Activity className="w-3 h-3" />
                            <span>Usos: {coupon.currentUses}</span>
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

      {/* Formulario Crear Cupón */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 p-6 relative overflow-hidden">
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
            <h3 className="text-xl font-bold text-white">Crear Nuevo Cupón de Captación</h3>
          </div>
        </div>

        <form onSubmit={handleCreateCaptureCoupon} className="p-6 space-y-4 relative z-10">
          {/* Código */}
          <div>
            <label htmlFor="newCampaignCode" className="block text-sm font-semibold text-gray-700 mb-2">
              Código del Cupón
            </label>
            <input
              type="text"
              id="newCampaignCode"
              value={newCampaignCode}
              onChange={(e) => setNewCampaignCode(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="Ej: BIENVENIDO2024"
              required
            />
          </div>

          {/* Valor */}
          <div>
            <label htmlFor="newCampaignValue" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Valor del Descuento (%)
            </label>
            <input
              type="number"
              id="newCampaignValue"
              value={newCampaignValue}
              onChange={(e) => setNewCampaignValue(parseFloat(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              min="0"
              max="100"
              placeholder="10"
              required
            />
          </div>

          {/* Info adicional */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Nota:</span> Los cupones de captación tienen una validez de 1 año y son reutilizables con una compra mínima de 20€.
            </p>
          </div>

          {/* Botón Crear */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Crear Cupón de Captación
          </motion.button>

          {/* Mensaje */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl flex items-center gap-2 ${
                message.includes('Error')
                  ? 'bg-red-50 border border-red-200 text-red-700'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
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

export default CampanasCaptacion;
