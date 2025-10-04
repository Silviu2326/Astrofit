
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTestimonios, Testimonio } from '../landingServiciosApi';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface TestimoniosCarouselProps {
  brandColors: { primary: string; secondary: string; accent: string };
}

const TestimoniosCarousel: React.FC<TestimoniosCarouselProps> = ({ brandColors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonio = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockTestimonios.length);
  };

  const prevTestimonio = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mockTestimonios.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonio = mockTestimonios[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-4">
          Testimonios de Clientes
        </h2>
        <p className="text-xl text-gray-600">Lo que dicen quienes confiaron en nosotros</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 border border-white/50 relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          {/* Icono de quote */}
          <div className="absolute top-8 right-8 text-indigo-200">
            <Quote className="w-16 h-16" />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="flex flex-col items-center text-center">
                {/* Avatar con efecto */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-lg opacity-50"></div>
                  <img
                    src={currentTestimonio.photoUrl}
                    alt={currentTestimonio.name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                </div>

                {/* Estrellas */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < currentTestimonio.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

                {/* Comentario */}
                <p className="text-gray-700 text-xl italic mb-6 leading-relaxed max-w-2xl">
                  {currentTestimonio.comment}
                </p>

                {/* Nombre con badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <p className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    {currentTestimonio.name}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botones de navegación */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonio}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-indigo-500 hover:text-white p-3 rounded-full shadow-lg focus:outline-none transition-colors duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonio}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-indigo-500 hover:text-white p-3 rounded-full shadow-lg focus:outline-none transition-colors duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-white" />
          </motion.button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {mockTestimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosCarousel;
