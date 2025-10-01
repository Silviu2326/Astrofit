import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, isSameMonth, startOfMonth, endOfMonth, endOfWeek, subMonths, addMonths } from 'date-fns';
import { fetchAvailableSlots, TimeSlot } from '../calendarioPublicoApi';

const CalendarioVisual: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const getSlots = async () => {
      const fetchedSlots = await fetchAvailableSlots(selectedDate);
      setSlots(fetchedSlots);
    };
    getSlots();
  }, [selectedDate]);

  const headerFormat = 'MMMM yyyy';
  const dateFormat = 'd';
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
          Anterior
        </button>
        <span className="text-xl font-semibold">{format(currentMonth, headerFormat)}</span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
          Siguiente
        </button>
      </div>
    );
  };

  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-600 mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
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
        cells.push(
          <div
            key={cloneDay.toString()}
            className={`p-2 rounded cursor-pointer
              ${!isSameMonth(cloneDay, currentMonth) ? 'text-gray-400' : isSameDay(cloneDay, selectedDate) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}
              ${slots.some(slot => isSameDay(slot.start, cloneDay) && slot.available) ? 'border-l-4 border-green-500' : ''}
            `}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {cells}
        </div>
      );
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CalendarioVisual;
