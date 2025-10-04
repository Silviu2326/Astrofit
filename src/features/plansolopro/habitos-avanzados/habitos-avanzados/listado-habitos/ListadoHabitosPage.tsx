import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, TrendingUp, Target, Flame, Filter, Calendar,
  ListChecks, Award, ChevronRight, Clock
} from 'lucide-react';
import TablaHabitos from './components/TablaHabitos';
import FiltrosCliente from './components/FiltrosCliente';
import { getHabitos, Habito } from './listadoHabitosApi';

const ListadoHabitosPage: React.FC = () => {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [loading, setLoading] = useState(true);
  const [vistaActual, setVistaActual] = useState<'lista' | 'calendario'>('lista');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [filtroFrecuencia, setFiltroFrecuencia] = useState<string>('todos');

  useEffect(() => {
    getHabitos().then((data) => {
      setHabitos(data);
      setLoading(false);
    });
  }, []);

  // Calcular estadísticas
  const habitosActivos = habitos.filter(h => h.estado === 'activo').length;
  const rachaMaxima = Math.max(...habitos.map(h => h.racha || 0), 0);
  const tasaCumplimiento = habitos.length > 0
    ? Math.round(habitos.reduce((acc, h) => acc + h.cumplimientoSemanal, 0) / habitos.length)
    : 0;
  const habitosHoy = habitos.filter(h => h.completadoHoy).length;

  const stats = [
    {
      title: 'Hábitos Activos',
      value: habitosActivos,
      icon: Target,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10',
      change: '+5',
      total: habitos.length
    },
    {
      title: 'Racha Más Larga',
      value: `${rachaMaxima} días`,
      icon: Flame,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-600/10',
      change: '+2',
      showFire: true
    },
    {
      title: 'Tasa de Cumplimiento',
      value: `${tasaCumplimiento}%`,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500/10 to-teal-600/10',
      change: '+8',
      progress: tasaCumplimiento
    },
    {
      title: 'Completados Hoy',
      value: habitosHoy,
      icon: CheckCircle2,
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-500/10 to-cyan-600/10',
      change: `${habitosHoy}/${habitosActivos}`,
      progress: habitosActivos > 0 ? (habitosHoy / habitosActivos) * 100 : 0
    }
  ];

  const categorias = ['todos', 'Salud', 'Desarrollo Personal', 'Bienestar', 'Educación'];
  const frecuencias = ['todos', 'Diario', 'Semanal', 'Mensual'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <ListChecks className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Mis <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Hábitos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed">
            Construye <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">rutinas</span> que transforman
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{habitos.length} Hábitos Registrados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-semibold text-white">Racha: {rachaMaxima} días</span>
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
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer"
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
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3 flex items-center gap-2">
                {stat.value}
                {stat.showFire && <Flame className="w-8 h-8 text-orange-500 animate-pulse" />}
              </p>

              {/* Cambio o Progress */}
              {stat.progress !== undefined ? (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                    ></motion.div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{stat.change} vs anterior</span>
                </div>
              ) : stat.total ? (
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500 font-medium">de {stat.total}</span>
                </div>
              ) : (
                <span className="text-sm font-bold text-gray-600">{stat.change}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FILTROS Y VISTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">
                  <Filter className="w-3 h-3 inline mr-1" />
                  Categoría
                </label>
                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat === 'todos' ? 'Todas las categorías' : cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Frecuencia
                </label>
                <select
                  value={filtroFrecuencia}
                  onChange={(e) => setFiltroFrecuencia(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                >
                  {frecuencias.map(freq => (
                    <option key={freq} value={freq}>{freq === 'todos' ? 'Todas las frecuencias' : freq}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Toggle Vista */}
            <div className="flex gap-2">
              <button
                onClick={() => setVistaActual('lista')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  vistaActual === 'lista'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ListChecks className="w-5 h-5" />
                Lista
              </button>
              <button
                onClick={() => setVistaActual('calendario')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  vistaActual === 'calendario'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-5 h-5" />
                Calendario
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CONTENIDO PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {vistaActual === 'lista' ? (
          <TablaHabitos />
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vista Calendario</h3>
              <p className="text-gray-600">Próximamente: Heatmap de hábitos</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* QUICK ACTION BUTTON */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-emerald-500/50 transition-all duration-300 group"
      >
        <CheckCircle2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
      </motion.button>
    </div>
  );
};

export default ListadoHabitosPage;
