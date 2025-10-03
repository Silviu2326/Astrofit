import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarioEventos: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());

  // Mock events for demonstration
  const events = [
    { date: new Date(2025, 8, 28), title: 'Cumpleaños Juan' }, // Month is 0-indexed
    { date: new Date(2025, 9, 5), title: 'Cumpleaños Ana' },
    { date: new Date(2025, 2, 15), title: 'Aniversario María' },
  ];

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      );

      return (
        <div className="flex flex-col items-center">
          {dayEvents.map((event, index) => (
            <p key={index} className="text-xs text-blue-500">
              {event.title}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <Calendar onChange={onChange} value={value} tileContent={tileContent} />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Recordatorios:</h3>
        {/* Here you would list upcoming reminders based on selected date or current date */}
        <p className="text-sm text-gray-600">No hay recordatorios para la fecha seleccionada.</p>
      </div>
    </div>
  );
};

export default CalendarioEventos;
