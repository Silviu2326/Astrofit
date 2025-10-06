import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  X,
  User,
  MapPin,
  Repeat,
  AlertCircle,
  CheckCircle,
  Star,
  ArrowUpRight,
  Download,
  Search,
  Settings,
  MoreVertical,
  Trash2,
  Edit2,
  Copy,
  Bell,
  Activity,
  Target,
  Zap,
  Heart,
  Wind,
  Bike,
} from 'lucide-react';

// ============= TIPOS Y CONSTANTES =============

type ClassType = 'CrossFit' | 'Yoga' | 'Spinning' | 'Funcional' | 'Zumba' | 'Pilates' | 'HIIT';
type ClassLevel = 'Principiante' | 'Intermedio' | 'Avanzado';
type ClassStatus = 'Confirmada' | 'Cancelada' | 'Llena';
type ViewMode = 'day' | 'week' | 'month';

interface Coach {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  hasActivePass: boolean;
}

interface ClassEvent {
  id: string;
  name: string;
  type: ClassType;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  coach: Coach;
  capacity: number;
  enrolled: number;
  participants: Participant[];
  waitlist: Participant[];
  level: ClassLevel;
  room: string;
  status: ClassStatus;
  isRecurrent: boolean;
  equipment: string[];
  calories: number;
  allowWaitlist: boolean;
}

const CLASS_COLORS: Record<ClassType, { bg: string; border: string; text: string; gradient: string }> = {
  CrossFit: {
    bg: 'bg-gradient-to-br from-orange-500 to-red-600',
    border: 'border-orange-500',
    text: 'text-orange-600',
    gradient: 'from-orange-500 to-red-600',
  },
  Yoga: {
    bg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
  },
  Spinning: {
    bg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    border: 'border-blue-500',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-600',
  },
  Funcional: {
    bg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    border: 'border-purple-500',
    text: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-600',
  },
  Zumba: {
    bg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    border: 'border-pink-500',
    text: 'text-pink-600',
    gradient: 'from-pink-500 to-rose-600',
  },
  Pilates: {
    bg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    border: 'border-violet-500',
    text: 'text-violet-600',
    gradient: 'from-violet-500 to-purple-600',
  },
  HIIT: {
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    border: 'border-amber-500',
    text: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-600',
  },
};

const CLASS_ICONS: Record<ClassType, typeof Activity> = {
  CrossFit: Target,
  Yoga: Wind,
  Spinning: Bike,
  Funcional: Activity,
  Zumba: Heart,
  Pilates: Wind,
  HIIT: Zap,
};

// ============= DATOS MOCKEADOS =============

const MOCK_COACHES: Coach[] = [
  { id: 'c1', name: 'Ana Martínez', avatar: '🏋️‍♀️', specialty: 'CrossFit', rating: 4.9 },
  { id: 'c2', name: 'Carlos Ruiz', avatar: '🧘‍♂️', specialty: 'Yoga', rating: 4.8 },
  { id: 'c3', name: 'Laura Gómez', avatar: '🚴‍♀️', specialty: 'Spinning', rating: 5.0 },
  { id: 'c4', name: 'Diego Silva', avatar: '💪', specialty: 'Funcional', rating: 4.7 },
  { id: 'c5', name: 'María López', avatar: '💃', specialty: 'Zumba', rating: 4.9 },
  { id: 'c6', name: 'Pedro Sánchez', avatar: '🤸‍♂️', specialty: 'HIIT', rating: 4.8 },
];

const generateMockClasses = (): ClassEvent[] => {
  const classes: ClassEvent[] = [];
  const today = new Date();
  const classTypes: ClassType[] = ['CrossFit', 'Yoga', 'Spinning', 'Funcional', 'Zumba', 'Pilates', 'HIIT'];
  const times = ['06:00', '07:00', '08:00', '09:00', '10:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const rooms = ['Sala 1', 'Sala 2', 'Área Funcional', 'Sala Principal'];
  const levels: ClassLevel[] = ['Principiante', 'Intermedio', 'Avanzado'];

  // Generar 40 clases distribuidas en el mes
  for (let i = 0; i < 40; i++) {
    const dayOffset = Math.floor(Math.random() * 30) - 15; // -15 a +15 días
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);

    const type = classTypes[Math.floor(Math.random() * classTypes.length)];
    const startTime = times[Math.floor(Math.random() * times.length)];
    const duration = [45, 60, 90][Math.floor(Math.random() * 3)];
    const capacity = 15 + Math.floor(Math.random() * 20); // 15-35
    const enrolled = Math.floor(Math.random() * (capacity + 5)); // Puede estar llena
    const coach = MOCK_COACHES[Math.floor(Math.random() * MOCK_COACHES.length)];

    const participants: Participant[] = Array.from({ length: Math.min(enrolled, capacity) }, (_, idx) => ({
      id: `p${i}-${idx}`,
      name: `Miembro ${idx + 1}`,
      avatar: ['👤', '👥', '🙋‍♀️', '🙋‍♂️'][Math.floor(Math.random() * 4)],
      hasActivePass: Math.random() > 0.1,
    }));

    const waitlistCount = Math.max(0, enrolled - capacity);
    const waitlist: Participant[] = Array.from({ length: waitlistCount }, (_, idx) => ({
      id: `w${i}-${idx}`,
      name: `Espera ${idx + 1}`,
      avatar: '⏳',
      hasActivePass: true,
    }));

    const [hours, minutes] = startTime.split(':').map(Number);
    const endDate = new Date(date);
    endDate.setHours(hours, minutes + duration);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    const status: ClassStatus =
      Math.random() > 0.95 ? 'Cancelada' :
      enrolled >= capacity ? 'Llena' : 'Confirmada';

    classes.push({
      id: `class-${i}`,
      name: `${type} ${levels[Math.floor(Math.random() * 3)]}`,
      type,
      description: `Clase de ${type.toLowerCase()} perfecta para mejorar tu condición física`,
      date,
      startTime,
      endTime,
      duration,
      coach,
      capacity,
      enrolled: Math.min(enrolled, capacity),
      participants,
      waitlist,
      level: levels[Math.floor(Math.random() * 3)],
      room: rooms[Math.floor(Math.random() * rooms.length)],
      status,
      isRecurrent: Math.random() > 0.6,
      equipment: ['Colchoneta', 'Pesas', 'Banda elástica'].slice(0, Math.floor(Math.random() * 3) + 1),
      calories: 300 + Math.floor(Math.random() * 400),
      allowWaitlist: true,
    });
  }

  return classes.sort((a, b) => a.date.getTime() - b.date.getTime());
};

// ============= COMPONENTE PRINCIPAL =============

const CalendarioClasesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<ClassEvent | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<ClassType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const classes = useMemo(() => generateMockClasses(), []);

  // Estadísticas
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const todayClasses = classes.filter(c => {
      const classDate = new Date(c.date);
      classDate.setHours(0, 0, 0, 0);
      return classDate.getTime() === today.getTime() && c.status !== 'Cancelada';
    });

    const weekClasses = classes.filter(c => {
      const classDate = new Date(c.date);
      return classDate >= weekStart && classDate < weekEnd && c.status !== 'Cancelada';
    });

    const todayReservations = todayClasses.reduce((sum, c) => sum + c.enrolled, 0);
    const avgCapacity = classes.filter(c => c.status !== 'Cancelada').length > 0
      ? (classes.filter(c => c.status !== 'Cancelada').reduce((sum, c) => sum + (c.enrolled / c.capacity) * 100, 0) / classes.filter(c => c.status !== 'Cancelada').length)
      : 0;

    return {
      todayClasses: todayClasses.length,
      weekClasses: weekClasses.length,
      todayReservations,
      avgCapacity: Math.round(avgCapacity),
    };
  }, [classes]);

  // Filtrar clases
  const filteredClasses = useMemo(() => {
    return classes.filter(c => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(c.type)) return false;
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !c.coach.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [classes, selectedTypes, searchQuery]);

  // Navegación de fechas
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 p-6">
      <div className="max-w-[1600px] mx-auto">

        {/* ===== HERO SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
                <Calendar className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Calendario de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Clases</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
              Organiza y gestiona tu horario de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">clases grupales</span>
            </p>
          </div>
        </motion.div>

        {/* ===== ESTADÍSTICAS RÁPIDAS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Calendar,
              title: 'Clases Hoy',
              value: stats.todayClasses,
              change: '+8%',
              color: 'from-blue-500 to-cyan-600',
            },
            {
              icon: Clock,
              title: 'Esta Semana',
              value: stats.weekClasses,
              change: '+12%',
              color: 'from-purple-500 to-indigo-600',
            },
            {
              icon: Users,
              title: 'Reservas Hoy',
              value: stats.todayReservations,
              change: '+15%',
              color: 'from-emerald-500 to-teal-600',
            },
            {
              icon: TrendingUp,
              title: 'Capacidad Ocupada',
              value: `${stats.avgCapacity}%`,
              change: '+5%',
              color: 'from-orange-500 to-red-600',
            },
          ].map((stat, index) => (
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
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.title}
                </p>

                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.value}
                </p>

                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== BARRA DE HERRAMIENTAS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">

            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar clases o coaches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Filtros y acciones */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  showFilters || selectedTypes.length > 0
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                    : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filtros
                {selectedTypes.length > 0 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {selectedTypes.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nueva Clase
              </button>

              <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Panel de filtros expandible */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  Tipo de Clase
                </p>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(CLASS_COLORS) as ClassType[]).map((type) => {
                    const isSelected = selectedTypes.includes(type);
                    const Icon = CLASS_ICONS[type];
                    return (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedTypes(prev =>
                            isSelected
                              ? prev.filter(t => t !== type)
                              : [...prev, type]
                          );
                        }}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                          isSelected
                            ? `bg-gradient-to-r ${CLASS_COLORS[type].gradient} text-white shadow-lg scale-105`
                            : `border-2 ${CLASS_COLORS[type].border} ${CLASS_COLORS[type].text} hover:bg-opacity-10`
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {type}
                      </button>
                    );
                  })}
                  {selectedTypes.length > 0 && (
                    <button
                      onClick={() => setSelectedTypes([])}
                      className="px-4 py-2 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Limpiar
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===== NAVEGACIÓN Y VISTAS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

            {/* Navegación de fecha */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <div className="px-6 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <span className="text-lg font-bold text-gray-900">
                  {currentDate.toLocaleDateString('es-ES', {
                    month: 'long',
                    year: 'numeric',
                    ...(viewMode === 'day' && { day: 'numeric' }),
                  })}
                </span>
              </div>

              <button
                onClick={() => navigateDate('next')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={goToToday}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Hoy
              </button>
            </div>

            {/* Selector de vista */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {[
                { mode: 'day' as ViewMode, label: 'Día', icon: Calendar },
                { mode: 'week' as ViewMode, label: 'Semana', icon: Calendar },
                { mode: 'month' as ViewMode, label: 'Mes', icon: Calendar },
              ].map(({ mode, label, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    viewMode === mode
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ===== VISTA DE CALENDARIO ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
        >
          {viewMode === 'day' && (
            <DayView
              date={currentDate}
              classes={filteredClasses}
              onSelectClass={setSelectedClass}
            />
          )}
          {viewMode === 'week' && (
            <WeekView
              date={currentDate}
              classes={filteredClasses}
              onSelectClass={setSelectedClass}
            />
          )}
          {viewMode === 'month' && (
            <MonthView
              date={currentDate}
              classes={filteredClasses}
              onSelectClass={setSelectedClass}
            />
          )}
        </motion.div>

        {/* ===== LEYENDA DE COLORES ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <p className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
            Tipos de Clase
          </p>
          <div className="flex flex-wrap gap-4">
            {(Object.keys(CLASS_COLORS) as ClassType[]).map((type) => {
              const Icon = CLASS_ICONS[type];
              return (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${CLASS_COLORS[type].gradient}`}></div>
                  <Icon className={`w-4 h-4 ${CLASS_COLORS[type].text}`} />
                  <span className="text-sm font-medium text-gray-700">{type}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* ===== MODAL DE DETALLES DE CLASE ===== */}
      <AnimatePresence>
        {selectedClass && (
          <ClassDetailsModal
            classEvent={selectedClass}
            onClose={() => setSelectedClass(null)}
          />
        )}
      </AnimatePresence>

      {/* ===== MODAL DE CREAR/EDITAR CLASE ===== */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateClassModal
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============= COMPONENTES DE VISTAS =============

interface ViewProps {
  date: Date;
  classes: ClassEvent[];
  onSelectClass: (classEvent: ClassEvent) => void;
}

const DayView: React.FC<ViewProps> = ({ date, classes, onSelectClass }) => {
  const hours = Array.from({ length: 17 }, (_, i) => i + 6); // 6 AM - 10 PM

  const dayClasses = classes.filter(c => {
    const classDate = new Date(c.date);
    return (
      classDate.getDate() === date.getDate() &&
      classDate.getMonth() === date.getMonth() &&
      classDate.getFullYear() === date.getFullYear()
    );
  });

  return (
    <div className="relative">
      <div className="flex">
        {/* Timeline */}
        <div className="w-20 flex-shrink-0">
          {hours.map(hour => (
            <div key={hour} className="h-24 border-b border-gray-200 flex items-start justify-end pr-3 pt-1">
              <span className="text-xs font-semibold text-gray-500">
                {hour.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* Classes */}
        <div className="flex-1 relative">
          {hours.map(hour => (
            <div key={hour} className="h-24 border-b border-gray-200"></div>
          ))}

          {/* Render classes */}
          {dayClasses.map((classEvent) => {
            const [hours, minutes] = classEvent.startTime.split(':').map(Number);
            const startMinutes = (hours - 6) * 60 + minutes;
            const top = (startMinutes / 60) * 96; // 96px per hour (h-24)
            const height = (classEvent.duration / 60) * 96;

            return (
              <ClassBlock
                key={classEvent.id}
                classEvent={classEvent}
                style={{ position: 'absolute', top: `${top}px`, height: `${height}px`, left: 0, right: 0 }}
                onClick={() => onSelectClass(classEvent)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WeekView: React.FC<ViewProps> = ({ date, classes, onSelectClass }) => {
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-4 min-w-[900px]">
        {days.map((day, index) => {
          const dayClasses = classes.filter(c => {
            const classDate = new Date(c.date);
            return (
              classDate.getDate() === day.getDate() &&
              classDate.getMonth() === day.getMonth() &&
              classDate.getFullYear() === day.getFullYear()
            );
          });

          const isToday = new Date().toDateString() === day.toDateString();

          return (
            <div key={index} className="min-h-[400px]">
              <div className={`text-center p-3 rounded-xl mb-3 ${
                isToday
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <p className="text-xs font-bold uppercase tracking-wide">
                  {day.toLocaleDateString('es-ES', { weekday: 'short' })}
                </p>
                <p className="text-2xl font-bold mt-1">
                  {day.getDate()}
                </p>
              </div>

              <div className="space-y-2">
                {dayClasses.map(classEvent => (
                  <ClassBlock
                    key={classEvent.id}
                    classEvent={classEvent}
                    compact
                    onClick={() => onSelectClass(classEvent)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MonthView: React.FC<ViewProps> = ({ date, classes, onSelectClass }) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const days = [];
  let currentDate = new Date(startDate);
  while (days.length < 42) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <div>
      {/* Days header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="text-center font-bold text-sm text-gray-600 uppercase tracking-wide py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dayClasses = classes.filter(c => {
            const classDate = new Date(c.date);
            return (
              classDate.getDate() === day.getDate() &&
              classDate.getMonth() === day.getMonth() &&
              classDate.getFullYear() === day.getFullYear()
            );
          });

          const isCurrentMonth = day.getMonth() === month;
          const isToday = new Date().toDateString() === day.toDateString();

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 rounded-xl border-2 transition-all duration-300 ${
                isCurrentMonth
                  ? isToday
                    ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-400'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className={`text-sm font-bold mb-1 ${
                isToday
                  ? 'text-blue-600'
                  : isCurrentMonth
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}>
                {day.getDate()}
              </div>

              <div className="space-y-1">
                {dayClasses.slice(0, 3).map((classEvent, idx) => {
                  const Icon = CLASS_ICONS[classEvent.type];
                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectClass(classEvent)}
                      className={`w-full text-left px-2 py-1 rounded-lg text-xs font-semibold ${CLASS_COLORS[classEvent.type].bg} text-white hover:shadow-md transition-all duration-300 flex items-center gap-1`}
                    >
                      <Icon className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{classEvent.startTime}</span>
                    </button>
                  );
                })}
                {dayClasses.length > 3 && (
                  <div className="text-xs text-center font-semibold text-gray-500 mt-1">
                    +{dayClasses.length - 3} más
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============= COMPONENTE BLOQUE DE CLASE =============

interface ClassBlockProps {
  classEvent: ClassEvent;
  onClick: () => void;
  compact?: boolean;
  style?: React.CSSProperties;
}

const ClassBlock: React.FC<ClassBlockProps> = ({ classEvent, onClick, compact = false, style }) => {
  const Icon = CLASS_ICONS[classEvent.type];
  const colors = CLASS_COLORS[classEvent.type];
  const percentage = (classEvent.enrolled / classEvent.capacity) * 100;

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        onClick={onClick}
        className={`w-full text-left p-3 rounded-xl ${colors.bg} text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 translate-x-full transition-all duration-1000"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <Icon className="w-5 h-5" />
            {classEvent.isRecurrent && (
              <Repeat className="w-4 h-4" />
            )}
          </div>

          <p className="font-bold text-sm mb-1 line-clamp-1">{classEvent.name}</p>
          <p className="text-xs opacity-90 mb-2">{classEvent.startTime} - {classEvent.endTime}</p>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 bg-white/20 rounded-full backdrop-blur-sm">
              {classEvent.coach.avatar} {classEvent.coach.name}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold">
              {classEvent.enrolled}/{classEvent.capacity}
            </span>
          </div>

          {classEvent.status === 'Cancelada' && (
            <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <span className="text-white font-bold text-sm">CANCELADA</span>
            </div>
          )}
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      style={style}
      className={`w-full text-left p-4 rounded-xl ${colors.bg} text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden mx-2`}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-6 h-6" />
            <div>
              <p className="font-bold line-clamp-1">{classEvent.name}</p>
              <p className="text-sm opacity-90">{classEvent.startTime} - {classEvent.endTime}</p>
            </div>
          </div>
          {classEvent.isRecurrent && (
            <Repeat className="w-5 h-5" />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm mb-3">
          <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            {classEvent.coach.avatar} {classEvent.coach.name}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            <MapPin className="w-3 h-3 inline mr-1" />
            {classEvent.room}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>{classEvent.enrolled}/{classEvent.capacity}</span>
              <span>{Math.round(percentage)}%</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {classEvent.status === 'Cancelada' && (
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <span className="text-white font-bold">CANCELADA</span>
          </div>
        )}
      </div>
    </motion.button>
  );
};

// ============= MODAL DE DETALLES =============

interface ClassDetailsModalProps {
  classEvent: ClassEvent;
  onClose: () => void;
}

const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ classEvent, onClose }) => {
  const Icon = CLASS_ICONS[classEvent.type];
  const colors = CLASS_COLORS[classEvent.type];
  const percentage = (classEvent.enrolled / classEvent.capacity) * 100;

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
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className={`${colors.bg} p-8 relative overflow-hidden`}>
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{classEvent.name}</h2>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1 bg-white/20 rounded-full backdrop-blur-sm text-white text-sm font-semibold">
                      {classEvent.type}
                    </span>
                    <span className={`px-4 py-1 rounded-full backdrop-blur-sm text-sm font-semibold ${
                      classEvent.status === 'Confirmada'
                        ? 'bg-green-500/20 text-white'
                        : classEvent.status === 'Llena'
                        ? 'bg-orange-500/20 text-white'
                        : 'bg-red-500/20 text-white'
                    }`}>
                      {classEvent.status}
                    </span>
                    {classEvent.isRecurrent && (
                      <span className="px-4 py-1 bg-white/20 rounded-full backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-1">
                        <Repeat className="w-4 h-4" />
                        Recurrente
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                <Clock className="w-5 h-5 text-white mb-1" />
                <p className="text-white/80 text-xs">Horario</p>
                <p className="text-white font-bold">{classEvent.startTime} - {classEvent.endTime}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                <Calendar className="w-5 h-5 text-white mb-1" />
                <p className="text-white/80 text-xs">Fecha</p>
                <p className="text-white font-bold">
                  {classEvent.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                <MapPin className="w-5 h-5 text-white mb-1" />
                <p className="text-white/80 text-xs">Ubicación</p>
                <p className="text-white font-bold">{classEvent.room}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Coach info */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{classEvent.coach.avatar}</div>
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Coach</p>
                  <p className="text-2xl font-bold text-gray-900">{classEvent.coach.name}</p>
                  <p className="text-sm text-gray-600">{classEvent.coach.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(classEvent.coach.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-bold text-gray-700 ml-1">
                      {classEvent.coach.rating}
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                Ver Perfil
              </button>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-600" />
                Detalles de la Clase
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Descripción</p>
                  <p className="text-gray-900">{classEvent.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Nivel</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                      classEvent.level === 'Principiante'
                        ? 'bg-green-100 text-green-700'
                        : classEvent.level === 'Intermedio'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {classEvent.level}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Duración</p>
                    <p className="text-gray-900 font-bold">{classEvent.duration} min</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Equipo Necesario</p>
                  <div className="flex flex-wrap gap-2">
                    {classEvent.equipment.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3">
                  <p className="text-sm font-semibold text-orange-700 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Calorías promedio quemadas
                  </p>
                  <p className="text-2xl font-bold text-orange-600">{classEvent.calories} kcal</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                Capacidad y Reservas
              </h3>

              {/* Progress bar */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">Ocupación</span>
                  <span className="text-sm font-bold text-gray-900">
                    {classEvent.enrolled} / {classEvent.capacity}
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${colors.bg} relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{Math.round(percentage)}% de capacidad</p>
              </div>

              {/* Participants list */}
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Participantes Inscritos ({classEvent.participants.length})
                </p>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {classEvent.participants.slice(0, 5).map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-2 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{participant.avatar}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{participant.name}</p>
                          <p className={`text-xs ${participant.hasActivePass ? 'text-green-600' : 'text-red-600'}`}>
                            {participant.hasActivePass ? 'Pase activo' : 'Sin pase'}
                          </p>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
                {classEvent.participants.length > 5 && (
                  <button className="w-full mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Ver todos los inscritos
                  </button>
                )}
              </div>

              {/* Waitlist */}
              {classEvent.waitlist.length > 0 && (
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm font-bold text-orange-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Lista de Espera ({classEvent.waitlist.length})
                  </p>
                  <div className="space-y-1">
                    {classEvent.waitlist.slice(0, 3).map((participant) => (
                      <div key={participant.id} className="flex items-center gap-2 text-sm">
                        <span>{participant.avatar}</span>
                        <span className="text-gray-700">{participant.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
            <button className={`px-6 py-3 ${colors.bg} text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2`}>
              <Edit2 className="w-5 h-5" />
              Editar Clase
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Copy className="w-5 h-5" />
              Duplicar
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Enviar Recordatorio
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Tomar Asistencia
            </button>
            <button className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 flex items-center gap-2">
              <X className="w-5 h-5" />
              Cancelar Clase
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============= MODAL DE CREAR CLASE =============

interface CreateClassModalProps {
  onClose: () => void;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState<ClassType>('CrossFit');
  const [selectedLevel, setSelectedLevel] = useState<ClassLevel>('Intermedio');

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
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Nueva Clase</h2>
              <p className="text-blue-100">Crea una nueva clase para tu estudio</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-6">

            {/* Tipo de clase */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Tipo de Clase
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(CLASS_COLORS) as ClassType[]).map((type) => {
                  const Icon = CLASS_ICONS[type];
                  const isSelected = selectedType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? `${CLASS_COLORS[type].border} bg-gradient-to-r ${CLASS_COLORS[type].gradient} bg-opacity-10 scale-105 shadow-lg`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-white' : CLASS_COLORS[type].text}`} />
                      <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                        {type}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Nombre de la Clase
              </label>
              <input
                type="text"
                placeholder="Ej: CrossFit WOD Principiantes"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
              />
            </div>

            {/* Nivel */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Nivel
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Principiante', 'Intermedio', 'Avanzado'] as ClassLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-300 ${
                      selectedLevel === level
                        ? level === 'Principiante'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : level === 'Intermedio'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Horario */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Hora Inicio
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Duración (min)
                </label>
                <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none">
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </select>
              </div>
            </div>

            {/* Capacidad y sala */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Capacidad Máxima
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  defaultValue="20"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Sala/Área
                </label>
                <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none">
                  <option>Sala 1</option>
                  <option>Sala 2</option>
                  <option>Área Funcional</option>
                  <option>Sala Principal</option>
                </select>
              </div>
            </div>

            {/* Coach */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Coach Asignado
              </label>
              <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none">
                {MOCK_COACHES.map(coach => (
                  <option key={coach.id} value={coach.id}>
                    {coach.avatar} {coach.name} - {coach.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Descripción
              </label>
              <textarea
                rows={3}
                placeholder="Describe la clase..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none"
              ></textarea>
            </div>

            {/* Recurrencia */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Repeat className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-purple-900">Clase Recurrente</h3>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <span className="text-sm font-semibold text-purple-800">
                  Repetir esta clase automáticamente
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300">
              Crear Clase
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarioClasesPage;
