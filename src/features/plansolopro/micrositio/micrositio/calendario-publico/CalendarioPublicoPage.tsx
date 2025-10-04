import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, Filter, List, Grid } from 'lucide-react';
import CalendarioVisual from './components/CalendarioVisual';
import FranjasDisponibles from './components/FranjasDisponibles';

const CalendarioPublicoPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [timezone, setTimezone] = useState('America/Mexico_City');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              Calendario de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Disponibilidad</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed mb-6">
            Encuentra el <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">horario perfecto</span> para ti
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Disponibilidad en tiempo real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Globe className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Zona horaria: {timezone.split('/')[1].replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CONTROLES Y FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Vista selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Vista:</span>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  viewMode === 'calendar'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
                Calendario
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                Lista
              </button>
            </div>
          </div>

          {/* Timezone selector */}
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-semibold text-sm"
            >
              <option value="America/Mexico_City">Ciudad de México</option>
              <option value="America/New_York">Nueva York</option>
              <option value="America/Los_Angeles">Los Ángeles</option>
              <option value="Europe/Madrid">Madrid</option>
              <option value="Europe/London">Londres</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* LEYENDA DE DISPONIBILIDAD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Leyenda</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-emerald-500"></div>
            <span className="text-sm font-semibold text-gray-700">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-300 to-gray-400"></div>
            <span className="text-sm font-semibold text-gray-700">Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-pink-500"></div>
            <span className="text-sm font-semibold text-gray-700">Seleccionado</span>
          </div>
        </div>
      </motion.div>

      {/* CALENDARIO Y FRANJAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendario Visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <CalendarioVisual
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </motion.div>

        {/* Franjas Disponibles */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <FranjasDisponibles selectedDate={selectedDate} />
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarioPublicoPage;
