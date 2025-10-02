import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { Clock, Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';
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
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
          <p className="text-gray-600 font-semibold">Cargando franjas disponibles...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl text-white shadow-lg">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Horarios Disponibles</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold">{format(selectedDate, 'dd/MM/yyyy')}</span>
          </div>
        </div>

        {/* Slots list */}
        {slots.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 px-4"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-semibold text-center mb-2">No hay franjas disponibles</p>
            <p className="text-gray-500 text-sm text-center">Intenta seleccionar otra fecha</p>
          </motion.div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {slots.map((slot, index) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`
                    relative overflow-hidden rounded-2xl p-4 transition-all duration-300 border-2
                    ${slot.available
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 hover:shadow-xl'
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 opacity-60'
                    }
                  `}
                >
                  {/* Shimmer effect para slots disponibles */}
                  {slot.available && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transform -skew-x-12 transition-all duration-1000"></div>
                  )}

                  <div className="relative z-10 flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      {/* Icono de estado */}
                      <div className={`
                        p-2 rounded-xl shadow-md
                        ${slot.available
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                          : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }
                      `}>
                        {slot.available ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Horario */}
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="font-bold text-gray-900 text-lg">
                            {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 font-medium mt-1">
                          {slot.available ? 'Disponible para reservar' : 'Horario ocupado'}
                        </p>
                      </div>
                    </div>

                    {/* Botón o estado */}
                    {slot.available ? (
                      <BotonReservar slotId={slot.id} />
                    ) : (
                      <div className="px-4 py-2 bg-gray-200 rounded-xl">
                        <span className="text-sm font-semibold text-gray-600">Ocupado</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #f43f5e);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #e11d48);
        }
      `}</style>
    </motion.div>
  );
};

export default FranjasDisponibles;
