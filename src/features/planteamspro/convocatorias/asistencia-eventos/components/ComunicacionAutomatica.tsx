import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

const ComunicacionAutomatica: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Icono en backdrop blur */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
          <MessageSquare className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">
          Comunicación Automatizada
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Sistema de comunicación automatizada con recordatorios inteligentes y personalizados.
        </p>

        {/* Indicador visual */}
        <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <Send className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-blue-700">Mensajería inteligente</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ComunicacionAutomatica;
