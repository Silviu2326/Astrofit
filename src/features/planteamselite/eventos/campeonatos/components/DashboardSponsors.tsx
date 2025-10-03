import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Eye, TrendingUp, Users, BarChart3 } from 'lucide-react';

const DashboardSponsors: React.FC = () => {
  const sponsors = [
    { nombre: 'Sponsor Premium A', inversion: 500000, exposicion: 15000000, roi: 3.2, color: 'from-yellow-500 to-orange-500' },
    { nombre: 'Sponsor Oro B', inversion: 300000, exposicion: 8500000, roi: 2.8, color: 'from-blue-500 to-indigo-500' },
    { nombre: 'Sponsor Plata C', inversion: 150000, exposicion: 4200000, roi: 2.5, color: 'from-gray-400 to-gray-500' },
  ];

  const metricas = [
    { titulo: 'Ingresos Totales', valor: '$950K', icono: DollarSign, color: 'from-green-500 to-emerald-500' },
    { titulo: 'Exposición Total', valor: '27.7M', icono: Eye, color: 'from-purple-500 to-pink-500' },
    { titulo: 'ROI Promedio', valor: '2.83x', icono: TrendingUp, color: 'from-orange-500 to-red-500' },
    { titulo: 'Sponsors Activos', valor: '12', icono: Users, color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Dashboard Ejecutivo para Sponsors</h2>
        </div>
        <p className="text-amber-100 mt-2 ml-11">Métricas de exposición y retorno de inversión</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        {/* Métricas Generales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metricas.map((metrica, index) => {
            const IconComponent = metrica.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metrica.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metrica.valor}</p>
                <p className="text-xs text-gray-600 font-medium">{metrica.titulo}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Lista de Sponsors */}
        <div className="space-y-4">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${sponsor.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">{sponsor.nombre}</h3>
                  <div className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                    <span className="text-sm font-bold text-green-700">ROI: {sponsor.roi}x</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Inversión</p>
                      <p className="text-sm font-bold text-gray-900">${(sponsor.inversion / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">Exposición</p>
                      <p className="text-sm font-bold text-gray-900">{(sponsor.exposicion / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-600">Retorno</p>
                      <p className="text-sm font-bold text-gray-900">${(sponsor.inversion * sponsor.roi / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSponsors;
