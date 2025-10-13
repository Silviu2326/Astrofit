import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Ticket, Calendar, Users, Settings, CheckCircle, XCircle } from 'lucide-react';
import { fetchCoupons, updateCoupon, getExpiringCoupons } from '../cuponesApi';
import { Coupon } from '../../../types'; // Adjust path as needed

const GestionCaducidad: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [expiringCoupons, setExpiringCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const allCoupons = await fetchCoupons();
        setCoupons(allCoupons);
        const expiring = await getExpiringCoupons();
        setExpiringCoupons(expiring);
      } catch (err) {
        setError('Error al cargar los cupones.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCoupons();
  }, []);

  const handleUpdateExpiry = async (couponId: string, newExpiresAt: string | undefined, newMaxUses: number | undefined) => {
    try {
      const couponToUpdate = coupons.find(c => c.id === couponId);
      if (couponToUpdate) {
        const updated = { ...couponToUpdate, expiresAt: newExpiresAt, maxUses: newMaxUses };
        await updateCoupon(updated);
        setCoupons(coupons.map(c => (c.id === couponId ? updated : c)));
        // Re-fetch expiring coupons to update the list
        const expiring = await getExpiringCoupons();
        setExpiringCoupons(expiring);
      }
    } catch (err) {
      setError('Error al actualizar la caducidad.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
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
      {/* Cupones Próximos a Caducar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Cupones Próximos a Caducar</h3>
          </div>
        </div>

        <div className="p-6 relative z-10">
          {expiringCoupons.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-gray-600 font-medium">No hay cupones próximos a caducar en los próximos 7 días.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expiringCoupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{coupon.code}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>Caduca: {coupon.expiresAt || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Users className="w-3 h-3" />
                            <span>Usos restantes: {coupon.maxUses !== undefined ? (coupon.maxUses - coupon.currentUses) : 'Ilimitados'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert(`Implementar acción para renovar/desactivar cupón ${coupon.code}`)}
                      className="px-4 py-2 bg-white border-2 border-orange-300 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-300 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Gestionar
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Todos los Cupones - Gestión Manual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Todos los Cupones (Gestión Manual)</h3>
          </div>
        </div>

        <div className="p-6 relative z-10">
          <div className="space-y-4">
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.03, duration: 0.3 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Ticket className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-bold text-gray-900">{coupon.code}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Nueva Fecha */}
                  <div>
                    <label htmlFor={`expiry-${coupon.id}`} className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Nueva Fecha de Caducidad
                    </label>
                    <input
                      type="date"
                      id={`expiry-${coupon.id}`}
                      defaultValue={coupon.expiresAt || ''}
                      onChange={(e) => handleUpdateExpiry(coupon.id, e.target.value || undefined, coupon.maxUses)}
                      className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 text-sm"
                    />
                  </div>

                  {/* Max Usos */}
                  <div>
                    <label htmlFor={`maxuses-${coupon.id}`} className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Máximo de Usos
                    </label>
                    <input
                      type="number"
                      id={`maxuses-${coupon.id}`}
                      defaultValue={coupon.maxUses || ''}
                      onChange={(e) => handleUpdateExpiry(coupon.id, coupon.expiresAt, e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 text-sm"
                      placeholder="Ilimitado"
                      min="0"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GestionCaducidad;
