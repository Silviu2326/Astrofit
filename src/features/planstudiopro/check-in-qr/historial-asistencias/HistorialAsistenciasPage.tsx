// src/features/historial-asistencias/HistorialAsistenciasPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, Users, TrendingUp, Clock, Target, Zap,
  Search, Filter, Download, UserPlus, Calendar, BarChart3
} from 'lucide-react';
import { TablaEntradas } from './components/TablaEntradas';
import { FiltrosAvanzados } from './components/FiltrosAvanzados';
import { EstadisticasAcceso } from './components/EstadisticasAcceso';
import { getAttendanceEntries, getMembers, AttendanceEntry, Member } from './historialAsistenciasApi';

const HistorialAsistenciasPage: React.FC = () => {
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<AttendanceEntry[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState<'table' | 'calendar' | 'charts' | 'individual'>('table');

  // Filters state
  const [filters, setFilters] = useState({
    dateRange: 'all' as 'all' | 'today' | 'week' | 'month' | 'last30' | 'custom',
    classType: 'all',
    coach: 'all',
    checkInMethod: 'all',
    status: 'all',
    timeOfDay: 'all',
    membershipType: 'all',
    customStartDate: '',
    customEndDate: ''
  });

  useEffect(() => {
    const fetchedEntries = getAttendanceEntries();
    const fetchedMembers = getMembers();
    setEntries(fetchedEntries);
    setFilteredEntries(fetchedEntries);
    setMembers(fetchedMembers);
  }, []);

  useEffect(() => {
    let currentFiltered = entries;

    // Apply date filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (filters.dateRange === 'today') {
      currentFiltered = currentFiltered.filter(entry => {
        const entryDate = new Date(entry.fechaHora);
        return entryDate.toDateString() === today.toDateString();
      });
    } else if (filters.dateRange === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      currentFiltered = currentFiltered.filter(entry => {
        const entryDate = new Date(entry.fechaHora);
        return entryDate >= weekAgo;
      });
    } else if (filters.dateRange === 'month') {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      currentFiltered = currentFiltered.filter(entry => {
        const entryDate = new Date(entry.fechaHora);
        return entryDate >= monthAgo;
      });
    } else if (filters.dateRange === 'last30') {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      currentFiltered = currentFiltered.filter(entry => {
        const entryDate = new Date(entry.fechaHora);
        return entryDate >= thirtyDaysAgo;
      });
    }

    // Apply class type filter
    if (filters.classType !== 'all') {
      currentFiltered = currentFiltered.filter(entry => entry.tipoClase === filters.classType);
    }

    // Apply coach filter
    if (filters.coach !== 'all') {
      currentFiltered = currentFiltered.filter(entry => entry.coach === filters.coach);
    }

    // Apply check-in method filter
    if (filters.checkInMethod !== 'all') {
      currentFiltered = currentFiltered.filter(entry => entry.metodoCheckin === filters.checkInMethod);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      currentFiltered = currentFiltered.filter(entry => entry.estado === filters.status);
    }

    // Apply time of day filter
    if (filters.timeOfDay !== 'all') {
      currentFiltered = currentFiltered.filter(entry => {
        const hour = new Date(entry.fechaHora).getHours();
        if (filters.timeOfDay === 'morning') return hour < 12;
        if (filters.timeOfDay === 'afternoon') return hour >= 12 && hour < 18;
        if (filters.timeOfDay === 'evening') return hour >= 18;
        return true;
      });
    }

    // Apply membership type filter
    if (filters.membershipType !== 'all') {
      currentFiltered = currentFiltered.filter(entry => entry.miembro.tipoMembresia === filters.membershipType);
    }

    // Apply search term filter
    if (searchTerm) {
      currentFiltered = currentFiltered.filter(entry =>
        entry.miembro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.miembro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.miembro.numeroMembresia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.miembro.telefono.includes(searchTerm)
      );
    }

    setFilteredEntries(currentFiltered);
  }, [entries, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <CalendarCheck className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Historial de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Asistencias</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl leading-relaxed">
            Seguimiento completo de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">check-ins</span> y engagement de miembros
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveView('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeView === 'table'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm">Tabla Completa</span>
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeView === 'calendar'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Calendario</span>
            </button>
            <button
              onClick={() => setActiveView('charts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeView === 'charts'
                  ? 'bg-white text-teal-600 shadow-lg'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm">Gráficos</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS GENERALES */}
      <EstadisticasAcceso entries={filteredEntries} allEntries={entries} />

      {/* BUSCADOR Y FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Buscador principal */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, email, # membresía, teléfono..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white"
            />
          </div>

          {/* Toggle filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filtros Avanzados
          </button>

          {/* Export button */}
          <button className="px-6 py-3 border-2 border-teal-500 text-teal-600 rounded-2xl font-semibold hover:bg-teal-50 transition-all duration-300 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>

        {/* Filtros avanzados */}
        {showFilters && (
          <FiltrosAvanzados filters={filters} setFilters={setFilters} entries={entries} />
        )}
      </motion.div>

      {/* TABLA DE ASISTENCIAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Todos los Check-ins
            <span className="ml-3 text-lg font-semibold text-teal-600">({filteredEntries.length})</span>
          </h2>
        </div>

        <TablaEntradas
          entries={filteredEntries}
          onSelectMember={(member) => {
            setSelectedMember(member);
            setActiveView('individual');
          }}
        />
      </motion.div>
    </div>
  );
};

export default HistorialAsistenciasPage;
