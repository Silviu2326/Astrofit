import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, TrendingUp, ArrowUpDown, ArrowUp, ArrowDown, Award } from 'lucide-react';

interface RendimientoCajero {
  id: string;
  nombre: string;
  avatar?: string;
  ticketsProcesados: number;
  totalVendido: number;
  ticketPromedio: number;
  reembolsos: number;
}

interface AnalisisPorCajeroProps {
  datos: RendimientoCajero[];
}

type OrdenColumna = 'ticketsProcesados' | 'totalVendido' | 'ticketPromedio' | 'reembolsos';

const AnalisisPorCajero: React.FC<AnalisisPorCajeroProps> = ({ datos }) => {
  const [ordenColumna, setOrdenColumna] = useState<OrdenColumna>('totalVendido');
  const [ordenAscendente, setOrdenAscendente] = useState(false);

  // Ordenar datos
  const datosOrdenados = [...datos].sort((a, b) => {
    const valorA = a[ordenColumna];
    const valorB = b[ordenColumna];
    return ordenAscendente ? valorA - valorB : valorB - valorA;
  });

  // Encontrar el mejor cajero
  const mejorCajero = datos.reduce((max, cajero) =>
    cajero.totalVendido > max.totalVendido ? cajero : max
  , datos[0]);

  const toggleOrden = (columna: OrdenColumna) => {
    if (ordenColumna === columna) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setOrdenColumna(columna);
      setOrdenAscendente(false);
    }
  };

  const getAvatarColor = (index: number) => {
    const colores = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-green-500 to-emerald-600',
      'from-orange-500 to-red-600',
      'from-teal-500 to-cyan-600',
      'from-rose-500 to-pink-600',
    ];
    return colores[index % colores.length];
  };

  const IconoOrden = ({ columna }: { columna: OrdenColumna }) => {
    if (ordenColumna !== columna) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return ordenAscendente ?
      <ArrowUp className="w-4 h-4 text-indigo-600" /> :
      <ArrowDown className="w-4 h-4 text-indigo-600" />;
  };

  // Calcular totales
  const totalTickets = datos.reduce((sum, c) => sum + c.ticketsProcesados, 0);
  const totalVentas = datos.reduce((sum, c) => sum + c.totalVendido, 0);
  const totalReembolsos = datos.reduce((sum, c) => sum + c.reembolsos, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden relative group"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Rendimiento por Cajero</h3>
              <p className="text-emerald-100 text-sm mt-1">Análisis de desempeño del equipo</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <Award className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold text-white">
              {datos.length} cajeros
            </span>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 relative z-10">
        {/* Banner del mejor cajero */}
        {mejorCajero && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-yellow-200"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                  {mejorCajero.avatar || mejorCajero.nombre.charAt(0)}
                </div>
                <div className="absolute -top-2 -right-2 p-1.5 bg-yellow-400 rounded-full shadow-lg">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600 mb-1">Mejor Desempeño</p>
                <p className="text-xl font-bold text-gray-900">{mejorCajero.nombre}</p>
                <p className="text-sm text-gray-600 mt-1">
                  ${mejorCajero.totalVendido.toFixed(2)} en ventas • {mejorCajero.ticketsProcesados} tickets
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl px-4 py-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-lg font-bold text-white">
                  ${mejorCajero.ticketPromedio.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Cajero
                </th>
                <th
                  className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => toggleOrden('ticketsProcesados')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Tickets</span>
                    <IconoOrden columna="ticketsProcesados" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => toggleOrden('totalVendido')}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span>Total Vendido</span>
                    <IconoOrden columna="totalVendido" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => toggleOrden('ticketPromedio')}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span>Ticket Promedio</span>
                    <IconoOrden columna="ticketPromedio" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => toggleOrden('reembolsos')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Reembolsos</span>
                    <IconoOrden columna="reembolsos" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {datosOrdenados.map((cajero, index) => (
                <motion.tr
                  key={cajero.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 transition-all duration-300"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getAvatarColor(index)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {cajero.avatar || cajero.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{cajero.nombre}</p>
                        {cajero === mejorCajero && (
                          <div className="flex items-center gap-1 mt-1">
                            <Award className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="text-xs font-semibold text-yellow-600">Top Performer</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-indigo-50 rounded-lg">
                      <span className="text-sm font-bold text-indigo-700">
                        {cajero.ticketsProcesados}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      ${cajero.totalVendido.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-green-600">
                      ${cajero.ticketPromedio.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {cajero.reembolsos > 0 ? (
                      <div className="inline-flex items-center justify-center px-3 py-1 bg-red-50 border border-red-200 rounded-lg">
                        <span className="text-sm font-bold text-red-700">
                          {cajero.reembolsos}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>

            {/* Fila de totales */}
            <tfoot>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-t-2 border-gray-300">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900 uppercase">Totales</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-bold text-indigo-700">{totalTickets}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-gray-900">${totalVentas.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-green-600">
                    ${(totalVentas / totalTickets).toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-bold text-red-700">{totalReembolsos}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Estadísticas adicionales */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100"
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">Tickets Promedio/Cajero</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {(totalTickets / datos.length).toFixed(0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100"
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">Ventas Promedio/Cajero</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              ${(totalVentas / datos.length).toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 border border-red-100"
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">Tasa de Reembolso</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
              {((totalReembolsos / totalTickets) * 100).toFixed(1)}%
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisPorCajero;
