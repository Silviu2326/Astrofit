import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Download, TrendingUp, Calendar,
  Image as ImageIcon, FileText, Video, Mail, Share2, Palette,
  Book, Sparkles, Search, Copy, ExternalLink, Play,
  CheckCircle, X, Eye, ArrowUpRight, Zap, Grid3x3, LayoutTemplate
} from 'lucide-react';

// Tipos
interface Recurso {
  id: number;
  nombre: string;
  categoria: 'banners' | 'textos' | 'videos' | 'emails' | 'social' | 'brand' | 'guias';
  formato: string;
  tamano: string;
  dimensiones?: string;
  descargas: number;
  fecha: string;
  url: string;
  thumbnail?: string;
  descripcion: string;
  tipo: 'imagen' | 'video' | 'documento' | 'texto';
}

// Datos mockeados
const RECURSOS_MOCK: Recurso[] = [
  // Banners
  { id: 1, nombre: 'Banner Leaderboard 728x90', categoria: 'banners', formato: 'JPG', tamano: '245 KB', dimensiones: '728x90', descargas: 342, fecha: '2024-01-15', url: '#', thumbnail: 'https://via.placeholder.com/728x90/667eea/ffffff?text=Banner+728x90', descripcion: 'Banner horizontal para web', tipo: 'imagen' },
  { id: 2, nombre: 'Banner Medium Rectangle 300x250', categoria: 'banners', formato: 'PNG', tamano: '180 KB', dimensiones: '300x250', descargas: 287, fecha: '2024-01-14', url: '#', thumbnail: 'https://via.placeholder.com/300x250/764ba2/ffffff?text=Banner+300x250', descripcion: 'Banner cuadrado mediano', tipo: 'imagen' },
  { id: 3, nombre: 'Banner Skyscraper 160x600', categoria: 'banners', formato: 'JPG', tamano: '320 KB', dimensiones: '160x600', descargas: 198, fecha: '2024-01-13', url: '#', thumbnail: 'https://via.placeholder.com/160x600/667eea/ffffff?text=160x600', descripcion: 'Banner vertical lateral', tipo: 'imagen' },
  { id: 4, nombre: 'Mobile Banner 320x50', categoria: 'banners', formato: 'PNG', tamano: '95 KB', dimensiones: '320x50', descargas: 412, fecha: '2024-01-12', url: '#', thumbnail: 'https://via.placeholder.com/320x50/f093fb/ffffff?text=Mobile+320x50', descripcion: 'Banner para móvil', tipo: 'imagen' },
  { id: 5, nombre: 'Instagram Post 1080x1080', categoria: 'social', formato: 'JPG', tamano: '450 KB', dimensiones: '1080x1080', descargas: 523, fecha: '2024-01-11', url: '#', thumbnail: 'https://via.placeholder.com/1080x1080/4facfe/ffffff?text=IG+Post', descripcion: 'Post cuadrado para Instagram', tipo: 'imagen' },
  { id: 6, nombre: 'Facebook Post 1200x628', categoria: 'social', formato: 'PNG', tamano: '380 KB', dimensiones: '1200x628', descargas: 456, fecha: '2024-01-10', url: '#', thumbnail: 'https://via.placeholder.com/1200x628/00f2fe/ffffff?text=FB+Post', descripcion: 'Post horizontal para Facebook', tipo: 'imagen' },
  { id: 7, nombre: 'Instagram Story 1080x1920', categoria: 'social', formato: 'JPG', tamano: '520 KB', dimensiones: '1080x1920', descargas: 612, fecha: '2024-01-09', url: '#', thumbnail: 'https://via.placeholder.com/540x960/a8edea/ffffff?text=IG+Story', descripcion: 'Historia vertical para Instagram', tipo: 'imagen' },
  { id: 8, nombre: 'Facebook Cover 1500x500', categoria: 'social', formato: 'PNG', tamano: '290 KB', dimensiones: '1500x500', descargas: 234, fecha: '2024-01-08', url: '#', thumbnail: 'https://via.placeholder.com/1500x500/fed6e3/ffffff?text=FB+Cover', descripcion: 'Portada de Facebook', tipo: 'imagen' },

  // Videos
  { id: 9, nombre: 'Video Testimonial Cliente Feliz', categoria: 'videos', formato: 'MP4', tamano: '45 MB', dimensiones: '1920x1080', descargas: 187, fecha: '2024-01-07', url: '#', thumbnail: 'https://via.placeholder.com/1920x1080/ff6b6b/ffffff?text=Video+Testimonial', descripcion: 'Cliente compartiendo su experiencia', tipo: 'video' },
  { id: 10, nombre: 'Tour del Producto 60s', categoria: 'videos', formato: 'MP4', tamano: '38 MB', dimensiones: '1920x1080', descargas: 298, fecha: '2024-01-06', url: '#', thumbnail: 'https://via.placeholder.com/1920x1080/4ecdc4/ffffff?text=Product+Tour', descripcion: 'Recorrido completo del producto', tipo: 'video' },
  { id: 11, nombre: 'Video Story 15s Vertical', categoria: 'videos', formato: 'MP4', tamano: '12 MB', dimensiones: '1080x1920', descargas: 445, fecha: '2024-01-05', url: '#', thumbnail: 'https://via.placeholder.com/540x960/95e1d3/ffffff?text=Story+15s', descripcion: 'Video corto para stories', tipo: 'video' },
  { id: 12, nombre: 'Explicación Beneficios 30s', categoria: 'videos', formato: 'MP4', tamano: '25 MB', dimensiones: '1920x1080', descargas: 334, fecha: '2024-01-04', url: '#', thumbnail: 'https://via.placeholder.com/1920x1080/f38181/ffffff?text=Benefits+30s', descripcion: 'Beneficios clave en 30 segundos', tipo: 'video' },

  // Textos y Copy
  { id: 13, nombre: 'Email Template Bienvenida', categoria: 'emails', formato: 'HTML', tamano: '15 KB', descargas: 456, fecha: '2024-01-03', url: '#', descripcion: 'Template HTML responsive para bienvenida', tipo: 'documento' },
  { id: 14, nombre: 'Email Promoción Especial', categoria: 'emails', formato: 'HTML', tamano: '18 KB', descargas: 389, fecha: '2024-01-02', url: '#', descripcion: 'Template para ofertas especiales', tipo: 'documento' },
  { id: 15, nombre: 'Email Case Study', categoria: 'emails', formato: 'HTML', tamano: '22 KB', descargas: 267, fecha: '2024-01-01', url: '#', descripcion: 'Template para casos de éxito', tipo: 'documento' },
  { id: 16, nombre: 'Copy Headlines Variados', categoria: 'textos', formato: 'TXT', tamano: '5 KB', descargas: 521, fecha: '2023-12-31', url: '#', descripcion: '25 headlines probados para ads', tipo: 'texto' },
  { id: 17, nombre: 'Captions Instagram Cortos', categoria: 'textos', formato: 'TXT', tamano: '8 KB', descargas: 612, fecha: '2023-12-30', url: '#', descripcion: '30 captions listos para usar', tipo: 'texto' },
  { id: 18, nombre: 'Captions Instagram Largos', categoria: 'textos', formato: 'TXT', tamano: '12 KB', descargas: 487, fecha: '2023-12-29', url: '#', descripcion: 'Historias inspiracionales completas', tipo: 'texto' },
  { id: 19, nombre: 'Blog Post Template 1000 palabras', categoria: 'textos', formato: 'DOCX', tamano: '25 KB', descargas: 298, fecha: '2023-12-28', url: '#', descripcion: 'Artículo completo listo para publicar', tipo: 'documento' },
  { id: 20, nombre: 'CTAs que Convierten', categoria: 'textos', formato: 'TXT', tamano: '4 KB', descargas: 678, fecha: '2023-12-27', url: '#', descripcion: '50 llamadas a la acción efectivas', tipo: 'texto' },

  // Brand Assets
  { id: 21, nombre: 'Logo PNG Transparente Horizontal', categoria: 'brand', formato: 'PNG', tamano: '125 KB', dimensiones: '2000x600', descargas: 734, fecha: '2023-12-26', url: '#', thumbnail: 'https://via.placeholder.com/2000x600/667eea/ffffff?text=Logo+Horizontal', descripcion: 'Logo horizontal fondo transparente', tipo: 'imagen' },
  { id: 22, nombre: 'Logo SVG Vectorial', categoria: 'brand', formato: 'SVG', tamano: '8 KB', descargas: 512, fecha: '2023-12-25', url: '#', descripcion: 'Logo en formato vectorial', tipo: 'imagen' },
  { id: 23, nombre: 'Logo Vertical Light', categoria: 'brand', formato: 'PNG', tamano: '98 KB', dimensiones: '800x1200', descargas: 421, fecha: '2023-12-24', url: '#', thumbnail: 'https://via.placeholder.com/800x1200/ffffff/667eea?text=Logo+Vertical', descripcion: 'Logo vertical versión clara', tipo: 'imagen' },
  { id: 24, nombre: 'Logo Icon Only', categoria: 'brand', formato: 'PNG', tamano: '45 KB', dimensiones: '512x512', descargas: 556, fecha: '2023-12-23', url: '#', thumbnail: 'https://via.placeholder.com/512x512/764ba2/ffffff?text=Icon', descripcion: 'Solo ícono del logo', tipo: 'imagen' },
  { id: 25, nombre: 'Paleta de Colores Oficial', categoria: 'brand', formato: 'PDF', tamano: '2 MB', descargas: 389, fecha: '2023-12-22', url: '#', descripcion: 'Colores HEX, RGB y CMYK', tipo: 'documento' },
  { id: 26, nombre: 'Guía de Marca Completa', categoria: 'brand', formato: 'PDF', tamano: '8 MB', descargas: 298, fecha: '2023-12-21', url: '#', descripcion: 'Brand guidelines completos', tipo: 'documento' },

  // Guías y tutoriales
  { id: 27, nombre: 'Getting Started - Primeros Pasos', categoria: 'guias', formato: 'PDF', tamano: '3.5 MB', descargas: 623, fecha: '2023-12-20', url: '#', descripcion: 'Guía completa para comenzar', tipo: 'documento' },
  { id: 28, nombre: 'Best Practices para Afiliados', categoria: 'guias', formato: 'PDF', tamano: '4.2 MB', descargas: 487, fecha: '2023-12-19', url: '#', descripcion: 'Estrategias probadas que funcionan', tipo: 'documento' },
  { id: 29, nombre: 'Tutorial: Insertar Banners en Blog', categoria: 'guias', formato: 'PDF', tamano: '2.8 MB', descargas: 356, fecha: '2023-12-18', url: '#', descripcion: 'Paso a paso con screenshots', tipo: 'documento' },
  { id: 30, nombre: 'Optimización de Conversiones', categoria: 'guias', formato: 'PDF', tamano: '5.1 MB', descargas: 412, fecha: '2023-12-17', url: '#', descripcion: 'Cómo maximizar tus comisiones', tipo: 'documento' },

  // Más banners
  { id: 31, nombre: 'Display Ad 250x250', categoria: 'banners', formato: 'JPG', tamano: '165 KB', dimensiones: '250x250', descargas: 223, fecha: '2023-12-16', url: '#', thumbnail: 'https://via.placeholder.com/250x250/667eea/ffffff?text=250x250', descripcion: 'Cuadrado estándar', tipo: 'imagen' },
  { id: 32, nombre: 'Wide Banner 970x90', categoria: 'banners', formato: 'PNG', tamano: '310 KB', dimensiones: '970x90', descargas: 189, fecha: '2023-12-15', url: '#', thumbnail: 'https://via.placeholder.com/970x90/f093fb/ffffff?text=970x90', descripcion: 'Banner extra ancho', tipo: 'imagen' },
  { id: 33, nombre: 'Half Page 300x600', categoria: 'banners', formato: 'JPG', tamano: '425 KB', dimensiones: '300x600', descargas: 267, fecha: '2023-12-14', url: '#', thumbnail: 'https://via.placeholder.com/300x600/4facfe/ffffff?text=300x600', descripcion: 'Media página vertical', tipo: 'imagen' },
  { id: 34, nombre: 'Large Mobile Banner 320x100', categoria: 'banners', formato: 'PNG', tamano: '135 KB', dimensiones: '320x100', descargas: 345, fecha: '2023-12-13', url: '#', thumbnail: 'https://via.placeholder.com/320x100/00f2fe/ffffff?text=320x100', descripcion: 'Banner móvil grande', tipo: 'imagen' },

  // Social media adicionales
  { id: 35, nombre: 'Twitter Header 1500x500', categoria: 'social', formato: 'JPG', tamano: '280 KB', dimensiones: '1500x500', descargas: 198, fecha: '2023-12-12', url: '#', thumbnail: 'https://via.placeholder.com/1500x500/a8edea/ffffff?text=Twitter+Header', descripcion: 'Portada para Twitter/X', tipo: 'imagen' },
  { id: 36, nombre: 'LinkedIn Banner 1584x396', categoria: 'social', formato: 'PNG', tamano: '320 KB', dimensiones: '1584x396', descargas: 167, fecha: '2023-12-11', url: '#', thumbnail: 'https://via.placeholder.com/1584x396/fed6e3/ffffff?text=LinkedIn', descripcion: 'Banner profesional LinkedIn', tipo: 'imagen' },
  { id: 37, nombre: 'YouTube Thumbnail 1280x720', categoria: 'social', formato: 'JPG', tamano: '395 KB', dimensiones: '1280x720', descargas: 423, fecha: '2023-12-10', url: '#', thumbnail: 'https://via.placeholder.com/1280x720/ff6b6b/ffffff?text=YouTube', descripcion: 'Miniatura para videos YouTube', tipo: 'imagen' },
  { id: 38, nombre: 'Pinterest Pin 1000x1500', categoria: 'social', formato: 'PNG', tamano: '465 KB', dimensiones: '1000x1500', descargas: 234, fecha: '2023-12-09', url: '#', thumbnail: 'https://via.placeholder.com/667x1000/4ecdc4/ffffff?text=Pinterest', descripcion: 'Pin vertical para Pinterest', tipo: 'imagen' },

  // Más videos
  { id: 39, nombre: 'Before & After Transformación', categoria: 'videos', formato: 'MP4', tamano: '52 MB', dimensiones: '1920x1080', descargas: 312, fecha: '2023-12-08', url: '#', thumbnail: 'https://via.placeholder.com/1920x1080/95e1d3/ffffff?text=Before+After', descripcion: 'Casos de transformación', tipo: 'video' },
  { id: 40, nombre: 'Behind the Scenes', categoria: 'videos', formato: 'MP4', tamano: '67 MB', dimensiones: '1920x1080', descargas: 245, fecha: '2023-12-07', url: '#', thumbnail: 'https://via.placeholder.com/1920x1080/f38181/ffffff?text=BTS', descripcion: 'Detrás de cámaras del equipo', tipo: 'video' },
  { id: 41, nombre: 'Tutorial Rápido 2min', categoria: 'videos', formato: 'MP4', tamano: '34 MB', dimensiones: '1920x1080', descargas: 389, fecha: '2023-12-06', url: '#', thumbnail: 'https://via.placeholder.com/1920x1080/667eea/ffffff?text=Tutorial+2min', descripcion: 'Tutorial paso a paso', tipo: 'video' },
  { id: 42, nombre: 'Video Cuadrado 1080x1080', categoria: 'videos', formato: 'MP4', tamano: '28 MB', dimensiones: '1080x1080', descargas: 456, fecha: '2023-12-05', url: '#', thumbnail: 'https://via.placeholder.com/1080x1080/764ba2/ffffff?text=Square+Video', descripcion: 'Video para feed Instagram', tipo: 'video' },

  // Más textos
  { id: 43, nombre: 'Email Newsletter Semanal', categoria: 'emails', formato: 'HTML', tamano: '19 KB', descargas: 334, fecha: '2023-12-04', url: '#', descripcion: 'Template para newsletter', tipo: 'documento' },
  { id: 44, nombre: 'Email Recuperación Carrito', categoria: 'emails', formato: 'HTML', tamano: '16 KB', descargas: 278, fecha: '2023-12-03', url: '#', descripcion: 'Para recuperar ventas perdidas', tipo: 'documento' },
  { id: 45, nombre: 'Social Media Calendar Template', categoria: 'textos', formato: 'XLSX', tamano: '45 KB', descargas: 512, fecha: '2023-12-02', url: '#', descripcion: 'Calendario de contenido mensual', tipo: 'documento' },
  { id: 46, nombre: 'Hashtags por Nicho (30 sets)', categoria: 'textos', formato: 'TXT', tamano: '7 KB', descargas: 623, fecha: '2023-12-01', url: '#', descripcion: 'Hashtags investigados por industria', tipo: 'texto' },
  { id: 47, nombre: 'FAQs Template Afiliados', categoria: 'textos', formato: 'DOCX', tamano: '18 KB', descargas: 289, fecha: '2023-11-30', url: '#', descripcion: 'Preguntas frecuentes respondidas', tipo: 'documento' },
  { id: 48, nombre: 'Scripts para Videos', categoria: 'textos', formato: 'PDF', tamano: '1.2 MB', descargas: 367, fecha: '2023-11-29', url: '#', descripcion: '10 guiones para crear videos', tipo: 'documento' },

  // Brand adicionales
  { id: 49, nombre: 'Tipografías Oficiales', categoria: 'brand', formato: 'ZIP', tamano: '5.6 MB', descargas: 412, fecha: '2023-11-28', url: '#', descripcion: 'Pack de fuentes para descargar', tipo: 'documento' },
  { id: 50, nombre: 'Iconos del Sistema (SVG)', categoria: 'brand', formato: 'ZIP', tamano: '2.8 MB', descargas: 345, fecha: '2023-11-27', url: '#', descripcion: 'Set completo de iconos', tipo: 'documento' },

  // Más guías
  { id: 51, nombre: 'SEO para Afiliados', categoria: 'guias', formato: 'PDF', tamano: '6.3 MB', descargas: 478, fecha: '2023-11-26', url: '#', descripcion: 'Optimización para motores de búsqueda', tipo: 'documento' },
  { id: 52, nombre: 'Email Marketing para Afiliados', categoria: 'guias', formato: 'PDF', tamano: '4.9 MB', descargas: 398, fecha: '2023-11-25', url: '#', descripcion: 'Estrategias de email efectivas', tipo: 'documento' },
  { id: 53, nombre: 'Tracking con Google Analytics', categoria: 'guias', formato: 'PDF', tamano: '3.7 MB', descargas: 312, fecha: '2023-11-24', url: '#', descripcion: 'Configuración de analytics', tipo: 'documento' },
];

const RecursosAfiliadosPage: React.FC = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [recursoSeleccionado, setRecursoSeleccionado] = useState<Recurso | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Filtrar recursos
  const recursosFiltrados = RECURSOS_MOCK.filter(recurso => {
    const coincideCategoria = categoriaActiva === 'todos' || recurso.categoria === categoriaActiva;
    const coincideBusqueda = recurso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             recurso.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Categorías
  const categorias = [
    { id: 'todos', nombre: 'Todos', icon: Grid3x3, count: RECURSOS_MOCK.length },
    { id: 'banners', nombre: 'Banners y Gráficos', icon: ImageIcon, count: RECURSOS_MOCK.filter(r => r.categoria === 'banners').length },
    { id: 'textos', nombre: 'Textos y Copy', icon: FileText, count: RECURSOS_MOCK.filter(r => r.categoria === 'textos').length },
    { id: 'videos', nombre: 'Videos', icon: Video, count: RECURSOS_MOCK.filter(r => r.categoria === 'videos').length },
    { id: 'emails', nombre: 'Email Templates', icon: Mail, count: RECURSOS_MOCK.filter(r => r.categoria === 'emails').length },
    { id: 'social', nombre: 'Social Media', icon: Share2, count: RECURSOS_MOCK.filter(r => r.categoria === 'social').length },
    { id: 'brand', nombre: 'Brand Assets', icon: Palette, count: RECURSOS_MOCK.filter(r => r.categoria === 'brand').length },
    { id: 'guias', nombre: 'Guías y Tutoriales', icon: Book, count: RECURSOS_MOCK.filter(r => r.categoria === 'guias').length },
  ];

  // Estadísticas
  const stats = [
    { title: 'Total de Recursos', value: RECURSOS_MOCK.length.toString(), icon: Package, color: 'from-blue-500 to-indigo-600' },
    { title: 'Descargas Este Mes', value: '12,547', icon: Download, color: 'from-emerald-500 to-teal-600' },
    { title: 'Recurso Más Popular', value: 'Logo PNG', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
    { title: 'Última Actualización', value: 'Hace 2 días', icon: Calendar, color: 'from-orange-500 to-red-600' },
  ];

  const handleCopyLink = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBadgeColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'banners': 'bg-blue-500',
      'textos': 'bg-purple-500',
      'videos': 'bg-red-500',
      'emails': 'bg-green-500',
      'social': 'bg-pink-500',
      'brand': 'bg-indigo-500',
      'guias': 'bg-orange-500',
    };
    return colores[categoria] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Package className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Recursos para <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Afiliados</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Todo lo que necesitas para tener <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">éxito</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Biblioteca Completa</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Actualizaciones Semanales</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BUSCADOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar recursos por nombre o descripción..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          />
        </div>
      </motion.div>

      {/* CATEGORÍAS (Pills) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-8 overflow-x-auto"
      >
        <div className="flex gap-3 pb-2">
          {categorias.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                  categoriaActiva === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/80 backdrop-blur-xl text-gray-700 border border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{cat.nombre}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  categoriaActiva === cat.id ? 'bg-white/20' : 'bg-purple-100 text-purple-700'
                }`}>
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* GRID DE RECURSOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {recursosFiltrados.map((recurso, index) => (
            <motion.div
              key={recurso.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group"
            >
              {/* Preview Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {recurso.thumbnail ? (
                  <img src={recurso.thumbnail} alt={recurso.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {recurso.tipo === 'video' && <Video className="w-16 h-16 text-gray-400" />}
                    {recurso.tipo === 'documento' && <FileText className="w-16 h-16 text-gray-400" />}
                    {recurso.tipo === 'texto' && <FileText className="w-16 h-16 text-gray-400" />}
                    {recurso.tipo === 'imagen' && <ImageIcon className="w-16 h-16 text-gray-400" />}
                  </div>
                )}

                {/* Play button para videos */}
                {recurso.tipo === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-8 h-8 text-purple-600 ml-1" />
                    </div>
                  </div>
                )}

                {/* Hover Actions Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    <button
                      onClick={() => setRecursoSeleccionado(recurso)}
                      className="flex-1 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-xl font-semibold text-sm hover:bg-white transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Vista</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-xl font-semibold text-sm hover:bg-purple-700 transition-colors duration-200">
                      <Download className="w-4 h-4" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>

                {/* Badge de categoría */}
                <div className={`absolute top-3 left-3 px-3 py-1 ${getBadgeColor(recurso.categoria)} text-white text-xs font-bold rounded-full`}>
                  {categorias.find(c => c.id === recurso.categoria)?.nombre}
                </div>
              </div>

              {/* Información */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                  {recurso.nombre}
                </h3>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {recurso.descripcion}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg">
                    {recurso.formato}
                  </span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                    {recurso.tamano}
                  </span>
                  {recurso.dimensiones && (
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg">
                      {recurso.dimensiones}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Download className="w-3 h-3" />
                    <span className="font-medium">{recurso.descargas}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleCopyLink(recurso.id)}
                      className="p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200 relative"
                    >
                      {copiedId === recurso.id ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 hover:text-purple-600" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                      <Share2 className="w-4 h-4 text-gray-400 hover:text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mensaje si no hay resultados */}
      {recursosFiltrados.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron recursos</h3>
          <p className="text-gray-600">Intenta con otra búsqueda o categoría</p>
        </motion.div>
      )}

      {/* MODAL DE VISTA PREVIA (Lightbox) */}
      <AnimatePresence>
        {recursoSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setRecursoSeleccionado(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-6 relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{recursoSeleccionado.nombre}</h2>
                    <p className="text-purple-100">{recursoSeleccionado.descripcion}</p>
                  </div>
                  <button
                    onClick={() => setRecursoSeleccionado(null)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="p-6">
                <div className="bg-gray-100 rounded-2xl overflow-hidden mb-6 h-96 flex items-center justify-center">
                  {recursoSeleccionado.thumbnail ? (
                    <img src={recursoSeleccionado.thumbnail} alt={recursoSeleccionado.nombre} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="text-center">
                      {recursoSeleccionado.tipo === 'video' && <Video className="w-24 h-24 text-gray-400 mx-auto mb-4" />}
                      {recursoSeleccionado.tipo === 'documento' && <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />}
                      {recursoSeleccionado.tipo === 'texto' && <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />}
                      <p className="text-gray-600">Vista previa no disponible</p>
                    </div>
                  )}
                </div>

                {/* Información detallada */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-xs text-purple-600 font-semibold mb-1">Formato</p>
                    <p className="text-lg font-bold text-purple-900">{recursoSeleccionado.formato}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-blue-600 font-semibold mb-1">Tamaño</p>
                    <p className="text-lg font-bold text-blue-900">{recursoSeleccionado.tamano}</p>
                  </div>
                  {recursoSeleccionado.dimensiones && (
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-xs text-green-600 font-semibold mb-1">Dimensiones</p>
                      <p className="text-lg font-bold text-green-900">{recursoSeleccionado.dimensiones}</p>
                    </div>
                  )}
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="text-xs text-orange-600 font-semibold mb-1">Descargas</p>
                    <p className="text-lg font-bold text-orange-900">{recursoSeleccionado.descargas}</p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300">
                    <Download className="w-5 h-5" />
                    Descargar Recurso
                  </button>
                  <button
                    onClick={() => handleCopyLink(recursoSeleccionado.id)}
                    className="px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center gap-2"
                  >
                    {copiedId === recursoSeleccionado.id ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copiar Link
                      </>
                    )}
                  </button>
                  <button className="px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300">
                    <Share2 className="w-5 h-5" />
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

export default RecursosAfiliadosPage;
