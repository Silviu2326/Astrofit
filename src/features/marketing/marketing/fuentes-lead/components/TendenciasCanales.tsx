import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  BarChart3
} from 'lucide-react';
import { getChannelTrends, ChannelTrend } from '../fuentesLeadApi';

const TendenciasCanales: React.FC = () => {
  const [channelTrends, setChannelTrends] = useState<ChannelTrend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannelTrends = async () => {
      const data = await getChannelTrends();
      setChannelTrends(data);
      if (data.length > 0) {
        const firstChannel = Object.keys(data[0]).find(key => key !== 'month');
        setSelectedChannel(firstChannel || null);
      }
      setLoading(false);
    };
    fetchChannelTrends();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full"></div>
            <p className="text-gray-600 font-semibold">Cargando tendencias...</p>
          </div>
        </div>
      </div>
    );
  }

  const channels = Object.keys(channelTrends[0] || {}).filter(key => key !== 'month');

  const channelColors: Record<string, { gradient: string; color: string }> = {
    'Instagram': { gradient: 'from-purple-500 to-pink-500', color: '#8B5CF6' },
    'GoogleAds': { gradient: 'from-red-500 to-orange-500', color: '#EF4444' },
    'WebPropia': { gradient: 'from-emerald-500 to-teal-500', color: '#22C55E' },
    'FacebookAds': { gradient: 'from-blue-600 to-blue-700', color: '#3B82F6' },
    'LinkedIn': { gradient: 'from-blue-500 to-blue-600', color: '#0EA5E9' },
    'EmailMarketing': { gradient: 'from-orange-500 to-red-500', color: '#F59E0B' },
    'Eventos': { gradient: 'from-teal-500 to-cyan-500', color: '#14B8A6' }
  };

  const getChannelData = (channel: string) => {
    const values = channelTrends.map(d => d[channel] as number);
    const current = values[values.length - 1];
    const previous = values[values.length - 2];
    const change = previous ? ((current - previous) / previous) * 100 : 0;
    return { values, current, previous, change };
  };

  // Calcular tendencias y alertas
  const trendsAnalysis = channels.map(channel => {
    const data = getChannelData(channel);
    return {
      channel,
      ...data,
      trend: data.change > 0 ? 'up' : data.change < 0 ? 'down' : 'stable',
      alert: Math.abs(data.change) > 15
    };
  });

  const maxValue = Math.max(...channelTrends.flatMap(d => channels.map(c => d[c] as number)));

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
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
              <Activity className="w-6 h-6" />
            </div>
            Tendencias de Canales
          </h3>
          <p className="text-blue-100 mt-2">Evolución y predicciones de rendimiento</p>
        </div>
      </div>

      <div className="p-6">
        {/* Alertas de cambios significativos */}
        {trendsAnalysis.some(t => t.alert) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-orange-900 mb-2">Alertas de Cambios Significativos</h4>
                <div className="space-y-1">
                  {trendsAnalysis.filter(t => t.alert).map(t => (
                    <p key={t.channel} className="text-sm text-orange-800">
                      <strong>{t.channel}</strong> ha {t.trend === 'up' ? 'aumentado' : 'disminuido'} un {Math.abs(t.change).toFixed(1)}%
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Selector de canal */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Selecciona un canal para ver detalles:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {channels.map((channel, index) => {
              const data = getChannelData(channel);
              const config = channelColors[channel] || { gradient: 'from-gray-500 to-gray-600', color: '#6B7280' };

              return (
                <motion.button
                  key={channel}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedChannel(channel)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedChannel === channel
                      ? `bg-gradient-to-r ${config.gradient} border-white text-white shadow-xl`
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <p className={`text-xs font-bold uppercase mb-1 ${selectedChannel === channel ? 'text-white' : 'text-gray-600'}`}>
                    {channel}
                  </p>
                  <p className={`text-xl font-bold ${selectedChannel === channel ? 'text-white' : 'text-gray-900'}`}>
                    {data.current}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {data.trend === 'up' ? (
                      <TrendingUp className={`w-3 h-3 ${selectedChannel === channel ? 'text-white' : 'text-green-600'}`} />
                    ) : (
                      <TrendingDown className={`w-3 h-3 ${selectedChannel === channel ? 'text-white' : 'text-red-600'}`} />
                    )}
                    <span className={`text-xs font-bold ${selectedChannel === channel ? 'text-white' : data.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {data.change > 0 ? '+' : ''}{data.change.toFixed(1)}%
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Gráfico de línea mejorado */}
        {selectedChannel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-gray-700" />
                <h4 className="text-xl font-bold text-gray-800">
                  Evolución de {selectedChannel}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Valor actual</p>
                <p className="text-3xl font-bold text-gray-900">{getChannelData(selectedChannel).current}</p>
              </div>
            </div>

            {/* Gráfico de área */}
            <div className="relative h-64 bg-white rounded-xl p-4 shadow-inner">
              <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Grid de fondo */}
                <defs>
                  <linearGradient id={`gradient-${selectedChannel}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={channelColors[selectedChannel]?.color || '#6B7280'} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={channelColors[selectedChannel]?.color || '#6B7280'} stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Líneas de grid horizontales */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line
                    key={`grid-h-${i}`}
                    x1="0"
                    y1={i * 50}
                    x2="600"
                    y2={i * 50}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                ))}

                {/* Área del gráfico */}
                <path
                  d={`M ${channelTrends.map((d, i) => {
                    const x = (i / (channelTrends.length - 1)) * 600;
                    const y = 200 - ((d[selectedChannel] as number) / maxValue) * 180;
                    return `${x},${y}`;
                  }).join(' L ')} L 600,200 L 0,200 Z`}
                  fill={`url(#gradient-${selectedChannel})`}
                />

                {/* Línea del gráfico */}
                <polyline
                  fill="none"
                  stroke={channelColors[selectedChannel]?.color || '#6B7280'}
                  strokeWidth="3"
                  points={channelTrends.map((d, i) => {
                    const x = (i / (channelTrends.length - 1)) * 600;
                    const y = 200 - ((d[selectedChannel] as number) / maxValue) * 180;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {/* Puntos en la línea */}
                {channelTrends.map((d, i) => {
                  const x = (i / (channelTrends.length - 1)) * 600;
                  const y = 200 - ((d[selectedChannel] as number) / maxValue) * 180;
                  return (
                    <circle
                      key={`point-${i}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="white"
                      stroke={channelColors[selectedChannel]?.color || '#6B7280'}
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>

              {/* Etiquetas del eje X */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-2">
                {channelTrends.map((d, i) => (
                  <span key={`label-${i}`} className="text-xs font-semibold text-gray-500">
                    {d.month}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Comparativa de todos los canales */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Comparativa de Tendencias
          </h4>
          <div className="space-y-4">
            {trendsAnalysis.map((trend, index) => {
              const config = channelColors[trend.channel] || { gradient: 'from-gray-500 to-gray-600', color: '#6B7280' };

              return (
                <motion.div
                  key={trend.channel}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {trend.current}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{trend.channel}</p>
                        <div className="flex items-center gap-2">
                          {trend.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm font-bold ${trend.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                          </span>
                          {trend.alert && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                              ALERTA
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mini sparkline */}
                  <div className="h-12 w-full bg-gray-50 rounded-lg overflow-hidden relative">
                    <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke={config.color}
                        strokeWidth="2"
                        points={trend.values.map((v, i) => {
                          const x = (i / (trend.values.length - 1)) * 200;
                          const y = 40 - ((v / maxValue) * 35);
                          return `${x},${y}`;
                        }).join(' ')}
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TendenciasCanales;
