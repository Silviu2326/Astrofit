import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonio } from '../testimoniosClientesApi';
import { TarjetaTestimonio } from './TarjetaTestimonio';

interface CarruselPrincipalProps {
  testimonios: Testimonio[];
}

export const CarruselPrincipal: React.FC<CarruselPrincipalProps> = ({ testimonios }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonios.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonios.length === 0) {
    return <div className="text-center text-gray-500">No hay testimonios destacados</div>;
  }

  return (
    <div className="relative">
      {/* Carrusel principal */}
      <div className="relative overflow-hidden">
        {/* Contenedor de slides */}
        <div className="relative h-[500px] md:h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-2xl">
                <TarjetaTestimonio testimonio={testimonios[currentIndex]} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botones de navegación */}
        {testimonios.length > 1 && (
          <>
            {/* Botón anterior */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 group"
            >
              <ChevronLeft className="w-6 h-6 text-amber-600 group-hover:text-orange-600 transition-colors" />
            </motion.button>

            {/* Botón siguiente */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 group"
            >
              <ChevronRight className="w-6 h-6 text-amber-600 group-hover:text-orange-600 transition-colors" />
            </motion.button>
          </>
        )}
      </div>

      {/* Indicadores de paginación (dots) */}
      {testimonios.length > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          {testimonios.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Contador */}
      {testimonios.length > 1 && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-lg">
            <span className="text-sm font-bold text-amber-600">{currentIndex + 1}</span>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-sm font-medium text-gray-600">{testimonios.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};
