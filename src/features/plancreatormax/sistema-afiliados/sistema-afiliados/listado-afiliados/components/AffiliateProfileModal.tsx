import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Phone, Mail, Instagram, Youtube, Calendar, Award,
  TrendingUp, DollarSign, Target, ExternalLink, Copy, CheckCircle
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Affiliate, getTierInfo } from '../data/mockData';

interface AffiliateProfileModalProps {
  affiliate: Affiliate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateProfileModal: React.FC<AffiliateProfileModalProps> = ({ affiliate, isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  if (!affiliate) return null;

  const tierInfo = getTierInfo(affiliate.tier);

  // Mock data para gráficos
  const salesChartData = [
    { month: 'Ene', ventas: 12000 },
    { month: 'Feb', ventas: 15000 },
    { month: 'Mar', ventas: 18000 },
    { month: 'Abr', ventas: 16000 },
    { month: 'May', ventas: 22000 },
    { month: 'Jun', ventas: 25000 },
  ];

  const funnelData = [
    { name: 'Clicks', value: affiliate.clicks, color: '#6366f1' },
    { name: 'Visitas', value: Math.floor(affiliate.clicks * 0.7), color: '#8b5cf6' },
    { name: 'Conversiones', value: affiliate.conversions, color: '#10b981' },
  ];

  const topProducts = [
    { name: 'Plan Premium', sales: 45 },
    { name: 'Plan Pro', sales: 32 },
    { name: 'Plan Starter', sales: 28 },
    { name: 'Addon Marketing', sales: 15 },
  ];

  const trafficSources = [
    { name: 'Instagram', value: 45, color: '#e91e63' },
    { name: 'YouTube', value: 30, color: '#f44336' },
    { name: 'Email', value: 15, color: '#2196f3' },
    { name: 'Directo', value: 10, color: '#4caf50' },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(affiliate.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Calcular progreso al siguiente tier
  const getNextTierProgress = () => {
    const tiers = ['Bronce', 'Plata', 'Oro', 'Platino'];
    const currentIndex = tiers.indexOf(affiliate.tier);
    if (currentIndex === tiers.length - 1) return { nextTier: null, progress: 100 };

    const nextTier = tiers[currentIndex + 1];
    const tierLimits = {
      Bronce: 10,
      Plata: 50,
      Oro: 100,
      Platino: 999999,
    };

    const currentSales = affiliate.conversions;
    const nextTierLimit = tierLimits[nextTier as keyof typeof tierLimits];
    const progress = Math.min((currentSales / nextTierLimit) * 100, 100);

    return { nextTier, progress, remaining: nextTierLimit - currentSales };
  };

  const nextTierInfo = getNextTierProgress();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-auto"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden">
                {/* Header */}
                <div className={`bg-gradient-to-r ${tierInfo.color} p-8 relative overflow-hidden`}>
                  {/* Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors text-white z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-3xl shadow-xl border-4 border-white/30">
                        {affiliate.avatar}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-2">{affiliate.name}</h2>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {affiliate.email && (
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                              <Mail className="w-4 h-4 text-white" />
                              <span className="text-sm text-white">{affiliate.email}</span>
                            </div>
                          )}
                          {affiliate.phone && (
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                              <Phone className="w-4 h-4 text-white" />
                              <span className="text-sm text-white">{affiliate.phone}</span>
                            </div>
                          )}
                          {affiliate.location && (
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                              <MapPin className="w-4 h-4 text-white" />
                              <span className="text-sm text-white">{affiliate.location}</span>
                            </div>
                          )}
                        </div>
                        {affiliate.socialMedia && (
                          <div className="flex gap-2">
                            {affiliate.socialMedia.instagram && (
                              <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                                <Instagram className="w-5 h-5 text-white" />
                              </a>
                            )}
                            {affiliate.socialMedia.youtube && (
                              <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                                <Youtube className="w-5 h-5 text-white" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  {/* Info del programa */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <span className="text-sm font-semibold text-gray-600">Fecha de ingreso</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {new Date(affiliate.registrationDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-600">Tier actual</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xl font-bold ${tierInfo.textColor}`}>
                          {affiliate.tier}
                        </span>
                        <span className={`px-3 py-1 ${tierInfo.bgColor} ${tierInfo.textColor} text-xs font-bold rounded-full`}>
                          {tierInfo.commission}% comisión
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Target className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-600">Código único</span>
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          {copiedCode ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-blue-600" />
                          )}
                        </button>
                      </div>
                      <p className="text-xl font-bold font-mono text-gray-900">{affiliate.code}</p>
                    </div>
                  </div>

                  {/* Progreso al siguiente tier */}
                  {nextTierInfo.nextTier && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-600">
                          Progreso a {nextTierInfo.nextTier}
                        </span>
                        <span className="text-sm font-bold text-indigo-600">
                          {nextTierInfo.remaining} ventas restantes
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${nextTierInfo.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${tierInfo.color} relative`}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Métricas de rendimiento */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Métricas de Rendimiento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Gráfico de ventas */}
                      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-600 mb-4">Ventas Mensuales</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={salesChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip />
                            <Line type="monotone" dataKey="ventas" stroke="#6366f1" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Funnel de conversión */}
                      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-600 mb-4">Embudo de Conversión</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={funnelData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis type="number" stroke="#6b7280" />
                            <YAxis dataKey="name" type="category" stroke="#6b7280" />
                            <Tooltip />
                            <Bar dataKey="value">
                              {funnelData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Top productos */}
                      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-600 mb-4">Productos Más Vendidos</h4>
                        <div className="space-y-3">
                          {topProducts.map((product, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{product.name}</span>
                                <span className="text-sm font-bold text-indigo-600">{product.sales} ventas</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                                  style={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fuentes de tráfico */}
                      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-600 mb-4">Fuentes de Tráfico</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={trafficSources}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {trafficSources.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Comisiones */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Comisiones</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <DollarSign className="w-8 h-8 text-green-600 mb-2" />
                        <p className="text-sm font-semibold text-gray-600 mb-1">Total Ganado</p>
                        <p className="text-2xl font-bold text-green-700">
                          ${affiliate.commissionsEarned.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                        <TrendingUp className="w-8 h-8 text-yellow-600 mb-2" />
                        <p className="text-sm font-semibold text-gray-600 mb-1">Pendiente de Pago</p>
                        <p className="text-2xl font-bold text-yellow-700">
                          ${affiliate.pendingCommission?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                        <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                        <p className="text-sm font-semibold text-gray-600 mb-1">Último Pago</p>
                        <p className="text-lg font-bold text-blue-700">
                          {affiliate.lastPayment ? new Date(affiliate.lastPayment).toLocaleDateString('es-ES') : 'N/A'}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                        <Award className="w-8 h-8 text-purple-600 mb-2" />
                        <p className="text-sm font-semibold text-gray-600 mb-1">Método de Pago</p>
                        <p className="text-lg font-bold text-purple-700">
                          {affiliate.paymentMethod || 'No configurado'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
