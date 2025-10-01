import React, { useState, useEffect } from 'react';
import { Clock, Loader2, AlertCircle, Calendar } from 'lucide-react';

// Tipos y funciones simuladas de API - reemplazar con las reales cuando estén disponibles
interface AvailableTime {
  time: string;
  isAvailable: boolean;
}

const getAvailableTimes = async (serviceId: string, date: string): Promise<AvailableTime[]> => {
  // Simulación de llamada API
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generar horarios simulados
  const times = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  return times.map(time => ({
    time,
    isAvailable: Math.random() > 0.3 // 70% de probabilidad de estar disponible
  }));
};

interface SeleccionHorarioProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: any) => void;
  service?: any; // Assuming service data is passed down or fetched from context
}

const SeleccionHorario: React.FC<SeleccionHorarioProps> = ({ onNext, onBack, onDataChange, service }) => {
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today

  useEffect(() => {
    const fetchTimes = async () => {
      if (selectedDate) {
        setLoading(true);
        setError(null);
        try {
          const times = await getAvailableTimes(service?.id || 'default', selectedDate);
          setAvailableTimes(times);
        } catch (err) {
          setError('Error al cargar los horarios disponibles.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchTimes();
  }, [service, selectedDate]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNextClick = () => {
    if (selectedTime) {
      onDataChange({ selectedTime: selectedTime, selectedDate: selectedDate });
      onNext();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando horarios disponibles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Selecciona un Horario</h2>

      {/* Selector de fecha */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="inline h-4 w-4 mr-1" />
          Fecha
        </label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]} // No permitir fechas pasadas
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Grid de horarios */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Horarios disponibles
        </h3>

        {availableTimes.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {availableTimes.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.isAvailable ? handleTimeSelect(slot.time) : null}
                disabled={!slot.isAvailable}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  selectedTime === slot.time
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : slot.isAvailable
                      ? 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay horarios disponibles para esta fecha.</p>
            <p className="text-sm text-gray-400 mt-1">Prueba seleccionando otra fecha.</p>
          </div>
        )}
      </div>

      {/* Información adicional */}
      {selectedTime && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-1">Horario seleccionado</h4>
          <p className="text-gray-700">
            {new Date(selectedDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} a las {selectedTime}
          </p>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Atrás
        </button>
        <button
          onClick={handleNextClick}
          disabled={!selectedTime}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SeleccionHorario;
