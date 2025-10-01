import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  Eye,
  Edit,
  Play,
  Pause,
  MoreVertical,
  Flame,
  TrendingUp
} from 'lucide-react';
import { Dieta } from '../dietasListadoApi';

interface DietasTableProps {
  dietas: Dieta[];
}

export const DietasTable: React.FC<DietasTableProps> = ({ dietas }) => {
  const [sortField, setSortField] = useState<keyof Dieta | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Dieta) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDietas = [...dietas].sort((a, b) => {
    if (!sortField) return 0;

    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Handle nested objects
    if (sortField === 'cliente') {
      aValue = a.cliente.nombre;
      bValue = b.cliente.nombre;
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getEstadoBadge = (estado: string) => {
    const badges = {
      activo: 'bg-green-50 text-green-700 border-green-200',
      'en pausa': 'bg-orange-50 text-orange-700 border-orange-200',
      completado: 'bg-blue-50 text-blue-700 border-blue-200',
      pausado: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return badges[estado as keyof typeof badges] || badges.activo;
  };

  const SortIcon = ({ field }: { field: keyof Dieta }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 text-gray-300" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-lime-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-lime-600" />
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-lime-50 via-green-50 to-emerald-50 border-b-2 border-lime-200">
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('cliente' as any)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-lime-600 transition-colors"
                >
                  Cliente
                  <SortIcon field={'cliente' as any} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('objetivo' as any)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-lime-600 transition-colors"
                >
                  Objetivo
                  <SortIcon field={'objetivo' as any} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Calorías
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('fechaInicio' as any)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-lime-600 transition-colors"
                >
                  Inicio
                  <SortIcon field={'fechaInicio' as any} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Progreso
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('adherencia' as any)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-lime-600 transition-colors"
                >
                  Adherencia
                  <SortIcon field={'adherencia' as any} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('estado' as any)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-lime-600 transition-colors"
                >
                  Estado
                  <SortIcon field={'estado' as any} />
                </button>
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedDietas.map((dieta, index) => (
              <motion.tr
                key={dieta.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="hover:bg-gradient-to-r hover:from-lime-50/50 hover:to-green-50/50 transition-all duration-300 group"
              >
                {/* Cliente */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {dieta.cliente.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{dieta.cliente.nombre}</div>
                      <div className="text-xs text-gray-500">{dieta.plan}</div>
                    </div>
                  </div>
                </td>

                {/* Objetivo */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-700">{dieta.objetivo}</div>
                  <div className="text-xs text-gray-500">{dieta.nutricionista}</div>
                </td>

                {/* Calorías */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">
                    {dieta.calorias.objetivo} kcal
                  </div>
                  <div className="text-xs text-gray-500">
                    {dieta.calorias.consumidas} consumidas
                  </div>
                </td>

                {/* Fecha Inicio */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-700">
                    {new Date(dieta.fechaInicio).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500">{dieta.duracion} días</div>
                </td>

                {/* Progreso */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-700">{dieta.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${dieta.progreso}%` }}
                      ></div>
                    </div>
                  </div>
                </td>

                {/* Adherencia */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-gray-900">{dieta.adherencia}%</span>
                        {dieta.adherencia >= 90 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : dieta.adherencia >= 75 ? (
                          <TrendingUp className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
                        )}
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            dieta.adherencia >= 90
                              ? 'bg-gradient-to-r from-green-400 to-green-500'
                              : dieta.adherencia >= 75
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                              : 'bg-gradient-to-r from-red-400 to-red-500'
                          }`}
                          style={{ width: `${dieta.adherencia}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Estado */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${getEstadoBadge(
                      dieta.estado
                    )}`}
                  >
                    {dieta.estado.charAt(0).toUpperCase() + dieta.estado.slice(1)}
                  </span>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-lime-50 text-lime-600 rounded-xl hover:bg-lime-100 transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                      title={dieta.estado === 'en pausa' ? 'Reanudar' : 'Pausar'}
                    >
                      {dieta.estado === 'en pausa' ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <Pause className="w-4 h-4" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                      title="Más opciones"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-lime-50/50 via-green-50/50 to-emerald-50/50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando <span className="font-bold text-gray-900">{dietas.length}</span> dietas
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-lime-500 hover:text-lime-600 transition-all duration-300">
              Anterior
            </button>
            <button className="px-4 py-2 bg-gradient-to-br from-lime-500 to-green-500 rounded-xl text-sm font-semibold text-white shadow-lg">
              1
            </button>
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-lime-500 hover:text-lime-600 transition-all duration-300">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
