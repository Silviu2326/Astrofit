import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone, TrendingUp, Users, DollarSign, Target,
  Calendar, BarChart3, History, Plus, Eye, Edit, Trash2,
  Search, Filter, MoreVertical, Mail, Instagram, Facebook,
  MessageSquare, Youtube, Linkedin, Twitter, Send, Smartphone, Globe, Sparkles
} from 'lucide-react';
import { MOCK_CAMPANAS } from './types';
import CrearCampana from './components/CrearCampana';
import SeguimientoResultados from './components/SeguimientoResultados';
import HistorialCampanas from './components/HistorialCampanas';
import MetricasCampana from './components/MetricasCampana';
import CalendarioCampanas from './components/CalendarioCampanas';
import { fetchCampanas, deleteCampana, cambiarEstadoCampana, type Campana, type EstadoCampana, type CanalCampana } from './campanasApi';

const CampanasPage: React.FC = () => {
  const [mostrarCrearCampana, setMostrarCrearCampana] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarMetricas, setMostrarMetricas] = useState(false);
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<EstadoCampana | ''>('');
  const [filtroCanal, setFiltroCanal] = useState<CanalCampana | ''>('');

  // Cargar campañas
  useEffect(() => {
    loadCampanas();
  }, [filtroEstado, filtroCanal, searchTerm]);

  const loadCampanas = async () => {
    try {
      setIsLoading(true);
      const result = await fetchCampanas({
        estado: filtroEstado || undefined,
        canal: filtroCanal || undefined,
        q: searchTerm || undefined
      });
      setCampanas(result.data);
    } catch (error) {
      console.error('Error loading campañas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCampana = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta campaña?')) return;

    try {
      await deleteCampana(id);
      await loadCampanas();
    } catch (error) {
      console.error('Error deleting campaña:', error);
      alert('Error al eliminar la campaña');
    }
  };

  const handleCambiarEstado = async (id: string, nuevoEstado: EstadoCampana) => {
    try {
      await cambiarEstadoCampana(id, nuevoEstado);
      await loadCampanas();
    } catch (error) {
      console.error('Error changing estado:', error);
      alert('Error al cambiar el estado');
    }
  };

  // Calcular estadísticas globales
  const campanasActivas = campanas.filter(c => c.estado === 'Activa').length;
  const totalImpresiones = campanas.reduce((sum, c) => sum + c.impresiones, 0);
  const totalConversiones = campanas.reduce((sum, c) => sum + c.conversiones, 0);
  const roiPromedio = Math.round(
    campanas.filter(c => c.roi > 0).reduce((sum, c) => sum + c.roi, 0) /
    (campanas.filter(c => c.roi > 0).length || 1)
  );
  const tasaConversionPromedio = totalImpresiones > 0 ? ((totalConversiones / totalImpresiones) * 100).toFixed(2) : '0.00';

  // Iconos de canales
  const getIconoCanal = (canal: CanalCampana) => {
    const iconos: Record<CanalCampana, any> = {
      email: Mail,
      instagram: Instagram,
      facebook: Facebook,
      tiktok: MessageSquare,
      youtube: Youtube,
      linkedin: Linkedin,
      twitter: Twitter,
      whatsapp: MessageSquare,
      telegram: Send,
      SMS: Smartphone,
      web: Globe,
      mixto: Sparkles,
      redes: MessageSquare
    };
    return iconos[canal] || Mail;
  };

  // Colores de estado
  const getColorEstado = (estado: EstadoCampana) => {
    const colores: Record<EstadoCampana, string> = {
      Activa: 'bg-green-100 text-green-700',
      Programada: 'bg-blue-100 text-blue-700',
      Completada: 'bg-gray-100 text-gray-700',
      Pausada: 'bg-yellow-100 text-yellow-700'
    };
    return colores[estado];
  };

  const stats = [
    {
      title: 'Campañas Activas',
      value: campanasActivas.toString(),
      change: 15,
      icon: Target,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'from-violet-50 to-purple-50',
      progress: (campanasActivas / MOCK_CAMPANAS.length) * 100
    },
    {
      title: 'Tasa de Conversión',
      value: `${tasaConversionPromedio}%`,
      change: 8,
      icon: TrendingUp,
      color: 'from-fuchsia-500 to-pink-600',
      bgColor: 'from-fuchsia-50 to-pink-50',
      progress: parseFloat(tasaConversionPromedio) * 10
    },
    {
      title: 'Alcance Total',
      value: `${(totalImpresiones / 1000000).toFixed(1)}M`,
      change: 22,
      icon: Users,
      color: 'from-purple-500 to-fuchsia-600',
      bgColor: 'from-purple-50 to-fuchsia-50',
      progress: 78
    },
    {
      title: 'ROI Promedio',
      value: `${roiPromedio}%`,
      change: 12,
      icon: DollarSign,
      color: 'from-violet-600 to-fuchsia-600',
      bgColor: 'from-violet-50 to-fuchsia-50',
      progress: Math.min((roiPromedio / 500) * 100, 100)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Megaphone className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Campañas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Marketing</span>
              </h1>
            </div>

            {/* Botón CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarCrearCampana(true)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-semibold border-2 border-white/30 transition-all duration-300 shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Crear Nueva Campaña
            </motion.button>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-violet-100 max-w-3xl leading-relaxed">
            Centro de control para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">crear</span>,{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">gestionar</span> y{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">analizar</span> tus campañas
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{MOCK_CAMPANAS.length} Campañas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{campanasActivas} Activas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">ROI {roiPromedio}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgColor} rounded-full blur-2xl opacity-50`}></div>

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
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
              </div>

              {/* Progress bar circular decorativo */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Calendario */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileHover={{ scale: 1.03, y: -4 }}
          onClick={() => setMostrarCalendario(!mostrarCalendario)}
          className="relative overflow-hidden bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Calendar className="w-8 h-8" />
              </div>
              <Eye className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Calendario</h3>
            <p className="text-violet-100">Visualiza campañas programadas</p>
          </div>
        </motion.button>

        {/* Historial */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.03, y: -4 }}
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          className="relative overflow-hidden bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <History className="w-8 h-8" />
              </div>
              <Eye className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Historial</h3>
            <p className="text-fuchsia-100">Revisa campañas anteriores</p>
          </div>
        </motion.button>

        {/* Métricas */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          whileHover={{ scale: 1.03, y: -4 }}
          onClick={() => setMostrarMetricas(!mostrarMetricas)}
          className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <BarChart3 className="w-8 h-8" />
              </div>
              <Eye className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Métricas</h3>
            <p className="text-purple-100">Análisis detallado de resultados</p>
          </div>
        </motion.button>
      </div>

      {/* Componentes Condicionales */}
      {mostrarCrearCampana && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CrearCampana
              onClose={() => setMostrarCrearCampana(false)}
              onSuccess={() => loadCampanas()}
            />
          </div>
        </div>
      )}

      {mostrarCalendario && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <CalendarioCampanas />
        </motion.div>
      )}

      {mostrarHistorial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <HistorialCampanas />
        </motion.div>
      )}

      {mostrarMetricas && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <MetricasCampana />
        </motion.div>
      )}

      {/* Tabla de Campañas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Todas las Campañas</h2>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar campañas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all outline-none"
              />
            </div>

            {/* Filtro Estado */}
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value as EstadoCampana | '')}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all outline-none"
            >
              <option value="">Todos los estados</option>
              <option value="Activa">Activa</option>
              <option value="Programada">Programada</option>
              <option value="Completada">Completada</option>
              <option value="Pausada">Pausada</option>
            </select>

            {/* Filtro Canal */}
            <select
              value={filtroCanal}
              onChange={(e) => setFiltroCanal(e.target.value as CanalCampana | '')}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all outline-none"
            >
              <option value="">Todos los canales</option>
              <option value="email">Email</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="SMS">SMS</option>
              <option value="web">Web</option>
              <option value="mixto">Multicanal</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : campanas.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay campañas que mostrar</p>
              <button
                onClick={() => setMostrarCrearCampana(true)}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Crear Primera Campaña
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Campaña</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Canal</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Estado</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Fechas</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Presupuesto</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Métricas</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700">ROI</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {campanas.map((campana, index) => {
                  const IconoCanal = getIconoCanal(campana.canal);
                  return (
                    <motion.tr
                      key={campana._id || campana.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-violet-50/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">{campana.nombre}</p>
                          <p className="text-sm text-gray-500">{campana.objetivo}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-violet-100 rounded-lg">
                            <IconoCanal className="w-4 h-4 text-violet-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 capitalize">{campana.canal}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getColorEstado(campana.estado)}`}>
                          {campana.estado}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="text-gray-700">{new Date(campana.fechaInicio).toLocaleDateString('es-ES')}</p>
                          <p className="text-gray-500">hasta {new Date(campana.fechaFin).toLocaleDateString('es-ES')}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">€{campana.presupuesto.toLocaleString()}</p>
                          <p className="text-gray-500">Usado: €{campana.presupuestoUtilizado.toLocaleString()}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm space-y-1">
                          <p className="text-gray-700">
                            <span className="font-medium">{campana.impresiones.toLocaleString()}</span> impresiones
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">{campana.clicks.toLocaleString()}</span> clicks
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">{campana.conversiones.toLocaleString()}</span> conversiones
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            campana.roi > 200 ? 'bg-green-100' :
                            campana.roi > 100 ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <span className={`text-sm font-bold ${
                              campana.roi > 200 ? 'text-green-700' :
                              campana.roi > 100 ? 'text-yellow-700' :
                              'text-gray-700'
                            }`}>
                              {campana.roi}%
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleCambiarEstado(
                              campana._id || campana.id || '',
                              campana.estado === 'Activa' ? 'Pausada' : 'Activa'
                            )}
                            className="p-2 hover:bg-violet-100 rounded-lg transition-colors"
                            title={campana.estado === 'Activa' ? 'Pausar' : 'Activar'}
                          >
                            <Eye className="w-4 h-4 text-violet-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteCampana(campana._id || campana.id || '')}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Seguimiento de Resultados - Siempre visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <SeguimientoResultados />
      </motion.div>
    </div>
  );
};

export default CampanasPage;
