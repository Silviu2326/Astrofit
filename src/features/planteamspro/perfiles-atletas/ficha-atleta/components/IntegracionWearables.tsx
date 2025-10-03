// Integración wearables métricas fisiológicas tiempo real
import { motion } from 'framer-motion';
import { Watch, Heart, Activity, Zap, TrendingUp } from 'lucide-react';

const IntegracionWearables = () => {
  const metricas = [
    { metrica: 'Frecuencia Cardíaca', valor: '72 bpm', icono: Heart, estado: 'normal', color: 'from-red-500 to-pink-600' },
    { metrica: 'Pasos Hoy', valor: '8,542', icono: Activity, estado: 'activo', color: 'from-blue-500 to-indigo-600' },
    { metrica: 'Calorías Quemadas', valor: '1,245 kcal', icono: Zap, estado: 'objetivo', color: 'from-orange-500 to-red-600' },
    { metrica: 'Calidad de Sueño', valor: '85%', icono: TrendingUp, estado: 'bueno', color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Watch className="w-7 h-7" />
          </div>
          Integración de Wearables
        </h3>
        <p className="text-cyan-100 mt-2 relative z-10">Métricas fisiológicas en tiempo real</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metricas.map((metrica, index) => {
            const Icono = metrica.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${metrica.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icono className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{metrica.metrica}</p>
                      <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                        {metrica.valor}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full border border-cyan-200 inline-block">
                      <span className="text-xs font-bold text-cyan-700">{metrica.estado}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IntegracionWearables;
