// src/features/historial-asistencias/components/FiltrosAvanzados.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Users, Clock, QrCode, CheckCircle, XCircle, X,
  Dumbbell, CreditCard, Sun, Sunset, Moon
} from 'lucide-react';
import { AttendanceEntry, ClassType } from '../historialAsistenciasApi';

interface Filters {
  dateRange: 'all' | 'today' | 'week' | 'month' | 'last30' | 'custom';
  classType: string;
  coach: string;
  checkInMethod: string;
  status: string;
  timeOfDay: string;
  membershipType: string;
  customStartDate: string;
  customEndDate: string;
}

interface FiltrosAvanzadosProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  entries: AttendanceEntry[];
}

export const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({
  filters,
  setFilters,
  entries,
}) => {
  // Get unique values for dropdowns
  const uniqueClassTypes = Array.from(new Set(entries.map(e => e.tipoClase)));
  const uniqueCoaches = Array.from(new Set(entries.map(e => e.coach)));

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange !== 'all') count++;
    if (filters.classType !== 'all') count++;
    if (filters.coach !== 'all') count++;
    if (filters.checkInMethod !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.timeOfDay !== 'all') count++;
    if (filters.membershipType !== 'all') count++;
    return count;
  };

  const clearAllFilters = () => {
    setFilters({
      dateRange: 'all',
      classType: 'all',
      coach: 'all',
      checkInMethod: 'all',
      status: 'all',
      timeOfDay: 'all',
      membershipType: 'all',
      customStartDate: '',
      customEndDate: ''
    });
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="border-t border-gray-200 pt-6 mt-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          Filtros Avanzados
          {activeFiltersCount > 0 && (
            <span className="px-2.5 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
            Limpiar todo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* RANGO DE FECHAS */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Calendar className="w-4 h-4 text-teal-600" />
            Rango de Fechas
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value as any })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none bg-white text-sm font-semibold"
          >
            <option value="all">Todos los tiempos</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="last30">Últimos 30 días</option>
          </select>
        </div>

        {/* TIPO DE CLASE */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Dumbbell className="w-4 h-4 text-purple-600" />
            Tipo de Clase
          </label>
          <select
            value={filters.classType}
            onChange={(e) => setFilters({ ...filters, classType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none bg-white text-sm font-semibold"
          >
            <option value="all">Todas las clases</option>
            {uniqueClassTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* COACH */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Users className="w-4 h-4 text-blue-600" />
            Coach
          </label>
          <select
            value={filters.coach}
            onChange={(e) => setFilters({ ...filters, coach: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none bg-white text-sm font-semibold"
          >
            <option value="all">Todos los coaches</option>
            {uniqueCoaches.map(coach => (
              <option key={coach} value={coach}>{coach}</option>
            ))}
          </select>
        </div>

        {/* MÉTODO CHECK-IN */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <QrCode className="w-4 h-4 text-indigo-600" />
            Método Check-in
          </label>
          <select
            value={filters.checkInMethod}
            onChange={(e) => setFilters({ ...filters, checkInMethod: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none bg-white text-sm font-semibold"
          >
            <option value="all">Todos los métodos</option>
            <option value="qr_scan">QR Scan</option>
            <option value="manual">Manual</option>
            <option value="reserva">Reserva</option>
            <option value="walk_in">Walk-in</option>
            <option value="app_movil">App Móvil</option>
          </select>
        </div>

        {/* ESTADO */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Estado
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none bg-white text-sm font-semibold"
          >
            <option value="all">Todos los estados</option>
            <option value="asistio">Asistió</option>
            <option value="late_cancel">Late Cancel</option>
            <option value="no_show">No-Show</option>
          </select>
        </div>

        {/* HORARIO */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Clock className="w-4 h-4 text-orange-600" />
            Horario
          </label>
          <select
            value={filters.timeOfDay}
            onChange={(e) => setFilters({ ...filters, timeOfDay: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none bg-white text-sm font-semibold"
          >
            <option value="all">Todo el día</option>
            <option value="morning">Mañana (antes 12pm)</option>
            <option value="afternoon">Tarde (12pm-6pm)</option>
            <option value="evening">Noche (después 6pm)</option>
          </select>
        </div>

        {/* TIPO MEMBRESÍA */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <CreditCard className="w-4 h-4 text-pink-600" />
            Tipo Membresía
          </label>
          <select
            value={filters.membershipType}
            onChange={(e) => setFilters({ ...filters, membershipType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none bg-white text-sm font-semibold"
          >
            <option value="all">Todas las membresías</option>
            <option value="unlimited">Unlimited</option>
            <option value="pack">Pack</option>
            <option value="drop_in">Drop-in</option>
          </select>
        </div>
      </div>

      {/* Active filters pills */}
      {activeFiltersCount > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-bold text-gray-700 mb-3">Filtros activos:</p>
          <div className="flex flex-wrap gap-2">
            {filters.dateRange !== 'all' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-full border border-teal-200">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-xs font-bold text-teal-700">
                  {filters.dateRange === 'today' && 'Hoy'}
                  {filters.dateRange === 'week' && 'Esta semana'}
                  {filters.dateRange === 'month' && 'Este mes'}
                  {filters.dateRange === 'last30' && 'Últimos 30 días'}
                </span>
                <button
                  onClick={() => setFilters({ ...filters, dateRange: 'all' })}
                  className="text-teal-600 hover:text-teal-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {filters.classType !== 'all' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                <Dumbbell className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-bold text-purple-700">{filters.classType}</span>
                <button
                  onClick={() => setFilters({ ...filters, classType: 'all' })}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {filters.coach !== 'all' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">{filters.coach}</span>
                <button
                  onClick={() => setFilters({ ...filters, coach: 'all' })}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {filters.status !== 'all' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-bold text-green-700">
                  {filters.status === 'asistio' && 'Asistió'}
                  {filters.status === 'late_cancel' && 'Late Cancel'}
                  {filters.status === 'no_show' && 'No-Show'}
                </span>
                <button
                  onClick={() => setFilters({ ...filters, status: 'all' })}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
