import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, Calendar, User, TrendingUp, DollarSign } from 'lucide-react';
import { mockComisiones, mockAfiliados } from '../mockData';

const ReportesFinancieros: React.FC = () => {
  const [tipoReporte, setTipoReporte] = useState<'mensual' | 'anual' | 'porProducto' | 'porAfiliado'>('mensual');
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().toISOString().slice(0, 7));
  const [afiliadoSeleccionado, setAfiliadoSeleccionado] = useState('todos');

  const generarReporte = (formato: 'pdf' | 'excel' | 'email') => {
    console.log('Generando reporte:', { tipoReporte, formato, mesSeleccionado, afiliadoSeleccionado });
    alert(`Generando reporte ${tipoReporte} en formato ${formato.toUpperCase()}...`);
  };

  const tiposReporte = [
    {
      id: 'mensual',
      nombre: 'Reporte Mensual',
      descripcion: 'Total de comisiones generadas, pagadas y pendientes del mes',
      icono: Calendar,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'anual',
      nombre: 'Reporte Anual (Fiscal)',
      descripcion: 'Resumen completo del año para declaración de impuestos',
      icono: TrendingUp,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'porProducto',
      nombre: 'Reporte por Producto',
      descripcion: 'Análisis de comisiones generadas por cada producto o plan',
      icono: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'porAfiliado',
      nombre: 'Reporte Individual de Afiliado',
      descripcion: 'Historial completo de comisiones de un afiliado específico',
      icono: User,
      color: 'from-orange-500 to-red-600'
    }
  ];

  // Calcular estadísticas para preview
  const comisionesMes = mockComisiones.filter(c => c.fechaVenta.startsWith(mesSeleccionado));
  const totalGenerado = comisionesMes.reduce((sum, c) => sum + c.montoComision, 0);
  const totalPagado = comisionesMes.filter(c => c.estado === 'pagada').reduce((sum, c) => sum + c.montoComision, 0);
  const totalPendiente = comisionesMes.filter(c => c.estado !== 'pagada' && c.estado !== 'revertida').reduce((sum, c) => sum + c.montoComision, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Reportes Financieros</h2>
              <p className="text-cyan-100 text-lg">Genera reportes profesionales en PDF o Excel</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selector de Tipo de Reporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiposReporte.map((tipo, index) => {
          const Icon = tipo.icono;
          return (
            <motion.button
              key={tipo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setTipoReporte(tipo.id as any)}
              className={`p-6 rounded-3xl border-2 transition-all duration-300 text-left ${
                tipoReporte === tipo.id
                  ? `bg-gradient-to-br ${tipo.color} text-white border-transparent shadow-2xl scale-105`
                  : 'bg-white/80 backdrop-blur-xl border-white/50 text-gray-900 hover:border-gray-300'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                tipoReporte === tipo.id ? 'bg-white/20' : `bg-gradient-to-br ${tipo.color}`
              }`}>
                <Icon className={`w-7 h-7 ${tipoReporte === tipo.id ? 'text-white' : 'text-white'}`} />
              </div>
              <h3 className="font-bold text-lg mb-2">{tipo.nombre}</h3>
              <p className={`text-sm ${tipoReporte === tipo.id ? 'text-white/90' : 'text-gray-600'}`}>
                {tipo.descripcion}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Configuración del Reporte */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Configuración del Reporte</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Período */}
          {(tipoReporte === 'mensual' || tipoReporte === 'porProducto' || tipoReporte === 'porAfiliado') && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Período {tipoReporte === 'mensual' ? 'del Mes' : ''}
              </label>
              <input
                type="month"
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white font-semibold"
              />
            </div>
          )}

          {/* Afiliado (solo para reporte individual) */}
          {tipoReporte === 'porAfiliado' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Seleccionar Afiliado</label>
              <select
                value={afiliadoSeleccionado}
                onChange={(e) => setAfiliadoSeleccionado(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white font-semibold"
              >
                <option value="todos">Todos los Afiliados</option>
                {mockAfiliados.slice(0, 10).map(afiliado => (
                  <option key={afiliado.id} value={afiliado.id}>{afiliado.nombre}</option>
                ))}
              </select>
            </div>
          )}

          {/* Año (solo para reporte anual) */}
          {tipoReporte === 'anual' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Año Fiscal</label>
              <select
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white font-semibold"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          )}
        </div>

        {/* Preview del Reporte */}
        <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Vista Previa del Reporte</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Generado</p>
              <p className="text-3xl font-bold text-green-600">${totalGenerado.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Pagado</p>
              <p className="text-3xl font-bold text-blue-600">${totalPagado.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Pendiente</p>
              <p className="text-3xl font-bold text-yellow-600">${totalPendiente.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Incluirá:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Resumen ejecutivo con totales</li>
              <li>✓ Desglose detallado de comisiones</li>
              <li>✓ Gráficos de tendencias</li>
              <li>✓ Lista de transacciones</li>
              {tipoReporte === 'anual' && <li>✓ Documentación fiscal completa</li>}
              {tipoReporte === 'porAfiliado' && <li>✓ Historial completo del afiliado</li>}
            </ul>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => generarReporte('pdf')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            Generar PDF
          </button>

          <button
            onClick={() => generarReporte('excel')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Exportar Excel
          </button>

          <button
            onClick={() => generarReporte('email')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Enviar por Email
          </button>
        </div>
      </motion.div>

      {/* Reportes Recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Reportes Generados Recientemente</h3>

        <div className="space-y-3">
          {[
            { nombre: 'Reporte Mensual - Octubre 2025', fecha: '2025-10-01', tipo: 'PDF', tamaño: '2.4 MB' },
            { nombre: 'Reporte Anual - 2024', fecha: '2025-01-15', tipo: 'PDF', tamaño: '5.8 MB' },
            { nombre: 'Comisiones por Producto - Sep 2025', fecha: '2025-09-30', tipo: 'Excel', tamaño: '1.2 MB' },
            { nombre: 'Afiliado Individual - Carlos Méndez', fecha: '2025-09-15', tipo: 'PDF', tamaño: '1.8 MB' }
          ].map((reporte, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{reporte.nombre}</p>
                  <p className="text-sm text-gray-600">{reporte.fecha} • {reporte.tipo} • {reporte.tamaño}</p>
                </div>
              </div>

              <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-200 transition-colors duration-200 opacity-0 group-hover:opacity-100">
                <Download className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportesFinancieros;
