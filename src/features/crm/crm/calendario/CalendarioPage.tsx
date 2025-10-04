import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import CalendarioView from './components/CalendarioView';
import EventoModal from './components/EventoModal';
import EventosList from './components/EventosList';
import { fetchEventos, createEvento, updateEvento, deleteEvento, Evento } from './calendarioApi';

const CalendarioPage: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showEventoModal, setShowEventoModal] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  useEffect(() => {
    loadEventos();
  }, [currentMonth]);

  const loadEventos = async () => {
    try {
      setLoading(true);
      const data = await fetchEventos({
        fechaInicio: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString(),
        fechaFin: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString()
      });
      setEventos(data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      toast.error('Error al cargar los eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvento = async (eventoData: Partial<Evento>) => {
    try {
      const newEvento = await createEvento(eventoData as any);
      setEventos(prev => [...prev, newEvento]);
      setShowEventoModal(false);
      setSelectedEvento(null);
      toast.success('Evento creado correctamente');
      loadEventos();
    } catch (error) {
      console.error('Error al crear evento:', error);
      toast.error('Error al crear el evento');
    }
  };

  const handleUpdateEvento = async (eventoData: Partial<Evento>) => {
    if (!selectedEvento) return;

    try {
      const updated = await updateEvento(selectedEvento._id, eventoData);
      setEventos(prev => prev.map(e => e._id === selectedEvento._id ? updated : e));
      setShowEventoModal(false);
      setSelectedEvento(null);
      toast.success('Evento actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      toast.error('Error al actualizar el evento');
    }
  };

  const handleDeleteEvento = async (eventoId: string) => {
    try {
      await deleteEvento(eventoId);
      setEventos(prev => prev.filter(e => e._id !== eventoId));
      toast.success('Evento eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      toast.error('Error al eliminar el evento');
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const eventosDelDia = eventos.filter(evento => {
    const eventoDate = new Date(evento.fechaInicio);
    return eventoDate.toDateString() === selectedDate.toDateString();
  });

  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl mb-8 p-8 md:p-12"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                <CalendarIcon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Calendario
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2">
                  Gestiona tus eventos y citas
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedEvento(null);
                setShowEventoModal(true);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Evento</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors"
            >
              Hoy
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 ml-4 capitalize">
              {monthName}
            </h2>
          </div>

          <div className="flex gap-2">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === v
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {v === 'month' ? 'Mes' : v === 'week' ? 'Semana' : 'Día'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <CalendarioView
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              eventos={eventos}
              onDateSelect={setSelectedDate}
              onEventClick={(evento) => {
                setSelectedEvento(evento);
                setShowEventoModal(true);
              }}
              view={view}
            />
          </div>

          {/* Events List */}
          <div className="lg:col-span-1">
            <EventosList
              eventos={eventosDelDia}
              selectedDate={selectedDate}
              onEventClick={(evento) => {
                setSelectedEvento(evento);
                setShowEventoModal(true);
              }}
              onDeleteEvent={handleDeleteEvento}
            />
          </div>
        </div>
      </div>

      {/* Evento Modal */}
      {showEventoModal && (
        <EventoModal
          evento={selectedEvento}
          onClose={() => {
            setShowEventoModal(false);
            setSelectedEvento(null);
          }}
          onSave={selectedEvento ? handleUpdateEvento : handleCreateEvento}
        />
      )}
    </div>
  );
};

export default CalendarioPage;
