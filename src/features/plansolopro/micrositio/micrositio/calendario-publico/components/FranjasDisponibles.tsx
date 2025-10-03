import React, { useState, useEffect } from 'react';
import { format, isSameDay } from 'date-fns';
import { fetchAvailableSlots, TimeSlot } from '../calendarioPublicoApi';
import BotonReservar from './BotonReservar';

interface FranjasDisponiblesProps {
  selectedDate?: Date;
}

const FranjasDisponibles: React.FC<FranjasDisponiblesProps> = ({ selectedDate = new Date() }) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSlots = async () => {
      setLoading(true);
      const fetchedSlots = await fetchAvailableSlots(selectedDate);
      setSlots(fetchedSlots.filter(slot => isSameDay(slot.start, selectedDate)));
      setLoading(false);
    };
    getSlots();
  }, [selectedDate]);

  if (loading) {
    return <div className="bg-white p-4 rounded shadow">Cargando franjas disponibles...</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Franjas Disponibles para {format(selectedDate, 'dd/MM/yyyy')}</h2>
      {slots.length === 0 ? (
        <p>No hay franjas disponibles para esta fecha.</p>
      ) : (
        <div className="space-y-2">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className={`flex justify-between items-center p-3 rounded
                ${slot.available ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300 text-gray-600'}
              `}
            >
              <span>
                {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
              </span>
              {slot.available ? (
                <BotonReservar slotId={slot.id} />
              ) : (
                <span className="text-sm">Ocupado</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FranjasDisponibles;
