import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart2, TrendingUp, Users, DollarSign, Briefcase, MessageSquare, Settings } from 'lucide-react';

// Placeholder for a modern button component (assuming it exists or will be created)
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${className}`}
    {...props}
  >
    {children}
  </button>
);

const AgenteMarketingPage = () => {
  const metrics = [
    { name: 'Ventas Hoy', value: '€1,234', icon: DollarSign, color: 'from-green-400 to-green-600' },
    { name: 'Nuevos Clientes', value: '25', icon: Users, color: 'from-blue-400 to-blue-600' },
    { name: 'ROI Campaña', value: '12.5%', icon: TrendingUp, color: 'from-purple-400 to-purple-600' },
    { name: 'Proyectos Activos', value: '8', icon: Briefcase, color: 'from-yellow-400 to-yellow-600' },
  ];

  const marketingCards = [
    {
      title: 'Análisis de Mercado',
      description: 'Obtén insights profundos sobre tu nicho y competidores.',
      icon: BarChart2,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Gestión de Campañas',
      description: 'Crea, lanza y optimiza tus campañas de marketing digital.',
      icon: MessageSquare,
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: 'Optimización SEO',
      description: 'Mejora tu visibilidad en motores de búsqueda y atrae más tráfico.',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Reportes Personalizados',
      description: 'Genera informes detallados y visualiza el rendimiento.',
      icon: Settings,
      gradient: 'from-yellow-500 to-orange-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Home className="w-4 h-4 mr-1 text-blue-500" />
            <a href="#" className="text-blue-600 hover:underline">Inicio</a>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <a href="#" className="text-blue-600 hover:underline">Marketing</a>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center text-gray-800 font-medium">Agente Marketing</li>
        </ol>
      </nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-6 mb-8 lg:p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
          Panel de Agente de Marketing
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Gestiona y optimiza tus estrategias de marketing con herramientas avanzadas.
        </p>

        {/* Real-time Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative p-5 rounded-xl shadow-md overflow-hidden bg-gradient-to-br ${metric.color} text-white`}
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{metric.name}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <metric.icon className="w-8 h-8 opacity-70" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.header>

      {/* Main Content - Marketing Features */}
      <section className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          Nuestras Herramientas Clave
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {marketingCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 hover:border-blue-400 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${card.gradient} text-white shadow-md`}>
                <card.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                Explorar
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action / Additional Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-4">¿Listo para potenciar tu marketing?</h2>
        <p className="text-lg mb-6 opacity-90">
          Descubre cómo nuestras soluciones pueden transformar tu estrategia digital.
        </p>
        <Button className="bg-white text-blue-700 hover:bg-gray-100 hover:text-blue-800 shadow-lg">
          Contactar un Experto
        </Button>
      </motion.section>
    </div>
  );
};

export default AgenteMarketingPage;
