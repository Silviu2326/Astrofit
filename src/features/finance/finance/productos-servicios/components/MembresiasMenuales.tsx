import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Check,
  Star,
  Users,
  CreditCard,
  Award,
  ArrowRight,
  Crown,
  Clock,
} from 'lucide-react';
import { getProductosByType, Producto } from '../productosServiciosApi';

const MembresiasMenuales: React.FC = () => {
  const [membresias, setMembresias] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchMembresias = async () => {
      try {
        const data = await getProductosByType('membresia');
        setMembresias(data);
      } catch (error) {
        toast.error('Error al cargar las membresías');
      }
    };
    fetchMembresias();
  }, []);

  const handleSubscribe = (membresia: Producto) => {
    if (!membresia.disponibilidad) {
      toast.error('Esta membresía no está disponible actualmente');
      return;
    }
    toast.success(`Te has suscrito a ${membresia.nombre} exitosamente`);
  };

  const handleContactAdvisor = () => {
    toast.success('Te hemos conectado con un asesor. Te contactaremos pronto.');
  };

  // Determinar cuál membresía es la más popular (la del medio o la de mayor precio)
  const getMembershipTier = (index: number, total: number) => {
    if (total === 3 && index === 1) return 'popular'; // Middle one
    return 'standard';
  };

  const getTierConfig = (tier: string, precio: number) => {
    if (tier === 'popular') {
      return {
        badge: 'Más Popular',
        badgeColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
        borderGradient: 'from-purple-500 via-pink-500 to-orange-500',
        buttonGradient: 'from-purple-600 via-pink-600 to-orange-600',
        iconGradient: 'from-purple-500 to-pink-600',
        scale: 'lg:scale-105',
      };
    }

    // Determinar tier por precio
    if (precio < 60) {
      return {
        badge: 'Básico',
        badgeColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        borderGradient: 'from-blue-200 to-indigo-200',
        buttonGradient: 'from-blue-600 to-indigo-600',
        iconGradient: 'from-blue-500 to-indigo-600',
        scale: '',
      };
    } else if (precio >= 100) {
      return {
        badge: 'Premium',
        badgeColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        borderGradient: 'from-emerald-200 to-teal-200',
        buttonGradient: 'from-emerald-600 to-teal-600',
        iconGradient: 'from-emerald-500 to-teal-600',
        scale: '',
      };
    } else {
      return {
        badge: 'Estándar',
        badgeColor: 'bg-gradient-to-r from-indigo-500 to-purple-500',
        borderGradient: 'from-indigo-200 to-purple-200',
        buttonGradient: 'from-indigo-600 to-purple-600',
        iconGradient: 'from-indigo-500 to-purple-600',
        scale: '',
      };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4"
        >
          <Crown className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-bold text-purple-900">Planes y Membresías</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Elige el plan perfecto para ti
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Acceso a clases, entrenamientos personalizados y más beneficios
        </motion.p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {membresias.map((membresia, index) => {
          const tier = getMembershipTier(index, membresias.length);
          const config = getTierConfig(tier, membresia.precio);
          const isPopular = tier === 'popular';

          // Mock: calcular clientes activos y capacidad
          const clientesActivos = Math.floor(Math.random() * 50) + 10;
          const capacidadTotal = 100;
          const capacidadPorcentaje = (clientesActivos / capacidadTotal) * 100;

          return (
            <motion.div
              key={membresia.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: isPopular ? 1.02 : 1.03, y: -8 }}
              className={`relative ${config.scale}`}
            >
              {/* Card Container */}
              <div
                className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                  isPopular
                    ? `border-transparent bg-gradient-to-br ${config.borderGradient} p-0.5`
                    : 'border-white/50'
                }`}
              >
                <div className="bg-white rounded-3xl overflow-hidden">
                  {/* Header */}
                  <div className={`relative p-8 bg-gradient-to-br ${config.iconGradient} overflow-hidden`}>
                    {/* Dots pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px',
                        }}
                      ></div>
                    </div>

                    {/* Badge */}
                    {isPopular && (
                      <div className="absolute top-4 right-4">
                        <div className={`${config.badgeColor} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
                          <Star className="w-3 h-3 fill-current" />
                          {config.badge}
                        </div>
                      </div>
                    )}

                    <div className="relative z-10">
                      {/* Icono */}
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>

                      {/* Nombre del plan */}
                      <h3 className="text-2xl font-bold text-white mb-2">{membresia.nombre}</h3>

                      {/* Precio */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-5xl font-bold text-white">€{membresia.precio}</span>
                        <span className="text-white/80 text-lg">/ mes</span>
                      </div>

                      <p className="text-white/90 text-sm">{membresia.descripcion}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8">
                    {/* Características */}
                    <div className="space-y-4 mb-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Incluye:</p>
                      {membresia.caracteristicas.map((caracteristica, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${config.iconGradient} flex items-center justify-center mt-0.5`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{caracteristica}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats - Clientes activos */}
                    <div className="border-t border-gray-100 pt-6 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-semibold text-gray-600">Clientes activos</span>
                        </div>
                        <span className="text-xs font-bold text-gray-900">
                          {clientesActivos}/{capacidadTotal}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${capacidadPorcentaje}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                          className={`h-full bg-gradient-to-r ${config.iconGradient} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubscribe(membresia)}
                      className={`w-full py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${config.buttonGradient} flex items-center justify-center gap-2 group`}
                    >
                      <span>{membresia.disponibilidad ? 'Suscribirse Ahora' : 'No Disponible'}</span>
                      {membresia.disponibilidad && (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      )}
                    </motion.button>

                    {/* Additional Info */}
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Duración: {membresia.duracion}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Modalidad: <span className="font-semibold">{membresia.modalidad}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative blur orb */}
              <div
                className={`absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${config.iconGradient} rounded-full blur-3xl opacity-20`}
              ></div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-center relative overflow-hidden"
      >
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <Award className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">¿Tienes dudas sobre qué plan elegir?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Contáctanos y te ayudaremos a encontrar el plan perfecto según tus objetivos
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactAdvisor}
            className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Hablar con un Asesor
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MembresiasMenuales;
