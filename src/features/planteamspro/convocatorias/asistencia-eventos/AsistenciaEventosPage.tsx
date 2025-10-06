import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle2, XCircle, Clock, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';
import { ListaConfirmaciones } from './components/ListaConfirmaciones';
import { fetchEventConfirmations, updateAthleteAvailability } from './asistenciaEventosApi';

// Import new components
import PredictorAsistencia from './components/PredictorAsistencia';
import GestorConflictos from './components/GestorConflictos';
import ComunicacionAutomatica from './components/ComunicacionAutomatica';
import IntegracionCalendarios from './components/IntegracionCalendarios';
import AnalisisMotivos from './components/AnalisisMotivos';
import SistemaIncentivos from './components/SistemaIncentivos';
import EscalamientoRecordatorios from './components/EscalamientoRecordatorios';
import DashboardTendencias from './components/DashboardTendencias';

interface AthleteConfirmation {
  id: string;
  name: string;
  status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso';
}

interface EventData {
  id: string;
  name: string;
  confirmations: AthleteConfirmation[];
}

const AsistenciaEventosPage: React.FC = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // This would typically come from a route parameter or a global state
  const currentEventId = 'event-123'; // Placeholder for a specific event

  useEffect(() => {
    const getEventData = async () => {
      try {
        setLoading(true);
        const data = await fetchEventConfirmations(currentEventId);
        setEventData(data);
      } catch (err) {
        setError('Error al cargar los datos del evento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEventData();
  }, [currentEventId]);

  const handleUpdateAvailability = async (athleteId: string, status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso') => {
    if (!eventData) return;

    try {
      await updateAthleteAvailability(currentEventId, athleteId, status);
      setEventData(prevData => {
        if (!prevData) return null;
        const updatedConfirmations = prevData.confirmations.map(conf =>
          conf.id === athleteId ? { ...conf, status } : conf
        );
        return { ...prevData, confirmations: updatedConfirmations };
      });
    } catch (err) {
      setError('Error al actualizar la disponibilidad del atleta.');
      console.error(err);
    }
  };

  const calculateConfirmationPercentage = (confirmations: AthleteConfirmation[]): number => {
    if (confirmations.length === 0) return 0;
    const confirmedCount = confirmations.filter(c => c.status === 'confirmado').length;
    return (confirmedCount / confirmations.length) * 100;
  };

  const getStatusCount = (confirmations: AthleteConfirmation[], status: string): number => {
    return confirmations.filter(c => c.status === status).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando confirmaciones del evento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200 max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-center font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-center font-medium">No se encontraron datos para el evento.</p>
        </div>
      </div>
    );
  }

  const confirmationPercentage = calculateConfirmationPercentage(eventData.confirmations);
  const stats = [
    {
      title: 'Total Atletas',
      value: eventData.confirmations.length,
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/5 to-indigo-600/5',
      progress: 100
    },
    {
      title: 'Confirmados',
      value: getStatusCount(eventData.confirmations, 'confirmado'),
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500/5 to-teal-600/5',
      progress: confirmationPercentage
    },
    {
      title: 'Rechazados',
      value: getStatusCount(eventData.confirmations, 'rechazado'),
      icon: XCircle,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-500/5 to-pink-600/5',
      progress: (getStatusCount(eventData.confirmations, 'rechazado') / eventData.confirmations.length) * 100
    },
    {
      title: 'Pendientes',
      value: getStatusCount(eventData.confirmations, 'pendiente') + getStatusCount(eventData.confirmations, 'dudoso'),
      icon: Clock,
      gradient: 'from-orange-500 to-yellow-600',
      bgGradient: 'from-orange-500/5 to-yellow-600/5',
      progress: ((getStatusCount(eventData.confirmations, 'pendiente') + getStatusCount(eventData.confirmations, 'dudoso')) / eventData.confirmations.length) * 100
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Calendar className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Asistencia a <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Eventos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona la disponibilidad de atletas para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">{eventData.name}</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{confirmationPercentage.toFixed(0)}% Confirmados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">{eventData.confirmations.length} Atletas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4 md:px-0">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.title}
                </p>

                {/* Valor */}
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.value}
                </p>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lista de Confirmaciones */}
      <div className="px-4 md:px-0 mb-8">
        <ListaConfirmaciones
          confirmations={eventData.confirmations}
          onUpdateAvailability={handleUpdateAvailability}
        />
      </div>

      {/* New Intelligent System for Availability */}
      <div className="px-4 md:px-0 mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        >
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          Sistema Inteligente
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PredictorAsistencia />
          <GestorConflictos />
          <ComunicacionAutomatica />
          <IntegracionCalendarios />
          <AnalisisMotivos />
          <SistemaIncentivos />
          <EscalamientoRecordatorios />
          <DashboardTendencias />
        </div>
      </div>

      {/* Recordatorios automáticos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="px-4 md:px-0"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          {/* Decoración */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg mb-2">Recordatorios automáticos</p>
              <p className="text-gray-600 leading-relaxed">
                Se enviarán recordatorios a los atletas con estado <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-lg font-semibold text-sm">pendiente</span> o <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-lg font-semibold text-sm">dudoso</span> que no hayan respondido en un tiempo determinado.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AsistenciaEventosPage;
