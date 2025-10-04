import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Trash2 } from 'lucide-react';
import { Evento } from '../calendarioApi';

interface EventosListProps {
  eventos: Evento[];
  selectedDate: Date;
  onEventClick: (evento: Evento) => void;
  onDeleteEvent: (eventoId: string) => void;
}

const EventosList: React.FC<EventosListProps> = ({
  eventos,
  selectedDate,
  onEventClick,
  onDeleteEvent
}) => {
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

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      cita: 'Cita',
      clase: 'Clase',
      reunion: 'Reunión',
      evento: 'Evento',
      otro: 'Otro'
    };
    return labels[tipo] || tipo;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const dateString = selectedDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 capitalize">
          {dateString}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {eventos.length} {eventos.length === 1 ? 'evento' : 'eventos'}
        </p>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {eventos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No hay eventos para este día</p>
            </motion.div>
          ) : (
            eventos.map((evento) => (
              <motion.div
                key={evento._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group relative bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onEventClick(evento)}
              >
                {/* Color indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${getTipoColor(evento.tipo)}`}></div>

                <div className="pl-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {evento.titulo}
                      </h4>
                      <span className={`inline-block px-2 py-1 rounded-md text-xs text-white ${getTipoColor(evento.tipo)}`}>
                        {getTipoLabel(evento.tipo)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEvent(evento._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {evento.descripcion && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {evento.descripcion}
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatTime(evento.fechaInicio)} - {formatTime(evento.fechaFin)}
                      </span>
                    </div>

                    {evento.ubicacion && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{evento.ubicacion}</span>
                      </div>
                    )}

                    {evento.participantes && evento.participantes.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{evento.participantes.length} participante(s)</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EventosList;
