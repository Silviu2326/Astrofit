import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, TrendingUp, TrendingDown, Users,
  Clock, CheckCircle, Phone, Mail, Gift, MessageSquare,
  BarChart3, Calendar, Download, Settings, Eye, X,
  ArrowUp, ArrowDown, Minus, ChevronDown, Filter,
  DollarSign, Target, Award, Zap, Bell, Activity
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* ==================== HEADER ==================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-lg"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Centro de Retención de Clientes
              </h1>
              <p className="text-slate-600 mt-1">Monitorea y mejora la lealtad de tus clientes</p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            >
              <Bell className="w-4 h-4" />
              Ver Alertas ({alertas.filter(a => !a.atendida).length})
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              <Download className="w-4 h-4" />
              Exportar Reporte
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
            >
              <Settings className="w-4 h-4" />
              Configurar Estrategias
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ==================== KPIs CRÍTICOS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Tasa de Retención */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-xl shadow-lg ${
            kpis.tasaRetencion > 80 ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
            kpis.tasaRetencion > 60 ? 'bg-gradient-to-br from-yellow-500 to-orange-600' :
            'bg-gradient-to-br from-red-500 to-pink-600'
          } text-white`}
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6" />
            <div className="flex items-center gap-1 text-sm">
              <ArrowUp className="w-4 h-4" />
              {kpis.cambioRetencion}%
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">{kpis.tasaRetencion.toFixed(1)}%</div>
          <div className="text-sm opacity-90 mb-3">Tasa de Retención Global</div>
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={datosRetencionTiempo.slice(-6)}>
                <Line type="monotone" dataKey="retencion" stroke="white" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tasa de Churn */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="w-6 h-6 text-red-500" />
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowDown className="w-4 h-4" />
              {Math.abs(kpis.cambioChurn)}%
            </div>
          </div>
          <div className="text-4xl font-bold mb-1 text-slate-800">{kpis.tasaChurn.toFixed(1)}%</div>
          <div className="text-sm text-slate-600 mb-2">Tasa de Churn</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Objetivo: 15%</span>
            <span className={kpis.tasaChurn < 15 ? 'text-green-600' : 'text-red-600'}>
              {kpis.tasaChurn < 15 ? '✓ Alcanzado' : '✗ No alcanzado'}
            </span>
          </div>
        </motion.div>

        {/* Clientes en Riesgo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-6 h-6" />
            <div className="px-2 py-1 bg-white/20 rounded text-xs">¡Alerta!</div>
          </div>
          <div className="text-4xl font-bold mb-1">{kpis.enRiesgo}</div>
          <div className="text-sm opacity-90 mb-2">Clientes en Riesgo</div>
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-90">Prob. promedio: {
              (clientes.filter(c => c.probabilidadChurn > 50).reduce((s, c) => s + c.probabilidadChurn, 0) / kpis.enRiesgo).toFixed(1)
            }%</span>
            <button className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded">
              Ver Lista
            </button>
          </div>
        </motion.div>

        {/* Días Promedio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6 text-blue-500" />
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-4xl font-bold mb-1 text-slate-800">{kpis.diasPromedio}</div>
          <div className="text-sm text-slate-600 mb-2">Días Promedio de Permanencia</div>
          <div className="text-xs text-slate-500">Industria: ~270 días</div>
        </motion.div>

        {/* Clientes Salvados */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6" />
            <Award className="w-5 h-5" />
          </div>
          <div className="text-4xl font-bold mb-1">{kpis.salvadosMes}</div>
          <div className="text-sm opacity-90 mb-2">Clientes Salvados Este Mes</div>
          <div className="flex items-center justify-between text-xs">
            <span>€{kpis.impactoEconomico.toLocaleString()}</span>
            <span>{kpis.tasaRecuperacion}% recuperación</span>
          </div>
        </motion.div>
      </div>

      {/* ==================== ALERTAS Y GRÁFICO ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sistema de Alertas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-slate-800">Alertas Urgentes</h3>
              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                {alertas.filter(a => !a.atendida).length}
              </span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {['todas', 'alta', 'media', 'baja'].map(tipo => (
              <button
                key={tipo}
                onClick={() => setFiltroAlertas(tipo)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  filtroAlertas === tipo
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alertasFiltradas.slice(0, 8).map((alerta, idx) => (
              <motion.div
                key={alerta.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-lg border-l-4 ${getColorAlerta(alerta.tipo)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                        alerta.tipo === 'alta' ? 'bg-red-500 text-white' :
                        alerta.tipo === 'media' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {alerta.tipo.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-500">{formatearFecha(alerta.timestamp)}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">{alerta.titulo}</h4>
                    <p className="text-xs text-slate-600">{alerta.descripcion}</p>
                  </div>
                </div>
                {alerta.cliente && (
                  <div className="flex items-center gap-2 mt-3">
                    <img src={alerta.cliente.avatar} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-xs font-medium text-slate-700">{alerta.cliente.nombre}</span>
                    <button className="ml-auto text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Contactar Ahora
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gráfico de Retención en el Tiempo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4">Evolución de Retención</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={datosRetencionTiempo}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="retencion"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Retención (%)"
                  dot={{ fill: '#10b981', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="churn"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Churn (%)"
                  dot={{ fill: '#ef4444', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="activos"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Clientes Activos"
                  yAxisId="right"
                  dot={{ fill: '#3b82f6', r: 3 }}
                />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ==================== SEGMENTACIÓN POR RIESGO ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h3 className="text-xl font-bold text-slate-800 mb-4">Segmentación por Nivel de Riesgo</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { key: 'muyAlto', label: 'Muy Alto', color: 'from-red-500 to-red-600', icon: AlertTriangle },
            { key: 'alto', label: 'Alto', color: 'from-orange-500 to-orange-600', icon: TrendingDown },
            { key: 'medio', label: 'Medio', color: 'from-yellow-500 to-yellow-600', icon: Minus },
            { key: 'bajo', label: 'Bajo', color: 'from-green-500 to-green-600', icon: TrendingUp },
            { key: 'estable', label: 'Estable', color: 'from-emerald-600 to-teal-600', icon: CheckCircle }
          ].map(({ key, label, color, icon: Icon }, idx) => {
            const data = segmentacion[key as keyof typeof segmentacion];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 bg-gradient-to-br ${color} text-white rounded-xl shadow-lg cursor-pointer`}
                onClick={() => setFiltroRiesgo(key === 'estable' ? key : key.toLowerCase())}
              >
                <Icon className="w-6 h-6 mb-3" />
                <div className="text-3xl font-bold mb-1">{data.cantidad}</div>
                <div className="text-sm opacity-90 mb-2">Riesgo {label}</div>
                <div className="text-xs opacity-80">
                  LTV: €{data.ltv.toLocaleString()}
                </div>
                <button className="mt-3 w-full text-xs bg-white/20 hover:bg-white/30 py-2 rounded">
                  Ver Lista
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ==================== FACTORES DE CHURN ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4">Análisis de Factores de Churn</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factoresChurn} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis type="category" dataKey="factor" stroke="#64748b" width={180} />
                <Tooltip />
                <Bar dataKey="porcentaje" radius={[0, 8, 8, 0]}>
                  {factoresChurn.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Estrategias de Retención */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4">Estrategias de Retención</h3>
          <div className="space-y-3">
            {[
              {
                titulo: 'Campaña de Re-engagement',
                descripcion: 'Contacto personalizado con clientes inactivos',
                objetivo: 25,
                impacto: '15-20%',
                color: 'blue'
              },
              {
                titulo: 'Programa de Recuperación',
                descripcion: 'Ofertas especiales para clientes en riesgo',
                objetivo: 15,
                impacto: '30-40%',
                color: 'purple'
              },
              {
                titulo: 'Encuestas de Satisfacción',
                descripcion: 'Feedback proactivo para prevenir churn',
                objetivo: 50,
                impacto: '10-15%',
                color: 'green'
              },
              {
                titulo: 'Alertas de Inactividad',
                descripcion: 'Notificaciones automáticas a entrenadores',
                objetivo: 30,
                impacto: '20-25%',
                color: 'orange'
              }
            ].map((estrategia, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 mb-1">{estrategia.titulo}</h4>
                    <p className="text-xs text-slate-600 mb-2">{estrategia.descripcion}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Objetivo: {estrategia.objetivo} clientes</span>
                      <span>Impacto: {estrategia.impacto}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 bg-${estrategia.color}-500 text-white text-xs rounded-lg hover:bg-${estrategia.color}-600`}
                  >
                    Configurar
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ==================== TABLA DE CLIENTES EN RIESGO ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Clientes en Riesgo</h3>
          <div className="flex gap-3">
            <select
              value={filtroRiesgo}
              onChange={(e) => {
                setFiltroRiesgo(e.target.value);
                setPaginaActual(1);
              }}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="todos">Todos los niveles</option>
              <option value="muy-alto">Muy Alto</option>
              <option value="alto">Alto</option>
              <option value="medio">Medio</option>
              <option value="bajo">Bajo</option>
              <option value="estable">Estable</option>
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
