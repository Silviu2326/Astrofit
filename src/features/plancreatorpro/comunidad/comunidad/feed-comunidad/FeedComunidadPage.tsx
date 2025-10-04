import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, TrendingUp, UserPlus, Image, Video, BarChart3, Hash } from 'lucide-react';
import CrearPost from './components/CrearPost';
import TimelinePosts from './components/TimelinePosts';

const FeedComunidadPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all'); // 'all', 'text', 'image', 'video', 'poll'
  const [activeTab, setActiveTab] = useState<string>('para-ti'); // 'para-ti', 'siguiendo', 'trending', 'recientes'

  // Estadísticas rápidas (mockeadas)
  const stats = [
    {
      title: 'Miembros Activos',
      value: '2,847',
      change: '+12.5',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      progress: 75
    },
    {
      title: 'Posts Hoy',
      value: '143',
      change: '+8.3',
      icon: MessageCircle,
      gradient: 'from-purple-500 to-pink-600',
      progress: 60
    },
    {
      title: 'Engagement Rate',
      value: '87%',
      change: '+5.2',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-600',
      progress: 87
    },
    {
      title: 'Nuevos Miembros',
      value: '124',
      change: '+15.7',
      icon: UserPlus,
      gradient: 'from-emerald-500 to-teal-600',
      progress: 65
    }
  ];

  // Sugerencias de personas a seguir
  const suggestedUsers = [
    { id: '1', name: 'Ana López', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Nutricionista' },
    { id: '2', name: 'Carlos Ruiz', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Entrenador' },
    { id: '3', name: 'Laura Díaz', avatar: 'https://i.pravatar.cc/150?img=3', role: 'Atleta' }
  ];

  // Grupos populares
  const popularGroups = [
    { id: '1', name: 'Rutinas de Fuerza', members: 1234, icon: '💪' },
    { id: '2', name: 'Nutrición Deportiva', members: 987, icon: '🥗' },
    { id: '3', name: 'Cardio & Running', members: 756, icon: '🏃' }
  ];

  // Trending topics
  const trendingTopics = [
    { tag: '#TransformaciónFitness', posts: 342 },
    { tag: '#RutinaSemanal', posts: 289 },
    { tag: '#DietaBalanceada', posts: 234 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Feed de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Comunidad</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-rose-100 max-w-3xl leading-relaxed">
            Conecta, comparte e inspira a la comunidad fitness
          </p>
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

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
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs semana anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Layout principal: Feed + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feed principal */}
        <div className="lg:col-span-8">
          {/* Tabs de filtros */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 mb-6 border border-white/50"
          >
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'para-ti', label: 'Para Ti', icon: '✨' },
                { id: 'siguiendo', label: 'Siguiendo', icon: '👥' },
                { id: 'trending', label: 'Trending', icon: '🔥' },
                { id: 'recientes', label: 'Recientes', icon: '⏰' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Filtros de contenido */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-4 mb-6 border border-white/50"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">Filtrar por:</span>
              {[
                { value: 'all', label: 'Todos', icon: '📋' },
                { value: 'image', label: 'Imágenes', icon: '🖼️' },
                { value: 'video', label: 'Videos', icon: '🎥' },
                { value: 'poll', label: 'Encuestas', icon: '📊' }
              ].map(filterOpt => (
                <button
                  key={filterOpt.value}
                  onClick={() => setFilter(filterOpt.value)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    filter === filterOpt.value
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:shadow-md border border-gray-200'
                  }`}
                >
                  <span className="mr-1">{filterOpt.icon}</span>
                  {filterOpt.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Crear Post */}
          <CrearPost />

          {/* Timeline de Posts */}
          <TimelinePosts filter={filter} />
        </div>

        {/* Sidebar derecho */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sugerencias de personas a seguir */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-pink-600" />
                Personas a Seguir
              </h3>
              <div className="space-y-3">
                {suggestedUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-300 group">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                      Seguir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grupos populares */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Grupos Populares
              </h3>
              <div className="space-y-3">
                {popularGroups.map(group => (
                  <div key={group.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl shadow-md">
                      {group.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{group.name}</p>
                      <p className="text-sm text-gray-500">{group.members.toLocaleString()} miembros</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                      Unirse
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trending topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-rose-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Hash className="w-6 h-6 text-rose-600" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-3 rounded-2xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 transition-all duration-300 group"
                  >
                    <p className="font-bold text-pink-600 group-hover:text-pink-700">{topic.tag}</p>
                    <p className="text-sm text-gray-500">{topic.posts.toLocaleString()} posts</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeedComunidadPage;
