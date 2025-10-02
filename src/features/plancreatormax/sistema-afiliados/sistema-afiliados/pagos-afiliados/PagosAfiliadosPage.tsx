import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, DollarSign, Clock, CheckCircle, XCircle,
  Users, Calendar, TrendingUp, Download, Send, AlertCircle,
  FileText, Settings, Filter, Search, ChevronDown, ChevronUp,
  X, Upload, Eye, RefreshCw, Building, Zap, PieChart, BarChart3,
  Wallet, ArrowUpRight, ArrowDownRight, MoreVertical, Check, Mail
} from 'lucide-react';

// ==================== TIPOS E INTERFACES ====================

interface Afiliado {
  id: string;
  nombre: string;
  avatar: string;
  email: string;
  montoPendiente: number;
  comisionesAcumuladas: number;
  metodoPagoPreferido: 'paypal' | 'stripe' | 'banco' | 'wire' | 'cheque';
  ultimoPagoFecha: string;
  urgencia: 'normal' | 'urgente';
  datosCompletos: boolean;
  datosFaltantes?: string[];
}

interface MetodoPago {
  id: string;
  tipo: 'paypal' | 'stripe' | 'banco';
  nombre: string;
  status: 'activo' | 'inactivo' | 'error';
  configuracion: {
    email?: string;
    accountId?: string;
    cuenta?: string;
    routing?: string;
  };
  limiteDiario: number;
  tarifas: number;
  balanceDisponible?: number;
}

interface Transaccion {
  id: string;
  fecha: string;
  afiliadosIds: string[];
  afiliadosNombres: string[];
  monto: number;
  metodoPago: string;
  estado: 'completado' | 'procesando' | 'fallido' | 'revertido';
  motivoError?: string;
  tipoTransaccion: 'individual' | 'batch';
}

interface ProgramacionPago {
  id: string;
  frecuencia: 'semanal' | 'quincenal' | 'mensual';
  dia: string;
  montoMinimo: number;
  metodoPagoDefault: string;
  activo: boolean;
  proximoPago: string;
}

// ==================== DATOS MOCKEADOS ====================

const afiliadosMock: Afiliado[] = [
  { id: 'A001', nombre: 'María González', avatar: '👩', email: 'maria@email.com', montoPendiente: 1250.00, comisionesAcumuladas: 15, metodoPagoPreferido: 'paypal', ultimoPagoFecha: '2025-09-15', urgencia: 'urgente', datosCompletos: true },
  { id: 'A002', nombre: 'Carlos Ruiz', avatar: '👨', email: 'carlos@email.com', montoPendiente: 890.50, comisionesAcumuladas: 12, metodoPagoPreferido: 'stripe', ultimoPagoFecha: '2025-09-20', urgencia: 'normal', datosCompletos: true },
  { id: 'A003', nombre: 'Ana López', avatar: '👩‍💼', email: 'ana@email.com', montoPendiente: 2100.75, comisionesAcumuladas: 28, metodoPagoPreferido: 'banco', ultimoPagoFecha: '2025-09-10', urgencia: 'urgente', datosCompletos: false, datosFaltantes: ['Cuenta bancaria'] },
  { id: 'A004', nombre: 'Jorge Martínez', avatar: '🧑', email: 'jorge@email.com', montoPendiente: 650.25, comisionesAcumuladas: 8, metodoPagoPreferido: 'paypal', ultimoPagoFecha: '2025-09-25', urgencia: 'normal', datosCompletos: true },
  { id: 'A005', nombre: 'Laura Sánchez', avatar: '👩‍🦰', email: 'laura@email.com', montoPendiente: 1450.00, comisionesAcumuladas: 18, metodoPagoPreferido: 'stripe', ultimoPagoFecha: '2025-09-12', urgencia: 'urgente', datosCompletos: true },
  { id: 'A006', nombre: 'Roberto Torres', avatar: '👨‍💼', email: 'roberto@email.com', montoPendiente: 780.30, comisionesAcumuladas: 10, metodoPagoPreferido: 'paypal', ultimoPagoFecha: '2025-09-18', urgencia: 'normal', datosCompletos: false, datosFaltantes: ['Email PayPal', 'Info fiscal'] },
  { id: 'A007', nombre: 'Patricia Díaz', avatar: '👩‍⚕️', email: 'patricia@email.com', montoPendiente: 1890.00, comisionesAcumuladas: 24, metodoPagoPreferido: 'banco', ultimoPagoFecha: '2025-09-08', urgencia: 'urgente', datosCompletos: true },
  { id: 'A008', nombre: 'Miguel Ángel Rojas', avatar: '👨‍🔧', email: 'miguel@email.com', montoPendiente: 450.60, comisionesAcumuladas: 6, metodoPagoPreferido: 'paypal', ultimoPagoFecha: '2025-09-22', urgencia: 'normal', datosCompletos: true },
];

const transaccionesMock: Transaccion[] = [
  { id: 'TXN001', fecha: '2025-10-01T10:30:00', afiliadosIds: ['A001'], afiliadosNombres: ['María González'], monto: 1250.00, metodoPago: 'PayPal', estado: 'completado', tipoTransaccion: 'individual' },
  { id: 'TXN002', fecha: '2025-10-01T09:15:00', afiliadosIds: ['A002', 'A004', 'A008'], afiliadosNombres: ['Carlos Ruiz', 'Jorge Martínez', 'Miguel Rojas'], monto: 1990.35, metodoPago: 'Stripe Connect', estado: 'completado', tipoTransaccion: 'batch' },
  { id: 'TXN003', fecha: '2025-09-30T14:45:00', afiliadosIds: ['A003'], afiliadosNombres: ['Ana López'], monto: 2100.75, metodoPago: 'Transferencia Bancaria', estado: 'procesando', tipoTransaccion: 'individual' },
  { id: 'TXN004', fecha: '2025-09-30T11:20:00', afiliadosIds: ['A005', 'A007'], afiliadosNombres: ['Laura Sánchez', 'Patricia Díaz'], monto: 3340.00, metodoPago: 'PayPal', estado: 'fallido', motivoError: 'Fondos insuficientes', tipoTransaccion: 'batch' },
  { id: 'TXN005', fecha: '2025-09-29T16:00:00', afiliadosIds: ['A006'], afiliadosNombres: ['Roberto Torres'], monto: 780.30, metodoPago: 'Stripe', estado: 'completado', tipoTransaccion: 'individual' },
];

const metodosPagoMock: MetodoPago[] = [
  { id: 'MP001', tipo: 'paypal', nombre: 'PayPal Business', status: 'activo', configuracion: { email: 'business@empresa.com' }, limiteDiario: 10000, tarifas: 2.9, balanceDisponible: 15000 },
  { id: 'MP002', tipo: 'stripe', nombre: 'Stripe Connect', status: 'activo', configuracion: { accountId: 'acct_1234567890' }, limiteDiario: 50000, tarifas: 2.7, balanceDisponible: 35000 },
  { id: 'MP003', tipo: 'banco', nombre: 'Banco Principal', status: 'activo', configuracion: { cuenta: '****5678', routing: '021000021' }, limiteDiario: 100000, tarifas: 0 },
];

// ==================== COMPONENTE PRINCIPAL ====================

const PagosAfiliadosPage: React.FC = () => {
  const [afiliadosSeleccionados, setAfiliadosSeleccionados] = useState<string[]>([]);
  const [modalPagoIndividual, setModalPagoIndividual] = useState<Afiliado | null>(null);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalMetodos, setModalMetodos] = useState(false);
  const [modalProgramacion, setModalProgramacion] = useState(false);
  const [modalValidacion, setModalValidacion] = useState(false);
  const [filtroOrden, setFiltroOrden] = useState<'mayor' | 'menor'>('mayor');
  const [metodoPagoBatch, setMetodoPagoBatch] = useState('paypal');
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split('T')[0]);
  const [notaInterna, setNotaInterna] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Cálculos
  const afiliadosFiltrados = afiliadosMock
    .filter(a => a.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => filtroOrden === 'mayor' ? b.montoPendiente - a.montoPendiente : a.montoPendiente - b.montoPendiente);

  const totalAPagarHoy = afiliadosMock.reduce((sum, a) => sum + a.montoPendiente, 0);
  const pagosProcesadosMes = transaccionesMock.filter(t => t.estado === 'completado').length;
  const metodosActivos = metodosPagoMock.filter(m => m.status === 'activo').length;
  const afiliadosSinDatos = afiliadosMock.filter(a => !a.datosCompletos);

  const totalSeleccionado = afiliadosMock
    .filter(a => afiliadosSeleccionados.includes(a.id))
    .reduce((sum, a) => sum + a.montoPendiente, 0);

  // Handlers
  const toggleSeleccion = (id: string) => {
    setAfiliadosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const seleccionarTodos = () => {
    setAfiliadosSeleccionados(afiliadosFiltrados.map(a => a.id));
  };

  const deseleccionarTodos = () => {
    setAfiliadosSeleccionados([]);
  };

  const procesarPagoMasivo = () => {
    setModalConfirmacion(true);
  };

  const confirmarPagoMasivo = () => {
    // Lógica de procesamiento
    alert(`Procesando ${afiliadosSeleccionados.length} pagos por ${metodoPagoBatch}`);
    setModalConfirmacion(false);
    setAfiliadosSeleccionados([]);
  };

  const getMetodoIcon = (metodo: string) => {
    switch (metodo) {
      case 'paypal': return <Wallet className="w-5 h-5 text-blue-500" />;
      case 'stripe': return <CreditCard className="w-5 h-5 text-purple-500" />;
      case 'banco': return <Building className="w-5 h-5 text-green-500" />;
      case 'wire': return <Zap className="w-5 h-5 text-orange-500" />;
      case 'cheque': return <FileText className="w-5 h-5 text-gray-500" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completado': return 'bg-green-500';
      case 'procesando': return 'bg-yellow-500';
      case 'fallido': return 'bg-red-500';
      case 'revertido': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 pb-12">

      {/* ==================== HERO SECTION ==================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <DollarSign className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Pagos a <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Afiliados</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Procesa pagos <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">rápidamente</span> y sin errores
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Pagos Automáticos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Procesamiento Instantáneo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== ESTADÍSTICAS RÁPIDAS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total a Pagar Hoy', value: `$${totalAPagarHoy.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'from-green-500 to-emerald-600', change: '+8.2%' },
          { title: 'Pagos Procesados (Mes)', value: pagosProcesadosMes.toString(), icon: CheckCircle, color: 'from-blue-500 to-indigo-600', change: '+15.5%' },
          { title: 'Métodos Activos', value: metodosActivos.toString(), icon: CreditCard, color: 'from-purple-500 to-pink-600', change: '100%' },
          { title: 'Próximo Pago', value: 'Viernes 4 Oct', icon: Calendar, color: 'from-orange-500 to-red-600', change: '2 días' },
        ].map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alertas de validación */}
      {afiliadosSinDatos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-4 mb-6 flex items-start gap-3"
        >
          <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-orange-900">Datos Incompletos Detectados</p>
            <p className="text-sm text-orange-700">{afiliadosSinDatos.length} afiliados requieren completar información de pago antes de procesar.</p>
            <button
              onClick={() => setModalValidacion(true)}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm"
            >
              Ver Detalles
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ==================== COLA DE PAGOS PENDIENTES ==================== */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-7 h-7 text-cyan-600" />
                  Cola de Pagos Pendientes
                </h2>
                <p className="text-sm text-gray-600 mt-1">{afiliadosFiltrados.length} afiliados esperando pago</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFiltroOrden(filtroOrden === 'mayor' ? 'menor' : 'mayor')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {filtroOrden === 'mayor' ? 'Mayor primero' : 'Menor primero'}
                </button>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="mb-4 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar afiliado..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80"
              />
            </div>

            {/* Controles de selección */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={seleccionarTodos}
                className="px-3 py-1.5 text-sm font-semibold text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
              >
                Seleccionar todo
              </button>
              <button
                onClick={deseleccionarTodos}
                className="px-3 py-1.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Deseleccionar
              </button>
              {afiliadosSeleccionados.length > 0 && (
                <span className="px-3 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  {afiliadosSeleccionados.length} seleccionados
                </span>
              )}
            </div>

            {/* Lista de afiliados */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {afiliadosFiltrados.map((afiliado, index) => (
                <motion.div
                  key={afiliado.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    afiliadosSeleccionados.includes(afiliado.id)
                      ? 'border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md'
                      : 'border-gray-200 bg-white/50 hover:border-cyan-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={afiliadosSeleccionados.includes(afiliado.id)}
                        onChange={() => toggleSeleccion(afiliado.id)}
                        className="w-5 h-5 rounded-lg border-2 border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                      />
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {afiliado.avatar}
                    </div>

                    {/* Info principal */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900">{afiliado.nombre}</p>
                        {!afiliado.datosCompletos && (
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{afiliado.email}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{afiliado.comisionesAcumuladas} comisiones</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">Último: {new Date(afiliado.ultimoPagoFecha).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Monto y método */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-green-600">${afiliado.montoPendiente.toFixed(2)}</p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        {getMetodoIcon(afiliado.metodoPagoPreferido)}
                        <span className="text-xs text-gray-500 capitalize">{afiliado.metodoPagoPreferido}</span>
                      </div>
                    </div>

                    {/* Badge de urgencia */}
                    <div className="flex-shrink-0">
                      {afiliado.urgencia === 'urgente' ? (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Urgente
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          Normal
                        </span>
                      )}
                    </div>

                    {/* Botón pago individual */}
                    <button
                      onClick={() => setModalPagoIndividual(afiliado)}
                      className="flex-shrink-0 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ==================== SIDEBAR DERECHO ==================== */}
        <div className="space-y-6">

          {/* PROCESADOR DE PAGO MASIVO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Pago Masivo
              </h3>

              {afiliadosSeleccionados.length > 0 ? (
                <>
                  {/* Afiliados seleccionados */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Afiliados seleccionados:</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {afiliadosMock
                        .filter(a => afiliadosSeleccionados.includes(a.id))
                        .slice(0, 5)
                        .map(a => (
                          <span key={a.id} className="text-2xl">{a.avatar}</span>
                        ))}
                      {afiliadosSeleccionados.length > 5 && (
                        <span className="text-sm font-bold text-cyan-600">+{afiliadosSeleccionados.length - 5}</span>
                      )}
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      ${totalSeleccionado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  {/* Método de pago */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Método de Pago</label>
                    <select
                      value={metodoPagoBatch}
                      onChange={(e) => setMetodoPagoBatch(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white"
                    >
                      <option value="paypal">PayPal (Batch Payment)</option>
                      <option value="stripe">Stripe Connect</option>
                      <option value="banco">Transferencia Bancaria</option>
                      <option value="wire">Wire Transfer</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </div>

                  {/* Fecha de pago */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Pago</label>
                    <input
                      type="date"
                      value={fechaPago}
                      onChange={(e) => setFechaPago(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white"
                    />
                  </div>

                  {/* Nota interna */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nota Interna</label>
                    <textarea
                      value={notaInterna}
                      onChange={(e) => setNotaInterna(e.target.value)}
                      rows={3}
                      placeholder="Agrega una nota..."
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white resize-none"
                    />
                  </div>

                  {/* Validaciones */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Fondos suficientes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Datos de pago completos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Sin pagos duplicados</span>
                    </div>
                  </div>

                  {/* Botón procesar */}
                  <button
                    onClick={procesarPagoMasivo}
                    className="w-full relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold text-lg group"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <DollarSign className="w-6 h-6" />
                      Procesar {afiliadosSeleccionados.length} pagos
                    </div>
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Selecciona afiliados para procesar pagos en lote</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* MÉTODOS DE PAGO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-600" />
                Métodos de Pago
              </h3>
              <button
                onClick={() => setModalMetodos(true)}
                className="text-sm text-cyan-600 font-semibold hover:text-cyan-700"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-3">
              {metodosPagoMock.slice(0, 2).map((metodo, index) => (
                <div key={metodo.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getMetodoIcon(metodo.tipo)}
                      <span className="font-bold text-gray-900">{metodo.nombre}</span>
                    </div>
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      {metodo.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tarifa: {metodo.tarifas}%</span>
                    {metodo.balanceDisponible && (
                      <span className="text-green-600 font-semibold">
                        ${metodo.balanceDisponible.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PROGRAMACIÓN */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-600" />
              Próximo Pago Programado
            </h3>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Viernes, 4 de Octubre</p>
              <p className="text-2xl font-bold text-orange-600">15:00 PM</p>
              <p className="text-sm text-gray-600 mt-2">Frecuencia: Semanal</p>
            </div>

            <button
              onClick={() => setModalProgramacion(true)}
              className="w-full px-4 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
            >
              Configurar Pagos Automáticos
            </button>
          </motion.div>
        </div>
      </div>

      {/* ==================== HISTORIAL DE TRANSACCIONES ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-7 h-7 text-indigo-600" />
            Historial de Transacciones
          </h2>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Afiliados</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Monto</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Método</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {transaccionesMock.map((txn, index) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
                >
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-bold text-gray-900">{txn.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">{new Date(txn.fecha).toLocaleDateString()}</p>
                      <p className="text-gray-500">{new Date(txn.fecha).toLocaleTimeString()}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      {txn.tipoTransaccion === 'batch' ? (
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{txn.afiliadosNombres.length} afiliados</p>
                          <p className="text-xs text-gray-500">{txn.afiliadosNombres[0]}, ...</p>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold text-gray-900">{txn.afiliadosNombres[0]}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-lg font-bold text-green-600">${txn.monto.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getMetodoIcon(txn.metodoPago.toLowerCase())}
                      <span className="text-sm font-medium text-gray-700">{txn.metodoPago}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getEstadoColor(txn.estado)}`}></div>
                      <span className={`text-sm font-semibold capitalize ${
                        txn.estado === 'completado' ? 'text-green-600' :
                        txn.estado === 'procesando' ? 'text-yellow-600' :
                        txn.estado === 'fallido' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {txn.estado}
                      </span>
                    </div>
                    {txn.motivoError && (
                      <p className="text-xs text-red-500 mt-1">{txn.motivoError}</p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      {txn.estado === 'fallido' && (
                        <button className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ==================== ANÁLISIS DE PAGOS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Gráfico de pagos mensuales */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Pagos Mensuales
          </h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 80, 75, 90, 85, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg"
                ></motion.div>
                <span className="text-xs text-gray-500 mt-2">M{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por método */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-purple-600" />
            Distribución por Método
          </h3>
          <div className="space-y-4">
            {[
              { metodo: 'PayPal', porcentaje: 45, color: 'bg-blue-500' },
              { metodo: 'Stripe', porcentaje: 35, color: 'bg-purple-500' },
              { metodo: 'Banco', porcentaje: 20, color: 'bg-green-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{item.metodo}</span>
                  <span className="text-sm font-bold text-gray-900">{item.porcentaje}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.porcentaje}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                    className={`h-full ${item.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <p className="text-sm font-semibold text-gray-700">Promedio por afiliado</p>
            <p className="text-3xl font-bold text-purple-600">$1,125.00</p>
          </div>
        </div>
      </motion.div>

      {/* ==================== MODAL PAGO INDIVIDUAL ==================== */}
      <AnimatePresence>
        {modalPagoIndividual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setModalPagoIndividual(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative"
            >
              <button
                onClick={() => setModalPagoIndividual(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pago Individual</h3>

              <div className="mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                    {modalPagoIndividual.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{modalPagoIndividual.nombre}</p>
                    <p className="text-sm text-gray-600">{modalPagoIndividual.email}</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-600">${modalPagoIndividual.montoPendiente.toFixed(2)}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monto a Pagar</label>
                  <input
                    type="number"
                    defaultValue={modalPagoIndividual.montoPendiente}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Método de Pago</label>
                  <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none">
                    <option>PayPal</option>
                    <option>Stripe</option>
                    <option>Transferencia Bancaria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Referencia/ID Transacción</label>
                  <input
                    type="text"
                    placeholder="TXN123456"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Comprobante (opcional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Subir archivo</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notas</label>
                  <textarea
                    rows={3}
                    placeholder="Notas adicionales..."
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setModalPagoIndividual(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Pago individual procesado');
                    setModalPagoIndividual(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Confirmar Pago
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL CONFIRMACIÓN BATCH ==================== */}
      <AnimatePresence>
        {modalConfirmacion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setModalConfirmacion(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirmar Pago Masivo</h3>
                <p className="text-gray-600">Estás a punto de procesar múltiples pagos</p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Afiliados</p>
                    <p className="text-2xl font-bold text-gray-900">{afiliadosSeleccionados.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-green-600">${totalSeleccionado.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-cyan-200">
                  <p className="text-sm text-gray-600">Método: <span className="font-bold text-gray-900 capitalize">{metodoPagoBatch}</span></p>
                  <p className="text-sm text-gray-600">Fecha: <span className="font-bold text-gray-900">{new Date(fechaPago).toLocaleDateString()}</span></p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setModalConfirmacion(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarPagoMasivo}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL VALIDACIÓN ==================== */}
      <AnimatePresence>
        {modalValidacion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setModalValidacion(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Validación de Datos</h3>
                <button
                  onClick={() => setModalValidacion(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {afiliadosSinDatos.map((afiliado) => (
                  <div key={afiliado.id} className="p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white text-lg font-bold">
                          {afiliado.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{afiliado.nombre}</p>
                          <p className="text-sm text-gray-600">{afiliado.email}</p>
                        </div>
                      </div>
                      <AlertCircle className="w-6 h-6 text-orange-500" />
                    </div>
                    <p className="text-sm font-semibold text-orange-900 mb-2">Datos faltantes:</p>
                    <ul className="space-y-1">
                      {afiliado.datosFaltantes?.map((dato, i) => (
                        <li key={i} className="text-sm text-orange-700 flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          {dato}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-3 w-full px-4 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm">
                      Enviar Recordatorio
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PagosAfiliadosPage;
