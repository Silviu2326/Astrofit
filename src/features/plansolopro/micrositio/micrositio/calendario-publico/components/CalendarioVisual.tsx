import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfWeek, addDays, isSameDay, isSameMonth, startOfMonth, endOfMonth, endOfWeek, subMonths, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { fetchAvailableSlots, TimeSlot } from '../calendarioPublicoApi';

interface CalendarioVisualProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const CalendarioVisual: React.FC<CalendarioVisualProps> = ({
  selectedDate: propSelectedDate,
  onDateSelect
}) => {
  const [currentMonth, setCurrentMonth] = useState(propSelectedDate || new Date());
  const [selectedDate, setSelectedDate] = useState(propSelectedDate || new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (propSelectedDate) {
      setSelectedDate(propSelectedDate);
      setCurrentMonth(propSelectedDate);
    }
  }, [propSelectedDate]);

  useEffect(() => {
    const getSlots = async () => {
      const fetchedSlots = await fetchAvailableSlots(currentMonth);
      setSlots(fetchedSlots);
    };
    getSlots();
  }, [currentMonth]);

  const headerFormat = 'MMMM yyyy';
  const dateFormat = 'd';
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-xl transition-all duration-300 border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-pink-600" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
            {format(currentMonth, headerFormat)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-xl transition-all duration-300 border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    );
  };

  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-700 mb-4">
        {days.map((day) => (
          <div key={day} className="py-2 text-sm uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const rows = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      const cells = [];
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const hasAvailableSlots = slots.some(slot => isSameDay(slot.start, cloneDay) && slot.available);
        const isSelected = isSameDay(cloneDay, selectedDate);
        const isCurrentMonth = isSameMonth(cloneDay, currentMonth);
        const isToday = isSameDay(cloneDay, new Date());

        cells.push(
          <motion.div
            key={cloneDay.toString()}
            whileHover={{ scale: isCurrentMonth ? 1.1 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isCurrentMonth && handleDateClick(cloneDay)}
            className={`
              relative aspect-square rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-center font-semibold text-sm
              ${!isCurrentMonth
                ? 'text-gray-300 cursor-not-allowed'
                : isSelected
                  ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-xl border-2 border-pink-300 scale-110 z-10'
                  : hasAvailableSlots
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-2xl'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-200 border border-gray-200'
              }
              ${isToday && !isSelected ? 'ring-2 ring-pink-400 ring-offset-2' : ''}
            `}
          >
            {/* Número del día */}
            <span className="relative z-10">{formattedDate}</span>

            {/* Indicador de disponibilidad */}
            {hasAvailableSlots && !isSelected && (
              <div className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full shadow-lg"></div>
            )}

            {/* Efecto hover shimmer */}
            {isCurrentMonth && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 transition-all duration-1000 rounded-2xl"></div>
            )}
          </motion.div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {cells}
        </div>
      );
    }
    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-rose-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </motion.div>
  );
};

export default CalendarioVisual;
