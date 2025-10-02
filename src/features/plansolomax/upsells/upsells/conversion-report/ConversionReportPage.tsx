import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign,
  Target, Users, ShoppingCart, Package, Download,
  Settings, Send, AlertCircle, Award, Zap,
  Calendar, Clock, Lightbulb, PieChart, Filter
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart as RechartsPie, Pie, Cell, FunnelChart, Funnel,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

// Datos mockeados
const generateMonthlyData = () => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return months.map((month, idx) => ({
    month,
    tasaConversion: 15 + Math.random() * 7,
    ingresos: 2000 + Math.random() * 4000,
    ofertasPresentadas: 150 + Math.floor(Math.random() * 150),
    conversiones: 25 + Math.floor(Math.random() * 40)
  }));
};

const funnelData = [
  { name: 'Clientes Elegibles', value: 1000, porcentaje: 100, color: '#10b981' },
  { name: 'Oferta Presentada', value: 850, porcentaje: 85, color: '#059669' },
  { name: 'Oferta Vista', value: 700, porcentaje: 70, color: '#047857' },
  { name: 'Click en CTA', value: 350, porcentaje: 35, color: '#065f46' },
  { name: 'Conversión', value: 180, porcentaje: 18, color: '#064e3b' }
];

const offerTypeData = [
  { tipo: 'Upsell', vistas: 450, conversiones: 95, tasa: 21.1, ingresos: 15200, aov: 160 },
  { tipo: 'Cross-sell', vistas: 380, conversiones: 72, tasa: 18.9, ingresos: 8640, aov: 120 },
  { tipo: 'Bundle', vistas: 320, conversiones: 64, tasa: 20.0, ingresos: 12800, aov: 200 },
  { tipo: 'Downsell', vistas: 150, conversiones: 25, tasa: 16.7, ingresos: 2000, aov: 80 }
];

const topOffersByRevenue = [
  { pos: 1, nombre: 'Membresía Premium Anual', ingresos: 8500, conversiones: 42, badge: 'Top Performer' },
  { pos: 2, nombre: 'Bundle Nutrición + Entrenamiento', ingresos: 6200, conversiones: 31, badge: 'Top Performer' },
  { pos: 3, nombre: 'Plan Nutrición Personalizado', ingresos: 4800, conversiones: 48, badge: 'Top Performer' },
  { pos: 4, nombre: 'Sesiones 1-on-1 (Pack 10)', ingresos: 3900, conversiones: 26, badge: '' },
  { pos: 5, nombre: 'Upgrade a Elite', ingresos: 3200, conversiones: 16, badge: '' }
];

const topOffersByConversion = [
  { pos: 1, nombre: 'Trial Extendido (7 días extra)', tasa: 34.5, conversiones: 89, badge: 'Alta Conversión' },
  { pos: 2, nombre: 'Descuento 20% Renovación Inmediata', tasa: 28.2, conversiones: 67, badge: 'Alta Conversión' },
  { pos: 3, nombre: 'Pack Suplementos Básicos', tasa: 25.8, conversiones: 52, badge: 'Alta Conversión' },
  { pos: 4, nombre: 'Membresía Premium Anual', tasa: 23.5, conversiones: 42, badge: '' },
  { pos: 5, nombre: 'Guía de Recetas Premium', tasa: 22.1, conversiones: 78, badge: '' }
];

const worstOffers = [
  { nombre: 'Plan Elite Trimestral', tasa: 4.2, razon: 'Precio muy alto', sugerencia: 'Ofrecer pago fraccionado' },
  { nombre: 'Consulta Nutricional Avanzada', tasa: 6.8, razon: 'Mensaje poco claro', sugerencia: 'Destacar beneficios específicos' },
  { nombre: 'Bundle Completo Premium', tasa: 8.1, razon: 'Mal timing', sugerencia: 'Mostrar después de 2 semanas de uso' }
];

const segmentData = {
  membresia: [
    { nombre: 'Básica', tasa: 14.2, ingresos: 8500, clientes: 450 },
    { nombre: 'Premium', tasa: 28.5, ingresos: 18200, clientes: 280 },
    { nombre: 'Elite', tasa: 35.8, ingresos: 12400, clientes: 120 }
  ],
  canal: [
    { nombre: 'Orgánico', tasa: 22.5, ingresos: 15200, clientes: 320 },
    { nombre: 'Publicidad', tasa: 16.8, ingresos: 12800, clientes: 380 },
    { nombre: 'Referido', tasa: 31.2, ingresos: 10500, clientes: 150 }
  ],
  actividad: [
    { nombre: 'Alta', tasa: 29.4, ingresos: 18900, clientes: 280 },
    { nombre: 'Media', tasa: 18.7, ingresos: 14200, clientes: 350 },
    { nombre: 'Baja', tasa: 11.2, ingresos: 6400, clientes: 220 }
  ]
};

const touchpointData = [
  { canal: 'Checkout', ofertas: 450, tasa: 24.5, ingresos: 16200 },
  { canal: 'Post-compra', ofertas: 380, tasa: 19.2, ingresos: 12800 },
  { canal: 'Email post-compra', ofertas: 320, tasa: 15.8, ingresos: 8400 },
  { canal: 'Dashboard', ofertas: 280, tasa: 12.4, ingresos: 6200 },
  { canal: 'Pop-up en app', ofertas: 150, tasa: 9.8, ingresos: 2800 }
];

const dayOfWeekData = [
  { dia: 'Lun', tasa: 16.5 },
  { dia: 'Mar', tasa: 21.2 },
  { dia: 'Mié', tasa: 22.8 },
  { dia: 'Jue', tasa: 19.4 },
  { dia: 'Vie', tasa: 17.8 },
  { dia: 'Sáb', tasa: 14.2 },
  { dia: 'Dom', tasa: 12.8 }
];

const abTests = [
  { nombre: 'Botón CTA: "Mejorar Plan" vs "Upgrade Ahora"', varianteA: 'Mejorar Plan', varianteB: 'Upgrade Ahora', metrica: 'Conversión', ganador: 'B', mejora: 18.5, pValue: 0.023 },
  { nombre: 'Descuento: 15% vs 20%', varianteA: '15%', varianteB: '20%', metrica: 'Ingresos', ganador: 'A', mejora: 12.3, pValue: 0.041 },
  { nombre: 'Timing: Inmediato vs Día 3', varianteA: 'Inmediato', varianteB: 'Día 3', metrica: 'Conversión', ganador: 'B', mejora: 24.7, pValue: 0.008 }
];

const productDistribution = [
  { nombre: 'Membresía Premium', valor: 40, color: '#10b981' },
  { nombre: 'Plan Nutrición', valor: 25, color: '#3b82f6' },
  { nombre: 'Sesiones 1-on-1', valor: 20, color: '#f59e0b' },
  { nombre: 'Bundle Completo', valor: 15, color: '#8b5cf6' }
];

const discountDistribution = [
  { nombre: 'Sin descuento', valor: 30, color: '#10b981' },
  { nombre: '10% descuento', valor: 25, color: '#3b82f6' },
  { nombre: '20% descuento', valor: 35, color: '#f59e0b' },
  { nombre: '30%+ descuento', valor: 10, color: '#ef4444' }
];

const recommendations = [
  { texto: 'Aumenta precio de "Trial Extendido", tiene alta conversión (34.5%)', tipo: 'precio', prioridad: 'alta' },
  { texto: 'Prueba mostrar "Bundle Nutrición" en checkout, no solo email', tipo: 'canal', prioridad: 'alta' },
  { texto: 'Segmento Premium tiene potencial (28.5%), crea más ofertas exclusivas', tipo: 'segmento', prioridad: 'media' },
  { texto: 'Martes y miércoles son mejores días (21-23%), enfoca campañas allí', tipo: 'timing', prioridad: 'media' },
  { texto: 'Ofrece "Plan Nutrición" con 15% descuento mejora conversión estimada en 12%', tipo: 'descuento', prioridad: 'alta' }
];

const ConversionReportPage: React.FC = () => {
  const [periodo, setPeriodo] = useState('mes');
  const [segmentTab, setSegmentTab] = useState<'membresia' | 'canal' | 'actividad'>('membresia');

  const monthlyData = generateMonthlyData();
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  // KPIs principales
  const kpis = {
    tasaConversion: {
      actual: 18.5,
      anterior: 16.8,
      cambio: ((18.5 - 16.8) / 16.8 * 100)
    },
    ingresos: {
      actual: 45230,
      anterior: 38450,
      cambio: ((45230 - 38450) / 38450 * 100)
    },
    aov: {
      conUpsell: 185,
      sinUpsell: 132,
      incremento: ((185 - 132) / 132 * 100)
    },
    ofertasPresentadas: {
      actual: 1580,
      anterior: 1420,
      cambio: ((1580 - 1420) / 1420 * 100)
    },
    conversiones: {
      actual: 292,
      anterior: 238,
      cambio: ((292 - 238) / 238 * 100)
    },
    roi: {
      valor: 4.2,
      descripcion: 'Por cada €1 invertido'
    }
  };

  const KPICard = ({ titulo, valor, subvalor, cambio, icon: Icon, prefix = '', suffix = '', index = 0 }: any) => {
    const esPositivo = cambio >= 0;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ scale: 1.03, y: -8 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-violet-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          {/* Icono */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8" />
          </div>

          {/* Título */}
          <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
            {titulo}
          </p>

          {/* Valor */}
          <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
            {prefix}{valor.toLocaleString()}{suffix}
          </p>

          {subvalor && (
            <p className="text-xs text-gray-500 font-medium mb-3">{subvalor}</p>
          )}

          {/* Cambio */}
          <div className="flex items-center gap-2">
            <div className={`p-1 ${esPositivo ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
              {esPositivo ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
            </div>
            <span className={`text-sm font-bold ${esPositivo ? 'text-green-600' : 'text-red-600'}`}>
              {esPositivo ? '+' : ''}{cambio.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500 font-medium">vs anterior</span>
          </div>

          {/* Mini gráfico */}
          <div className="mt-4 h-12 opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData.slice(-6)}>
                <Line type="monotone" dataKey="tasaConversion" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Reporte de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Conversión</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Optimiza tus estrategias de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">upsell</span> con insights accionables
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-yellow-300" />
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm font-semibold text-white cursor-pointer"
              >
                <option value="mes" className="text-gray-900">Este mes</option>
                <option value="3meses" className="text-gray-900">Últimos 3 meses</option>
                <option value="6meses" className="text-gray-900">Últimos 6 meses</option>
                <option value="12meses" className="text-gray-900">Últimos 12 meses</option>
                <option value="personalizado" className="text-gray-900">Personalizado</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
            >
              <Download className="w-5 h-5" />
              Exportar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
            >
              <Settings className="w-5 h-5" />
              Objetivos
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* KPIs Principales - Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          titulo="Ingresos por Upsells"
          valor={kpis.ingresos.actual}
          subvalor="32% del total de ingresos"
          cambio={kpis.ingresos.cambio}
          icon={DollarSign}
          prefix="€"
          index={0}
        />
        <KPICard
          titulo="Tasa de Conversión"
          valor={kpis.tasaConversion.actual}
          cambio={kpis.tasaConversion.cambio}
          icon={Target}
          suffix="%"
          index={1}
        />
        <KPICard
          titulo="AOV Incrementado"
          valor={kpis.aov.conUpsell}
          subvalor={`+${kpis.aov.incremento.toFixed(0)}% vs sin upsells`}
          cambio={15.2}
          icon={ShoppingCart}
          prefix="€"
          index={2}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white relative overflow-hidden group"
        >
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold tracking-wide uppercase opacity-90">Mejor Oferta</p>
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <p className="text-2xl font-bold mb-2">Membresía Premium Anual</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-yellow-300/20 backdrop-blur-md rounded-full border border-yellow-200/30">
                <span className="text-sm font-bold text-yellow-100">€8,500</span>
              </div>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-sm font-semibold">42 conversiones</span>
              </div>
            </div>
            <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-100 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rendimiento Temporal - Gráfico Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Evolución de Conversiones (Últimos 12 meses)</h2>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#a855f7" />
              <YAxis yAxisId="right" orientation="right" stroke="#ec4899" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="tasaConversion" stroke="#a855f7" strokeWidth={3} name="Tasa de Conversión (%)" dot={{ r: 4, fill: '#a855f7' }} />
              <Line yAxisId="right" type="monotone" dataKey="ingresos" stroke="#ec4899" strokeWidth={3} name="Ingresos (€)" dot={{ r: 4, fill: '#ec4899' }} />
              <Line yAxisId="right" type="monotone" dataKey="ofertasPresentadas" stroke="#f472b6" strokeWidth={2} name="Ofertas Presentadas" dot={{ r: 3, fill: '#f472b6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Funnel de Conversión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Funnel de Conversión</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={funnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {funnelData.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-l-4"
                  style={{ borderColor: step.color }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{step.name}</h4>
                    <div className="px-3 py-1 bg-white rounded-full">
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        {step.porcentaje}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600">{step.value.toLocaleString()} usuarios</p>
                  {idx > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <p className="text-xs font-bold text-red-600">
                        Drop-off: {((funnelData[idx-1].value - step.value) / funnelData[idx-1].value * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl p-3">
                      <p className="text-xs text-amber-900 font-semibold">⚠️ Mayor drop-off aquí: Optimiza visibilidad de la oferta</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Análisis por Tipo de Oferta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-violet-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Análisis por Tipo de Oferta</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50">
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Tipo</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-gray-700">Vistas</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-gray-700">Conv.</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-gray-700">Tasa</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-gray-700">Ingresos</th>
                  </tr>
                </thead>
                <tbody>
                  {offerTypeData.map((offer, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-purple-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <td className="py-4 px-4 font-bold text-gray-900">{offer.tipo}</td>
                      <td className="py-4 px-4 text-right text-gray-700">{offer.vistas}</td>
                      <td className="py-4 px-4 text-right text-gray-700">{offer.conversiones}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-full">
                          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
                            {offer.tasa}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-gray-900">€{offer.ingresos.toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={offerTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="tipo" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }} />
                  <Bar dataKey="tasa" fill="url(#colorTasa)" radius={[8, 8, 0, 0]} name="Tasa de Conversión (%)" />
                  <defs>
                    <linearGradient id="colorTasa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Ofertas */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Top Ofertas por Ingresos</h2>
            </div>
            <div className="space-y-3">
              {topOffersByRevenue.map((offer, idx) => (
                <motion.div
                  key={offer.pos}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200/50 hover:border-amber-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    {offer.pos}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{offer.nombre}</p>
                    <p className="text-xs text-gray-600 font-medium">{offer.conversiones} conversiones</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600">
                      €{offer.ingresos.toLocaleString()}
                    </p>
                    {offer.badge && (
                      <span className="text-xs bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-2 py-1 rounded-full font-semibold">
                        {offer.badge}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Top Ofertas por Conversión</h2>
            </div>
            <div className="space-y-3">
              {topOffersByConversion.map((offer, idx) => (
                <motion.div
                  key={offer.pos}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/50 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    {offer.pos}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{offer.nombre}</p>
                    <p className="text-xs text-gray-600 font-medium">{offer.conversiones} conversiones</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                      {offer.tasa}%
                    </p>
                    {offer.badge && (
                      <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full font-semibold">
                        {offer.badge}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Oportunidades de Mejora */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-600 via-orange-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
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
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <AlertCircle className="w-8 h-8 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h2 className="text-3xl font-bold text-white">Oportunidades de Mejora</h2>
          </div>

          <p className="text-orange-100 mb-6">Ofertas con bajo rendimiento que requieren optimización</p>

          <div className="grid md:grid-cols-3 gap-6">
            {worstOffers.map((offer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">{offer.nombre}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    <span className="text-3xl font-bold text-red-600">{offer.tasa}%</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">tasa conversión</span>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-3 mb-3">
                  <p className="text-xs text-red-900 font-semibold"><strong>❌ Razón:</strong> {offer.razon}</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 mb-4">
                  <p className="text-xs text-emerald-900 font-semibold"><strong>✅ Sugerencia:</strong> {offer.sugerencia}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Optimizar Oferta
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Segmentación de Resultados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Segmentación de Resultados</h2>
          </div>

          <div className="flex gap-3 mb-6 border-b-2 border-gray-200">
            {(['membresia', 'canal', 'actividad'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setSegmentTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 font-semibold transition-all duration-300 rounded-t-xl ${
                  segmentTab === tab
                    ? 'text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'membresia' ? 'Tipo de Membresía' : tab === 'canal' ? 'Canal de Adquisición' : 'Nivel de Actividad'}
              </motion.button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={segmentData[segmentTab]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="nombre" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }} />
                  <Bar dataKey="tasa" fill="url(#colorSegment)" radius={[8, 8, 0, 0]} name="Tasa de Conversión (%)" />
                  <defs>
                    <linearGradient id="colorSegment" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {segmentData[segmentTab].map((seg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200/50 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">{seg.nombre}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium mb-1">Tasa Conv.</p>
                      <p className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-xl">{seg.tasa}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium mb-1">Ingresos</p>
                      <p className="font-bold text-gray-900 text-lg">€{seg.ingresos.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium mb-1">Clientes</p>
                      <p className="font-bold text-gray-900 text-lg">{seg.clientes}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 border border-blue-300 rounded-2xl p-4">
                <p className="text-sm text-white font-semibold">
                  💡 <strong>Insight:</strong> {
                    segmentTab === 'membresia' ? 'Segmento Premium convierte 2x mejor que Básica' :
                    segmentTab === 'canal' ? 'Clientes referidos tienen mayor tasa de conversión' :
                    'Usuarios con alta actividad convierten 2.6x más'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Análisis por Punto de Contacto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Análisis por Punto de Contacto</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={touchpointData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="canal" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="tasa" fill="#10b981" name="Tasa de Conversión (%)" />
            <Bar yAxisId="right" dataKey="ingresos" fill="#3b82f6" name="Ingresos (€)" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-emerald-900"><strong>🎯 Canal más efectivo:</strong> Checkout con 24.5% de conversión y €16,200 en ingresos</p>
        </div>
      </motion.div>

      {/* Análisis Temporal */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Conversión por Día de la Semana</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasa" fill="#10b981" name="Tasa (%)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-900"><strong>⭐ Mejores días:</strong> Martes y Miércoles (21-23%)</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Valor Incremental</h2>
          </div>
          <div className="h-64 flex flex-col justify-center space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Ingresos con upsells</p>
              <p className="text-4xl font-bold text-emerald-600">€45,000</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Ingresos sin upsells (estimado)</p>
              <p className="text-4xl font-bold text-gray-600">€32,000</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-emerald-500 text-white rounded-lg p-6">
              <p className="text-sm opacity-90 mb-2">Valor Incremental</p>
              <p className="text-4xl font-bold">+€13,000</p>
              <p className="text-xl font-semibold mt-1">+40.6%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Test A/B Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Resultados de Tests A/B</h2>
        <div className="space-y-4">
          {abTests.map((test, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{test.nombre}</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className={`p-3 rounded ${test.ganador === 'A' ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50'}`}>
                  <p className="text-xs text-gray-600 mb-1">Variante A</p>
                  <p className="font-semibold">{test.varianteA}</p>
                  {test.ganador === 'A' && <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full mt-2 inline-block">Ganador</span>}
                </div>
                <div className={`p-3 rounded ${test.ganador === 'B' ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50'}`}>
                  <p className="text-xs text-gray-600 mb-1">Variante B</p>
                  <p className="font-semibold">{test.varianteB}</p>
                  {test.ganador === 'B' && <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full mt-2 inline-block">Ganador</span>}
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600 mb-1">Mejora</p>
                  <p className="text-2xl font-bold text-blue-600">+{test.mejora}%</p>
                  <p className="text-xs text-gray-600 mt-1">{test.metrica}</p>
                </div>
                <div className="flex items-center">
                  <button className="w-full bg-emerald-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-emerald-700 transition">
                    Aplicar a Producción
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Significancia estadística: p-value = {test.pValue}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Distribución (Pie Charts) */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Distribución por Producto</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={productDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.nombre} (${entry.valor}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {productDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Distribución por Descuento</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={discountDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.nombre} (${entry.valor}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {discountDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-900"><strong>📊 Análisis:</strong> 35% convierte con 20% descuento - óptimo para maximizar conversión vs margen</p>
          </div>
        </motion.div>
      </div>

      {/* Objetivos vs Real */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Objetivos vs Real</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Tasa de Conversión</p>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">18.5%</span>
              <span className="text-gray-600 mb-1">/ 20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full" style={{ width: '92.5%' }}></div>
            </div>
            <p className="text-sm font-semibold text-emerald-600">92.5% del objetivo</p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Ingresos Mensuales</p>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">€45K</span>
              <span className="text-gray-600 mb-1">/ €50K</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <p className="text-sm font-semibold text-amber-600">90% del objetivo</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Conversiones Totales</p>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">292</span>
              <span className="text-gray-600 mb-1">/ 250</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-sm font-semibold text-green-600">🎉 116.8% - ¡Objetivo superado!</p>
          </div>
        </div>
      </motion.div>

      {/* Insights y Recomendaciones IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <Lightbulb className="w-8 h-8 text-yellow-300" />
              <div className="absolute inset-0 w-8 h-8 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h2 className="text-3xl font-bold text-white">Insights y Recomendaciones IA</h2>
          </div>

          <p className="text-purple-100 mb-6">Sugerencias basadas en análisis de datos y machine learning</p>

          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-sm text-gray-900 font-medium flex-1 leading-relaxed">{rec.texto}</p>
                  <span className={`text-xs px-3 py-1 rounded-full ml-2 font-bold ${
                    rec.prioridad === 'alta'
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
                  }`}>
                    {rec.prioridad === 'alta' ? 'Alta' : 'Media'}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold py-3 rounded-xl hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Implementar Acción
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Benchmarks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Comparación con Industria (Benchmarks)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-500">
            <h3 className="font-semibold text-gray-900 mb-4">Tasa de Conversión</h3>
            <div className="flex items-end gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-600">Promedio Industria</p>
                <p className="text-3xl font-bold text-gray-600">15-20%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Tu Tasa</p>
                <p className="text-4xl font-bold text-emerald-600">18.5%</p>
              </div>
            </div>
            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">✓ Por encima del promedio</span>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-4">Incremento AOV</h3>
            <div className="flex items-end gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-600">Promedio Industria</p>
                <p className="text-3xl font-bold text-gray-600">25-35%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Tu Incremento</p>
                <p className="text-4xl font-bold text-blue-600">32%</p>
              </div>
            </div>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">✓ En promedio</span>
          </div>
        </div>
      </motion.div>

      {/* Predicción y Proyección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 border border-indigo-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Proyección de Ingresos (Próximos 6 Meses)</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Escenario Pesimista</p>
            <p className="text-3xl font-bold text-red-600">€240K</p>
            <p className="text-xs text-gray-500 mt-1">-10% tasa actual</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg p-4 text-center">
            <p className="text-sm opacity-90 mb-2">Escenario Realista</p>
            <p className="text-4xl font-bold">€270K</p>
            <p className="text-xs opacity-90 mt-1">Manteniendo tasa actual</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Escenario Optimista</p>
            <p className="text-3xl font-bold text-emerald-600">€310K</p>
            <p className="text-xs text-gray-500 mt-1">+15% mejora</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-center text-gray-900">
            <strong>📈 Proyección:</strong> Si mantienes la tasa actual de 18.5%, generarás aproximadamente <strong className="text-emerald-600">€270,000</strong> en los próximos 6 meses
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversionReportPage;
