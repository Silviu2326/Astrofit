
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import EstadisticasRapidas from './components/EstadisticasRapidas';
import ServiciosGrid from './components/ServiciosGrid';
import TestimoniosCarousel from './components/TestimoniosCarousel';
import CTAReservar from './components/CTAReservar';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const LandingServiciosPage: React.FC = () => {
  // Colores personalizables para la marca personal
  const brandColors = {
    primary: 'bg-blue-600',
    secondary: 'text-blue-800',
    accent: 'bg-yellow-400',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 font-sans antialiased">
      <div className="container mx-auto px-4 py-8">
        <HeroSection
          trainerName="Juan Pérez"
          specialty="Entrenador Personal & Nutricionista"
          photoUrl="https://via.placeholder.com/400"
          brandColors={brandColors}
        />

        <main className="space-y-8">
          <EstadisticasRapidas />
          <ServiciosGrid brandColors={brandColors} />
          <TestimoniosCarousel brandColors={brandColors} />
          <CTAReservar brandColors={brandColors} />
        </main>

        {/* Footer profesional */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna 1: Sobre nosotros */}
            <div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                Sobre Nosotros
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Transformamos vidas a través del entrenamiento personalizado y la nutrición profesional.
              </p>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#servicios" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#testimonios" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                    Testimonios
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                    Sobre mí
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Redes sociales */}
            <div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Síguenos
              </h3>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Juan Pérez - Entrenador Personal. Todos los derechos reservados.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default LandingServiciosPage;
