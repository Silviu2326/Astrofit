import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { Bell, Trophy, Cake, Calendar as CalendarIcon } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Event {
  date: Date;
  title: string;
  type: 'milestone' | 'birthday' | 'anniversary';
  icon: string;
}

const CalendarioEventos: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());

  // Mock events for demonstration
  const events: Event[] = [
    { date: new Date(2025, 9, 2), title: 'Meta Juan - 10kg', type: 'milestone', icon: '🏆' },
    { date: new Date(2025, 9, 5), title: 'Cumpleaños Ana', type: 'birthday', icon: '🎂' },
    { date: new Date(2025, 9, 15), title: 'Aniversario María', type: 'anniversary', icon: '🎉' },
    { date: new Date(2025, 9, 20), title: 'Meta Pedro - Fuerza', type: 'milestone', icon: '💪' },
  ];

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      );

      if (dayEvents.length > 0) {
        return (
          <div className="flex justify-center items-center mt-1">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const hasEvent = events.some(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      );

      if (hasEvent) {
        return 'bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl';
      }
    }
    return '';
  };

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Calendario con estilos modernos */}
      <div className="bg-gradient-to-br from-white/50 to-amber-50/30 backdrop-blur-sm rounded-2xl p-4 border border-amber-100">
        <style>{`
          .react-calendar {
            border: none;
            background: transparent;
            font-family: inherit;
            width: 100%;
          }

          .react-calendar__navigation {
            margin-bottom: 1rem;
          }

          .react-calendar__navigation button {
            color: #78350f;
            font-weight: 600;
            font-size: 1rem;
            padding: 0.5rem;
            border-radius: 0.75rem;
            transition: all 0.3s;
          }

          .react-calendar__navigation button:hover {
            background: linear-gradient(to right, #f59e0b, #eab308);
            color: white;
          }

          .react-calendar__month-view__weekdays {
            color: #92400e;
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
          }

          .react-calendar__tile {
            padding: 0.75rem;
            border-radius: 0.75rem;
            transition: all 0.3s;
            position: relative;
          }

          .react-calendar__tile:hover {
            background: linear-gradient(to right, #fef3c7, #fef08a);
          }

          .react-calendar__tile--active {
            background: linear-gradient(to right, #f59e0b, #eab308) !important;
            color: white !important;
            font-weight: 600;
          }

          .react-calendar__tile--now {
            background: linear-gradient(to right, #fef3c7, #fef08a);
            font-weight: 600;
          }
        `}</style>
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </div>

      {/* Próximos Eventos */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-600" />
          Próximos Hitos
        </h3>

        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">{event.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-amber-900">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CalendarIcon className="w-3 h-3 text-amber-600" />
                    <p className="text-xs text-amber-700">
                      {event.date.toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  event.type === 'milestone' ? 'bg-amber-100 text-amber-700' :
                  event.type === 'birthday' ? 'bg-pink-100 text-pink-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {event.type === 'milestone' ? 'Meta' :
                   event.type === 'birthday' ? 'Cumpleaños' : 'Aniversario'}
                </div>
              </div>
            </motion.div>
          ))}

          {upcomingEvents.length === 0 && (
            <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-xl">
              <p className="text-sm">No hay eventos próximos</p>
            </div>
          )}
        </div>
      </div>

      {/* Badge de celebración */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="p-4 bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl border border-lime-200"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-lime-600" />
          <div className="flex-1">
            <p className="text-sm font-bold text-lime-900">¡Mes de logros!</p>
            <p className="text-xs text-lime-700">{events.length} hitos planificados este mes</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarioEventos;
