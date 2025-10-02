import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy, QrCode, Calendar, TrendingUp, Percent,
  DollarSign, Check, MoreVertical, Eye, Edit,
  Trash2, Power
} from 'lucide-react';
import { Coupon } from '../listadoCuponesApi';
import { EtiquetasEstado } from './EtiquetasEstado';

interface TablaCuponesProps {
  cupones: Coupon[];
  searchTerm?: string;
  filterEstado?: string;
  filterTipo?: string;
}

export const TablaCupones: React.FC<TablaCuponesProps> = ({
  cupones,
  searchTerm = '',
  filterEstado = '',
  filterTipo = ''
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtrar cupones
  const cuponeresFiltrados = cupones.filter(cupon => {
    const matchSearch = cupon.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = !filterEstado || cupon.estado === filterEstado;
    const matchTipo = !filterTipo || cupon.tipo === filterTipo;
    return matchSearch && matchEstado && matchTipo;
  });

  const copiarCodigo = (codigo: string, id: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const calcularProgreso = (usosActuales: number, limiteUsos: number) => {
    return (usosActuales / limiteUsos) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="space-y-4"
    >
      {cuponeresFiltrados.map((cupon, index) => {
        const progreso = calcularProgreso(cupon.usosActuales, cupon.limiteUsos);
        const isActivo = cupon.estado === 'activo';
        const isCaducado = cupon.estado === 'caducado';
        const isAgotado = cupon.estado === 'agotado';

        return (
          <motion.div
            key={cupon.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración lateral estilo ticket */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-10"></div>

            <div className="relative z-10 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sección Código del Cupón */}
                <div className="lg:col-span-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                      {cupon.tipo === 'porcentaje' ? (
                        <Percent className="w-5 h-5 text-white" />
                      ) : (
                        <DollarSign className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <EtiquetasEstado estado={cupon.estado} />
                  </div>

                  {/* Código del cupón - Estilo ticket */}
                  <div className="relative">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border-2 border-dashed border-orange-300">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-orange-600 mb-1">CÓDIGO</p>
                          <p className="text-2xl font-bold text-gray-900 tracking-wider font-mono">
                            {cupon.codigo}
                          </p>
                        </div>
                        <button
                          onClick={() => copiarCodigo(cupon.codigo, cupon.id)}
                          className="p-2 bg-white rounded-xl hover:bg-orange-100 transition-colors duration-300 border border-orange-200"
                          title="Copiar código"
                        >
                          {copiedId === cupon.id ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-orange-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección Detalles */}
                <div className="lg:col-span-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Valor del descuento */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <p className="text-xs font-semibold text-purple-600 uppercase">Descuento</p>
                      </div>
                      <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `$${cupon.valor}`}
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        {cupon.tipo === 'porcentaje' ? 'Porcentaje' : 'Monto fijo'}
                      </p>
                    </div>

                    {/* Fechas */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <p className="text-xs font-semibold text-blue-600 uppercase">Vigencia</p>
                      </div>
                      <p className="text-sm font-bold text-blue-900">
                        {new Date(cupon.fechaInicio).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                      </p>
                      <p className="text-xs text-blue-600">
                        hasta {new Date(cupon.fechaFin).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Progreso de usos */}
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-600 uppercase">Uso del cupón</p>
                      <p className="text-sm font-bold text-gray-900">
                        {cupon.usosActuales} / {cupon.limiteUsos}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progreso}%` }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full relative ${
                          progreso >= 90
                            ? 'bg-gradient-to-r from-red-500 to-pink-600'
                            : progreso >= 70
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-600'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {progreso.toFixed(1)}% utilizado
                      {progreso >= 90 && <span className="text-red-600 font-bold ml-2">⚠️ Próximo a agotarse</span>}
                    </p>
                  </div>
                </div>

                {/* Sección Acciones */}
                <div className="lg:col-span-3 flex flex-col justify-between">
                  {/* QR Code */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-200 text-center mb-4">
                    <div className="w-24 h-24 mx-auto bg-white rounded-xl p-2 mb-2 border-2 border-indigo-200">
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-indigo-600" />
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-indigo-600">Código QR</p>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group">
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Ver Detalles
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center gap-1 px-3 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          isActivo
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                        }`}
                      >
                        <Power className="w-4 h-4" />
                        {isActivo ? 'Off' : 'On'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Efecto de perforación estilo ticket */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-slate-50 to-orange-50 rounded-full border-2 border-white"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-gradient-to-br from-slate-50 to-orange-50 rounded-full border-2 border-white"></div>
          </motion.div>
        );
      })}

      {/* Empty state */}
      {cuponeresFiltrados.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
            <QrCode className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron cupones</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterEstado || filterTipo
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primer cupón de descuento'}
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300">
            Crear Primer Cupón
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
