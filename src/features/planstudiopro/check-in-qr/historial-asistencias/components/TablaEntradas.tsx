// src/features/historial-asistencias/components/TablaEntradas.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, Clock, QrCode, UserPlus, Smartphone,
  Calendar, User, ChevronDown, ChevronUp, MessageSquare, CreditCard
} from 'lucide-react';
import { AttendanceEntry, Member, AttendanceStatus, CheckInMethod } from '../historialAsistenciasApi';

interface TablaEntradasProps {
  entries: AttendanceEntry[];
  onSelectMember?: (member: Member) => void;
}

export const TablaEntradas: React.FC<TablaEntradasProps> = ({ entries, onSelectMember }) => {
  const [sortField, setSortField] = useState<'fechaHora' | 'miembro' | 'clase' | 'estado'>('fechaHora');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const sortedEntries = [...entries].sort((a, b) => {
    let compareA: any = a[sortField];
    let compareB: any = b[sortField];

    if (sortField === 'miembro') {
      compareA = a.miembro.nombre;
      compareB = b.miembro.nombre;
    } else if (sortField === 'fechaHora') {
      compareA = new Date(a.fechaHora).getTime();
      compareB = new Date(b.fechaHora).getTime();
    }

    if (sortDirection === 'asc') {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = sortedEntries.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Estado badges
  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'asistio':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold">Asistió</span>
          </div>
        );
      case 'late_cancel':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold">Late Cancel</span>
          </div>
        );
      case 'no_show':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full border border-red-200">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-bold">No-Show</span>
          </div>
        );
    }
  };

  // Método de check-in badges
  const getCheckInMethodBadge = (method: CheckInMethod) => {
    const methods = {
      qr_scan: { icon: QrCode, label: 'QR Scan', color: 'blue' },
      manual: { icon: UserPlus, label: 'Manual', color: 'purple' },
      reserva: { icon: Calendar, label: 'Reserva', color: 'indigo' },
      walk_in: { icon: User, label: 'Walk-in', color: 'gray' },
      app_movil: { icon: Smartphone, label: 'App Móvil', color: 'teal' },
    };

    const config = methods[method];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-${config.color}-50 text-${config.color}-700 rounded-lg border border-${config.color}-200`}>
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold">{config.label}</span>
      </div>
    );
  };

  // Row background based on status
  const getRowBg = (status: AttendanceStatus) => {
    switch (status) {
      case 'asistio':
        return 'hover:bg-green-50/50';
      case 'late_cancel':
        return 'hover:bg-orange-50/50 bg-orange-50/20';
      case 'no_show':
        return 'hover:bg-red-50/50 bg-red-50/20';
    }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th
                onClick={() => handleSort('miembro')}
                className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Miembro
                  <SortIcon field="miembro" />
                </div>
              </th>
              <th
                onClick={() => handleSort('fechaHora')}
                className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Fecha y Hora
                  <SortIcon field="fechaHora" />
                </div>
              </th>
              <th
                onClick={() => handleSort('clase')}
                className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Clase
                  <SortIcon field="clase" />
                </div>
              </th>
              <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Coach
              </th>
              <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Check-in
              </th>
              <th
                onClick={() => handleSort('estado')}
                className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Estado
                  <SortIcon field="estado" />
                </div>
              </th>
              <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Duración
              </th>
              <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Notas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {paginatedEntries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <Calendar className="w-12 h-12 text-gray-300" />
                      <p className="text-lg font-semibold">No hay entradas para mostrar</p>
                      <p className="text-sm">Ajusta los filtros para ver más resultados</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedEntries.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.02 }}
                    className={`${getRowBg(entry.estado)} transition-colors cursor-pointer`}
                    onClick={() => onSelectMember && onSelectMember(entry.miembro)}
                  >
                    {/* Miembro */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={entry.miembro.avatar}
                          alt={entry.miembro.nombre}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900">{entry.miembro.nombre}</p>
                          <p className="text-xs text-gray-500">{entry.miembro.numeroMembresia}</p>
                        </div>
                      </div>
                    </td>

                    {/* Fecha y Hora */}
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(entry.fechaHora).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.fechaHora).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </td>

                    {/* Clase */}
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{entry.clase}</p>
                        <p className="text-xs text-gray-500">{entry.tipoClase}</p>
                      </div>
                    </td>

                    {/* Coach */}
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-700">{entry.coach}</p>
                    </td>

                    {/* Método Check-in */}
                    <td className="py-3 px-4">
                      {getCheckInMethodBadge(entry.metodoCheckin)}
                    </td>

                    {/* Estado */}
                    <td className="py-3 px-4">
                      {getStatusBadge(entry.estado)}
                    </td>

                    {/* Duración */}
                    <td className="py-3 px-4">
                      {entry.duracionEstancia ? (
                        <p className="text-sm text-gray-700">{entry.duracionEstancia} min</p>
                      ) : (
                        <p className="text-xs text-gray-400">-</p>
                      )}
                    </td>

                    {/* Notas */}
                    <td className="py-3 px-4">
                      {entry.notas ? (
                        <div className="flex items-center gap-1 text-gray-600" title={entry.notas}>
                          <MessageSquare className="w-4 h-4" />
                          <p className="text-xs truncate max-w-[100px]">{entry.notas}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400">-</p>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        {/* Items per page */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700">Mostrar:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">
            de <span className="font-bold">{sortedEntries.length}</span> registros
          </span>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Anterior
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                      : 'border-2 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
