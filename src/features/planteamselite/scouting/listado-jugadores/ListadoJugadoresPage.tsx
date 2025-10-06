import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, TrendingUp, Target, Sparkles } from 'lucide-react';
import TarjetasProspectos from './components/TarjetasProspectos';
import MotorRecomendaciones from './components/MotorRecomendaciones';
import NetworkScouting from './components/NetworkScouting';
import InteligenciaCompetitiva from './components/InteligenciaCompetitiva';
import AlertasMercado from './components/AlertasMercado';
import ValoracionAutomatizada from './components/ValoracionAutomatizada';
import IntegracionTransfermarkt from './components/IntegracionTransfermarkt';
import ReportsColaborativos from './components/ReportsColaborativos';
import PrediccionValor from './components/PrediccionValor';

const ListadoJugadoresPage: React.FC = () => {
  // Implementar lógicas de estado, filtros y búsqueda aquí
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
                <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Plataforma de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Scouting</span> Profesional
              </h1>
            </div>

            <p className="text-lg md:text-xl text-blue-100 max-w-3xl leading-relaxed mb-6">
              Descubre y evalúa talentos con tecnología de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">última generación</span>
            </p>

            {/* Indicadores pills */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Target className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">248 Prospectos Activos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">15 Alertas Nuevas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-5 h-5 text-purple-300" />
                <span className="text-sm font-semibold text-white">IA Avanzada</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sección de filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Filtros Avanzados</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Posición"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
              <input
                type="number"
                placeholder="Edad"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
              <input
                type="text"
                placeholder="Club Actual"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
              <input
                type="text"
                placeholder="Nacionalidad"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              Aplicar Filtros
            </motion.button>
          </div>
        </motion.div>

        {/* Sección de búsqueda avanzada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Búsqueda Avanzada</h2>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Buscar por características específicas..."
                className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                Buscar
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Listado de tarjetas de prospectos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            Prospectos Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <TarjetasProspectos />
            {/* Más TarjetasProspectos se renderizarían aquí dinámicamente */}
          </div>
        </div>

        {/* Sección de Herramientas de Scouting Avanzado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              Herramientas de Scouting Avanzado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MotorRecomendaciones />
              <NetworkScouting />
              <InteligenciaCompetitiva />
              <AlertasMercado />
              <ValoracionAutomatizada />
              <IntegracionTransfermarkt />
              <ReportsColaborativos />
              <PrediccionValor />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ListadoJugadoresPage;
