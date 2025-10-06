import React from 'react';
import { motion } from 'framer-motion';
import { AnualCycle, TrainingPhase } from '../calendarioPeriodizacionApi';

interface VistaGanttProps {
  cycles: AnualCycle[];
  currentMonth: number;
  currentYear: number;
}

const phaseColors = {
  fuerza: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  tecnica: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  competicion: 'bg-gradient-to-br from-orange-500 to-red-600',
  descanso: 'bg-gradient-to-br from-yellow-400 to-amber-500',
};

const phaseBadgeColors = {
  fuerza: 'from-blue-500 to-indigo-600',
  tecnica: 'from-emerald-500 to-teal-600',
  competicion: 'from-orange-500 to-red-600',
  descanso: 'from-yellow-400 to-amber-500',
};

const getWeeksInMonth = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const numDays = lastDayOfMonth.getDate();
  const startWeekDay = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday

  // Adjust startWeekDay to be 0 for Monday, 6 for Sunday
  const adjustedStartWeekDay = startWeekDay === 0 ? 6 : startWeekDay - 1;

  return Math.ceil((numDays + adjustedStartWeekDay) / 7);
};

const getWeekNumber = (date: Date): number => {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Correctly calculate the day of the week for yearStart (0=Sunday, 1=Monday, ..., 6=Saturday)
  const dayOfWeekYearStart = yearStart.getDay();

  // Adjust yearStart to the first Monday of the year or the first day if it's a Monday
  let firstMonday = new Date(yearStart);
  if (dayOfWeekYearStart !== 1) { // If not Monday
    firstMonday.setDate(yearStart.getDate() + (1 - dayOfWeekYearStart + 7) % 7);
  }

  // If the first Monday is after Jan 4th, then the first week starts on Jan 1st
  if (firstMonday.getMonth() === 0 && firstMonday.getDate() > 4) {
    firstMonday = new Date(date.getFullYear(), 0, 1);
  }

  const diff = date.getTime() - firstMonday.getTime();
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
};


const VistaGantt: React.FC<VistaGanttProps> = ({ cycles, currentMonth, currentYear }) => {
  const currentCycle = cycles.find(cycle => cycle.year === currentYear);

  if (!currentCycle) {
    return <div className="text-center py-8 text-gray-600">No hay datos de periodización para el año {currentYear}.</div>;
  }

  const weeksInMonth = getWeeksInMonth(currentYear, currentMonth);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getPhaseStyle = (phase: TrainingPhase, weekIndex: number) => {
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth, daysInMonth);

    const startWeekOfMonth = getWeekNumber(startOfMonth);
    const endWeekOfMonth = getWeekNumber(endOfMonth);

    const currentGlobalWeek = startWeekOfMonth + weekIndex;

    const isInPhase = currentGlobalWeek >= phase.startWeek && currentGlobalWeek <= phase.endWeek;

    return isInPhase ? phaseColors[phase.type] : 'bg-gray-300';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Headers de días de la semana */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
          {[ 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom' ].map((day, index) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="px-2 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl"
            >
              {day}
            </motion.div>
          ))}
        </div>

        {/* Grid del calendario */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: weeksInMonth * 7 }).map((_, index) => {
            const dayOfMonth = index - new Date(currentYear, currentMonth, 1).getDay() + 1;
            const date = new Date(currentYear, currentMonth, dayOfMonth);
            const isValidDay = date.getMonth() === currentMonth && dayOfMonth > 0 && dayOfMonth <= daysInMonth;

            const weekNumber = getWeekNumber(date);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01, duration: 0.2 }}
                whileHover={{ scale: isValidDay ? 1.05 : 1 }}
                className={`h-20 rounded-2xl flex items-center justify-center text-xs relative overflow-hidden transition-all duration-300
                  ${isValidDay
                    ? 'bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg cursor-pointer'
                    : 'bg-gray-100/50 border border-gray-100'}`}
              >
                {isValidDay && (
                  <span className="absolute top-2 left-2 text-gray-700 font-semibold text-sm z-20">{dayOfMonth}</span>
                )}
                {isValidDay && currentCycle.phases.map(phase => {
                  const startWeek = phase.startWeek;
                  const endWeek = phase.endWeek;

                  if (weekNumber >= startWeek && weekNumber <= endWeek) {
                    return (
                      <div
                        key={phase.id}
                        className={`absolute inset-0 m-1 rounded-xl flex items-center justify-center text-white text-xs font-semibold shadow-md ${phaseColors[phase.type]}`}
                        title={phase.name}
                      >
                        {/* Efecto shimmer en hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 transition-all duration-500"></div>
                      </div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            );
          })}
        </div>

        {/* Leyenda con badges modernos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            Leyenda de Fases
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(phaseBadgeColors).map(([type, gradientClass], index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradientClass} shadow-sm`}></span>
                <span className="text-sm font-semibold text-gray-700 capitalize">{type}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export { VistaGantt };
