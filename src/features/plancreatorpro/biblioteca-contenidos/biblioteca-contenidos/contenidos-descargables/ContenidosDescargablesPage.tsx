import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileText,
  File,
  Star,
  Eye,
  Share2,
  Heart,
  Search,
  Filter,
  SortAsc,
  FileCheck,
  TrendingUp,
  Package,
  HardDrive,
  Grid3x3,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Crown,
  Calendar,
  User,
  Hash,
  Clock,
  ArrowUpRight,
  Check,
  Sparkles
} from 'lucide-react';
import { fetchDownloadableContent, CATEGORIAS, TIPOS_ARCHIVO } from './contenidosDescargablesApi';

type ViewMode = 'grid' | 'list';
type FilterCategory = 'all' | 'pdf' | 'ebook' | 'plantilla' | 'guia' | 'infografia' | 'workbook' | 'checklist';
type SortOption = 'recientes' | 'descargados' | 'valorados' | 'alfabetico';

interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  tipo: string;
  tamano: string;
  descargas: number;
  rating: number;
  numReviews: number;
  autor: string;
  autorBio: string;
  fecha: string;
  numPaginas?: number;
  isPremium: boolean;
  precio?: number;
  thumbnailUrl: string;
  tags: string[];
  previewPages?: number;
  queIncluye: string[];
  paraQuien: string[];
}

interface Stats {
  totalRecursos: number;
  descargasMes: number;
  recursosPremium: number;
  tamanoTotal: number;
}

const ContenidosDescargablesPage: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalRecursos: 0,
    descargasMes: 0,
    recursosPremium: 0,
    tamanoTotal: 0
  });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recientes');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecurso, setSelectedRecurso] = useState<Recurso | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [misDescargas, setMisDescargas] = useState<string[]>([]);

  // Filters state
  const [tipoArchivoFilter, setTipoArchivoFilter] = useState<string[]>([]);
  const [precioFilter, setPrecioFilter] = useState<'all' | 'gratis' | 'premium'>('all');
  const [tamanoFilter, setTamanoFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  useEffect(() => {
    loadRecursos();
  }, []);

  const loadRecursos = async () => {
    setLoading(true);
    const data = await fetchDownloadableContent();
    setRecursos(data);

    // Calculate stats
    const totalDescargas = data.reduce((sum, r) => sum + r.descargas, 0);
    const premium = data.filter(r => r.isPremium).length;
    const tamanoEnMB = data.reduce((sum, r) => {
      const size = parseFloat(r.tamano);
      return sum + size;
    }, 0);

    setStats({
      totalRecursos: data.length,
      descargasMes: Math.floor(totalDescargas * 0.3),
      recursosPremium: premium,
      tamanoTotal: tamanoEnMB / 1000
    });

    setLoading(false);
  };

  const getFilteredAndSortedRecursos = () => {
    let filtered = recursos;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(r => r.categoria.toLowerCase() === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by tipo archivo
    if (tipoArchivoFilter.length > 0) {
      filtered = filtered.filter(r => tipoArchivoFilter.includes(r.tipo));
    }

    // Filter by precio
    if (precioFilter !== 'all') {
      filtered = filtered.filter(r =>
        precioFilter === 'premium' ? r.isPremium : !r.isPremium
      );
    }

    // Filter by tamaño
    if (tamanoFilter !== 'all') {
      filtered = filtered.filter(r => {
        const size = parseFloat(r.tamano);
        if (tamanoFilter === 'small') return size < 2;
        if (tamanoFilter === 'medium') return size >= 2 && size < 5;
        if (tamanoFilter === 'large') return size >= 5;
        return true;
      });
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recientes':
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        case 'descargados':
          return b.descargas - a.descargas;
        case 'valorados':
          return b.rating - a.rating;
        case 'alfabetico':
          return a.titulo.localeCompare(b.titulo);
        default:
          return 0;
      }
    });

    return sorted;
  };

  const handleDownload = async (recurso: Recurso) => {
    if (recurso.isPremium && !misDescargas.includes(recurso.id)) {
      alert('Este recurso es premium. Necesitas una suscripción para descargarlo.');
      return;
    }

    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(null);
            if (!misDescargas.includes(recurso.id)) {
              setMisDescargas([...misDescargas, recurso.id]);
            }
            alert(`✓ Descarga completada: ${recurso.titulo}`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredRecursos = getFilteredAndSortedRecursos();

  const statsData = [
    {
      title: 'Total de Recursos',
      value: stats.totalRecursos,
      icon: FileCheck,
      change: '+12.5',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Descargas Este Mes',
      value: stats.descargasMes,
      icon: TrendingUp,
      change: '+23.1',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Recursos Premium',
      value: stats.recursosPremium,
      icon: Crown,
      change: '+8.2',
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Tamaño Total',
      value: `${stats.tamanoTotal.toFixed(1)} GB`,
      icon: HardDrive,
      change: '+15.7',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const categorias = [
    { id: 'all' as FilterCategory, label: 'Todos', count: recursos.length },
    { id: 'pdf' as FilterCategory, label: 'PDFs / eBooks', count: recursos.filter(r => r.tipo === 'PDF').length },
    { id: 'plantilla' as FilterCategory, label: 'Plantillas', count: recursos.filter(r => r.categoria === 'plantilla').length },
    { id: 'guia' as FilterCategory, label: 'Guías y Manuales', count: recursos.filter(r => r.categoria === 'guia').length },
    { id: 'infografia' as FilterCategory, label: 'Infografías', count: recursos.filter(r => r.categoria === 'infografia').length },
    { id: 'workbook' as FilterCategory, label: 'Workbooks', count: recursos.filter(r => r.categoria === 'workbook').length },
    { id: 'checklist' as FilterCategory, label: 'Checklists', count: recursos.filter(r => r.categoria === 'checklist').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando recursos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Download className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Recursos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Descargables</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            PDFs, eBooks, plantillas y más recursos para potenciar tu negocio
          </p>

          {/* Pills de información */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{recursos.length} recursos disponibles</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Check className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Descargas ilimitadas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar recursos por título, descripción o tags..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* View Mode & Filters */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                showFilters
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg'
                  : 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>

            <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Panel de filtros expandible */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tipo de archivo */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Tipo de Archivo</label>
                  <div className="space-y-2">
                    {['PDF', 'DOCX', 'XLSX', 'PPTX'].map(tipo => (
                      <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tipoArchivoFilter.includes(tipo)}
                          onChange={() => {
                            if (tipoArchivoFilter.includes(tipo)) {
                              setTipoArchivoFilter(tipoArchivoFilter.filter(t => t !== tipo));
                            } else {
                              setTipoArchivoFilter([...tipoArchivoFilter, tipo]);
                            }
                          }}
                          className="w-4 h-4 text-orange-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{tipo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Precio</label>
                  <div className="space-y-2">
                    {[
                      { value: 'all' as const, label: 'Todos' },
                      { value: 'gratis' as const, label: 'Gratis' },
                      { value: 'premium' as const, label: 'Premium' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="precio"
                          checked={precioFilter === option.value}
                          onChange={() => setPrecioFilter(option.value)}
                          className="w-4 h-4 text-orange-600"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tamaño */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Tamaño de Archivo</label>
                  <div className="space-y-2">
                    {[
                      { value: 'all' as const, label: 'Todos' },
                      { value: 'small' as const, label: 'Pequeño (< 2 MB)' },
                      { value: 'medium' as const, label: 'Mediano (2-5 MB)' },
                      { value: 'large' as const, label: 'Grande (> 5 MB)' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tamano"
                          checked={tamanoFilter === option.value}
                          onChange={() => setTamanoFilter(option.value)}
                          className="w-4 h-4 text-orange-600"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CATEGORÍAS TABS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
              }`}
            >
              {cat.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                activeCategory === cat.id
                  ? 'bg-white/20'
                  : 'bg-orange-100 text-orange-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ORDENAR POR */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          <span className="font-bold text-gray-900">{filteredRecursos.length}</span> recursos encontrados
        </p>
        <div className="flex items-center gap-3">
          <SortAsc className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-semibold text-gray-700"
          >
            <option value="recientes">Más recientes</option>
            <option value="descargados">Más descargados</option>
            <option value="valorados">Mejor valorados</option>
            <option value="alfabetico">Alfabético</option>
          </select>
        </div>
      </div>

      {/* GRID DE RECURSOS */}
      <div className={viewMode === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4'
      }>
        {filteredRecursos.map((recurso, index) => (
          <motion.div
            key={recurso.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 overflow-hidden group"
          >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-orange-100 to-amber-100 overflow-hidden">
              <img
                src={recurso.thumbnailUrl}
                alt={recurso.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Badges en thumbnail */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg">
                  {recurso.tipo}
                </div>
                <div className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-700 text-xs font-bold rounded-full shadow-lg">
                  {recurso.tamano} MB
                </div>
              </div>

              {/* Premium badge */}
              {recurso.isPremium && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Premium
                </div>
              )}

              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recurso.id);
                }}
                className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              >
                <Heart
                  className={`w-5 h-5 ${favorites.includes(recurso.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {recurso.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {recurso.descripcion}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="w-4 h-4" />
                  <span>{recurso.autor}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(recurso.fecha).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Download className="w-4 h-4" />
                  <span>{recurso.descargas} descargas</span>
                </div>
                {recurso.numPaginas && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>{recurso.numPaginas} páginas</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(recurso.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{recurso.rating}</span>
                <span className="text-xs text-gray-500">({recurso.numReviews} reviews)</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {recurso.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRecurso(recurso)}
                  className="flex-1 px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Vista Previa
                </button>
                <button
                  onClick={() => handleDownload(recurso)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL DE VISTA PREVIA */}
      <AnimatePresence>
        {selectedRecurso && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRecurso(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-amber-600 p-6 rounded-t-3xl z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {selectedRecurso.isPremium && (
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          Premium
                        </div>
                      )}
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full">
                        {selectedRecurso.tipo}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedRecurso.titulo}</h2>
                    <p className="text-orange-100">{selectedRecurso.descripcion}</p>
                  </div>
                  <button
                    onClick={() => setSelectedRecurso(null)}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Preview Image */}
                <div className="mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 p-8">
                  <img
                    src={selectedRecurso.thumbnailUrl}
                    alt={selectedRecurso.titulo}
                    className="w-full h-96 object-contain"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Info principal */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Autor */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <User className="w-5 h-5 text-orange-500" />
                        Autor
                      </h3>
                      <p className="text-gray-700 font-semibold">{selectedRecurso.autor}</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedRecurso.autorBio}</p>
                    </div>

                    {/* Qué incluye */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-orange-500" />
                        Qué incluye
                      </h3>
                      <ul className="space-y-2">
                        {selectedRecurso.queIncluye.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Para quién */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        ¿Para quién es este recurso?
                      </h3>
                      <ul className="space-y-2">
                        {selectedRecurso.paraquien.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <ArrowUpRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Hash className="w-5 h-5 text-orange-500" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecurso.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Tamaño</span>
                        <span className="font-bold text-gray-900">{selectedRecurso.tamano} MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Descargas</span>
                        <span className="font-bold text-gray-900">{selectedRecurso.descargas}</span>
                      </div>
                      {selectedRecurso.numPaginas && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Páginas</span>
                          <span className="font-bold text-gray-900">{selectedRecurso.numPaginas}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Categoría</span>
                        <span className="font-bold text-gray-900 capitalize">{selectedRecurso.categoria}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Fecha</span>
                        <span className="font-bold text-gray-900">{new Date(selectedRecurso.fecha).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4">
                      <div className="text-center mb-3">
                        <div className="text-4xl font-bold text-gray-900 mb-1">{selectedRecurso.rating}</div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(selectedRecurso.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{selectedRecurso.numReviews} valoraciones</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleDownload(selectedRecurso)}
                      className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                    >
                      <Download className="w-6 h-6" />
                      {selectedRecurso.isPremium ? `Descargar - $${selectedRecurso.precio}` : 'Descargar Gratis'}
                    </button>

                    <button
                      className="w-full px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROGRESS DE DESCARGA */}
      <AnimatePresence>
        {downloadProgress !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 z-50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Descargando...</h4>
                <p className="text-sm text-gray-600">{downloadProgress}% completado</p>
              </div>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${downloadProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContenidosDescargablesPage;
