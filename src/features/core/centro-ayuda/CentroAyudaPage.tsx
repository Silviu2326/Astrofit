import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Sparkles, Users, Dumbbell, CreditCard, Settings,
  Plug, Wrench, BookOpen, MessageCircle, Video, ChevronDown,
  ThumbsUp, ThumbsDown, Play, Clock, TrendingUp, FileText,
  HelpCircle, Rocket, Phone, Calendar
} from 'lucide-react';

const CentroAyudaPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular'>('relevance');
  const [filterType, setFilterType] = useState<'all' | 'tutorials' | 'faqs' | 'videos'>('all');

  const categories = [
    { id: 'getting-started', name: 'Primeros Pasos', icon: Rocket, count: 12, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'clients', name: 'Gestión de Clientes', icon: Users, count: 18, gradient: 'from-purple-500 to-pink-500' },
    { id: 'workouts', name: 'Entrenamientos y Dietas', icon: Dumbbell, count: 24, gradient: 'from-orange-500 to-red-500' },
    { id: 'billing', name: 'Facturación y Pagos', icon: CreditCard, count: 15, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'settings', name: 'Configuración', icon: Settings, count: 10, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'integrations', name: 'Integraciones', icon: Plug, count: 8, gradient: 'from-pink-500 to-rose-500' },
    { id: 'faq', name: 'Preguntas Frecuentes', icon: HelpCircle, count: 32, gradient: 'from-yellow-500 to-orange-500' },
    { id: 'troubleshooting', name: 'Solución de Problemas', icon: Wrench, count: 14, gradient: 'from-red-500 to-pink-500' }
  ];

  const articles = [
    { id: 1, title: 'Cómo empezar con tu primer cliente', category: 'getting-started', views: 2450, votes: 145, badge: 'Popular', icon: Rocket },
    { id: 2, title: 'Guía completa de configuración inicial', category: 'getting-started', views: 1890, votes: 98, badge: 'Nuevo', icon: Settings },
    { id: 3, title: 'Crear y gestionar rutinas personalizadas', category: 'workouts', views: 3200, votes: 220, badge: 'Popular', icon: Dumbbell },
    { id: 4, title: 'Configurar pagos automáticos con Stripe', category: 'billing', views: 1650, votes: 112, badge: null, icon: CreditCard },
    { id: 5, title: 'Sincronizar con Google Calendar', category: 'integrations', views: 980, votes: 67, badge: 'Nuevo', icon: Calendar },
    { id: 6, title: 'Segmentar y organizar tu base de clientes', category: 'clients', views: 1420, votes: 89, badge: null, icon: Users },
    { id: 7, title: 'Resolver problemas de acceso común', category: 'troubleshooting', views: 2100, votes: 134, badge: null, icon: Wrench },
    { id: 8, title: 'Personalizar notificaciones y alertas', category: 'settings', views: 1100, votes: 71, badge: 'Actualizado', icon: Settings }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: '¿Cómo empiezo a usar la plataforma?',
      answer: 'Te recomendamos comenzar con el asistente de configuración inicial. Este te guiará paso a paso para configurar tu negocio, servicios y preferencias básicas. También puedes explorar los tutoriales en video para un aprendizaje más visual.'
    },
    {
      category: 'clients',
      question: '¿Cómo añado un nuevo cliente?',
      answer: 'Ve a la sección "Clientes" → "Nuevo Cliente" y completa el formulario con los datos básicos. Puedes añadir información adicional como objetivos, historial médico y preferencias más tarde. El sistema te guiará en cada paso.'
    },
    {
      category: 'workouts',
      question: '¿Puedo crear rutinas personalizadas?',
      answer: 'Sí, puedes crear rutinas completamente personalizadas desde la sección "Entrenamientos". Usa el editor de rutinas para combinar ejercicios, series, repeticiones y tiempos de descanso. También puedes duplicar y modificar rutinas existentes.'
    },
    {
      category: 'billing',
      question: '¿Cómo configuro los precios de mis servicios?',
      answer: 'Ve a "Finanzas" → "Planes y Precios" para configurar tus tarifas. Puedes crear diferentes planes (mensual, trimestral, anual) y servicios adicionales. El sistema soporta múltiples monedas y métodos de pago.'
    },
    {
      category: 'integrations',
      question: '¿Qué integraciones están disponibles?',
      answer: 'Ofrecemos integraciones con Google Calendar, WhatsApp Business, Stripe, PayPal, Mailchimp y muchas más. Ve a "Configuración" → "Integraciones" para activarlas. Cada integración incluye una guía de configuración paso a paso.'
    },
    {
      category: 'troubleshooting',
      question: 'No puedo acceder a mi cuenta',
      answer: 'Verifica que estés usando el email correcto. Si olvidaste tu contraseña, usa la opción "¿Olvidaste tu contraseña?" en la pantalla de login. Si el problema persiste, contacta soporte en soporte@fitness.com.'
    },
    {
      category: 'clients',
      question: '¿Puedo importar clientes desde otra plataforma?',
      answer: 'Sí, soportamos importación desde archivos CSV y Excel. Ve a "Clientes" → "Importar" y sigue el asistente. Asegúrate de que tu archivo tenga el formato correcto según nuestra plantilla.'
    },
    {
      category: 'workouts',
      question: '¿Cómo asigno entrenamientos a mis clientes?',
      answer: 'Desde el perfil del cliente, ve a la pestaña "Entrenamientos" y selecciona "Asignar rutina". Puedes elegir una rutina de tu biblioteca o crear una nueva. El cliente recibirá una notificación automáticamente.'
    },
    {
      category: 'billing',
      question: '¿Puedo ofrecer descuentos o promociones?',
      answer: 'Sí, en "Finanzas" → "Cupones" puedes crear códigos de descuento con diferentes tipos: porcentaje, monto fijo, o primera sesión gratis. Define la duración y límite de usos.'
    },
    {
      category: 'settings',
      question: '¿Cómo personalizo mi marca en la plataforma?',
      answer: 'Ve a "Configuración" → "Branding" para subir tu logo, elegir colores corporativos y personalizar emails. Esto se aplicará a todas las comunicaciones con tus clientes.'
    },
    {
      category: 'integrations',
      question: '¿Puedo conectar mi WhatsApp Business?',
      answer: 'Sí, la integración con WhatsApp Business permite enviar recordatorios y mensajes automáticos. Necesitarás tener una cuenta de WhatsApp Business API aprobada.'
    },
    {
      category: 'troubleshooting',
      question: 'Los correos no llegan a mis clientes',
      answer: 'Verifica que tus clientes tengan emails válidos y revisa la carpeta de spam. En "Configuración" → "Email" puedes configurar un dominio personalizado para mejorar la entregabilidad.'
    },
    {
      category: 'getting-started',
      question: '¿Hay una app móvil disponible?',
      answer: 'Sí, tenemos apps nativas para iOS y Android. Tus clientes pueden descargarlas para ver sus rutinas, registrar progreso y comunicarse contigo. Tú puedes gestionar todo desde la app de entrenador.'
    },
    {
      category: 'workouts',
      question: '¿Puedo crear planes de nutrición?',
      answer: 'Sí, en la sección "Nutrición" puedes crear planes alimenticios completos con recetas, macros y lista de compras. También puedes usar plantillas prediseñadas y personalizarlas.'
    },
    {
      category: 'billing',
      question: '¿Cómo funcionan los pagos recurrentes?',
      answer: 'Configura planes de suscripción en "Finanzas" → "Suscripciones". El sistema cobrará automáticamente cada período y enviará recordatorios si hay fallos en el pago. Compatible con Stripe y PayPal.'
    }
  ];

  const videos = [
    { id: 1, title: 'Configuración inicial completa', duration: '10:24', views: 5400, thumbnail: '🎬', category: 'getting-started' },
    { id: 2, title: 'Creando tu primera rutina', duration: '8:15', views: 4200, thumbnail: '🎬', category: 'workouts' },
    { id: 3, title: 'Gestión avanzada de clientes', duration: '15:30', views: 3100, thumbnail: '🎬', category: 'clients' },
    { id: 4, title: 'Automatización de pagos', duration: '12:45', views: 2800, thumbnail: '🎬', category: 'billing' },
    { id: 5, title: 'Integraciones esenciales', duration: '9:20', views: 1900, thumbnail: '🎬', category: 'integrations' }
  ];

  const searchSuggestions = ['Cómo empezar', 'Crear rutinas', 'Pagos automáticos', 'Importar clientes', 'Configurar notificaciones'];

  const filteredFaqs = faqs.filter(faq =>
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredArticles = articles.filter(article =>
    (selectedCategory === 'all' || article.category === selectedCategory) &&
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <HelpCircle className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              ¿Cómo podemos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">ayudarte</span>?
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Encuentra respuestas, tutoriales y guías para aprovechar al máximo tu plataforma
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Busca cualquier cosa... (Ctrl+K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-200/50 transition-all duration-300 outline-none text-lg"
              />
            </div>

            {/* Search Suggestions */}
            {!searchTerm && (
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <span className="text-sm text-blue-100 font-medium">Búsquedas populares:</span>
                {searchSuggestions.map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchTerm(suggestion)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/30 transition-all duration-300"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-indigo-600" />
          Explora por Categoría
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.03, y: -8 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-2 text-left group ${
                  selectedCategory === category.id
                    ? 'border-indigo-500 ring-4 ring-indigo-100'
                    : 'border-white/50'
                }`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Decoración de fondo */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-10 rounded-full blur-2xl`}></div>

                <div className="relative z-10">
                  {/* Icono con gradiente */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Título */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>

                  {/* Count */}
                  <p className="text-sm text-gray-600 font-medium">
                    {category.count} artículos
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Popular Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-indigo-600" />
            Artículos Más Populares
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Ver todos
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filteredArticles.slice(0, 6).map((article, index) => {
            const IconComponent = article.icon;
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 border border-white/50 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h3>
                      {article.badge && (
                        <span className={`flex-shrink-0 px-3 py-1 text-xs font-bold rounded-full ${
                          article.badge === 'Popular' ? 'bg-orange-100 text-orange-700' :
                          article.badge === 'Nuevo' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {article.badge}
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{article.views.toLocaleString()} vistas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{article.votes} votos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Videos Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Video className="w-7 h-7 text-indigo-600" />
          Tutoriales en Video
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-indigo-600 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-semibold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{video.views.toLocaleString()} vistas</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-indigo-600" />
          Preguntas Frecuentes
        </h2>

        {filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
                >
                  <span className="font-bold text-gray-900 pr-4 group-hover:text-indigo-600 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                  </motion.div>
                </button>

                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-5 text-gray-700 leading-relaxed bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron resultados para tu búsqueda.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Ver todo
            </button>
          </div>
        )}
      </motion.div>

      {/* Contact Support Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Dots Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-xl text-blue-100">
              Nuestro equipo de soporte está aquí para ayudarte 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Enviar Ticket */}
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-left hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Enviar Ticket</h3>
              <p className="text-sm text-gray-600">Describe tu problema y te responderemos pronto</p>
            </motion.button>

            {/* Chat en Vivo */}
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-left hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chat en Vivo</h3>
              <p className="text-sm text-gray-600">Habla con nosotros en tiempo real</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-green-600">En línea ahora</span>
              </div>
            </motion.button>

            {/* Programar Llamada */}
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-left hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Programar Llamada</h3>
              <p className="text-sm text-gray-600">Agenda una sesión con un experto</p>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CentroAyudaPage;