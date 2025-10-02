import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Users, Zap, TrendingUp, Award, Calendar } from 'lucide-react';
import CreadorRetos from './components/CreadorRetos';
import ListadoParticipantes from './components/ListadoParticipantes';
import TablaClasificacion from './components/TablaClasificacion';
import InsigniasLogros from './components/InsigniasLogros';

const RetosHabitosPage: React.FC = () => {
  // Datos de estadísticas (simulados)
  const [stats] = useState({
    retosActivos: 3,
    retosCompletados: 12,
    rachaActual: 14,
    puntosAcumulados: 2450
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Retos y <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Desafíos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl leading-relaxed">
            Supérate a ti mismo <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cada día</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Sistema Gamificado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Recompensas Exclusivas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Retos Activos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Icono */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8" />
            </div>

            {/* Título */}
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Retos Activos
            </p>

            {/* Valor */}
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.retosActivos}
            </p>

            {/* Cambio */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-bold text-blue-600">En progreso</span>
            </div>

            {/* Barra decorativa */}
            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Retos Completados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Completados
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.retosCompletados}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <Trophy className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">Exitosos</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.7, duration: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Días en Racha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Racha Actual
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.rachaActual}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-orange-50 rounded-lg">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm font-bold text-orange-600">Días</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Puntos Acumulados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-500 to-amber-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Puntos Totales
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {stats.puntosAcumulados}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-yellow-50 rounded-lg">
                <Trophy className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-sm font-bold text-yellow-600">Acumulados</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ delay: 0.9, duration: 1 }}
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECCIONES DE CONTENIDO */}
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            Crear Nuevo Reto
          </h2>
          <CreadorRetos />
        </motion.div>
      </section>

      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            Participantes del Reto Actual
          </h2>
          <ListadoParticipantes />
        </motion.div>
      </section>

      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <TablaClasificacion />
        </motion.div>
      </section>

      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            Mis Insignias y Logros
          </h2>
          <InsigniasLogros />
        </motion.div>
      </section>
    </div>
  );
};

export default RetosHabitosPage;
