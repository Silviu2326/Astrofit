import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MessageSquare, Phone, Bell, Share2, Search, Plus, Filter,
  TrendingUp, Eye, MousePointerClick, Target, Calendar, Edit, Copy,
  Trash2, BarChart3, Settings, Sparkles, ArrowUpRight, CheckCircle,
  Clock, Users, Zap, Globe, Send, Heart, Star, Award, ChevronRight,
  FileText, Layout, Type, Image, Link, Code, Palette
} from 'lucide-react';
import { plantillasMock, categoriasConfig, tiposConfig, Plantilla } from './plantillasData';

const PlantillasComunicacionPage: React.FC = () => {
  const [selectedTipo, setSelectedTipo] = useState<string>('todos');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlantilla, setSelectedPlantilla] = useState<Plantilla | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Estadísticas generales
  const stats = useMemo(() => {
    const totalPlantillas = plantillasMock.length;
    const plantillasActivas = plantillasMock.filter(p => p.activa).length;
    const totalUsos = plantillasMock.reduce((sum, p) => sum + p.usos, 0);
    const promedioApertura = plantillasMock.reduce((sum, p) => sum + p.tasaApertura, 0) / totalPlantillas;

    const tiposUnicos = new Set(plantillasMock.map(p => p.tipo)).size;

    return [
      { title: 'Total Plantillas', value: totalPlantillas, change: 12, icon: FileText, color: 'from-blue-500 to-cyan-500' },
      { title: 'Más Usadas', value: plantillasActivas, change: 8, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
      { title: 'Canales Cubiertos', value: tiposUnicos, change: 0, icon: Globe, color: 'from-orange-500 to-red-500' },
      { title: 'Tasa Apertura Promedio', value: `${promedioApertura.toFixed(1)}%`, change: 5.3, icon: Eye, color: 'from-emerald-500 to-teal-500' }
    ];
  }, []);

  // Filtrado de plantillas
  const plantillasFiltradas = useMemo(() => {
    return plantillasMock.filter(plantilla => {
      const matchTipo = selectedTipo === 'todos' || plantilla.tipo === selectedTipo;
      const matchCategoria = selectedCategoria === 'todos' || plantilla.categoria === selectedCategoria;
      const matchSearch = plantilla.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plantilla.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

      return matchTipo && matchCategoria && matchSearch;
    });
  }, [selectedTipo, selectedCategoria, searchTerm]);

  // Contador por tipo
  const contadorPorTipo = useMemo(() => {
    const contador: Record<string, number> = { todos: plantillasMock.length };
    plantillasMock.forEach(p => {
      contador[p.tipo] = (contador[p.tipo] || 0) + 1;
    });
    return contador;
  }, []);

  const abrirEditor = (plantilla?: Plantilla) => {
    if (plantilla) {
      setSelectedPlantilla(plantilla);
    } else {
      setSelectedPlantilla(null);
    }
    setShowEditor(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Mail className="w-10 h-10 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Plantillas de{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                    Comunicación
                  </span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
                Crea y gestiona{' '}
                <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">
                  mensajes impactantes
                </span>{' '}
                para todos tus canales de comunicación
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-semibold text-white">Multi-canal</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold text-white">Personalizable</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <BarChart3 className="w-5 h-5 text-cyan-300" />
                  <span className="text-sm font-semibold text-white">Analytics integrado</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => abrirEditor()}
              className="relative overflow-hidden bg-white text-indigo-600 rounded-2xl shadow-2xl hover:shadow-white/30 transition-all duration-300 px-8 py-4 font-bold text-lg group border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="flex items-center gap-3 relative z-10">
                <Plus className="w-6 h-6" />
                <span>Crear Nueva Plantilla</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
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
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
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
              {stat.change > 0 && (
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navegación por Tipo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Filter className="w-7 h-7 text-indigo-600" />
            Filtrar por Canal
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Vista:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <Layout className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTipo('todos')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${
              selectedTipo === 'todos'
                ? 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white border-transparent shadow-lg'
                : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>Todos</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedTipo === 'todos' ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
              }`}>
                {contadorPorTipo.todos}
              </span>
            </div>
          </motion.button>

          {Object.entries(tiposConfig).map(([key, config]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTipo(key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${
                selectedTipo === key
                  ? 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white border-transparent shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{config.icono}</span>
                <span>{config.nombre}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  selectedTipo === key ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                }`}>
                  {contadorPorTipo[key] || 0}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Categorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-indigo-600" />
          Categorías
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategoria('todos')}
            className={`p-4 rounded-2xl font-semibold transition-all duration-300 border-2 ${
              selectedCategoria === 'todos'
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-transparent shadow-xl'
                : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:shadow-lg'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-sm font-bold">Todas</div>
            </div>
          </motion.button>

          {Object.entries(categoriasConfig).map(([key, config]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategoria(key)}
              className={`p-4 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                selectedCategoria === key
                  ? `bg-gradient-to-br ${config.color} text-white border-transparent shadow-xl`
                  : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{config.icono}</div>
                <div className="text-xs font-bold">{config.nombre}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Barra de Búsqueda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar plantillas por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white text-lg"
          />
        </div>
      </motion.div>

      {/* Resultados */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {plantillasFiltradas.length} {plantillasFiltradas.length === 1 ? 'Plantilla' : 'Plantillas'} encontradas
          </h2>
        </div>
      </motion.div>

      {/* Grid de Plantillas */}
      <AnimatePresence mode="popLayout">
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {plantillasFiltradas.map((plantilla, index) => (
            <motion.div
              key={plantilla.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.005, y: -4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group relative"
            >
              {/* Preview Header con gradiente según tipo */}
              <div className={`h-32 ${tiposConfig[plantilla.tipo].color} bg-gradient-to-br relative overflow-hidden`}>
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">
                    {tiposConfig[plantilla.tipo].icono}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-700 flex items-center gap-1">
                    {tiposConfig[plantilla.tipo].icono}
                    <span>{tiposConfig[plantilla.tipo].nombre}</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 bg-gradient-to-r ${categoriasConfig[plantilla.categoria].color} rounded-full text-xs font-bold text-white`}>
                    {categoriasConfig[plantilla.categoria].icono} {categoriasConfig[plantilla.categoria].nombre}
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {plantilla.nombre}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {plantilla.descripcion}
                </p>

                {/* Preview del contenido */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 mb-4 border border-gray-200">
                  <div className="flex items-start gap-2 mb-2">
                    <Eye className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 line-clamp-2 font-medium">
                      {plantilla.preview}
                    </p>
                  </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Send className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600 uppercase">Usos</span>
                    </div>
                    <p className="text-lg font-bold text-blue-900">{plantilla.usos.toLocaleString()}</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-600 uppercase">Apertura</span>
                    </div>
                    <p className="text-lg font-bold text-green-900">{plantilla.tasaApertura}%</p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MousePointerClick className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-600 uppercase">CTR</span>
                    </div>
                    <p className="text-lg font-bold text-purple-900">{plantilla.tasaClick}%</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-semibold text-orange-600 uppercase">Conversión</span>
                    </div>
                    <p className="text-lg font-bold text-orange-900">{plantilla.conversiones}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Actualizado: {new Date(plantilla.ultimaActualizacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
                  </div>

                  {/* Acciones rápidas */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => abrirEditor(plantilla)}
                      className="p-2 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
                      title="Duplicar"
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                      title="Métricas"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {plantillasFiltradas.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No se encontraron plantillas</h3>
          <p className="text-gray-600 mb-6">Intenta con otros filtros o términos de búsqueda</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedTipo('todos');
              setSelectedCategoria('todos');
              setSearchTerm('');
            }}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Limpiar Filtros
          </motion.button>
        </motion.div>
      )}

      {/* Modal Editor (placeholder) */}
      {showEditor && (
        <EditorModal
          plantilla={selectedPlantilla}
          onClose={() => {
            setShowEditor(false);
            setSelectedPlantilla(null);
          }}
        />
      )}
    </div>
  );
};

// Componente Modal de Editor (simplificado)
interface EditorModalProps {
  plantilla: Plantilla | null;
  onClose: () => void;
}

const EditorModal: React.FC<EditorModalProps> = ({ plantilla, onClose }) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'settings'>('editor');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {plantilla ? 'Editar Plantilla' : 'Nueva Plantilla'}
              </h2>
              {plantilla && (
                <p className="text-blue-100">{plantilla.nombre}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'editor'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                <span>Editor</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'editor' && (
            <div className="space-y-6">
              {/* Toolbar */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <span className="text-sm font-medium">Texto</span>
                  </button>
                  <button className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    <span className="text-sm font-medium">Imagen</span>
                  </button>
                  <button className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    <span className="text-sm font-medium">Enlace</span>
                  </button>
                  <button className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span className="text-sm font-medium">Variable</span>
                  </button>
                  <button className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    <span className="text-sm font-medium">Color</span>
                  </button>
                </div>
              </div>

              {/* Editor Area */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Contenido de la plantilla</label>
                <textarea
                  className="w-full h-64 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white resize-none font-mono text-sm"
                  placeholder="Escribe el contenido de tu plantilla aquí..."
                  defaultValue={plantilla?.contenido || ''}
                />
              </div>

              {/* Variables disponibles */}
              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Variables Disponibles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(plantilla?.variables || ['nombre', 'fecha', 'hora']).map((variable) => (
                    <span
                      key={variable}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-mono font-semibold cursor-pointer hover:bg-purple-200 transition-colors"
                    >
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vista Previa</h3>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {plantilla?.contenido || 'Tu contenido aparecerá aquí...'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-indigo-300 transition-colors">
                  Vista Desktop
                </button>
                <button className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-indigo-300 transition-colors">
                  Vista Móvil
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la plantilla</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white"
                  placeholder="Ej: Bienvenida Premium"
                  defaultValue={plantilla?.nombre || ''}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                <textarea
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white resize-none"
                  rows={3}
                  placeholder="Describe el propósito de esta plantilla..."
                  defaultValue={plantilla?.descripcion || ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Canal</label>
                  <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white">
                    <option value="email">📧 Email</option>
                    <option value="sms">💬 SMS</option>
                    <option value="whatsapp">📱 WhatsApp</option>
                    <option value="push">🔔 Push</option>
                    <option value="social">📱 Social</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
                  <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white">
                    <option value="bienvenida">👋 Bienvenida</option>
                    <option value="seguimiento">📊 Seguimiento</option>
                    <option value="promocion">🔥 Promoción</option>
                    <option value="recordatorio">⏰ Recordatorio</option>
                    <option value="cumpleanos">🎂 Cumpleaños</option>
                    <option value="recuperacion">💔 Recuperación</option>
                    <option value="newsletter">📰 Newsletter</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              Guardar como Borrador
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              Guardar y Activar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlantillasComunicacionPage;
