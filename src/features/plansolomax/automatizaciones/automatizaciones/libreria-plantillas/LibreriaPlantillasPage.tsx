import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Star,
  Users,
  Bookmark,
  TrendingUp,
  Search,
  Filter,
  Play,
  Copy,
  Eye,
  Heart,
  Zap,
  Mail,
  ShoppingCart,
  MessageCircle,
  Bell,
  Award,
  X,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Tipos
interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: 'todas' | 'onboarding' | 'marketing' | 'retencion' | 'ventas' | 'soporte';
  nivel: 'basico' | 'intermedio' | 'avanzado';
  rating: number;
  usos: number;
  nodos: number;
  tags: string[];
  icono: any;
  gradiente: string;
  preview: string;
  acciones: string[];
}

// Datos mock de plantillas
const plantillasMock: Plantilla[] = [
  {
    id: '1',
    nombre: 'Bienvenida Personalizada',
    descripcion: 'Secuencia de onboarding con emails personalizados basados en el perfil del usuario',
    categoria: 'onboarding',
    nivel: 'basico',
    rating: 4.8,
    usos: 1234,
    nodos: 5,
    tags: ['Email', 'Personalización', 'Automatización'],
    icono: Mail,
    gradiente: 'from-blue-500 via-cyan-500 to-teal-500',
    preview: 'Trigger: Usuario se registra → Esperar 1h → Email de bienvenida → Esperar 24h → Email con recursos → Verificar engagement',
    acciones: ['Enviar email', 'Esperar', 'Verificar condiciones', 'Asignar tags', 'Notificar equipo']
  },
  {
    id: '2',
    nombre: 'Carrito Abandonado',
    descripcion: 'Recupera ventas perdidas con recordatorios automáticos y ofertas especiales',
    categoria: 'ventas',
    nivel: 'intermedio',
    rating: 4.9,
    usos: 2156,
    nodos: 8,
    tags: ['E-commerce', 'Conversión', 'Email'],
    icono: ShoppingCart,
    gradiente: 'from-orange-500 via-red-500 to-pink-500',
    preview: 'Trigger: Carrito abandonado → Esperar 2h → Email recordatorio → Esperar 24h → Email con descuento 10% → Verificar compra',
    acciones: ['Detectar carrito', 'Enviar email', 'Aplicar descuento', 'Seguimiento de conversión', 'Analytics']
  },
  {
    id: '3',
    nombre: 'Lead Nurturing',
    descripcion: 'Cultiva leads con contenido relevante hasta que estén listos para comprar',
    categoria: 'marketing',
    nivel: 'avanzado',
    rating: 4.7,
    usos: 987,
    nodos: 12,
    tags: ['Marketing', 'CRM', 'Lead Scoring'],
    icono: TrendingUp,
    gradiente: 'from-purple-500 via-pink-500 to-rose-500',
    preview: 'Trigger: Lead entra → Segmentar por interés → Serie de emails educativos → Lead scoring → Asignar a ventas cuando hot',
    acciones: ['Segmentación', 'Email marketing', 'Lead scoring', 'CRM sync', 'Notificaciones']
  },
  {
    id: '4',
    nombre: 'Reactivación de Usuarios',
    descripcion: 'Recupera usuarios inactivos con campañas personalizadas de re-engagement',
    categoria: 'retencion',
    nivel: 'intermedio',
    rating: 4.6,
    usos: 1543,
    nodos: 7,
    tags: ['Retención', 'Email', 'Push'],
    icono: Zap,
    gradiente: 'from-emerald-500 via-green-500 to-teal-500',
    preview: 'Trigger: 30 días sin actividad → Email "Te extrañamos" → Push notification → Ofrecer incentivo → Seguimiento',
    acciones: ['Detectar inactividad', 'Email personalizado', 'Push notification', 'Ofrecer incentivo', 'Analytics']
  },
  {
    id: '5',
    nombre: 'Soporte Automatizado',
    descripcion: 'Respuestas automáticas a consultas frecuentes y escalamiento inteligente',
    categoria: 'soporte',
    nivel: 'intermedio',
    rating: 4.5,
    usos: 876,
    nodos: 9,
    tags: ['Soporte', 'Chatbot', 'Tickets'],
    icono: MessageCircle,
    gradiente: 'from-indigo-500 via-blue-500 to-cyan-500',
    preview: 'Trigger: Ticket nuevo → Analizar contenido → Respuesta automática FAQ → Escalar a humano si necesario',
    acciones: ['Analizar consulta', 'Base de conocimiento', 'Respuesta auto', 'Escalamiento', 'SLA tracking']
  },
  {
    id: '6',
    nombre: 'Programa de Referidos',
    descripcion: 'Incentiva referencias con recompensas automáticas y seguimiento',
    categoria: 'marketing',
    nivel: 'avanzado',
    rating: 4.8,
    usos: 654,
    nodos: 10,
    tags: ['Referidos', 'Gamificación', 'Rewards'],
    icono: Users,
    gradiente: 'from-yellow-500 via-orange-500 to-red-500',
    preview: 'Trigger: Usuario refiere → Enviar link único → Rastrear conversión → Otorgar recompensa → Notificar ambos usuarios',
    acciones: ['Generar link', 'Tracking', 'Validar conversión', 'Otorgar puntos', 'Email notificación']
  },
  {
    id: '7',
    nombre: 'Upsell Inteligente',
    descripcion: 'Identifica oportunidades de upsell y ofrece upgrades personalizados',
    categoria: 'ventas',
    nivel: 'avanzado',
    rating: 4.7,
    usos: 543,
    nodos: 11,
    tags: ['Ventas', 'Upsell', 'Personalización'],
    icono: Award,
    gradiente: 'from-pink-500 via-rose-500 to-red-500',
    preview: 'Trigger: Uso alto de plan → Analizar patrones → Email con oferta upgrade → Descuento por tiempo limitado',
    acciones: ['Analizar uso', 'Scoring de oportunidad', 'Personalizar oferta', 'Email marketing', 'Follow-up']
  },
  {
    id: '8',
    nombre: 'Recordatorios de Eventos',
    descripcion: 'Notificaciones automáticas para eventos, webinars y reuniones',
    categoria: 'marketing',
    nivel: 'basico',
    rating: 4.4,
    usos: 432,
    nodos: 6,
    tags: ['Eventos', 'Notificaciones', 'Email'],
    icono: Bell,
    gradiente: 'from-violet-500 via-purple-500 to-fuchsia-500',
    preview: 'Trigger: Usuario se registra a evento → Email confirmación → Recordatorio 1 día antes → Recordatorio 1 hora antes',
    acciones: ['Email confirmación', 'Calendario sync', 'Recordatorios', 'Follow-up post-evento', 'Encuesta']
  }
];

const categorias = [
  { id: 'todas', label: 'Todas', count: plantillasMock.length },
  { id: 'onboarding', label: 'Onboarding', count: plantillasMock.filter(p => p.categoria === 'onboarding').length },
  { id: 'marketing', label: 'Marketing', count: plantillasMock.filter(p => p.categoria === 'marketing').length },
  { id: 'retencion', label: 'Retención', count: plantillasMock.filter(p => p.categoria === 'retencion').length },
  { id: 'ventas', label: 'Ventas', count: plantillasMock.filter(p => p.categoria === 'ventas').length },
  { id: 'soporte', label: 'Soporte', count: plantillasMock.filter(p => p.categoria === 'soporte').length }
];

const nivelColors: Record<string, string> = {
  basico: 'from-green-500 to-emerald-500',
  intermedio: 'from-yellow-500 to-orange-500',
  avanzado: 'from-red-500 to-pink-500'
};

const LibreriaPlantillasPage: React.FC = () => {
  const [categoriaActual, setCategoriaActual] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [ordenamiento, setOrdenamiento] = useState<'popular' | 'recientes' | 'rating'>('popular');
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<Plantilla | null>(null);
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());

  // Filtrar plantillas
  const plantillasFiltradas = plantillasMock.filter(plantilla => {
    const matchCategoria = categoriaActual === 'todas' || plantilla.categoria === categoriaActual;
    const matchBusqueda = plantilla.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         plantilla.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         plantilla.tags.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()));
    return matchCategoria && matchBusqueda;
  });

  // Ordenar plantillas
  const plantillasOrdenadas = [...plantillasFiltradas].sort((a, b) => {
    if (ordenamiento === 'popular') return b.usos - a.usos;
    if (ordenamiento === 'rating') return b.rating - a.rating;
    return 0; // recientes
  });

  const toggleFavorito = (id: string) => {
    setFavoritos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const estadisticas = [
    {
      titulo: 'Total Plantillas',
      valor: plantillasMock.length.toString(),
      icono: FileText,
      gradiente: 'from-blue-500 to-cyan-500',
      cambio: '+3'
    },
    {
      titulo: 'Más Populares',
      valor: '5',
      icono: TrendingUp,
      gradiente: 'from-orange-500 to-red-500',
      cambio: '+2'
    },
    {
      titulo: 'Comunidad',
      valor: '12',
      icono: Users,
      gradiente: 'from-purple-500 to-pink-500',
      cambio: '+4'
    },
    {
      titulo: 'Guardadas',
      valor: favoritos.size.toString(),
      icono: Bookmark,
      gradiente: 'from-emerald-500 to-teal-500',
      cambio: '0'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <FileText className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Plantillas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Automatización</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed">
            Comienza rápido con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">templates probados</span> y listos para usar
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Fácil de personalizar</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Probadas en producción</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estadisticas.map((stat, index) => (
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradiente} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icono className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.titulo}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.valor}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.cambio}</span>
                <span className="text-xs text-gray-500 font-medium">esta semana</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BÚSQUEDA Y FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar plantillas, categorías, tags..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none bg-white/80"
            />
          </div>

          {/* Ordenamiento */}
          <div className="flex gap-3">
            <button
              onClick={() => setOrdenamiento('popular')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                ordenamiento === 'popular'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-300'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Populares
            </button>
            <button
              onClick={() => setOrdenamiento('rating')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                ordenamiento === 'rating'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-300'
              }`}
            >
              <Star className="w-4 h-4" />
              Rating
            </button>
            <button
              onClick={() => setOrdenamiento('recientes')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                ordenamiento === 'recientes'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              Recientes
            </button>
          </div>
        </div>
      </motion.div>

      {/* TABS DE CATEGORÍAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3">
          {categorias.map((categoria, index) => (
            <motion.button
              key={categoria.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => setCategoriaActual(categoria.id)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                categoriaActual === categoria.id
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-xl scale-105'
                  : 'bg-white/80 backdrop-blur-xl border-2 border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-lg'
              }`}
            >
              <span>{categoria.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                categoriaActual === categoria.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {categoria.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* GRID DE PLANTILLAS */}
      {plantillasOrdenadas.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron plantillas</h3>
          <p className="text-gray-600">Intenta con otros términos de búsqueda o cambia los filtros</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantillasOrdenadas.map((plantilla, index) => (
            <motion.div
              key={plantilla.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group cursor-pointer"
              onClick={() => setPlantillaSeleccionada(plantilla)}
            >
              {/* Header con gradiente */}
              <div className={`relative overflow-hidden bg-gradient-to-r ${plantilla.gradiente} p-6`}>
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <plantilla.icono className="w-8 h-8 text-white" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorito(plantilla.id);
                    }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${favoritos.has(plantilla.id) ? 'fill-white text-white' : 'text-white'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {plantilla.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {plantilla.descripcion}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {plantilla.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 rounded-full text-xs font-semibold text-pink-700 border border-pink-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Métricas */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-900">{plantilla.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-semibold text-gray-600">{plantilla.usos.toLocaleString()} usos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-semibold text-gray-600">{plantilla.nodos} nodos</span>
                  </div>
                </div>

                {/* Badge de nivel */}
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 bg-gradient-to-r ${nivelColors[plantilla.nivel]} rounded-full`}>
                    <span className="text-xs font-bold text-white uppercase">{plantilla.nivel}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlantillaSeleccionada(plantilla);
                      }}
                      className="p-2 bg-gray-100 hover:bg-pink-50 rounded-xl transition-colors group/btn"
                    >
                      <Eye className="w-4 h-4 text-gray-600 group-hover/btn:text-pink-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Plantilla copiada al portapapeles');
                      }}
                      className="p-2 bg-gray-100 hover:bg-pink-50 rounded-xl transition-colors group/btn"
                    >
                      <Copy className="w-4 h-4 text-gray-600 group-hover/btn:text-pink-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL DE PREVIEW */}
      <AnimatePresence>
        {plantillaSeleccionada && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPlantillaSeleccionada(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className={`relative overflow-hidden bg-gradient-to-r ${plantillaSeleccionada.gradiente} p-8`}>
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <plantillaSeleccionada.icono className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {plantillaSeleccionada.nombre}
                        </h2>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                            <span className="text-white font-bold">{plantillaSeleccionada.rating}</span>
                          </div>
                          <span className="text-white/80">•</span>
                          <span className="text-white/90 font-semibold">{plantillaSeleccionada.usos.toLocaleString()} usos</span>
                          <span className="text-white/80">•</span>
                          <div className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full`}>
                            <span className="text-xs font-bold text-white uppercase">{plantillaSeleccionada.nivel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setPlantillaSeleccionada(null)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-8">
                {/* Descripción */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{plantillaSeleccionada.descripcion}</p>
                </div>

                {/* Preview del flujo */}
                <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-pink-500" />
                    Flujo de Automatización
                  </h3>
                  <p className="text-sm text-gray-700 font-mono leading-relaxed">
                    {plantillaSeleccionada.preview}
                  </p>
                </div>

                {/* Acciones incluidas */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Acciones Incluidas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {plantillaSeleccionada.acciones.map((accion, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200">
                        <div className="p-1 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{accion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {plantillaSeleccionada.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-full text-sm font-semibold text-pink-700 border border-pink-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      alert('Usando plantilla: ' + plantillaSeleccionada.nombre);
                      setPlantillaSeleccionada(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold py-4 px-6 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Usar Plantilla
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => {
                      alert('Personalizando plantilla: ' + plantillaSeleccionada.nombre);
                    }}
                    className="px-6 py-4 border-2 border-pink-500 text-pink-600 rounded-2xl font-bold hover:bg-pink-50 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Filter className="w-5 h-5" />
                    Personalizar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LibreriaPlantillasPage;
