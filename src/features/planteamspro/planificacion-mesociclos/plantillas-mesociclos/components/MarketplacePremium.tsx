import React from 'react';
import { motion } from 'framer-motion';
import { Crown, ShoppingBag, Award } from 'lucide-react';

const MarketplacePremium: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Crown className="w-6 h-6" />
          </div>
          Marketplace de Plantillas Premium
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Accede a plantillas exclusivas creadas por entrenadores profesionales
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-amber-900">Plantillas Pro</h4>
            </div>
            <p className="text-sm text-amber-700">Contenido exclusivo de expertos</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500 rounded-xl">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-yellow-900">Certificadas</h4>
            </div>
            <p className="text-sm text-yellow-700">Validadas por profesionales</p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
        >
          <Crown className="w-5 h-5" />
          <span>Explorar Marketplace Premium</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MarketplacePremium;
