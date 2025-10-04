import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, TrendingUp, TrendingDown, Users,
  Clock, CheckCircle, Phone, Mail, Gift, MessageSquare,
  BarChart3, Calendar, Download, Settings, Eye, X,
  ArrowUp, ArrowDown, Minus, ChevronDown, Filter,
  DollarSign, Target, Award, Zap, Bell, Activity,
  RefreshCw, Heart, UserCheck, UserX, TrendingDown as TrendDown,
  Sparkles, RotateCcw, PlayCircle, AlertCircle
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  ComposedChart
} from 'recharts';

// ==================== TIPOS ====================
interface Cliente {
  id: string;
  nombre: string;
  avatar: string;
  ltv: number;
  probabilidadChurn: number;
  diasSinActividad: number;
  adherencia: number;
  ultimoContacto: string;
  nivelRiesgo: 'muy-alto' | 'alto' | 'medio' | 'bajo' | 'estable';
  razonRiesgo: string;
  factoresRiesgo: { factor: string; peso: number }[];
  historialActividad: { fecha: string; sesiones: number }[];
  interacciones: { fecha: string; tipo: string; resultado: string }[];
  tendenciaEngagement: number[];
}

interface Alerta {
  id: string;
  tipo: 'alta' | 'media' | 'baja';
  titulo: string;
  descripcion: string;
  cliente?: Cliente;
  timestamp: string;
  atendida: boolean;
}

// ==================== DATOS MOCKEADOS ====================
const generarClientesMock = (): Cliente[] => {
  const nombres = [
    'Ana García', 'Carlos Ruiz', 'María López', 'Juan Pérez', 'Laura Martín',
    'Pedro Sánchez', 'Carmen Torres', 'Miguel Ángel', 'Isabel Rodríguez', 'Francisco Gómez',
    'Elena Fernández', 'David Díaz', 'Lucía Moreno', 'Javier Álvarez', 'Sara Romero',
    'Antonio Navarro', 'Patricia Jiménez', 'Roberto Muñoz', 'Cristina Herrera', 'Manuel Iglesias',
    'Rosa Ortiz', 'José Luis Castro', 'Natalia Rubio', 'Sergio Ramos', 'Alicia Molina'
  ];

  const razones = [
    'Baja adherencia últimas 3 semanas',
    'Sin actividad prolongada',
    'No responde a mensajes',
    'Queja sobre equipamiento',
    'Cambio de rutina detectado',
    'Reducción drástica de sesiones',
    'Objetivo sin progreso visible',
    'Problemas de horarios',
    'Insatisfacción con entrenador',
    'Comparación con competencia'
  ];

  return Array.from({ length: 150 }, (_, i) => {
    const probChurn = Math.random() * 100;
    let nivelRiesgo: Cliente['nivelRiesgo'];
    if (probChurn > 70) nivelRiesgo = 'muy-alto';
    else if (probChurn > 50) nivelRiesgo = 'alto';
    else if (probChurn > 30) nivelRiesgo = 'medio';
    else if (probChurn > 15) nivelRiesgo = 'bajo';
    else nivelRiesgo = 'estable';

    const adherencia = nivelRiesgo === 'muy-alto' ? Math.random() * 40 :
                       nivelRiesgo === 'alto' ? 40 + Math.random() * 20 :
                       nivelRiesgo === 'medio' ? 60 + Math.random() * 20 :
                       80 + Math.random() * 20;

    const diasInactivo = nivelRiesgo === 'muy-alto' ? Math.floor(10 + Math.random() * 20) :
                         nivelRiesgo === 'alto' ? Math.floor(5 + Math.random() * 10) :
                         Math.floor(Math.random() * 5);

    return {
      id: `cliente-${i + 1}`,
      nombre: nombres[i % nombres.length] + ` ${i > 24 ? Math.floor(i / 25) : ''}`.trim(),
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      ltv: Math.floor(1000 + Math.random() * 9000),
      probabilidadChurn: Math.round(probChurn * 10) / 10,
      diasSinActividad: diasInactivo,
      adherencia: Math.round(adherencia * 10) / 10,
      ultimoContacto: new Date(Date.now() - diasInactivo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nivelRiesgo,
      razonRiesgo: razones[Math.floor(Math.random() * razones.length)],
      factoresRiesgo: [
        { factor: 'Baja adherencia reciente', peso: 30 + Math.random() * 20 },
        { factor: 'Sin actividad prolongada', peso: 20 + Math.random() * 15 },
        { factor: 'No responde mensajes', peso: 10 + Math.random() * 20 },
        { factor: 'Sin progreso en objetivo', peso: 10 + Math.random() * 15 }
      ].sort((a, b) => b.peso - a.peso),
      historialActividad: Array.from({ length: 12 }, (_, j) => ({
        fecha: new Date(Date.now() - (11 - j) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        sesiones: Math.floor(Math.random() * 5) + (nivelRiesgo === 'estable' ? 2 : 0)
      })),
      interacciones: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, k) => ({
        fecha: new Date(Date.now() - k * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tipo: ['Email', 'Llamada', 'WhatsApp', 'Presencial'][Math.floor(Math.random() * 4)],
        resultado: ['Positivo', 'Neutral', 'Sin respuesta'][Math.floor(Math.random() * 3)]
      })),
      tendenciaEngagement: Array.from({ length: 8 }, () => Math.floor(Math.random() * 100))
    };
  }).sort((a, b) => b.probabilidadChurn - a.probabilidadChurn);
};

const datosRetencionTiempo = Array.from({ length: 12 }, (_, i) => ({
  mes: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i],
  retencion: 75 + Math.random() * 15,
  churn: 10 + Math.random() * 10,
  activos: 800 + Math.floor(Math.random() * 200)
}));

const factoresChurn = [
  { factor: 'Baja adherencia (<50%)', porcentaje: 35, color: '#ef4444' },
  { factor: 'Inactividad >14 días', porcentaje: 25, color: '#f97316' },
  { factor: 'Sin objetivo claro', porcentaje: 15, color: '#f59e0b' },
  { factor: 'Problemas técnicos', porcentaje: 12, color: '#eab308' },
  { factor: 'Insatisfacción entrenamientos', porcentaje: 8, color: '#84cc16' },
  { factor: 'Otros', porcentaje: 5, color: '#22c55e' }
];

const datosCohortesRetention = Array.from({ length: 6 }, (_, i) => ({
  cohorte: `${['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'][i]} 2024`,
  mes0: 100,
  mes1: 92 - i * 2,
  mes2: 85 - i * 3,
  mes3: 78 - i * 4,
  mes4: 72 - i * 4,
  mes5: 68 - i * 5
}));

// ==================== COMPONENTE PRINCIPAL ====================
const RetencionClientesPage: React.FC = () => {
  const [clientes] = useState<Cliente[]>(generarClientesMock());
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [filtroRiesgo, setFiltroRiesgo] = useState<string>('todos');
  const [filtroAlertas, setFiltroAlertas] = useState<string>('todas');
  const [paginaActual, setPaginaActual] = useState(1);
  const clientesPorPagina = 10;

  // Generar alertas
  const alertas: Alerta[] = useMemo(() => {
    const alerts: Alerta[] = [];

    // Alertas de alto riesgo
    clientes.filter(c => c.probabilidadChurn > 70).slice(0, 5).forEach((cliente, i) => {
      alerts.push({
        id: `alert-alta-${i}`,
        tipo: 'alta',
        titulo: 'Cliente de alto valor en riesgo crítico',
        descripcion: `${cliente.nombre} (LTV €${cliente.ltv}) tiene ${cliente.probabilidadChurn}% probabilidad de churn`,
        cliente,
        timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
        atendida: false
      });
    });

    // Alertas de adherencia
    clientes.filter(c => c.adherencia < 40 && c.ltv > 3000).slice(0, 3).forEach((cliente, i) => {
      alerts.push({
        id: `alert-media-${i}`,
        tipo: 'media',
        titulo: 'Adherencia cayendo significativamente',
        descripcion: `${cliente.nombre} bajó a ${cliente.adherencia}% de adherencia`,
        cliente,
        timestamp: new Date(Date.now() - (i + 5) * 60 * 60 * 1000).toISOString(),
        atendida: false
      });
    });

    // Alertas de inactividad
    const inactivos = clientes.filter(c => c.diasSinActividad >= 7).length;
    alerts.push({
      id: 'alert-baja-1',
      tipo: 'baja',
      titulo: `${inactivos} clientes sin actividad 7+ días`,
      descripcion: 'Considera enviar recordatorios automáticos',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      atendida: false
    });

    return alerts.sort((a, b) => {
      const prioridad = { alta: 3, media: 2, baja: 1 };
      return prioridad[b.tipo] - prioridad[a.tipo];
    });
  }, [clientes]);

  // KPIs calculados
  const kpis = useMemo(() => {
    const total = clientes.length;
    const retenidos = clientes.filter(c => c.probabilidadChurn < 50).length;
    const tasaRetencion = (retenidos / total) * 100;
    const tasaChurn = 100 - tasaRetencion;
    const enRiesgo = clientes.filter(c => c.probabilidadChurn > 50).length;
    const diasPromedio = clientes.reduce((sum, c) => sum + (365 - c.diasSinActividad), 0) / total;
    const salvadosMes = Math.floor(total * 0.05);
    const impactoEconomico = salvadosMes * 2500;

    return {
      tasaRetencion,
      tasaChurn,
      enRiesgo,
      diasPromedio: Math.floor(diasPromedio),
      salvadosMes,
      impactoEconomico,
      cambioRetencion: 2.3,
      cambioChurn: -1.8,
      tasaRecuperacion: 42.5
    };
  }, [clientes]);

  // Segmentación por riesgo
  const segmentacion = useMemo(() => {
    const grupos = {
      muyAlto: clientes.filter(c => c.nivelRiesgo === 'muy-alto'),
      alto: clientes.filter(c => c.nivelRiesgo === 'alto'),
      medio: clientes.filter(c => c.nivelRiesgo === 'medio'),
      bajo: clientes.filter(c => c.nivelRiesgo === 'bajo'),
      estable: clientes.filter(c => c.nivelRiesgo === 'estable')
    };

    return {
      muyAlto: {
        cantidad: grupos.muyAlto.length,
        ltv: grupos.muyAlto.reduce((sum, c) => sum + c.ltv, 0)
      },
      alto: {
        cantidad: grupos.alto.length,
        ltv: grupos.alto.reduce((sum, c) => sum + c.ltv, 0)
      },
      medio: {
        cantidad: grupos.medio.length,
        ltv: grupos.medio.reduce((sum, c) => sum + c.ltv, 0)
      },
      bajo: {
        cantidad: grupos.bajo.length,
        ltv: grupos.bajo.reduce((sum, c) => sum + c.ltv, 0)
      },
      estable: {
        cantidad: grupos.estable.length,
        ltv: grupos.estable.reduce((sum, c) => sum + c.ltv, 0)
      }
    };
  }, [clientes]);

  // Filtrado y paginación
  const clientesFiltrados = useMemo(() => {
    if (filtroRiesgo === 'todos') return clientes;
    return clientes.filter(c => c.nivelRiesgo === filtroRiesgo);
  }, [clientes, filtroRiesgo]);

  const clientesPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * clientesPorPagina;
    return clientesFiltrados.slice(inicio, inicio + clientesPorPagina);
  }, [clientesFiltrados, paginaActual]);

  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  const alertasFiltradas = useMemo(() => {
    if (filtroAlertas === 'todas') return alertas;
    return alertas.filter(a => a.tipo === filtroAlertas);
  }, [alertas, filtroAlertas]);

  // Helpers
  const getColorRiesgo = (nivel: string) => {
    const colores = {
      'muy-alto': 'bg-red-500 text-white',
      'alto': 'bg-orange-500 text-white',
      'medio': 'bg-yellow-500 text-white',
      'bajo': 'bg-green-500 text-white',
      'estable': 'bg-emerald-600 text-white'
    };
    return colores[nivel as keyof typeof colores] || 'bg-gray-500 text-white';
  };

  const getColorAlerta = (tipo: string) => {
    const colores = {
      'alta': 'border-red-500 bg-red-50',
      'media': 'border-orange-500 bg-orange-50',
      'baja': 'border-yellow-500 bg-yellow-50'
    };
    return colores[tipo as keyof typeof colores] || '';
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/30 pb-12">
      {/* ==================== HERO SECTION ==================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <RotateCcw className="w-10 h-10 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Análisis de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Retención</span>
                </h1>
              </div>

              {/* Descripción */}
              <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
                Mantén a tus clientes <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">comprometidos y leales</span>
              </p>

              {/* Indicadores pills */}
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <Heart className="w-5 h-5 text-pink-300" />
                  <span className="text-sm font-semibold text-white">Retención Activa</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <AlertTriangle className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold text-white">{kpis.enRiesgo} En Riesgo</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <Zap className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-semibold text-white">Early Warning ON</span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl border border-white/30 hover:bg-white/30 transition-all shadow-xl"
              >
                <Download className="w-5 h-5" />
                Exportar Reporte
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all shadow-xl"
              >
                <Settings className="w-5 h-5" />
                Configurar
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== ESTADÍSTICAS RÁPIDAS (4 CARDS) ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Tasa de Retención */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Icono */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <UserCheck className="w-8 h-8" />
            </div>

            {/* Título */}
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Tasa de Retención
            </p>

            {/* Valor */}
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {kpis.tasaRetencion.toFixed(1)}%
            </p>

            {/* Cambio */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+{kpis.cambioRetencion}%</span>
              <span className="text-xs text-gray-500 font-medium">vs anterior</span>
            </div>

            {/* Barra decorativa */}
            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${kpis.tasaRetencion}%` }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Churn Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <UserX className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Churn Rate
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {kpis.tasaChurn.toFixed(1)}%
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowDown className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">{Math.abs(kpis.cambioChurn)}%</span>
              <span className="text-xs text-gray-500 font-medium">mejorado</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${kpis.tasaChurn}%` }}
                transition={{ delay: 0.7, duration: 1 }}
                className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Clientes en Riesgo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Clientes en Riesgo
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {kpis.enRiesgo}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-orange-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm font-bold text-orange-600">Alto impacto</span>
              <span className="text-xs text-gray-500 font-medium">LTV alto</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(kpis.enRiesgo / clientes.length) * 100}%` }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* MRR Retenido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              MRR Retenido
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              €{kpis.impactoEconomico.toLocaleString()}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-bold text-emerald-600">{kpis.salvadosMes} salvados</span>
              <span className="text-xs text-gray-500 font-medium">este mes</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ delay: 0.9, duration: 1 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== CURVA DE RETENCIÓN CON BENCHMARKS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 -mx-6 -mt-6 mb-6 p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Curva de Retención & Benchmarks
            </h3>

            <div className="flex gap-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-sm font-semibold text-white">Industria: 75%</span>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-sm font-semibold text-white">Tu promedio: {kpis.tasaRetencion.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={datosRetencionTiempo}>
                <defs>
                  <linearGradient id="colorRetencion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="mes"
                  stroke="#64748b"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />

                {/* Línea de benchmark industria */}
                <Line
                  type="monotone"
                  dataKey={() => 75}
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Benchmark Industria"
                  dot={false}
                />

                {/* Área de retención */}
                <Area
                  type="monotone"
                  dataKey="retencion"
                  stroke="#10b981"
                  strokeWidth={4}
                  fill="url(#colorRetencion)"
                  name="Retención (%)"
                  dot={{ fill: '#10b981', r: 6, strokeWidth: 2, stroke: '#fff' }}
                />

                {/* Área de churn */}
                <Area
                  type="monotone"
                  dataKey="churn"
                  stroke="#ef4444"
                  strokeWidth={4}
                  fill="url(#colorChurn)"
                  name="Churn (%)"
                  dot={{ fill: '#ef4444', r: 6, strokeWidth: 2, stroke: '#fff' }}
                />

                {/* Línea de clientes activos */}
                <Line
                  type="monotone"
                  dataKey="activos"
                  stroke="#f97316"
                  strokeWidth={3}
                  name="Clientes Activos"
                  yAxisId="right"
                  dot={{ fill: '#f97316', r: 5 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#f97316"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Predicción */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-green-700">Tendencia Positiva</span>
              </div>
              <p className="text-xs text-green-600">+{kpis.cambioRetencion}% mejora en retención últimos 30 días</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-700">Proyección 90 días</span>
              </div>
              <p className="text-xs text-blue-600">Retención estimada: {(kpis.tasaRetencion + 3.5).toFixed(1)}%</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-bold text-orange-700">Objetivo Año</span>
              </div>
              <p className="text-xs text-orange-600">Meta: 85% | Falta: {(85 - kpis.tasaRetencion).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== ANÁLISIS DE CHURN MEJORADO ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Razones de Churn */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg">
                <TrendDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Razones de Cancelación</h3>
                <p className="text-sm text-slate-600">Análisis de factores de churn</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {factoresChurn.map((factor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: factor.color }}
                      ></div>
                      <span className="text-sm font-medium text-slate-700">{factor.factor}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{factor.porcentaje}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.porcentaje}%` }}
                      transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: factor.color }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tipos de churn */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <UserX className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-bold text-red-700">Voluntario</span>
                </div>
                <p className="text-2xl font-bold text-red-600">68%</p>
                <p className="text-xs text-red-600 mt-1">Cancelación activa</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-bold text-orange-700">Involuntario</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">32%</p>
                <p className="text-xs text-orange-600 mt-1">Problemas de pago</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Segmentos con mayor churn */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Segmentos de Alto Riesgo</h3>
                <p className="text-sm text-slate-600">Por nivel de riesgo de churn</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'muyAlto', label: 'Muy Alto', color: 'from-red-500 to-red-600', textColor: 'text-red-700', bgColor: 'from-red-50 to-red-100', icon: AlertTriangle },
                { key: 'alto', label: 'Alto', color: 'from-orange-500 to-orange-600', textColor: 'text-orange-700', bgColor: 'from-orange-50 to-orange-100', icon: TrendingDown },
                { key: 'medio', label: 'Medio', color: 'from-yellow-500 to-yellow-600', textColor: 'text-yellow-700', bgColor: 'from-yellow-50 to-yellow-100', icon: Minus },
                { key: 'bajo', label: 'Bajo', color: 'from-green-500 to-green-600', textColor: 'text-green-700', bgColor: 'from-green-50 to-green-100', icon: TrendingUp },
                { key: 'estable', label: 'Estable', color: 'from-emerald-600 to-teal-600', textColor: 'text-emerald-700', bgColor: 'from-emerald-50 to-emerald-100', icon: CheckCircle }
              ].map(({ key, label, color, textColor, bgColor, icon: Icon }, idx) => {
                const data = segmentacion[key as keyof typeof segmentacion];
                const porcentaje = (data.cantidad / clientes.length) * 100;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 bg-gradient-to-br ${bgColor} rounded-2xl border-2 border-white cursor-pointer hover:shadow-lg transition-all`}
                    onClick={() => setFiltroRiesgo(key === 'estable' ? key : key.toLowerCase())}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-br ${color} rounded-xl`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${textColor}`}>Riesgo {label}</p>
                          <p className="text-xs text-slate-600">{data.cantidad} clientes • €{data.ltv.toLocaleString()} LTV</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${textColor}`}>{porcentaje.toFixed(1)}%</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== ESTRATEGIAS DE RETENCIÓN CON ROI ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 -mx-6 -mt-6 mb-6 p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target className="w-6 h-6" />
              </div>
              Estrategias de Retención & ROI
            </h3>
            <p className="text-white/90 mt-2">Intervenciones activas con métricas de impacto</p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              titulo: 'Campaña de Re-engagement',
              descripcion: 'Contacto personalizado con clientes inactivos >14 días',
              objetivo: 25,
              alcanzado: 18,
              successRate: 72,
              roi: '320%',
              impactoMRR: '€4,500',
              color: 'from-blue-500 to-indigo-600',
              icon: RefreshCw,
              estado: 'Activa'
            },
            {
              titulo: 'Programa de Recuperación VIP',
              descripcion: 'Ofertas especiales y sesiones 1-on-1 para alto LTV',
              objetivo: 15,
              alcanzado: 12,
              successRate: 80,
              roi: '450%',
              impactoMRR: '€6,800',
              color: 'from-purple-500 to-pink-600',
              icon: Award,
              estado: 'Activa'
            },
            {
              titulo: 'Encuestas Predictivas',
              descripcion: 'Feedback proactivo para detectar insatisfacción temprana',
              objetivo: 50,
              alcanzado: 45,
              successRate: 90,
              roi: '180%',
              impactoMRR: '€3,200',
              color: 'from-green-500 to-emerald-600',
              icon: MessageSquare,
              estado: 'Activa'
            },
            {
              titulo: 'Alertas Automáticas de Riesgo',
              descripcion: 'Notificaciones en tiempo real a entrenadores y managers',
              objetivo: 30,
              alcanzado: 28,
              successRate: 93,
              roi: '280%',
              impactoMRR: '€5,100',
              color: 'from-orange-500 to-red-600',
              icon: Bell,
              estado: 'Activa'
            }
          ].map((estrategia, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:border-purple-200 transition-all relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100 to-transparent opacity-0 group-hover:opacity-50 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-br ${estrategia.color} rounded-xl shadow-lg`}>
                      <estrategia.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{estrategia.titulo}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          {estrategia.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">{estrategia.descripcion}</p>

                {/* Métricas */}
                <div className="space-y-3 mb-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600">Progreso</span>
                      <span className="text-xs font-bold text-slate-800">{estrategia.alcanzado}/{estrategia.objetivo} clientes</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(estrategia.alcanzado / estrategia.objetivo) * 100}%` }}
                        transition={{ delay: idx * 0.1 + 0.5, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${estrategia.color} rounded-full`}
                      ></motion.div>
                    </div>
                  </div>

                  {/* Success Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600">Tasa de Éxito</span>
                      <span className="text-xs font-bold text-green-600">{estrategia.successRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${estrategia.successRate}%` }}
                        transition={{ delay: idx * 0.1 + 0.7, duration: 1 }}
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                {/* ROI & Impact */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                    <p className="text-xs font-semibold text-emerald-700 mb-1">ROI</p>
                    <p className="text-xl font-bold text-emerald-600">{estrategia.roi}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Impacto MRR</p>
                    <p className="text-xl font-bold text-blue-600">{estrategia.impactoMRR}</p>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 px-4 py-2 bg-gradient-to-r ${estrategia.color} text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all`}
                  >
                    <PlayCircle className="w-4 h-4 inline mr-2" />
                    Ver Playbook
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ==================== EARLY WARNING SYSTEM ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-red-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 -mx-6 -mt-6 mb-6 p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                Early Warning System
              </h3>
              <p className="text-white/90 mt-2">Detección temprana y acciones automáticas sugeridas</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-sm font-semibold text-white">
                  <Zap className="w-4 h-4 inline mr-1" />
                  Sistema Activo
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          {/* Semáforo de Riesgo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Riesgo Alto */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                    <h4 className="text-lg font-bold text-red-700">Riesgo Alto</h4>
                  </div>
                  <div className="text-3xl font-bold text-red-600">
                    {segmentacion.muyAlto.cantidad + segmentacion.alto.cantidad}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-700">Muy Alto:</span>
                    <span className="font-bold text-red-800">{segmentacion.muyAlto.cantidad}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-700">Alto:</span>
                    <span className="font-bold text-red-800">{segmentacion.alto.cantidad}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl mb-3">
                  <p className="text-xs font-semibold text-red-700 mb-1">LTV en Riesgo</p>
                  <p className="text-xl font-bold text-red-600">
                    €{(segmentacion.muyAlto.ltv + segmentacion.alto.ltv).toLocaleString()}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setFiltroRiesgo('muy-alto')}
                >
                  Intervención Urgente
                </motion.button>
              </div>
            </motion.div>

            {/* Riesgo Medio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div>
                    <h4 className="text-lg font-bold text-yellow-700">Riesgo Medio</h4>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {segmentacion.medio.cantidad}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-700">Monitoreo activo</span>
                    <span className="font-bold text-yellow-800">{Math.floor(segmentacion.medio.cantidad * 0.6)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-700">Preventivo</span>
                    <span className="font-bold text-yellow-800">{Math.ceil(segmentacion.medio.cantidad * 0.4)}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl mb-3">
                  <p className="text-xs font-semibold text-yellow-700 mb-1">LTV Vulnerable</p>
                  <p className="text-xl font-bold text-yellow-600">
                    €{segmentacion.medio.ltv.toLocaleString()}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setFiltroRiesgo('medio')}
                >
                  Acción Preventiva
                </motion.button>
              </div>
            </motion.div>

            {/* Riesgo Bajo/Estable */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                    <h4 className="text-lg font-bold text-green-700">Estables</h4>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    {segmentacion.bajo.cantidad + segmentacion.estable.cantidad}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700">Bajo Riesgo:</span>
                    <span className="font-bold text-green-800">{segmentacion.bajo.cantidad}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700">Estables:</span>
                    <span className="font-bold text-green-800">{segmentacion.estable.cantidad}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">LTV Seguro</p>
                  <p className="text-xl font-bold text-green-600">
                    €{(segmentacion.bajo.ltv + segmentacion.estable.ltv).toLocaleString()}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setFiltroRiesgo('estable')}
                >
                  Continuar Monitoreo
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Señales de Churn Detectadas & Acciones Sugeridas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Señales Detectadas */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-600" />
                Señales de Churn Detectadas
              </h4>

              <div className="space-y-3">
                {[
                  { señal: 'Inactividad >14 días', clientes: 28, severidad: 'Alta', color: 'red' },
                  { señal: 'Adherencia <40%', clientes: 35, severidad: 'Alta', color: 'red' },
                  { señal: 'Sin progreso objetivo', clientes: 22, severidad: 'Media', color: 'yellow' },
                  { señal: 'Reducción sesiones -50%', clientes: 19, severidad: 'Media', color: 'yellow' },
                  { señal: 'Quejas sin resolver', clientes: 12, severidad: 'Alta', color: 'red' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${item.color}-500`}></div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.señal}</p>
                        <p className="text-xs text-slate-500">{item.clientes} clientes afectados</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      item.severidad === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.severidad}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Acciones Sugeridas */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Acciones Automáticas Sugeridas
              </h4>

              <div className="space-y-3">
                {[
                  { accion: 'Enviar email de re-engagement', automático: true, prioridad: 'Alta', icon: Mail },
                  { accion: 'Notificar a entrenador asignado', automático: true, prioridad: 'Alta', icon: Bell },
                  { accion: 'Programar llamada seguimiento', automático: false, prioridad: 'Media', icon: Phone },
                  { accion: 'Ofrecer sesión gratuita 1-on-1', automático: false, prioridad: 'Media', icon: Gift },
                  { accion: 'Aplicar descuento recuperación', automático: false, prioridad: 'Baja', icon: Target }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <item.icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.accion}</p>
                        <p className="text-xs text-slate-500">
                          {item.automático ? '🤖 Automático' : '👤 Manual'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        item.prioridad === 'Alta' ? 'bg-red-100 text-red-700' :
                        item.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.prioridad}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== TABLA DE CLIENTES EN RIESGO ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Clientes en Riesgo - Detalle</h3>
          <div className="flex gap-3">
            <select
              value={filtroRiesgo}
              onChange={(e) => {
                setFiltroRiesgo(e.target.value);
                setPaginaActual(1);
              }}
              className="px-4 py-2 border-2 border-slate-300 rounded-xl text-sm font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            >
              <option value="todos">Todos los niveles</option>
              <option value="muy-alto">🔴 Muy Alto</option>
              <option value="alto">🟠 Alto</option>
              <option value="medio">🟡 Medio</option>
              <option value="bajo">🟢 Bajo</option>
              <option value="estable">✅ Estable</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Riesgo</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">LTV</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Prob. Churn</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Inactividad</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Adherencia</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Tendencia</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Razón</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesPaginados.map((cliente, idx) => (
                <motion.tr
                  key={cliente.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                  onClick={() => setClienteSeleccionado(cliente)}
                >
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${getColorRiesgo(cliente.nivelRiesgo)}`}>
                      {cliente.nivelRiesgo.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={cliente.avatar} alt="" className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium text-slate-800">{cliente.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-700">
                    €{cliente.ltv.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            cliente.probabilidadChurn > 70 ? 'bg-red-500' :
                            cliente.probabilidadChurn > 50 ? 'bg-orange-500' :
                            cliente.probabilidadChurn > 30 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${cliente.probabilidadChurn}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-12">
                        {cliente.probabilidadChurn}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {cliente.diasSinActividad} días
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${
                      cliente.adherencia > 70 ? 'text-green-600' :
                      cliente.adherencia > 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {cliente.adherencia.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-16 h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cliente.tendenciaEngagement.map((v, i) => ({ v, i }))}>
                          <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600 max-w-xs truncate">
                    {cliente.razonRiesgo}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-blue-100 rounded-lg"
                        title="Email"
                      >
                        <Mail className="w-4 h-4 text-blue-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-green-100 rounded-lg"
                        title="Llamar"
                      >
                        <Phone className="w-4 h-4 text-green-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-purple-100 rounded-lg"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4 text-purple-600" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-600">
            Mostrando {((paginaActual - 1) * clientesPorPagina) + 1} - {Math.min(paginaActual * clientesPorPagina, clientesFiltrados.length)} de {clientesFiltrados.length} clientes
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Anterior
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setPaginaActual(page)}
                    className={`w-10 h-10 rounded-lg text-sm ${
                      paginaActual === page
                        ? 'bg-blue-500 text-white'
                        : 'border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </motion.div>

      {/* ==================== MODAL DE PERFIL DE RIESGO ==================== */}
      <AnimatePresence>
        {clienteSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setClienteSeleccionado(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img src={clienteSeleccionado.avatar} alt="" className="w-16 h-16 rounded-full border-4 border-white/30" />
                    <div>
                      <h2 className="text-2xl font-bold">{clienteSeleccionado.nombre}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 text-xs font-bold rounded ${getColorRiesgo(clienteSeleccionado.nivelRiesgo)}`}>
                          {clienteSeleccionado.nivelRiesgo.toUpperCase()}
                        </span>
                        <span className="text-sm opacity-90">LTV: €{clienteSeleccionado.ltv.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setClienteSeleccionado(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Score de Riesgo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-2">Probabilidad de Churn</div>
                    <div className="relative w-40 h-40 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="#e2e8f0"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke={
                            clienteSeleccionado.probabilidadChurn > 70 ? '#ef4444' :
                            clienteSeleccionado.probabilidadChurn > 50 ? '#f97316' :
                            clienteSeleccionado.probabilidadChurn > 30 ? '#eab308' :
                            '#22c55e'
                          }
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${2 * Math.PI * 70 * (1 - clienteSeleccionado.probabilidadChurn / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold text-slate-800">
                          {clienteSeleccionado.probabilidadChurn}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Factores de Riesgo */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Factores de Riesgo</h3>
                    <div className="space-y-2">
                      {clienteSeleccionado.factoresRiesgo.map((factor, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-slate-700">{factor.factor}</span>
                              <span className="text-sm font-semibold text-slate-800">{factor.peso.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                                style={{ width: `${factor.peso}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline de Actividad */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Historial de Actividad (12 semanas)</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={clienteSeleccionado.historialActividad}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="fecha" stroke="#64748b" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#64748b" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="sesiones"
                          stroke="#3b82f6"
                          fill="#93c5fd"
                          name="Sesiones"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Historial de Interacciones */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Historial de Interacciones</h3>
                  <div className="space-y-2">
                    {clienteSeleccionado.interacciones.map((interaccion, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            interaccion.tipo === 'Email' ? 'bg-blue-100' :
                            interaccion.tipo === 'Llamada' ? 'bg-green-100' :
                            interaccion.tipo === 'WhatsApp' ? 'bg-emerald-100' :
                            'bg-purple-100'
                          }`}>
                            {interaccion.tipo === 'Email' && <Mail className="w-4 h-4 text-blue-600" />}
                            {interaccion.tipo === 'Llamada' && <Phone className="w-4 h-4 text-green-600" />}
                            {interaccion.tipo === 'WhatsApp' && <MessageSquare className="w-4 h-4 text-emerald-600" />}
                            {interaccion.tipo === 'Presencial' && <Users className="w-4 h-4 text-purple-600" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-800">{interaccion.tipo}</div>
                            <div className="text-xs text-slate-500">{formatearFecha(interaccion.fecha)}</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${
                          interaccion.resultado === 'Positivo' ? 'bg-green-100 text-green-700' :
                          interaccion.resultado === 'Neutral' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {interaccion.resultado}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones Recomendadas */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Acciones Recomendadas por IA
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { accion: 'Ofrecer sesión gratuita 1-on-1', color: 'blue', icon: Users },
                      { accion: 'Enviar encuesta de satisfacción', color: 'purple', icon: MessageSquare },
                      { accion: 'Proponer cambio de plan', color: 'green', icon: Target },
                      { accion: 'Aplicar descuento especial', color: 'orange', icon: Gift }
                    ].map((item, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 border-2 border-${item.color}-200 bg-${item.color}-50 rounded-lg hover:border-${item.color}-300 transition-colors text-left`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                          <span className="text-sm font-medium text-slate-800">{item.accion}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Mail className="w-4 h-4" />
                    Contactar por Email
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Phone className="w-4 h-4" />
                    Programar Llamada
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    <Gift className="w-4 h-4" />
                    Aplicar Descuento
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetencionClientesPage;
