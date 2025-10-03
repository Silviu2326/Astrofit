import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Zap, Award, BarChart3, Clock, CheckCircle } from 'lucide-react';
import ModeloPredictivo from './components/ModeloPredictivo';
import SimuladorEscenariosIA from './components/SimuladorEscenariosIA';
import AnalisisFactoresExternos from './components/AnalisisFactoresExternos';
import RecomendacionesApuestas from './components/RecomendacionesApuestas';
import PrediccionesGranulares from './components/PrediccionesGranulares';
import AnalisisMomentum from './components/AnalisisMomentum';
import IntegracionMercados from './components/IntegracionMercados';
import TrackingPrecision from './components/TrackingPrecision';
import AlertasOportunidades from './components/AlertasOportunidades';
import { usePrediction } from './proyeccionPartidoApi';

const ProyeccionPartidoPage: React.FC = () => {
  // Ejemplo de uso del hook de la API
  const { data: predictionData, isLoading, error } = usePrediction('equipoA', 'equipoB');

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-700 font-semibold">Cargando predicción...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/30 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200 max-w-md">
        <p className="text-red-600 font-semibold text-center">Error al cargar la predicción: {error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/30 pb-12">
      {/* Hero Section con gradiente orange-red-pink */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Target className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Proyección de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Partido</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Predicción inteligente con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">IA avanzada</span> y análisis profundo
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Predicción en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">IA de Alta Precisión</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Panel de Predicción de Resultados con Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              Predicción del Próximo Partido
            </h2>

            {predictionData ? (
              <div>
                {/* Encabezado del partido con efecto glow */}
                <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-5 rounded-2xl"></div>
                  <p className="text-xl font-bold text-gray-800 text-center relative z-10">
                    <span className="text-orange-600">{predictionData.equipoLocal}</span> vs{' '}
                    <span className="text-pink-600">{predictionData.equipoVisitante}</span>
                  </p>
                </div>

                {/* Progress bars de probabilidades */}
                <div className="space-y-5">
                  {/* Victoria Local */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Victoria Local</span>
                      <span className="text-2xl font-bold text-green-600">{Math.round(predictionData.probabilidadVictoriaLocal * 100)}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${predictionData.probabilidadVictoriaLocal * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Empate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Empate</span>
                      <span className="text-2xl font-bold text-yellow-600">{Math.round(predictionData.probabilidadEmpate * 100)}%</span>
                    </div>
                    <div className="w-full bg-yellow-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${predictionData.probabilidadEmpate * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Victoria Visitante */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Victoria Visitante</span>
                      <span className="text-2xl font-bold text-red-600">{Math.round(predictionData.probabilidadVictoriaVisitante * 100)}%</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${predictionData.probabilidadVictoriaVisitante * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Resultado más probable con efecto glow */}
                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  <p className="text-lg font-semibold text-white relative z-10 text-center">
                    Resultado más probable:
                  </p>
                  <p className="text-3xl font-bold text-yellow-300 relative z-10 text-center mt-2">
                    {predictionData.resultadoMasProbable}
                  </p>
                  {/* Badge de confianza */}
                  <div className="flex justify-center mt-4">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-sm font-semibold text-white flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Alta Confianza
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No hay datos de predicción disponibles.</p>
            )}
          </div>
        </motion.div>

        {/* Componente del Modelo Predictivo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <ModeloPredictivo />
        </motion.div>
      </div>

      {/* Sección de Métricas Clave - Grid de estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-6xl mx-auto mt-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-orange-500" />
          Métricas Clave que Influyen en la Predicción
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, title: 'Rendimiento Histórico', desc: 'En casa y fuera', color: 'from-blue-500 to-indigo-600' },
            { icon: Clock, title: 'Forma Reciente', desc: 'Últimos 5 partidos', color: 'from-green-500 to-emerald-600' },
            { icon: Target, title: 'Enfrentamientos Directos', desc: 'Historial previo', color: 'from-purple-500 to-pink-600' },
            { icon: Award, title: 'Goles', desc: 'Marcados y recibidos', color: 'from-orange-500 to-red-600' },
            { icon: CheckCircle, title: 'Lesiones y Suspensiones', desc: 'Jugadores clave', color: 'from-yellow-500 to-orange-600' },
            { icon: Zap, title: 'Factores Externos', desc: 'Clima, hora, presión', color: 'from-cyan-500 to-blue-600' }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="w-7 h-7" />
                </div>

                {/* Título */}
                <p className="text-lg font-bold text-gray-800 mb-1">
                  {metric.title}
                </p>

                {/* Descripción */}
                <p className="text-sm text-gray-600">
                  {metric.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sección de Escenarios Alternativos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mt-8 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <SimuladorEscenariosIA />
        </div>
      </motion.div>

      {/* Sección de Factores Externos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mt-8 relative overflow-hidden"
      >
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <AnalisisFactoresExternos />
        </div>
      </motion.div>

      {/* Sección de Predicciones Granulares */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mt-8 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <PrediccionesGranulares />
        </div>
      </motion.div>

      {/* Sección de Análisis de Momentum */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mt-8 relative overflow-hidden"
      >
        <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <AnalisisMomentum />
        </div>
      </motion.div>

      {/* Sección de Apuestas y Oportunidades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mt-8 relative overflow-hidden"
      >
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            Mercados de Apuestas y Oportunidades
          </h2>
          <div className="space-y-6">
            <RecomendacionesApuestas />
            <IntegracionMercados />
            <AlertasOportunidades />
          </div>
        </div>
      </motion.div>

      {/* Sección de Tracking de Precisión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mt-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <TrackingPrecision />
        </div>
      </motion.div>
    </div>
  );
};

export default ProyeccionPartidoPage;
