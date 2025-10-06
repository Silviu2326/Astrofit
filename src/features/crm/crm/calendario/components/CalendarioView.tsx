import React from 'react';
import { motion } from 'framer-motion';
import { Evento } from '../calendarioApi';

interface CalendarioViewProps {
  currentMonth: Date;
  selectedDate: Date;
  eventos: Evento[];
  onDateSelect: (date: Date) => void;
  onEventClick: (evento: Evento) => void;
  view: 'month' | 'week' | 'day';
}

const CalendarioView: React.FC<CalendarioViewProps> = ({
  currentMonth,
  selectedDate,
  eventos,
  onDateSelect,
  onEventClick,
  view
}) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventosForDate = (date: Date | null) => {
    if (!date) return [];
    return eventos.filter(evento => {
      const eventoDate = new Date(evento.fechaInicio);
      return eventoDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      cita: 'bg-blue-500',
      clase: 'bg-green-500',
      reunion: 'bg-purple-500',
      evento: 'bg-orange-500',
      otro: 'bg-gray-500'
    };
    return colors[tipo] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 text-sm py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          const eventosDelDia = getEventosForDate(date);
          const today = isToday(date);
          const selected = isSelected(date);

          return (
            <motion.div
              key={index}
              whileHover={{ scale: date ? 1.05 : 1 }}
              onClick={() => date && onDateSelect(date)}
              className={`
                min-h-[100px] p-2 rounded-lg border transition-all cursor-pointer
                ${!date ? 'bg-gray-50 cursor-default' : ''}
                ${today ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}
                ${selected ? 'ring-2 ring-indigo-500' : ''}
                ${date && !today && !selected ? 'hover:bg-gray-50' : ''}
              `}
            >
              {date && (
                <>
                  <div className={`
                    text-sm font-semibold mb-1
                    ${today ? 'text-indigo-600' : 'text-gray-700'}
                  `}>
                    {date.getDate()}
                  </div>

                  {/* Events */}
                  <div className="space-y-1">
                    {eventosDelDia.slice(0, 3).map((evento) => (
                      <motion.div
                        key={evento._id}
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(evento);
                        }}
                        className={`
                          ${getTipoColor(evento.tipo)} text-white text-xs px-2 py-1 rounded truncate
                        `}
                      >
                        {evento.titulo}
                      </motion.div>
                    ))}
                    {eventosDelDia.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{eventosDelDia.length - 3} más
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { tipo: 'cita', label: 'Cita' },
            { tipo: 'clase', label: 'Clase' },
            { tipo: 'reunion', label: 'Reunión' },
            { tipo: 'evento', label: 'Evento' },
            { tipo: 'otro', label: 'Otro' }
          ].map(({ tipo, label }) => (
            <div key={tipo} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${getTipoColor(tipo)}`}></div>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarioView;
