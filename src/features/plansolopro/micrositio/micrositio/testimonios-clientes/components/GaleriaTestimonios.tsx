import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Testimonio } from '../testimoniosClientesApi';
import { TarjetaTestimonio } from './TarjetaTestimonio';

interface GaleriaTestimoniosProps {
  testimonios: Testimonio[];
}

export const GaleriaTestimonios: React.FC<GaleriaTestimoniosProps> = ({ testimonios }) => {
  if (testimonios.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
            <MessageCircle className="w-12 h-12 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">No se encontraron testimonios</h3>
          <p className="text-gray-600 max-w-md">
            Intenta ajustar los filtros para ver más resultados
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {testimonios.map((testimonio, index) => (
        <TarjetaTestimonio key={testimonio.id} testimonio={testimonio} index={index} />
      ))}
    </div>
  );
};
