import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown, 
  Award, 
  Target, 
  Zap, 
  Flame,
  TrendingUp,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  Share2,
  ChevronUp,
  ChevronDown,
  BarChart3
} from 'lucide-react';
import Modal from '../../../../../components/ui/modal';

const RankingActividadPage: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState('month');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Mock data para el ranking
  const rankingData = [
    {
      id: 1,
      name: 'FitnessMaster',
      avatar: '🏆',
      points: 15420,
      level: 'Diamante',
      badges: 12,
      posts: 89,
      likes: 1250,
      comments: 456,
      position: 1,
      change: '+3',
      category: 'fitness'
    },
    {
      id: 2,
      name: 'NutritionGuru',
      avatar: '🥗',
      points: 12850,
      level: 'Oro',
      badges: 10,
      posts: 67,
      likes: 980,
      comments: 234,
      position: 2,
      change: '+1',
      category: 'nutrition'
    },
    {
      id: 3,
      name: 'WellnessWarrior',
      avatar: '🧘‍♀️',
      points: 11200,
      level: 'Oro',
      badges: 8,
      posts: 45,
      likes: 756,
      comments: 189,
      position: 3,
      change: '-2',
      category: 'wellness'
    },
    {
      id: 4,
      name: 'TrainerPro',
      avatar: '💪',
      points: 9850,
      level: 'Plata',
      badges: 7,
      posts: 34,
      likes: 654,
      comments: 123,
      position: 4,
      change: '+5',
      category: 'fitness'
    },
    {
      id: 5,
      name: 'HealthyChef',
      avatar: '👨‍🍳',
      points: 8750,
      level: 'Plata',
      badges: 6,
      posts: 28,
      likes: 543,
      comments: 98,
      position: 5,
      change: '+2',
      category: 'nutrition'
    }
  ];

  const periods = [
    { value: 'week', label: 'Esta Semana', icon: Calendar },
    { value: 'month', label: 'Este Mes', icon: TrendingUp },
    { value: 'year', label: 'Este Año', icon: Trophy },
    { value: 'all', label: 'Todo el Tiempo', icon: Crown }
  ];

  const categories = [
    { value: 'all', label: 'Todos', icon: Users },
    { value: 'fitness', label: 'Fitness', icon: Zap },
    { value: 'nutrition', label: 'Nutrición', icon: Heart },
    { value: 'wellness', label: 'Bienestar', icon: Star }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Diamante': return 'from-blue-500 to-cyan-500';
      case 'Oro': return 'from-yellow-500 to-orange-500';
      case 'Plata': return 'from-gray-400 to-gray-600';
      case 'Bronce': return 'from-orange-600 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return Crown;
      case 2: return Trophy;
      case 3: return Medal;
      default: return Award;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-indigo-400 to-indigo-600';
    }
  };

  const filteredData = rankingData.filter(user => 
    activeCategory === 'all' || user.category === activeCategory
  );

  // Funciones para manejar eventos
  const handlePeriodChange = (period: string) => {
    setActivePeriod(period);
    const periodLabel = periods.find(p => p.value === period)?.label || period;
    toast.success(`Filtro cambiado a: ${periodLabel}`, {
      icon: '📅',
      duration: 2000,
    });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const categoryLabel = categories.find(c => c.value === category)?.label || category;
    toast.success(`Categoría cambiada a: ${categoryLabel}`, {
      icon: '🏷️',
      duration: 2000,
    });
  };

  const handleViewProgress = () => {
    setIsProgressModalOpen(true);
    toast.success('Abriendo tu progreso personal...', {
      icon: '📊',
      duration: 2000,
    });
  };

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
    toast.success(`Viendo perfil de ${user.name}`, {
      icon: '👤',
      duration: 2000,
    });
  };

  const handleStatClick = (statType: string, value: number) => {
    toast.success(`${statType}: ${value}`, {
      icon: '📈',
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight text-center">
              Ranking de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Actividad</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed text-center mx-auto">
            Descubre a los usuarios más activos y comprometidos de nuestra comunidad
          </p>

          {/* Estadísticas */}
          <div className="mt-8 flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Competencia Saludable</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-semibold text-white">Actividad Constante</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Reconocimiento</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Filtros de período */}
              <div className="flex gap-2">
                {periods.map((period) => {
                  const IconComponent = period.icon;
                  const isActive = activePeriod === period.value;
                  
                  return (
                    <motion.button
                      key={period.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePeriodChange(period.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 hover:shadow-md'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="font-semibold text-sm">{period.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Filtros de categoría */}
              <div className="flex gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const isActive = activeCategory === category.value;
                  
                  return (
                    <motion.button
                      key={category.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 hover:shadow-md'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="font-semibold text-sm">{category.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          {filteredData.map((user, index) => {
            const PositionIcon = getPositionIcon(user.position);
            
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => handleUserClick(user)}
                className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer ${
                  user.position <= 3 ? 'ring-2 ring-yellow-400/50' : ''
                }`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Decoración de fondo */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6">
                    {/* Posición */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getPositionColor(user.position)} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        {user.position <= 3 ? (
                          <PositionIcon className="w-8 h-8" />
                        ) : (
                          <span className="text-2xl font-bold">{user.position}</span>
                        )}
                      </div>
                    </div>

                    {/* Avatar y nombre */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                        {user.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 bg-gradient-to-r ${getLevelColor(user.level)} text-white text-xs font-bold rounded-full`}>
                            {user.level}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            {user.change.startsWith('+') ? (
                              <ChevronUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={user.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                              {user.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Puntos */}
                    <div className="text-right">
                      <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        {user.points.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">puntos</p>
                    </div>

                    {/* Estadísticas */}
                    <div className="hidden lg:flex gap-6">
                      <div 
                        className="text-center cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatClick('Posts', user.posts);
                        }}
                      >
                        <div className="flex items-center gap-1 text-blue-600 mb-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-semibold">{user.posts}</span>
                        </div>
                        <p className="text-xs text-gray-500">posts</p>
                      </div>
                      <div 
                        className="text-center cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatClick('Likes', user.likes);
                        }}
                      >
                        <div className="flex items-center gap-1 text-red-600 mb-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-semibold">{user.likes}</span>
                        </div>
                        <p className="text-xs text-gray-500">likes</p>
                      </div>
                      <div 
                        className="text-center cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatClick('Comentarios', user.comments);
                        }}
                      >
                        <div className="flex items-center gap-1 text-green-600 mb-1">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm font-semibold">{user.comments}</span>
                        </div>
                        <p className="text-xs text-gray-500">comentarios</p>
                      </div>
                      <div 
                        className="text-center cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatClick('Medallas', user.badges);
                        }}
                      >
                        <div className="flex items-center gap-1 text-yellow-600 mb-1">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-semibold">{user.badges}</span>
                        </div>
                        <p className="text-xs text-gray-500">medallas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mensaje motivacional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-8 h-8 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">¡Sigue Participando!</h3>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada post, like y comentario cuenta. Mantén tu actividad y podrás subir en el ranking. 
              ¡La comunidad te está esperando!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewProgress}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Mi Progreso
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal de Progreso Personal */}
      <Modal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        title="Mi Progreso Personal"
        size="lg"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🏆
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu Progreso</h3>
            <p className="text-gray-600">Aquí puedes ver tu evolución en la comunidad</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">1,250</div>
              <div className="text-sm text-blue-700">Puntos Totales</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">15</div>
              <div className="text-sm text-green-700">Posts Publicados</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">89</div>
              <div className="text-sm text-purple-700">Likes Recibidos</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">3</div>
              <div className="text-sm text-yellow-700">Medallas</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h4 className="font-semibold text-gray-900">Próximo Objetivo</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Publica 5 posts más para alcanzar el nivel Plata
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">3 de 5 posts completados</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsProgressModalOpen(false)}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                setIsProgressModalOpen(false);
                toast.success('Redirigiendo a crear publicación...', { icon: '✍️' });
                // Redirigir a la página de feed de comunidad
                window.location.href = '/feed-comunidad';
              }}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Crear Post
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Perfil de Usuario */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={selectedUser ? `Perfil de ${selectedUser.name}` : 'Perfil de Usuario'}
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                {selectedUser.avatar}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedUser.name}</h3>
              <div className={`inline-block px-4 py-2 bg-gradient-to-r ${getLevelColor(selectedUser.level)} text-white text-sm font-bold rounded-full mb-4`}>
                {selectedUser.level}
              </div>
              <p className="text-gray-600">Miembro activo de la comunidad</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{selectedUser.points.toLocaleString()}</div>
                <div className="text-sm text-blue-700">Puntos Totales</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{selectedUser.posts}</div>
                <div className="text-sm text-green-700">Posts</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{selectedUser.likes}</div>
                <div className="text-sm text-red-700">Likes</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{selectedUser.badges}</div>
                <div className="text-sm text-yellow-700">Medallas</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
                <h4 className="font-semibold text-gray-900">Estadísticas de Actividad</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Comentarios</span>
                  <span className="font-semibold text-gray-900">{selectedUser.comments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cambio de Posición</span>
                  <span className={`font-semibold ${selectedUser.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedUser.change}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Categoría Principal</span>
                  <span className="font-semibold text-gray-900 capitalize">{selectedUser.category}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setIsUserModalOpen(false);
                  toast.success(`Enviando mensaje a ${selectedUser.name}...`, { icon: '💬' });
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RankingActividadPage;
