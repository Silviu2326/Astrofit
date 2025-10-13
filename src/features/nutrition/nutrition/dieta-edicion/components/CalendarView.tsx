import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Users, 
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Plus,
  Filter,
  Grid,
  List,
  Moon
} from 'lucide-react';
import { Recipe, Comida } from '../types';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
  adherence?: number;
  calories?: number;
  macros?: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  notes?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  onAddEvent: (date: Date, type: string) => void;
  className?: string;
}

type ViewMode = 'month' | 'week' | 'day';
type FilterType = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'completed' | 'pending';

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventClick,
  onDateClick,
  onAddEvent,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generar eventos mock para demo
  const mockEvents: CalendarEvent[] = useMemo(() => {
    const events: CalendarEvent[] = [];
    const today = new Date();
    
    for (let i = -7; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Desayuno
      events.push({
        id: `breakfast-${i}`,
        title: 'Avena con frutas',
        date: new Date(date.setHours(8, 0, 0, 0)),
        type: 'breakfast',
        adherence: Math.random() > 0.2 ? 85 + Math.random() * 15 : 60 + Math.random() * 20,
        calories: 350 + Math.random() * 100,
        macros: {
          proteinas: 15 + Math.random() * 10,
          carbohidratos: 45 + Math.random() * 20,
          grasas: 8 + Math.random() * 5
        },
        isCompleted: Math.random() > 0.3,
        isImportant: Math.random() > 0.8
      });

      // Almuerzo
      events.push({
        id: `lunch-${i}`,
        title: 'Ensalada de quinoa',
        date: new Date(date.setHours(13, 0, 0, 0)),
        type: 'lunch',
        adherence: Math.random() > 0.15 ? 80 + Math.random() * 20 : 50 + Math.random() * 30,
        calories: 450 + Math.random() * 150,
        macros: {
          proteinas: 20 + Math.random() * 15,
          carbohidratos: 35 + Math.random() * 25,
          grasas: 12 + Math.random() * 8
        },
        isCompleted: Math.random() > 0.25,
        isImportant: Math.random() > 0.7
      });

      // Cena
      events.push({
        id: `dinner-${i}`,
        title: 'Salmón con verduras',
        date: new Date(date.setHours(20, 0, 0, 0)),
        type: 'dinner',
        adherence: Math.random() > 0.1 ? 75 + Math.random() * 25 : 40 + Math.random() * 40,
        calories: 500 + Math.random() * 200,
        macros: {
          proteinas: 25 + Math.random() * 20,
          carbohidratos: 20 + Math.random() * 15,
          grasas: 15 + Math.random() * 10
        },
        isCompleted: Math.random() > 0.2,
        isImportant: Math.random() > 0.6
      });
    }
    
    return events;
  }, []);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'completed') return event.isCompleted;
      if (activeFilter === 'pending') return !event.isCompleted;
      return event.type === activeFilter;
    });
  }, [mockEvents, activeFilter]);

  const getMonthDays = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentDate]);

  const getWeekDays = useCallback(() => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    
    return days;
  }, [currentDate]);

  const getEventsForDate = useCallback((date: Date) => {
    return filteredEvents.filter(event => {
      return event.date.toDateString() === date.toDateString();
    });
  }, [filteredEvents]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'breakfast': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'lunch': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'dinner': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'snack': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 90) return 'text-green-600';
    if (adherence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const EventCard: React.FC<{ event: CalendarEvent; compact?: boolean }> = ({ 
    event, 
    compact = false 
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onEventClick(event)}
      className={`
        cursor-pointer rounded-lg border-l-4 p-2 mb-1 transition-all duration-200
        ${getEventColor(event.type)}
        ${event.isCompleted ? 'opacity-75' : ''}
        ${event.isImportant ? 'ring-2 ring-orange-300' : ''}
        ${compact ? 'text-xs' : 'text-sm'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{event.title}</div>
          {!compact && (
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                <span className={getAdherenceColor(event.adherence || 0)}>
                  {Math.round(event.adherence || 0)}%
                </span>
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          {event.isCompleted && (
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          )}
          {event.isImportant && (
            <AlertCircle className="w-4 h-4 text-orange-600" />
          )}
        </div>
      </div>
    </motion.div>
  );

  const DayCell: React.FC<{ date: Date; isCurrentMonth: boolean }> = ({ 
    date, 
    isCurrentMonth 
  }) => {
    const dayEvents = getEventsForDate(date);
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = selectedDate?.toDateString() === date.toDateString();

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          setSelectedDate(date);
          onDateClick(date);
        }}
        className={`
          min-h-[120px] p-2 border border-gray-200 cursor-pointer transition-all duration-200
          ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
          ${isToday ? 'bg-blue-50 border-blue-300' : ''}
          ${isSelected ? 'ring-2 ring-blue-500' : ''}
          hover:bg-gray-50
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`
            text-sm font-medium
            ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
            ${isToday ? 'text-blue-600 font-bold' : ''}
          `}>
            {date.getDate()}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddEvent(date, 'meal');
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        
        <div className="space-y-1">
          {dayEvents.slice(0, 3).map(event => (
            <EventCard key={event.id} event={event} compact />
          ))}
          {dayEvents.length > 3 && (
            <div className="text-xs text-gray-500 text-center">
              +{dayEvents.length - 3} más
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const WeekView: React.FC = () => {
    const weekDays = getWeekDays();
    
    return (
      <div className="space-y-4">
        {/* Header de días */}
        <div className="grid grid-cols-7 gap-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((date, index) => (
            <DayCell 
              key={index} 
              date={date} 
              isCurrentMonth={true} 
            />
          ))}
        </div>
      </div>
    );
  };

  const MonthView: React.FC = () => {
    const days = getMonthDays();
    
    return (
      <div className="space-y-4">
        {/* Header de días */}
        <div className="grid grid-cols-7 gap-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grid de días */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => (
            <DayCell 
              key={index} 
              date={date} 
              isCurrentMonth={date.getMonth() === currentDate.getMonth()} 
            />
          ))}
        </div>
      </div>
    );
  };

  const DayView: React.FC = () => {
    const dayEvents = getEventsForDate(currentDate);
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
        </div>
        
        <div className="space-y-2">
          {dayEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con controles */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Calendario Nutricional</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Hoy
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Filtros */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as FilterType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="breakfast">Desayuno</option>
              <option value="lunch">Almuerzo</option>
              <option value="dinner">Cena</option>
              <option value="snack">Snack</option>
              <option value="completed">Completados</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>

          {/* Vista */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('month')}
              className={`p-2 ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`p-2 ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`p-2 ${viewMode === 'day' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(mockEvents.filter(e => e.isCompleted).length / mockEvents.length * 100)}%
              </div>
              <div className="text-sm text-gray-600">Adherencia</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(mockEvents.reduce((sum, e) => sum + (e.adherence || 0), 0) / mockEvents.length)}
              </div>
              <div className="text-sm text-gray-600">Promedio</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(mockEvents.reduce((sum, e) => sum + (e.calories || 0), 0) / mockEvents.length)}
              </div>
              <div className="text-sm text-gray-600">Calorías/día</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockEvents.filter(e => e.isImportant).length}
              </div>
              <div className="text-sm text-gray-600">Importantes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vista del calendario */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'month' && <MonthView />}
            {viewMode === 'week' && <WeekView />}
            {viewMode === 'day' && <DayView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

