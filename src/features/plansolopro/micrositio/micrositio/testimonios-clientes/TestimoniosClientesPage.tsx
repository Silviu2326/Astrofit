import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Users, Heart, TrendingUp, MessageCircle } from 'lucide-react';
import { GaleriaTestimonios } from './components/GaleriaTestimonios';
import { FiltrosTestimonios } from './components/FiltrosTestimonios';
import { CarruselPrincipal } from './components/CarruselPrincipal';
import { Testimonio } from './testimoniosClientesApi';

const mockTestimonios: Testimonio[] = [
  {
    id: '1',
    author: 'Ana G.',
    comment: '¡Excelente servicio! Mi negocio ha crecido exponencialmente gracias a ellos.',
    rating: 5,
    serviceType: 'Marketing Digital',
    photo: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Ana',
    highlighted: true,
  },
  {
    id: '2',
    author: 'Carlos R.',
    comment: 'Profesionales y muy atentos. Recomiendo sus servicios al 100%.',
    rating: 4,
    serviceType: 'Desarrollo Web',
    photo: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Carlos',
    highlighted: false,
  },
  {
    id: '3',
    author: 'Marta P.',
    comment: 'Me encantó el diseño de mi nueva web. Superaron mis expectativas.',
    rating: 5,
    serviceType: 'Diseño Gráfico',
    photo: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Marta',
    highlighted: true,
  },
  {
    id: '4',
    author: 'Javier S.',
    comment: 'Muy buen soporte técnico y resultados visibles en poco tiempo.',
    rating: 4,
    serviceType: 'Marketing Digital',
    photo: 'https://via.placeholder.com/150/FFFF33/000000?text=Javier',
    highlighted: false,
  },
  {
    id: '5',
    author: 'Laura M.',
    comment: 'Una experiencia fantástica, el equipo es muy creativo y eficiente.',
    rating: 5,
    serviceType: 'Desarrollo Web',
    photo: 'https://via.placeholder.com/150/FF33FF/FFFFFF?text=Laura',
    highlighted: false,
  },
];

const TestimoniosClientesPage: React.FC = () => {
  const [filteredTestimonios, setFilteredTestimonios] = useState<Testimonio[]>(mockTestimonios);
  const [filters, setFilters] = useState<{ serviceType: string; rating: number | null }>({
    serviceType: 'Todos',
    rating: null,
  });

  const handleFilterChange = (newFilters: { serviceType?: string; rating?: number | null }) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    let tempTestimonios = mockTestimonios;

    if (updatedFilters.serviceType && updatedFilters.serviceType !== 'Todos') {
      tempTestimonios = tempTestimonios.filter(t => t.serviceType === updatedFilters.serviceType);
    }

    if (updatedFilters.rating !== null) {
      tempTestimonios = tempTestimonios.filter(t => t.rating >= updatedFilters.rating!);
    }

    setFilteredTestimonios(tempTestimonios);
  };

  const highlightedTestimonios = mockTestimonios.filter(t => t.highlighted);

  // Calcular estadísticas
  const totalTestimonios = mockTestimonios.length;
  const avgRating = (mockTestimonios.reduce((acc, t) => acc + t.rating, 0) / totalTestimonios).toFixed(1);
  const clientesSatisfechos = Math.round((mockTestimonios.filter(t => t.rating >= 4).length / totalTestimonios) * 100);
  const transformacionesDestacadas = mockTestimonios.filter(t => t.highlighted).length;

  const stats = [
    {
      icon: MessageCircle,
      title: 'Total de Testimonios',
      value: totalTestimonios.toString(),
      change: '+15',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-500/10 to-cyan-600/10',
    },
    {
      icon: Star,
      title: 'Rating Promedio',
      value: avgRating,
      change: '+0.3',
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-500/10 to-orange-600/10',
    },
    {
      icon: Heart,
      title: 'Clientes Satisfechos',
      value: `${clientesSatisfechos}%`,
      change: '+8',
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-500/10 to-rose-600/10',
    },
    {
      icon: TrendingUp,
      title: 'Transformaciones Destacadas',
      value: transformacionesDestacadas.toString(),
      change: '+2',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500/10 to-teal-600/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Quote className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight text-center">
              Lo que Dicen <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Nuestros Clientes</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed text-center mx-auto">
            Historias reales de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">transformación</span> y éxito
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-semibold text-white">Verificados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">100% Reales</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">este mes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TESTIMONIOS DESTACADOS */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-2">
            Testimonios Destacados
          </h2>
          <p className="text-gray-600">Las historias más inspiradoras de nuestros clientes</p>
        </motion.div>
        <CarruselPrincipal testimonios={highlightedTestimonios} />
      </section>

      {/* TODAS LAS RESEÑAS */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-2">
            Explora Todas las Reseñas
          </h2>
          <p className="text-gray-600">Filtra y encuentra testimonios que te inspiren</p>
        </motion.div>
        <FiltrosTestimonios onFilterChange={handleFilterChange} currentFilters={filters} />
        <GaleriaTestimonios testimonios={filteredTestimonios} />
      </section>

      {/* CTA PARA DEJAR TESTIMONIO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-white text-center group border border-white/20"
      >
        {/* Efecto hover */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

        {/* Decoración */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <Heart className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl md:text-3xl font-bold mb-3">¿Ya trabajaste con nosotros?</h3>
          <p className="text-lg text-orange-100 mb-6 max-w-2xl mx-auto">
            Comparte tu experiencia y ayuda a otros a tomar la mejor decisión
          </p>
          <button className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            Deja tu Testimonio
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimoniosClientesPage;
