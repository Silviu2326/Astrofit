import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonio } from '../testimoniosClientesApi';

interface TarjetaTestimonioProps {
  testimonio: Testimonio;
  index?: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex justify-center mb-3 gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        >
          <Star
            className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} transition-all duration-300`}
          />
        </motion.div>
      ))}
    </div>
  );
};

export const TarjetaTestimonio: React.FC<TarjetaTestimonioProps> = ({ testimonio, index = 0 }) => {
  const commentSizeClass = testimonio.highlighted ? 'text-lg md:text-xl' : 'text-base';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      {/* Quote icon decoration */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-12 h-12 text-amber-600" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Avatar con efecto de glow */}
        <div className="relative mb-4">
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur-md opacity-50"></div>
          <img
            src={testimonio.photo}
            alt={testimonio.author}
            className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
          />
          {testimonio.highlighted && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full p-2 shadow-lg">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Nombre del autor */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">{testimonio.author}</h3>

        {/* Badge de servicio */}
        <div className="mb-3">
          <div className="px-4 py-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
            <span className="text-xs font-bold text-amber-700">{testimonio.serviceType}</span>
          </div>
        </div>

        {/* Rating con estrellas animadas */}
        <StarRating rating={testimonio.rating} />

        {/* Comentario */}
        <div className="relative">
          <p className={`text-gray-700 italic leading-relaxed ${commentSizeClass}`}>
            "{testimonio.comment}"
          </p>
        </div>

        {/* Decoración inferior */}
        <div className="mt-4 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full opacity-30"></div>
      </div>
    </motion.div>
  );
};
