import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dumbbell, Calendar, BookOpen, Trophy, Users, TrendingUp,
  Plus, Filter, Search, Clock, Heart, Target, Zap,
  ChevronLeft, ChevronRight, Star, Share2, Printer, MessageCircle
} from 'lucide-react';
import {
  getMockWod,
  getAllMockWods,
  getBenchmarkWods,
  getResultsByWodId,
  getCommentsByWodId,
  getWodStats,
  type Wod,
  type WodType,
} from './wodDiaApi';

// Componente de WOD Display Grande
const WodDisplay: React.FC<{ wod: Wod; onEdit?: () => void }> = ({ wod, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'rx' | 'scaled' | 'beginner'>('rx');
  const stats = getWodStats(wod.id);
  const results = getResultsByWodId(wod.id);

  const getTypeColor = (type: WodType) => {
    const colors: Record<WodType, string> = {
      'AMRAP': 'from-blue-500 to-cyan-500',
      'For Time': 'from-orange-500 to-red-500',
      'EMOM': 'from-purple-500 to-pink-500',
      'Chipper': 'from-green-500 to-teal-500',
      'Strength': 'from-gray-700 to-gray-900',
      'Hero WOD': 'from-red-700 to-red-900',
      'Girl WOD': 'from-pink-500 to-rose-500',
    };
    return colors[type] || 'from-gray-500 to-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 relative"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-red-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con fecha */}
        <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider">WOD del Día</p>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <Share2 className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <Printer className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{formatDate(wod.date)}</h2>
        </div>

        {/* Contenido principal */}
        <div className="p-8">
          {/* Nombre y Tipo */}
          <div className="flex items-center gap-4 mb-6">
            {wod.name && (
              <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                {wod.name}
              </h3>
            )}
            <div className={`px-4 py-2 bg-gradient-to-r ${getTypeColor(wod.type)} rounded-full shadow-lg`}>
              <span className="text-sm font-bold text-white uppercase tracking-wide">{wod.type}</span>
            </div>
            {wod.isBenchmark && (
              <div className="px-3 py-1 bg-yellow-100 rounded-full border border-yellow-300">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="text-xs font-bold text-yellow-700">BENCHMARK</span>
                </div>
              </div>
            )}
          </div>

          {/* Hero Story (para Hero WODs) */}
          {wod.heroStory && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
              <p className="text-sm font-medium text-red-800 italic">{wod.heroStory}</p>
            </div>
          )}

          {/* Descripción del Workout */}
          <div className="mb-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200">
            <pre className="text-lg font-bold text-gray-900 whitespace-pre-wrap font-sans leading-relaxed">
              {wod.description}
            </pre>
          </div>

          {/* Stimulus */}
          {wod.stimulus && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500 rounded-xl">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-blue-900 mb-1 uppercase tracking-wide">Objetivo/Stimulus</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">{wod.stimulus}</p>
                </div>
              </div>
            </div>
          )}

          {/* Métricas clave */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {wod.estimatedDuration && (
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-purple-700 uppercase">Duración</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{wod.estimatedDuration} min</p>
              </div>
            )}
            {wod.timeCap && (
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-bold text-orange-700 uppercase">Time Cap</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">{wod.timeCap} min</p>
              </div>
            )}
            {wod.targetHeartRate && (
              <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold text-red-700 uppercase">FC Target</span>
                </div>
                <p className="text-2xl font-bold text-red-900">{wod.targetHeartRate.min}-{wod.targetHeartRate.max}%</p>
              </div>
            )}
          </div>

          {/* Tabs de Escalamientos */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              {(['rx', 'scaled', 'beginner'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveTab(level)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${
                    activeTab === level
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level === 'rx' ? 'RX' : level === 'scaled' ? 'Scaled' : 'Beginner'}
                </button>
              ))}
            </div>
            <div className="p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-md">
              <pre className="text-base font-semibold text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
                {wod.scaling[activeTab]}
              </pre>
            </div>
          </div>

          {/* Video demo */}
          {wod.media?.videoUrl && (
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Video Demo</h4>
              <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden">
                <iframe
                  src={wod.media.videoUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allowFullScreen
                  title="WOD Demo Video"
                />
              </div>
            </div>
          )}

          {/* Notas del Coach */}
          {wod.coachNotes && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Notas del Coach
              </h4>

              {wod.coachNotes.warmup && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <h5 className="text-sm font-bold text-green-900 mb-2 uppercase">🔥 Calentamiento</h5>
                  <p className="text-sm text-green-800">{wod.coachNotes.warmup}</p>
                </div>
              )}

              {wod.coachNotes.strategy && wod.coachNotes.strategy.length > 0 && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                  <h5 className="text-sm font-bold text-blue-900 mb-2 uppercase">🎯 Estrategia</h5>
                  <ul className="space-y-1">
                    {wod.coachNotes.strategy.map((tip, i) => (
                      <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wod.coachNotes.technicalFocus && wod.coachNotes.technicalFocus.length > 0 && (
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <h5 className="text-sm font-bold text-purple-900 mb-2 uppercase">⚡ Puntos de Enfoque Técnico</h5>
                  <ul className="space-y-1">
                    {wod.coachNotes.technicalFocus.map((focus, i) => (
                      <li key={i} className="text-sm text-purple-800 flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span>{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wod.coachNotes.cooldown && (
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200">
                  <h5 className="text-sm font-bold text-indigo-900 mb-2 uppercase">❄️ Cool Down</h5>
                  <p className="text-sm text-indigo-800">{wod.coachNotes.cooldown}</p>
                </div>
              )}
            </div>
          )}

          {/* Estadísticas */}
          {stats.completedBy > 0 && (
            <div className="mt-6 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-slate-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Estadísticas del WOD</h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Completado por</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">RX</p>
                  <p className="text-2xl font-bold text-green-600">{stats.rxPercentage.toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Scaled</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.scaledPercentage.toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Beginner</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.beginnerPercentage.toFixed(0)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Componente de Leaderboard
const Leaderboard: React.FC<{ wodId: string }> = ({ wodId }) => {
  const results = getResultsByWodId(wodId);
  const rxResults = results.filter(r => r.scalingUsed === 'RX').slice(0, 5);
  const scaledResults = results.filter(r => r.scalingUsed === 'Scaled').slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Leaderboard</h3>
        </div>

        {/* RX Leaderboard */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Top RX</h4>
          <div className="space-y-2">
            {rxResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400'
                    : index === 1
                    ? 'bg-gradient-to-r from-gray-100 to-slate-100 border-2 border-gray-300'
                    : index === 2
                    ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0
                    ? 'bg-yellow-500 text-white'
                    : index === 1
                    ? 'bg-gray-400 text-white'
                    : index === 2
                    ? 'bg-orange-400 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{result.userName}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{result.result}</p>
                  {result.validatedByCoach && (
                    <p className="text-xs text-green-600 font-semibold">✓ Validado</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scaled Leaderboard */}
        {scaledResults.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Top Scaled</h4>
            <div className="space-y-2">
              {scaledResults.map((result, index) => (
                <div
                  key={result.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{result.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{result.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA para registrar resultado */}
        <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Registrar Mi Resultado</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
};

// Componente de Comentarios
const Comments: React.FC<{ wodId: string }> = ({ wodId }) => {
  const comments = getCommentsByWodId(wodId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Comentarios</h3>
        </div>

        <div className="space-y-4 mb-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
                  {comment.userAvatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-1">{comment.userName}</p>
                  <p className="text-sm text-gray-700 mb-2">{comment.comment}</p>
                  <div className="flex items-center gap-2">
                    {Object.entries(comment.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        className="px-3 py-1 bg-white rounded-full border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                      >
                        <span className="text-sm">
                          {emoji} {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agregar comentario */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <textarea
            placeholder="Comparte tu experiencia con este WOD..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none bg-white"
            rows={3}
          />
          <button className="mt-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all">
            Comentar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Calendario Mini
const MiniCalendar: React.FC<{ wods: Wod[]; onSelectWod: (wod: Wod) => void }> = ({ wods, onSelectWod }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const wodsByDate = wods.reduce((acc, wod) => {
    const dateKey = wod.date.split('T')[0];
    acc[dateKey] = wod;
    return acc;
  }, {} as Record<string, Wod>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Calendario WODs</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {wods.length} WODs programados este mes
      </p>
      <div className="grid grid-cols-7 gap-2">
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
            {day}
          </div>
        ))}
        {/* Aquí irían los días del calendario */}
      </div>
    </motion.div>
  );
};

// Biblioteca de Benchmarks
const BenchmarkLibrary: React.FC<{ onSelect: (wod: Wod) => void }> = ({ onSelect }) => {
  const benchmarks = getBenchmarkWods();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
          <Star className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Benchmark WODs</h3>
      </div>

      <div className="space-y-3">
        {benchmarks.map((wod, index) => (
          <motion.button
            key={wod.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(wod)}
            className="w-full p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-indigo-50 hover:to-purple-50 rounded-2xl border border-gray-200 hover:border-indigo-300 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {wod.name}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    wod.benchmarkType === 'Girl'
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {wod.benchmarkType}
                  </span>
                </div>
                {wod.lastPerformed && (
                  <p className="text-xs text-gray-500">
                    Último: {new Date(wod.lastPerformed).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Trophy className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Componente Principal
const WodDiaPage: React.FC = () => {
  const [selectedWod, setSelectedWod] = useState<Wod | null>(null);
  const [view, setView] = useState<'today' | 'calendar' | 'library' | 'create'>('today');
  const allWods = getAllMockWods();

  React.useEffect(() => {
    setSelectedWod(getMockWod());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
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
              <Dumbbell className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              WOD del <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Día</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed mb-6">
            Workout of the Day - <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">Entrena con propósito</span>
          </p>

          {/* Navegación */}
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'today', label: 'WOD del Día', icon: Dumbbell },
              { id: 'calendar', label: 'Calendario', icon: Calendar },
              { id: 'library', label: 'Biblioteca', icon: BookOpen },
              { id: 'create', label: 'Crear WOD', icon: Plus },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  view === item.id
                    ? 'bg-white text-red-600 shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Vista del WOD del Día */}
      {view === 'today' && selectedWod && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* WOD Display */}
          <div className="lg:col-span-2">
            <WodDisplay wod={selectedWod} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Leaderboard wodId={selectedWod.id} />
            <Comments wodId={selectedWod.id} />
          </div>
        </div>
      )}

      {/* Vista de Biblioteca */}
      {view === 'library' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedWod && <WodDisplay wod={selectedWod} />}
          </div>
          <div>
            <BenchmarkLibrary onSelect={setSelectedWod} />
          </div>
        </div>
      )}

      {/* Placeholder para otras vistas */}
      {view === 'calendar' && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Vista de calendario en desarrollo</p>
        </div>
      )}

      {view === 'create' && (
        <div className="text-center py-12">
          <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Formulario de creación en desarrollo</p>
        </div>
      )}
    </div>
  );
};

export default WodDiaPage;
