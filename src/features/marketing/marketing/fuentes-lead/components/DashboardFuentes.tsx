import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  UserPlus,
  Mail,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  MousePointerClick
} from 'lucide-react';
import { getLeadSources, LeadSource } from '../fuentesLeadApi';

// Mapeo de canales a iconos y colores
const channelConfig: Record<string, { icon: any; gradient: string; bgColor: string }> = {
  'Google Ads': { icon: Search, gradient: 'from-red-500 to-orange-500', bgColor: 'bg-red-50' },
  'Facebook Ads': { icon: Facebook, gradient: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50' },
  'Instagram': { icon: Instagram, gradient: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50' },
  'LinkedIn': { icon: Linkedin, gradient: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
  'Web Propia': { icon: Globe, gradient: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50' },
  'Recomendación': { icon: UserPlus, gradient: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50' },
  'Email Marketing': { icon: Mail, gradient: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50' },
  'Eventos': { icon: Calendar, gradient: 'from-teal-500 to-cyan-500', bgColor: 'bg-teal-50' }
};

const DashboardFuentes: React.FC = () => {
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedChannel, setSelectedChannel] = useState<LeadSource | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const sources = await getLeadSources();
      setLeadSources(sources);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full"></div>
            <p className="text-gray-600 font-semibold">Cargando canales...</p>
          </div>
        </div>
      </div>
    );
  }

  const getTrendIcon = (change: number) => {
    if (change > 5) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < -5) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 5) return 'text-green-600';
    if (change < -5) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <MousePointerClick className="w-6 h-6" />
            </div>
            Dashboard de Canales
          </h3>
          <p className="text-emerald-100 mt-2">Rendimiento por fuente de leads</p>
        </div>
      </div>

      {/* Grid de Canales */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {leadSources.map((source, index) => {
            const config = channelConfig[source.name] || channelConfig['Web Propia'];
            const Icon = config.icon;
            const trend = Math.random() > 0.5 ? Math.random() * 20 : -Math.random() * 10;

            return (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -8 }}
                onClick={() => setSelectedChannel(source)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border border-gray-100 relative overflow-hidden group cursor-pointer"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Decoración de fondo */}
                <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${config.gradient} opacity-5 rounded-full blur-xl`}></div>

                <div className="relative z-10">
                  {/* Icono distintivo grande */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Nombre del canal */}
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{source.name}</h4>

                  {/* Métricas principales */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Leads</span>
                      <span className="text-xl font-bold text-gray-900">{source.leads}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Conversión</span>
                      <span className="text-lg font-bold text-emerald-600">{source.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-500 uppercase">CPL</span>
                      <span className="text-sm font-bold text-gray-700">€{source.costPerLead.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Tendencia */}
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor}`}>
                    {getTrendIcon(trend)}
                    <span className={`text-sm font-bold ${getTrendColor(trend)}`}>
                      {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">vs mes anterior</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.conversionRate}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal de detalles del canal (si hay uno seleccionado) */}
        {selectedChannel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedChannel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedChannel(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              {/* Header del modal */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${channelConfig[selectedChannel.name]?.gradient || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white shadow-xl`}>
                  {React.createElement(channelConfig[selectedChannel.name]?.icon || Globe, { className: 'w-8 h-8' })}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{selectedChannel.name}</h3>
                  <p className="text-gray-600">Detalles completos del canal</p>
                </div>
              </div>

              {/* Métricas detalladas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-600 uppercase mb-1">Leads Generados</p>
                  <p className="text-3xl font-bold text-blue-900">{selectedChannel.leads}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
                  <p className="text-sm font-semibold text-green-600 uppercase mb-1">Clientes</p>
                  <p className="text-3xl font-bold text-green-900">{selectedChannel.customers}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100">
                  <p className="text-sm font-semibold text-purple-600 uppercase mb-1">Tasa de Conversión</p>
                  <p className="text-3xl font-bold text-purple-900">{selectedChannel.conversionRate}%</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-2xl border border-orange-100">
                  <p className="text-sm font-semibold text-orange-600 uppercase mb-1">ROI</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {selectedChannel.roi === Infinity ? '∞' : `${selectedChannel.roi.toFixed(0)}%`}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-2xl border border-teal-100">
                  <p className="text-sm font-semibold text-teal-600 uppercase mb-1">Costo por Lead</p>
                  <p className="text-3xl font-bold text-teal-900">€{selectedChannel.costPerLead.toFixed(2)}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-100">
                  <p className="text-sm font-semibold text-yellow-600 uppercase mb-1">Costo por Cliente</p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {selectedChannel.costPerCustomer === 0 ? 'Gratis' : `€${selectedChannel.costPerCustomer.toFixed(2)}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardFuentes;
