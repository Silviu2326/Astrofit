import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Search, TrendingUp, Users, Calendar, FileText, AlertCircle, Target } from 'lucide-react';
import { TimelineEvaluaciones } from './components/TimelineEvaluaciones';
import AnalisisTendencias from './components/AnalisisTendencias';
import ComparadorEvolucion from './components/ComparadorEvolucion';
import AlertasDesarrollo from './components/AlertasDesarrollo';
import CorrelacionScouts from './components/CorrelacionScouts';
import PrediccionTransferencias from './components/PrediccionTransferencias';
import EfectividadScouts from './components/EfectividadScouts';
import EarlyWarning from './components/EarlyWarning';
import RecomendacionesOfertas from './components/RecomendacionesOfertas';

const HistorialScoutingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScout, setFilterScout] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');

  // Placeholder data for demonstration
  const playerData = {
    id: '1',
    name: 'Jugador Ejemplo',
    position: 'Delantero',
    age: 21,
    club: 'FC Barcelona B',
    evaluations: [
      { id: 'e1', date: '2023-01-15', scout: 'Scout A', rating: 7.5, notes: 'Buen rendimiento inicial.' },
      { id: 'e2', date: '2023-03-20', scout: 'Scout B', rating: 8.0, notes: 'Mejora en pases.' },
      { id: 'e3', date: '2023-06-01', scout: 'Scout A', rating: 7.8, notes: 'Lesión menor, recuperación en curso.' },
      { id: 'e4', date: '2023-09-10', scout: 'Scout C', rating: 8.5, notes: 'Debut profesional, gran potencial.' },
    ],
    events: [
      { id: 'ev1', date: '2023-09-10', type: 'Debut', description: 'Debut profesional en liga.' },
      { id: 'ev2', date: '2023-05-15', type: 'Lesión', description: 'Esguince de tobillo.' },
    ],
  };

  const scouts = ['Scout A', 'Scout B', 'Scout C'];
  const ratingEvolution = [7.5, 8.0, 7.8, 8.5];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <History className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Historial de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Scouting</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Seguimiento longitudinal completo de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">{playerData.name}</span>
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{playerData.position}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">{playerData.club}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">{playerData.age} años</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-pink-300" />
              <span className="text-sm font-semibold text-white">{playerData.evaluations.length} evaluaciones</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros de búsqueda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-600" />
            Filtros de Búsqueda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda por texto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar en notas</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                placeholder="Escribe para buscar..."
              />
            </div>

            {/* Filtro por scout */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Evaluador</label>
              <select
                value={filterScout}
                onChange={(e) => setFilterScout(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option value="all">Todos los scouts</option>
                {scouts.map(scout => (
                  <option key={scout} value={scout}>{scout}</option>
                ))}
              </select>
            </div>

            {/* Filtro por fecha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Período</label>
              <select
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option value="all">Todo el período</option>
                <option value="last3months">Últimos 3 meses</option>
                <option value="last6months">Últimos 6 meses</option>
                <option value="lastyear">Último año</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress de evolución de ratings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Evolución de Rating
          </h2>

          <div className="space-y-4">
            {playerData.evaluations.map((evaluation, index) => {
              const progress = (evaluation.rating / 10) * 100;
              const prevRating = index > 0 ? playerData.evaluations[index - 1].rating : evaluation.rating;
              const change = evaluation.rating - prevRating;

              return (
                <div key={evaluation.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                        {new Date(evaluation.date).toLocaleDateString('es-ES')}
                      </div>
                      <div className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                        <span className="text-sm font-bold text-purple-700">{evaluation.scout}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-800">{evaluation.rating}</span>
                      {change !== 0 && (
                        <span className={`text-sm font-bold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change > 0 ? '+' : ''}{change.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full relative ${
                        evaluation.rating >= 8.0 ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500' :
                        evaluation.rating >= 7.0 ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500' :
                        'bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-500'
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Timeline de evaluaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Calendar className="w-6 h-6" />
            </div>
            Seguimiento Longitudinal
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <TimelineEvaluaciones evaluations={playerData.evaluations} events={playerData.events} />
        </div>
      </motion.div>

      {/* Análisis Longitudinal Avanzado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <AlertCircle className="w-6 h-6" />
            </div>
            Análisis Longitudinal Avanzado
          </h3>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <AnalisisTendencias />
          <ComparadorEvolucion />
          <AlertasDesarrollo />
          <CorrelacionScouts />
          <PrediccionTransferencias />
          <EfectividadScouts />
          <EarlyWarning />
          <RecomendacionesOfertas />
        </div>
      </motion.div>

      {/* Reportes adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráficos de Evolución */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Gráficos de Evolución
            </h2>
            <p className="text-gray-600">Aquí se mostrarán los gráficos de evolución de puntuaciones con visualizaciones interactivas.</p>
          </div>
        </motion.div>

        {/* Comparación de Evaluaciones */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-600" />
              Comparación de Evaluaciones
            </h2>
            <p className="text-gray-600">Aquí se podrá comparar evaluaciones entre diferentes scouts y analizar consensos.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HistorialScoutingPage;
