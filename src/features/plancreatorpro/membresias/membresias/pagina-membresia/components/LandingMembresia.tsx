
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Star, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const LandingMembresia: React.FC = () => {
  const handleJoinNow = () => {
    toast.success('¡Redirigiendo al proceso de suscripción...', {
      duration: 3000,
    });
    // Aquí se podría agregar la lógica para redirigir al proceso de suscripción
    // Por ejemplo: window.location.href = '/subscription';
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 md:py-32">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Título con icono animado */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Crown className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Desbloquea tu <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Potencial</span>
            </h1>
          </div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed"
          >
            Accede a <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">contenido exclusivo</span>, 
            herramientas avanzadas y una <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">comunidad de expertos</span>
          </motion.p>

          {/* Indicadores de calidad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="text-sm font-semibold text-white">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">10,000+ Miembros</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Crown className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Premium Quality</span>
            </div>
          </motion.div>

          {/* Botón CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleJoinNow}
            className="relative overflow-hidden bg-white text-purple-700 font-bold py-4 px-12 rounded-3xl text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          >
            {/* Efecto shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
            
            <div className="relative z-10 flex items-center gap-3">
              <span>¡Únete Ahora!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.button>

          {/* Texto de garantía */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 text-sm text-blue-200"
          >
            Garantía de satisfacción de 30 días • Cancela cuando quieras
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingMembresia;
