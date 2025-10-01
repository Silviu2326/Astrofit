import React from 'react';
import { AnualCycle, TrainingPhase } from '../calendarioPeriodizacionApi';

interface VistaGanttProps {
  cycles: AnualCycle[];
  currentMonth: number;
  currentYear: number;
}

const phaseColors = {
  fuerza: 'bg-blue-500',
  tecnica: 'bg-green-500',
  competicion: 'bg-red-500',
  descanso: 'bg-yellow-500',
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-700 mb-4">
        {[ 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom' ].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: weeksInMonth * 7 }).map((_, index) => {
          const dayOfMonth = index - new Date(currentYear, currentMonth, 1).getDay() + 1;
          const date = new Date(currentYear, currentMonth, dayOfMonth);
          const isValidDay = date.getMonth() === currentMonth && dayOfMonth > 0 && dayOfMonth <= daysInMonth;

          const weekNumber = getWeekNumber(date);

          return (
            <div
              key={index}
              className={`h-16 border border-gray-200 flex items-center justify-center text-xs relative
                ${isValidDay ? 'bg-white' : 'bg-gray-50'}`}
            >
              {isValidDay && (
                <span className="absolute top-1 left-1 text-gray-500">{dayOfMonth}</span>
              )}
              {isValidDay && currentCycle.phases.map(phase => {
                const startWeek = phase.startWeek;
                const endWeek = phase.endWeek;

                if (weekNumber >= startWeek && weekNumber <= endWeek) {
                  return (
                    <div
                      key={phase.id}
                      className={`absolute inset-0 m-1 rounded-sm flex items-center justify-center text-white text-xs opacity-80 ${phaseColors[phase.type]}`}
                      title={phase.name}
                    >
                      {/* {phase.name} */}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Leyenda:</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(phaseColors).map(([type, colorClass]) => (
            <div key={type} className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full ${colorClass}`}></span>
              <span className="text-sm text-gray-600">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { VistaGantt };
